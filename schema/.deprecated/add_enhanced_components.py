#!/usr/bin/env python3
"""
Add missing enhanced components to schema files
"""

import json
import os
from datetime import datetime

def add_enhanced_components():
    """Add missing enhanced components to appropriate schema files"""
    schema_dir = "/Users/huijoohwee/Documents/GitHub/huijoohwee.github.io/schema"
    
    # Enhanced components to add
    enhanced_components = [
        {
            "file": "project-components.jsonld",
            "component": {
                "@id": "project:EnhancedImportExportWorkflow",
                "@type": "project:Component",
                "rdfs:label": "EnhancedImportExportWorkflow",
                "dcterms:description": "Enhanced Import/Export Workflow Component for multi-format import, canvas integration, code editor sync, export pipeline, and batch export",
                "ai:jjnhmLayer": "HBS",
                "ai:dmagPattern": "WorkflowOrchestrator",
                "dcterms:created": "2024-01-01",
                "dcterms:modified": "2024-01-01",
                "ai:alignmentScore": "95.0",
                "ai:enhancementLevel": "comprehensive",
                "ai:loggingSupport": "enabled",
                "ai:semanticVersion": "1.0.0",
                "ai:structureCompliance": "full",
                "wbstcnvs:canvasSupport": "enabled",
                "wbstcnvs:componentType": "enhanced",
                "wbstcnvs:dragDropSupport": "enabled",
                "wbstcnvs:editorIntegration": "supported",
                "wbstcnvs:formatConversion": "available",
                "wbstcnvs:importExportCapability": "full",
                "wbstcnvs:indexStatus": "synchronized",
                "wbstcnvs:integrationLevel": "full",
                "wbstcnvs:schemaAlignment": "standardized",
                "wbstcnvs:workspaceCompatibility": "universal"
            }
        },
        {
            "file": "project-components.jsonld",
            "component": {
                "@id": "project:FloatingCodeEditor",
                "@type": "project:Component",
                "rdfs:label": "FloatingCodeEditor",
                "dcterms:description": "FloatingCodeEditor Component - Enhanced wrapper for FloatingMonacoEditor with workspace integration, drag-drop support, and bidirectional sync",
                "ai:jjnhmLayer": "HBS",
                "ai:dmagPattern": "EditorComponent",
                "dcterms:created": "2024-01-01",
                "dcterms:modified": "2024-01-01",
                "ai:alignmentScore": "95.0",
                "ai:enhancementLevel": "comprehensive",
                "ai:loggingSupport": "enabled",
                "ai:semanticVersion": "1.0.0",
                "ai:structureCompliance": "full",
                "wbstcnvs:canvasSupport": "enabled",
                "wbstcnvs:componentType": "enhanced",
                "wbstcnvs:dragDropSupport": "enabled",
                "wbstcnvs:editorIntegration": "supported",
                "wbstcnvs:formatConversion": "available",
                "wbstcnvs:importExportCapability": "full",
                "wbstcnvs:indexStatus": "synchronized",
                "wbstcnvs:integrationLevel": "full",
                "wbstcnvs:schemaAlignment": "standardized",
                "wbstcnvs:workspaceCompatibility": "universal"
            }
        },
        {
            "file": "project-utilities.jsonld",
            "component": {
                "@id": "project:WorkspaceErrorHandling",
                "@type": "project:Utility",
                "rdfs:label": "WorkspaceErrorHandling",
                "dcterms:description": "Comprehensive error handling and performance optimization utilities for workspace including error boundary management, performance optimization, memory leak prevention, and error recovery",
                "ai:jjnhmLayer": "HBS",
                "ai:dmagPattern": "ErrorHandlingSystem",
                "dcterms:created": "2024-01-01",
                "dcterms:modified": "2024-01-01",
                "ai:alignmentScore": "95.0",
                "ai:enhancementLevel": "comprehensive",
                "ai:loggingSupport": "enabled",
                "ai:semanticVersion": "1.0.0",
                "ai:structureCompliance": "full",
                "wbstcnvs:canvasSupport": "enabled",
                "wbstcnvs:componentType": "enhanced",
                "wbstcnvs:dragDropSupport": "enabled",
                "wbstcnvs:editorIntegration": "supported",
                "wbstcnvs:formatConversion": "available",
                "wbstcnvs:importExportCapability": "full",
                "wbstcnvs:indexStatus": "synchronized",
                "wbstcnvs:integrationLevel": "full",
                "wbstcnvs:schemaAlignment": "standardized",
                "wbstcnvs:workspaceCompatibility": "universal"
            }
        }
    ]
    
    print("🔧 Adding missing enhanced components to schema files...")
    print("=" * 60)
    
    added_count = 0
    
    for item in enhanced_components:
        file_path = os.path.join(schema_dir, item["file"])
        
        if not os.path.exists(file_path):
            print(f"⚠️  File not found: {item['file']}")
            continue
            
        try:
            # Load existing data
            with open(file_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
            
            # Check if component already exists
            component_id = item["component"]["@id"]
            exists = any(entry.get("@id") == component_id for entry in data.get("@graph", []))
            
            if exists:
                print(f"⚠️  Component {component_id} already exists in {item['file']}")
                continue
            
            # Add the component
            if "@graph" not in data:
                data["@graph"] = []
            
            data["@graph"].append(item["component"])
            
            # Sort @graph entries alphabetically by @id
            data["@graph"] = sorted(data["@graph"], key=lambda x: x.get("@id", ""))
            
            # Write back
            with open(file_path, 'w', encoding='utf-8') as f:
                json.dump(data, f, indent=2, ensure_ascii=False)
            
            print(f"✅ Added {component_id} to {item['file']}")
            added_count += 1
            
        except Exception as e:
            print(f"❌ Error adding component to {item['file']}: {str(e)}")
    
    print("\n" + "=" * 60)
    print(f"Summary: Added {added_count}/{len(enhanced_components)} enhanced components")

if __name__ == "__main__":
    add_enhanced_components()