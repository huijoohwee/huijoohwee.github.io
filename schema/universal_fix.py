#!/usr/bin/env python3
"""
Universal fix for alphabetical ordering of @id elements in JSON-LD schema files
"""
import json
from pathlib import Path

def fix_alphabetical_order(file_path):
    """Fix alphabetical ordering in any JSON-LD file"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        # Check if @graph exists and is a list
        if '@graph' in data and isinstance(data['@graph'], list):
            # Sort by @id
            data['@graph'].sort(key=lambda x: x.get('@id', ''))
            
            # Write back to file
            with open(file_path, 'w', encoding='utf-8') as f:
                json.dump(data, f, indent=2, ensure_ascii=False)
            
            print(f"✅ Fixed alphabetical ordering in {file_path.name}")
            return True
        else:
            print(f"⚠️  No @graph found in {file_path.name}")
            return False
            
    except Exception as e:
        print(f"❌ Error processing {file_path.name}: {e}")
        return False

def main():
    """Fix alphabetical ordering in specific files"""
    schema_dir = Path('/Users/huijoohwee/Documents/GitHub/huijoohwee.github.io/schema')
    
    # Files that need fixing based on validation
    files_to_fix = [
        'project-features.jsonld',
        'project-modules.jsonld', 
        'project-services.jsonld',
        'project-utilities.jsonld'
    ]
    
    print("🔧 Fixing alphabetical ordering in remaining JSON-LD schema files...")
    print("=" * 60)
    
    fixed_count = 0
    for filename in files_to_fix:
        file_path = schema_dir / filename
        if file_path.exists():
            if fix_alphabetical_order(file_path):
                fixed_count += 1
        else:
            print(f"❌ File not found: {filename}")
    
    print("=" * 60)
    print(f"📊 SUMMARY: Fixed {fixed_count}/{len(files_to_fix)} files")
    if fixed_count == len(files_to_fix):
        print("🎉 All alphabetical ordering issues have been fixed!")
    else:
        print("⚠️  Some files could not be fixed.")

if __name__ == "__main__":
    main()