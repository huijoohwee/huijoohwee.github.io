#!/usr/bin/env python3
"""
Debug validation to see what's happening with ai:jjnhmLayer values
"""
import json
from pathlib import Path

def debug_ai_properties(file_path):
    """Debug AI properties in a file"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        print(f"\n📁 {file_path.name}")
        
        if '@graph' in data and isinstance(data['@graph'], list):
            for i, entry in enumerate(data['@graph'][:3]):  # Check first 3 entries
                if isinstance(entry, dict):
                    jjnhm_layer = entry.get('ai:jjnhmLayer', 'MISSING')
                    dmag_pattern = entry.get('ai:dmagPattern', 'MISSING')
                    print(f"   Entry {i}: ai:jjnhmLayer='{jjnhm_layer}', ai:dmagPattern='{dmag_pattern}'")
                    
                    # Check if it's in valid values
                    valid_layers = ['C0-core', 'C1-edge', 'C2-outer', 'HBS', 'JDBL', 'NQDS', 'JSONLD']
                    if jjnhm_layer not in valid_layers:
                        print(f"      ❌ Invalid layer: '{jjnhm_layer}' (type: {type(jjnhm_layer)})")
                    else:
                        print(f"      ✅ Valid layer: '{jjnhm_layer}'")
    
    except Exception as e:
        print(f"Error reading {file_path}: {e}")

def main():
    schema_dir = Path('/Users/huijoohwee/Documents/GitHub/huijoohwee.github.io/schema')
    
    # Check a few problematic files
    problem_files = ['project-utilities.jsonld', 'project-workflows.jsonld']
    
    for filename in problem_files:
        file_path = schema_dir / filename
        if file_path.exists():
            debug_ai_properties(file_path)

if __name__ == "__main__":
    main()