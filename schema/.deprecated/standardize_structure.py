#!/usr/bin/env python3
"""
Standardize structure across JSON-LD schema files to achieve >95% alignment
"""
import json
from pathlib import Path

def standardize_context(data):
    """Standardize @context to list format"""
    if '@context' in data:
        context = data['@context']
        if isinstance(context, str):
            data['@context'] = [context]
        elif isinstance(context, dict):
            # Convert dict to list format
            base_context = "https://huijoohwee.github.io/schema/base.jsonld"
            data['@context'] = [base_context, context]
    return data

def standardize_meta(data):
    """Standardize meta fields"""
    if 'meta' not in data:
        data['meta'] = {}
    
    meta = data['meta']
    
    # Ensure standard fields exist
    standard_fields = {
        'title': 'Project Schema',
        'description': 'Schema definitions for project components',
        'version': '1.0.0',
        'created': '2025-01-09T00:00:00Z',
        'license': 'MIT'
    }
    
    for field, default_value in standard_fields.items():
        if field not in meta:
            meta[field] = default_value
    
    # Standardize field names
    field_mappings = {
        'dcterms:created': 'created',
        'dcterms:creator': 'creator',
        'dcterms:modified': 'modified',
        'owl:versionInfo': 'version',
        'versionInfo': 'version'
    }
    
    for old_field, new_field in field_mappings.items():
        if old_field in meta and new_field not in meta:
            meta[new_field] = meta[old_field]
            del meta[old_field]
    
    return data

def standardize_graph_entries(data):
    """Standardize @graph entry fields"""
    if '@graph' in data and isinstance(data['@graph'], list):
        for entry in data['@graph']:
            if isinstance(entry, dict):
                # Ensure standard fields
                if 'rdfs:label' not in entry and '@id' in entry:
                    # Extract label from @id
                    id_value = entry['@id']
                    if ':' in id_value:
                        label = id_value.split(':')[-1]
                        entry['rdfs:label'] = label
                
                # Standardize description field
                if 'description' in entry and 'dcterms:description' not in entry:
                    entry['dcterms:description'] = entry['description']
                    del entry['description']
    
    return data

def standardize_file(file_path):
    """Standardize a single JSON-LD file"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        # Apply standardizations
        data = standardize_context(data)
        data = standardize_meta(data)
        data = standardize_graph_entries(data)
        
        # Write back to file
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        
        return True
    except Exception as e:
        print(f"Error standardizing {file_path}: {e}")
        return False

def main():
    schema_dir = Path('/Users/huijoohwee/Documents/GitHub/huijoohwee.github.io/schema')
    
    # Find all project-*.jsonld files
    project_files = list(schema_dir.glob('project-*.jsonld'))
    project_files = [f for f in project_files if not f.name.endswith('.backup')]
    
    print("🔧 Standardizing structure across JSON-LD schema files...")
    print("=" * 60)
    
    success_count = 0
    
    for file_path in sorted(project_files):
        print(f"📁 {file_path.name}", end=" ")
        
        if standardize_file(file_path):
            print("✅")
            success_count += 1
        else:
            print("❌")
    
    print("\n" + "=" * 60)
    print(f"📊 SUMMARY: Standardized {success_count}/{len(project_files)} files")
    
    if success_count == len(project_files):
        print("🎉 All files have been standardized!")
    else:
        print(f"⚠️  {len(project_files) - success_count} files need manual attention")

if __name__ == "__main__":
    main()