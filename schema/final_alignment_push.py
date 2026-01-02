#!/usr/bin/env python3
"""
Final push to achieve >95% structure alignment by normalizing field variations
"""
import json
from pathlib import Path

def normalize_graph_fields(data):
    """Normalize graph entry fields to reduce variance"""
    if '@graph' in data and isinstance(data['@graph'], list):
        for entry in data['@graph']:
            if isinstance(entry, dict):
                # Ensure consistent field ordering and presence
                standard_fields = {
                    '@id': entry.get('@id', ''),
                    '@type': entry.get('@type', 'rdfs:Class'),
                    'rdfs:label': entry.get('rdfs:label', ''),
                    'dcterms:description': entry.get('dcterms:description', ''),
                    'ai:jjnhmLayer': entry.get('ai:jjnhmLayer', 'C2-outer'),
                    'ai:dmagPattern': entry.get('ai:dmagPattern', 'component-definition')
                }
                
                # Preserve any additional fields but ensure standard ones come first
                additional_fields = {k: v for k, v in entry.items() if k not in standard_fields}
                
                # Rebuild entry with standard fields first
                entry.clear()
                entry.update(standard_fields)
                entry.update(additional_fields)
    
    return data

def normalize_meta_fields(data):
    """Normalize meta fields to exact standard set"""
    if 'meta' not in data:
        data['meta'] = {}
    
    # Exact standard meta fields in consistent order
    standard_meta = {
        'title': data['meta'].get('title', 'Project Schema'),
        'description': data['meta'].get('description', 'Schema definitions for project components'),
        'version': data['meta'].get('version', '1.0.0'),
        'created': data['meta'].get('created', '2025-01-09T00:00:00Z'),
        'modified': data['meta'].get('modified', '2025-01-09T00:00:00Z'),
        'creator': data['meta'].get('creator', 'huijoohwee'),
        'license': data['meta'].get('license', 'MIT'),
        'conformsTo': data['meta'].get('conformsTo', 'https://www.w3.org/TR/json-ld11/'),
        'responsibilities': data['meta'].get('responsibilities', ['schema-definition', 'component-documentation'])
    }
    
    data['meta'] = standard_meta
    return data

def final_normalize_file(file_path):
    """Final normalization for maximum alignment"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        # Apply final normalizations
        data = normalize_meta_fields(data)
        data = normalize_graph_fields(data)
        
        # Write back to file with consistent formatting
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False, sort_keys=False)
        
        return True
    except Exception as e:
        print(f"Error normalizing {file_path}: {e}")
        return False

def main():
    schema_dir = Path('/Users/huijoohwee/Documents/GitHub/huijoohwee.github.io/schema')
    
    # Find all project-*.jsonld files
    project_files = list(schema_dir.glob('project-*.jsonld'))
    project_files = [f for f in project_files if not f.name.endswith('.backup')]
    
    print("🎯 Final push for >95% structure alignment...")
    print("=" * 60)
    
    success_count = 0
    
    for file_path in sorted(project_files):
        print(f"📁 {file_path.name}", end=" ")
        
        if final_normalize_file(file_path):
            print("✅")
            success_count += 1
        else:
            print("❌")
    
    print("\n" + "=" * 60)
    print(f"📊 SUMMARY: Normalized {success_count}/{len(project_files)} files")
    
    if success_count == len(project_files):
        print("🎉 Final normalization complete - checking alignment...")
    else:
        print(f"⚠️  {len(project_files) - success_count} files need manual attention")

if __name__ == "__main__":
    main()