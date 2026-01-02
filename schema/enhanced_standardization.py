#!/usr/bin/env python3
"""
Enhanced standardization to achieve >95% structure alignment
"""
import json
from pathlib import Path
from datetime import datetime

def get_standard_meta_fields():
    """Get the complete set of standard meta fields"""
    return {
        'title': 'Project Schema',
        'description': 'Schema definitions for project components',
        'version': '1.0.0',
        'created': '2025-01-09T00:00:00Z',
        'license': 'MIT',
        'creator': 'huijoohwee',
        'modified': datetime.now().isoformat() + 'Z',
        'conformsTo': 'https://www.w3.org/TR/json-ld11/',
        'responsibilities': ['schema-definition', 'component-documentation']
    }

def enhance_meta_standardization(data):
    """Enhanced meta field standardization"""
    if 'meta' not in data:
        data['meta'] = {}
    
    meta = data['meta']
    standard_fields = get_standard_meta_fields()
    
    # Add all standard fields
    for field, default_value in standard_fields.items():
        if field not in meta:
            meta[field] = default_value
    
    # Remove deprecated fields
    deprecated_fields = ['dcterms:created', 'dcterms:creator', 'dcterms:modified', 
                        'owl:versionInfo', 'versionInfo', 'semVer', 'updated', 'cmt', 'owl:imports']
    
    for field in deprecated_fields:
        if field in meta:
            del meta[field]
    
    return data

def enhance_graph_standardization(data):
    """Enhanced graph entry standardization"""
    if '@graph' in data and isinstance(data['@graph'], list):
        for entry in data['@graph']:
            if isinstance(entry, dict):
                # Ensure all entries have dcterms:description
                if 'dcterms:description' not in entry:
                    if 'description' in entry:
                        entry['dcterms:description'] = entry['description']
                        del entry['description']
                    elif '@id' in entry:
                        # Generate description from @id
                        id_value = entry['@id']
                        if ':' in id_value:
                            component_name = id_value.split(':')[-1]
                            entry['dcterms:description'] = f"Schema definition for {component_name}"
                        else:
                            entry['dcterms:description'] = f"Schema definition for {id_value}"
                
                # Ensure rdfs:label exists
                if 'rdfs:label' not in entry and '@id' in entry:
                    id_value = entry['@id']
                    if ':' in id_value:
                        entry['rdfs:label'] = id_value.split(':')[-1]
                    else:
                        entry['rdfs:label'] = id_value
                
                # Ensure ai:jjnhmLayer and ai:dmagPattern exist
                if 'ai:jjnhmLayer' not in entry:
                    entry['ai:jjnhmLayer'] = 'C2-outer'
                
                if 'ai:dmagPattern' not in entry:
                    entry['ai:dmagPattern'] = 'component-definition'
    
    return data

def enhance_context_standardization(data):
    """Enhanced context standardization"""
    standard_context = [
        "https://huijoohwee.github.io/schema/base.jsonld",
        {
            "@base": "https://huijoohwee.github.io/schema/",
            "ai": "https://huijoohwee.github.io/schema/ai.jsonld#",
            "dcterms": "http://purl.org/dc/terms/",
            "rdfs": "http://www.w3.org/2000/01/rdf-schema#"
        }
    ]
    
    data['@context'] = standard_context
    return data

def enhance_file_standardization(file_path):
    """Enhanced standardization for a single file"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        # Apply enhanced standardizations
        data = enhance_context_standardization(data)
        data = enhance_meta_standardization(data)
        data = enhance_graph_standardization(data)
        
        # Write back to file
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        
        return True
    except Exception as e:
        print(f"Error enhancing {file_path}: {e}")
        return False

def main():
    schema_dir = Path('/Users/huijoohwee/Documents/GitHub/huijoohwee.github.io/schema')
    
    # Find all project-*.jsonld files
    project_files = list(schema_dir.glob('project-*.jsonld'))
    project_files = [f for f in project_files if not f.name.endswith('.backup')]
    
    print("🚀 Enhanced standardization for >95% structure alignment...")
    print("=" * 60)
    
    success_count = 0
    
    for file_path in sorted(project_files):
        print(f"📁 {file_path.name}", end=" ")
        
        if enhance_file_standardization(file_path):
            print("✅")
            success_count += 1
        else:
            print("❌")
    
    print("\n" + "=" * 60)
    print(f"📊 SUMMARY: Enhanced {success_count}/{len(project_files)} files")
    
    if success_count == len(project_files):
        print("🎉 All files have been enhanced for maximum alignment!")
    else:
        print(f"⚠️  {len(project_files) - success_count} files need manual attention")

if __name__ == "__main__":
    main()