from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path
from typing import Any, Iterable, Literal, TypedDict


class GraphNodeProperties(TypedDict, total=False):
    repo: str
    relPath: str
    surface: str


class GraphNode(TypedDict, total=False):
    __annotations__ = {
        "@id": str,
        "@type": str,
        "labels": list[str],
        "name": list[str],
        "properties": GraphNodeProperties,
        "documentPath": str,
        "language": str,
        "chunk_text": str,
    }


class GraphEdge(TypedDict, total=False):
    __annotations__ = {
        "@id": str,
        "@type": str,
        "source": str,
        "target": str,
        "label": str,
    }


JsonObject = dict[str, Any]
GraphItem = JsonObject


def parse_args(argv: list[str]) -> argparse.Namespace:
    parser = argparse.ArgumentParser(prog="sync_map.py", add_help=True)
    parser.add_argument("--docs-dir", type=str, default=None)
    parser.add_argument("--map-file", type=str, default=None)
    parser.add_argument(
        "--mode",
        type=str,
        choices=["write", "check"],
        default="write",
    )
    return parser.parse_args(argv)


def find_github_root(start: Path) -> Path:
    for candidate in [start] + list(start.parents):
        if (candidate / "knowgrph").is_dir() and (candidate / "huijoohwee.github.io").is_dir():
            return candidate
    return start.parents[len(start.parents) - 1]


def detect_language_from_filename(filename: str) -> Literal["en-us", "zh-cn"]:
    lowered = filename.lower()
    if ".zh-cn." in lowered or lowered.endswith(".zh-cn.md") or lowered.endswith(".zh-cn.json"):
        return "zh-cn"
    if ".en-us." in lowered or lowered.endswith(".en-us.md") or lowered.endswith(".en-us.json"):
        return "en-us"
    return "en-us"


def dump_json(obj: JsonObject) -> str:
    return json.dumps(obj, ensure_ascii=False, indent=2) + "\n"


def is_edge(item: GraphItem) -> bool:
    return item.get("@type") == "kg:Edge"


def is_node(item: GraphItem) -> bool:
    return item.get("@type") == "kg:Node"


def is_knowgrph_document_node(item: GraphItem) -> bool:
    if not is_node(item):
        return False
    properties = item.get("properties")
    if not isinstance(properties, dict):
        return False
    if properties.get("repo") != "knowgrph":
        return False
    labels = item.get("labels")
    return isinstance(labels, list) and "Document" in labels


def is_schema_surface_node(item: GraphItem) -> bool:
    if not is_node(item):
        return False
    labels = item.get("labels")
    if isinstance(labels, list) and "SchemaSurface" in labels:
        return True
    properties = item.get("properties")
    if isinstance(properties, dict) and properties.get("repo") == "huijoohwee.github.io":
        return True
    return False


def safe_list_str(value: Any) -> list[str] | None:
    if not isinstance(value, list):
        return None
    if not all(isinstance(element, str) for element in value):
        return None
    return value


def get_node_filename(node: GraphItem) -> str | None:
    name = safe_list_str(node.get("name"))
    if name and len(name) == 1:
        return name[0]
    document_path = node.get("documentPath")
    if isinstance(document_path, str):
        return Path(document_path).name
    properties = node.get("properties")
    if isinstance(properties, dict):
        rel_path = properties.get("relPath")
        if isinstance(rel_path, str):
            return Path(rel_path).name
    return None


def build_doc_node_id(filename: str) -> str:
    if filename.endswith(".md"):
        base = filename[:-3]
    elif filename.endswith(".json"):
        base = filename[:-5]
    else:
        base = Path(filename).stem
    base = base.replace(" ", "-")
    return f"node:knowgrph:doc:{base}"


def upsert_document_node(existing: GraphItem | None, filename: str) -> GraphItem:
    file_rel_path = f"docs/documents/{filename}"
    language = detect_language_from_filename(filename)
    node_id = build_doc_node_id(filename)

    if existing is None:
        return {
            "@id": node_id,
            "@type": "kg:Node",
            "labels": ["Document"],
            "name": [filename],
            "properties": {"repo": "knowgrph", "relPath": file_rel_path},
            "documentPath": file_rel_path,
            "language": language,
        }

    updated = dict(existing)
    updated["@id"] = updated.get("@id") if isinstance(updated.get("@id"), str) else node_id
    updated["@type"] = "kg:Node"
    updated["labels"] = ["Document"]
    updated["name"] = [filename]
    updated["properties"] = {"repo": "knowgrph", "relPath": file_rel_path}
    updated["documentPath"] = file_rel_path
    updated["language"] = language
    return updated


def iter_doc_filenames(docs_dir: Path) -> list[str]:
    if not docs_dir.is_dir():
        raise FileNotFoundError(f"docs dir not found: {docs_dir}")
    filenames = []
    for path in docs_dir.iterdir():
        if not path.is_file():
            continue
        if path.name.endswith(".md") or path.name.endswith(".json"):
            filenames.append(path.name)
    return sorted(filenames)


def without_removed_edges(edges: Iterable[GraphItem], removed_node_ids: set[str]) -> list[GraphItem]:
    kept: list[GraphItem] = []
    for edge in edges:
        source = edge.get("source")
        target = edge.get("target")
        if isinstance(source, str) and source in removed_node_ids:
            continue
        if isinstance(target, str) and target in removed_node_ids:
            continue
        kept.append(edge)
    return kept


def sort_edges(edges: list[GraphItem]) -> list[GraphItem]:
    def edge_key(edge: GraphItem) -> tuple[str, str]:
        edge_id = edge.get("@id")
        if not isinstance(edge_id, str):
            edge_id = ""
        label = edge.get("label")
        if not isinstance(label, str):
            label = ""
        return (edge_id, label)

    return sorted(edges, key=edge_key)


def sync_map(map_obj: JsonObject, docs_filenames: list[str]) -> tuple[JsonObject, dict[str, Any]]:
    metadata = map_obj.get("metadata")
    if not isinstance(metadata, dict):
        metadata = {}
    metadata["languages"] = ["en-us", "zh-cn"]
    map_obj["metadata"] = metadata

    graph_items = map_obj.get("@graph")
    if not isinstance(graph_items, list):
        graph_items = []

    nodes = [item for item in graph_items if is_node(item)]
    edges = [item for item in graph_items if is_edge(item)]
    other_items = [item for item in graph_items if not is_node(item) and not is_edge(item)]

    schema_nodes: list[GraphItem] = []
    keep_other_nodes: list[GraphItem] = []
    knowgrph_doc_nodes: list[GraphItem] = []

    for node in nodes:
        if is_schema_surface_node(node):
            schema_nodes.append(node)
        elif is_knowgrph_document_node(node):
            knowgrph_doc_nodes.append(node)
        else:
            keep_other_nodes.append(node)

    existing_by_filename: dict[str, GraphItem] = {}
    for node in knowgrph_doc_nodes:
        filename = get_node_filename(node)
        if filename:
            existing_by_filename[filename] = node

    desired_set = set(docs_filenames)
    existing_set = set(existing_by_filename.keys())
    to_add = sorted(desired_set - existing_set)
    to_remove = sorted(existing_set - desired_set)
    to_keep = sorted(desired_set & existing_set)

    updated_doc_nodes: list[GraphItem] = []
    for filename in to_keep:
        updated_doc_nodes.append(upsert_document_node(existing_by_filename.get(filename), filename))
    for filename in to_add:
        updated_doc_nodes.append(upsert_document_node(None, filename))

    removed_node_ids: set[str] = set()
    for filename in to_remove:
        node = existing_by_filename.get(filename)
        if node and isinstance(node.get("@id"), str):
            removed_node_ids.add(node["@id"])

    updated_edges = without_removed_edges(edges, removed_node_ids)
    updated_edges = sort_edges(updated_edges)

    updated_graph: list[GraphItem] = []
    updated_graph.extend(schema_nodes)
    updated_graph.extend(keep_other_nodes)
    updated_graph.extend(sorted(updated_doc_nodes, key=lambda n: get_node_filename(n) or ""))
    updated_graph.extend(updated_edges)
    updated_graph.extend(other_items)

    map_obj["@graph"] = updated_graph
    stats = {
        "sourceFilesCount": len(docs_filenames),
        "existingDocNodesCount": len(existing_set),
        "addedDocNodesCount": len(to_add),
        "removedDocNodesCount": len(to_remove),
        "keptDocNodesCount": len(to_keep),
        "removedNodeIdsCount": len(removed_node_ids),
        "edgesCount": len(updated_edges),
    }
    details = {
        "added": to_add,
        "removed": to_remove,
    }
    return map_obj, {"stats": stats, "details": details}


def main(argv: list[str]) -> int:
    args = parse_args(argv)

    script_path = Path(__file__).resolve()
    agenticrag_dir = script_path.parent
    github_root = find_github_root(agenticrag_dir)

    docs_dir = Path(args.docs_dir) if args.docs_dir else (github_root / "knowgrph" / "docs" / "documents")
    map_file = Path(args.map_file) if args.map_file else (agenticrag_dir / "knowgrph-documents-map.graph.jsonld")

    original_text = map_file.read_text(encoding="utf-8")
    map_obj = json.loads(original_text)
    docs_filenames = iter_doc_filenames(docs_dir)

    updated_obj, report = sync_map(map_obj, docs_filenames)
    updated_text = dump_json(updated_obj)

    stats = report["stats"]
    details = report["details"]

    print(
        json.dumps(
            {
                "mapFile": str(map_file),
                "docsDir": str(docs_dir),
                **stats,
            },
            ensure_ascii=False,
            indent=2,
        )
    )
    if details["added"]:
        print(json.dumps({"added": details["added"]}, ensure_ascii=False, indent=2))
    if details["removed"]:
        print(json.dumps({"removed": details["removed"]}, ensure_ascii=False, indent=2))

    changed = original_text != updated_text
    if args.mode == "check":
        return 1 if changed else 0

    if changed:
        map_file.write_text(updated_text, encoding="utf-8")
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv[1:]))
