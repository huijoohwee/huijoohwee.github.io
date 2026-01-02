#!/usr/bin/env python3
"""
Simple validation to check current state
"""
import json
from pathlib import Path

def simple_validate_file(file_path):
    """Simple validation of a single file"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        issues = []
        
        # Check JSON-LD structure
        if '@context' not in data:
            issues.append("Missing @context")
        if '@graph' not in data:
            issues.append("Missing @graph")
        if 'meta' not in data:
            issues.append("Missing meta")
        
        # Check AI properties
        if '@graph' in data and isinstance(data['@graph'], list):
            valid_layers = ['C0-core', 'C1-edge', 'C2-outer', 'HBS', 'JDBL', 'NQDS', 'JSONLD']
            
            for i, entry in enumerate(data['@graph']):
                if isinstance(entry, dict):
                    if 'ai:jjnhmLayer' not in entry:
                        issues.append(f"Entry {i} missing ai:jjnhmLayer")
                    elif entry['ai:jjnhmLayer'] not in valid_layers:
                        issues.append(f"Entry {i} invalid ai:jjnhmLayer: {entry['ai:jjnhmLayer']}")
                    
                    if 'ai:dmagPattern' not in entry:
                        issues.append(f"Entry {i} missing ai:dmagPattern")
        
        return len(issues) == 0, issues
    
    except Exception as e:
        return False, [f"File error: {e}"]

def main():
    schema_dir = Path('/Users/huijoohwee/Documents/GitHub/huijoohwee.github.io/schema')
    
    # Find all project-*.jsonld files
    project_files = list(schema_dir.glob('project-*.jsonld'))
    project_files = [f for f in project_files if not f.name.endswith('.backup')]
    
    print("🔍 Simple validation check...")
    print("=" * 50)
    
    valid_count = 0
    total_issues = 0
    
    for file_path in sorted(project_files):
        is_valid, issues = simple_validate_file(file_path)
        
        if is_valid:
            print(f"📁 {file_path.name} ✅")
            valid_count += 1
        else:
            print(f"📁 {file_path.name} ❌ ({len(issues)} issues)")
            total_issues += len(issues)
            for issue in issues[:3]:  # Show first 3 issues
                print(f"   - {issue}")
            if len(issues) > 3:
                print(f"   ... and {len(issues) - 3} more")
    
    print("\n" + "=" * 50)
    print(f"📊 SUMMARY:")
    print(f"   Valid files: {valid_count}/{len(project_files)}")
    print(f"   Total issues: {total_issues}")
    
    if total_issues == 0:
        print("🎉 All files are valid!")
    else:
        print(f"⚠️  {total_issues} issues found")

if __name__ == "__main__":
    main()