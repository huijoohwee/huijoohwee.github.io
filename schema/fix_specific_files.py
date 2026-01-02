#!/usr/bin/env python3
"""
Fix specific files with alphabetical ordering issues
"""

import json
import os

def fix_file_ordering(file_path):
    """Fix alphabetical ordering in a specific file"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        if "@graph" in data and isinstance(data["@graph"], list):
            # Sort entries by @id alphabetically (case-insensitive)
            data["@graph"] = sorted(
                data["@graph"], 
                key=lambda x: x.get("@id", "").lower()
            )
            
            # Write back with proper formatting
            with open(file_path, 'w', encoding='utf-8') as f:
                json.dump(data, f, indent=2, ensure_ascii=False)
            
            print(f"✅ Fixed: {os.path.basename(file_path)}")
            return True
        else:
            print(f"⚠️  No @graph found in: {os.path.basename(file_path)}")
            return False
            
    except Exception as e:
        print(f"❌ Error fixing {file_path}: {str(e)}")
        return False

def main():
    """Fix the specific problematic files"""
    schema_dir = "/Users/huijoohwee/Documents/GitHub/huijoohwee.github.io/schema"
    
    problematic_files = [
        "project-features.jsonld",
        "project-modules.jsonld", 
        "project-objects.jsonld",
        "project-services.jsonld",
        "project-utilities.jsonld"
    ]
    
    print("🔧 Fixing specific files with alphabetical ordering issues...")
    print("=" * 60)
    
    fixed_count = 0
    for filename in problematic_files:
        file_path = os.path.join(schema_dir, filename)
        if os.path.exists(file_path):
            if fix_file_ordering(file_path):
                fixed_count += 1
        else:
            print(f"❌ File not found: {filename}")
    
    print("=" * 60)
    print(f"📊 Summary: {fixed_count}/{len(problematic_files)} files fixed")
    print("🎯 Alphabetical ordering enforcement complete!")

if __name__ == "__main__":
    main()