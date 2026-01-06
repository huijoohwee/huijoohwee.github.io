#!/usr/bin/env python3
"""
Fix alphabetical ordering of @id elements in JSON-LD schema files
"""
import json
import re
from pathlib import Path

def fix_project_components():
    """Fix alphabetical ordering in project-components.jsonld"""
    file_path = Path('/Users/huijoohwee/Documents/GitHub/huijoohwee.github.io/schema/project-components.jsonld')
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Parse JSON
    try:
        data = json.loads(content)
    except json.JSONDecodeError as e:
        print(f"JSON parsing error: {e}")
        return False
    
    # Extract and sort the @graph entries
    if '@graph' in data and isinstance(data['@graph'], list):
        # Sort by @id
        data['@graph'].sort(key=lambda x: x.get('@id', ''))
        
        # Write back to file
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        
        print(f"✅ Fixed alphabetical ordering in {file_path.name}")
        return True
    else:
        print(f"❌ No @graph found in {file_path.name}")
        return False

def fix_project_hooks():
    """Fix alphabetical ordering in project-hooks.jsonld"""
    file_path = Path('/Users/huijoohwee/Documents/GitHub/huijoohwee.github.io/schema/project-hooks.jsonld')
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    try:
        data = json.loads(content)
    except json.JSONDecodeError as e:
        print(f"JSON parsing error: {e}")
        return False
    
    if '@graph' in data and isinstance(data['@graph'], list):
        data['@graph'].sort(key=lambda x: x.get('@id', ''))
        
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        
        print(f"✅ Fixed alphabetical ordering in {file_path.name}")
        return True
    else:
        print(f"❌ No @graph found in {file_path.name}")
        return False

def fix_project_objects():
    """Fix alphabetical ordering in project-objects.jsonld"""
    file_path = Path('/Users/huijoohwee/Documents/GitHub/huijoohwee.github.io/schema/project-objects.jsonld')
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    try:
        data = json.loads(content)
    except json.JSONDecodeError as e:
        print(f"JSON parsing error: {e}")
        return False
    
    if '@graph' in data and isinstance(data['@graph'], list):
        data['@graph'].sort(key=lambda x: x.get('@id', ''))
        
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        
        print(f"✅ Fixed alphabetical ordering in {file_path.name}")
        return True
    else:
        print(f"❌ No @graph found in {file_path.name}")
        return False

def main():
    print("🔧 Fixing alphabetical ordering in JSON-LD schema files...")
    print("=" * 60)
    
    success_count = 0
    
    # Fix the three files with issues
    if fix_project_components():
        success_count += 1
    
    if fix_project_hooks():
        success_count += 1
        
    if fix_project_objects():
        success_count += 1
    
    print("\n" + "=" * 60)
    print(f"📊 SUMMARY: Fixed {success_count}/3 files")
    
    if success_count == 3:
        print("🎉 All alphabetical ordering issues have been fixed!")
    else:
        print(f"⚠️  {3 - success_count} files still need manual attention")

if __name__ == "__main__":
    main()