# HJH Workspace Todo Log

**Version**: 1.0.0  
**Date**: 2026-05-04  
**Status**: Active  
**Owner**: Cross-repo shared directives

Commit-backed canonical home for workspace-wide directives that span multiple repos and do not belong to one app-only `todo-log.md`.

- **Canonical directive**: **STRICTLY COMPLY** with one-row-one-directive (Max 50 words)
- **Table cells**: MUST fill-up all cells in the table; FORBID empty/`-` cells.
- **Migration rule**: keep shared directives here; do not recreate a live workspace-root `todo-log.md`.

## 2026-05-04

| Context | Intent | Directive | Module | Class/Object | Function/Method | Input | Output | Decision Logic | Next Step Recommendation | Updated Date |
|--------|--------|-----------|--------|-----------------|-------|--------|----------------|--------------------------|--------------------------|--------------|
| Storage/Worker/client sync/runtime/conflict UX docs sync | Keep implemented local-first storage, Cloudflare sync, inbound pull-apply, and shared conflict UX documented across repos without drift | Keep `knowgrph-storage-document.md` as the sub-600 canonical index, move detail into companions, mirror shared toast/log/runtime conflict actions in AgenticRAG docs, and refresh the docs map from canonical sources only. | `knowgrph/{todo-log.md,docs/documents/knowgrph-storage-document*.md}`, `huijoohwee.github.io/{docs/documents/hjh-workspace-todo-log.md,schema/AgenticRAG/{README.md,documentation.jsonld,markdown.jsonld,panels.jsonld,knowgrph-documents-map.graph.jsonld}}` | Storage docs + AgenticRAG sync contract | continuation-link sharding, `sync_map.py --mode write`, schema note updates | Implemented storage/sync/conflict UX files plus canonical storage docs and schema guidance | Sub-600 canonical storage index, two continuation companions, aligned schema guidance, refreshed docs map | Keep one canonical storage index, shard only at stable section boundaries, describe conflict actions once through the shared toast/log/runtime path, and keep schema artifacts generated from the canonical doc set. | Run `python3 huijoohwee.github.io/schema/AgenticRAG/sync_map.py --mode check` and re-check edited doc line counts after future storage-doc updates. | 2026-05-04 |
| Knowgrph + Singabldr end-state topology sync | Keep one SSOT repo per app and one publish repo for Cloudflare Pages | Use `knowgrph` and local checkout `singabldr` backed by `huijoohwee/singabldr` as Dev SSOT repos, sync only generated app surfaces into `huijoohwee`, and publish `airvio.co/knowgrph` plus `airvio.co/singabldr` from one guarded Pages repo. | `huijoohwee.github.io/docs/documents/{hjh-workspace-todo-log.md,hjh-topology-document.md}`, `knowgrph/docs/documents/knowgrph-cross-repo-publish-topology.md`, `singabldr/docs/documents/singabldr-cross-repo-publish-topology.md`, `huijoohwee.github.io/schema/AgenticRAG/README.md` | Cross-repo publish topology contract | `sync:pages`, `release:pages`, docs sync | Existing Knowgrph + Singabldr Dev repos and `huijoohwee` publish repo | Shared topology directives, per-app companion docs, shared HJH topology doc, and schema guidance aligned to one publish boundary | Keep app code upstream, keep `huijoohwee` artifact-only, and remove cross-app route or source duplication at the root instead of patching publish outputs. | Re-run `python3 huijoohwee.github.io/schema/AgenticRAG/sync_map.py --mode check` after the next topology-doc batch or route change. | 2026-05-04 |
