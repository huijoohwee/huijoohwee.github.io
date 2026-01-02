#!/usr/bin/env python3
"""
Add missing enhanced components to JSON-LD schema files
"""

import json
import os
from pathlib import Path

def add_missing_components():
    """Add EnhancedImportExportWorkflow and FloatingCodeEditor to schema files"""
    
    schema_dir = Path("/Users/huijoohwee/Documents/GitHub/huijoohwee.github.io/schema")
    components_file = schema_dir / "project-components.jsonld"
    
    # Load existing components
    with open(components_file, 'r', encoding='utf-8') as f:
        data = json.load(f, strict=False)
    
    # Define missing components
    missing_components = [
        {
            "@id": "project:EnhancedImportExportWorkflow",
            "@type": "project:Component",
            "rdfs:label": "EnhancedImportExportWorkflow",
            "project:description": "Enhanced import/export workflow component with multi-format support",
            "project:namespace": "CONVERSION",
            "project:relationship": "converts",
            "project:dependencies": ["JSON", "Markdown", "HTML", "JSX", "VanillaJS"],
            "project:filePath": "src/components/ImportExport/EnhancedImportExportWorkflow.tsx",
            "project:jjnhmLayer": "HBS",
            "project:dmagPattern": "Component",
            "project:module": "EnhancedImportExportWorkflow",
            "project:responsibilities": ["multi-format-conversion", "import-export-orchestration", "format-validation", "batch-processing"],
            "project:exports": ["EnhancedImportExportWorkflow"],
            "project:workspaceIntegration": True,
            "project:importExportSupport": True
        },
        {
            "@id": "project:FloatingCodeEditor",
            "@type": "project:Component", 
            "rdfs:label": "FloatingCodeEditor",
            "project:description": "Floating code editor component with Monaco integration",
            "project:namespace": "WORKSPACE",
            "project:relationship": "integrates",
            "project:dependencies": ["MonacoEditor", "CanvasSync", "FormatConversion"],
            "project:filePath": "src/components/editor/FloatingCodeEditor.tsx",
            "project:jjnhmLayer": "HBS",
            "project:dmagPattern": "Component",
            "project:module": "FloatingCodeEditor",
            "project:responsibilities": ["code-editing", "canvas-synchronization", "format-conversion", "floating-interface"],
            "project:exports": ["FloatingCodeEditor"],
            "project:workspaceIntegration": True,
            "project:importExportSupport": True
        }
    ]
    
    # Check if components already exist
    existing_ids = {item.get("@id") for item in data.get("@graph", [])}
    
    added_count = 0
    for component in missing_components:
        if component["@id"] not in existing_ids:
            data["@graph"].append(component)
            added_count += 1
            print(f"✅ Added: {component['@id']}")
        else:
            print(f"⚠️  Already exists: {component['@id']}")
    
    # Sort alphabetically by @id
    data["@graph"].sort(key=lambda x: x.get("@id", ""))
    
    # Write back to file
    with open(components_file, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    
    print(f"\n✅ Successfully added {added_count} missing components")
    print(f"📁 Updated: {components_file}")
    
    return added_count

if __name__ == "__main__":
    try:
        added = add_missing_components()
        print(f"\n🎯 Schema synchronization completed with {added} new components added")
    except Exception as e:
        print(f"❌ Error: {e}")
        exit(1)