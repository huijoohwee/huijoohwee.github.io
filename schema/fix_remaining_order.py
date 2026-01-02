#!/usr/bin/env python3
"""
Fix alphabetical ordering for remaining JSON-LD schema files
"""

import json
import os
from pathlib import Path

def fix_alphabetical_order(file_path):
    """Fix alphabetical ordering of @id elements in a JSON-LD file"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        if '@graph' in data and isinstance(data['@graph'], list):
            # Sort the @graph array by @id
            data['@graph'].sort(key=lambda x: x.get('@id', '').lower())
            
            # Write back to file
            with open(file_path, 'w', encoding='utf-8') as f:
                json.dump(data, f, indent=2, ensure_ascii=False)
            
            print(f"✅ Fixed alphabetical ordering in {os.path.basename(file_path)}")
            return True
        else:
            print(f"⚠️  No @graph found in {os.path.basename(file_path)}")
            return False
            
    except Exception as e:
        print(f"❌ Error processing {file_path}: {e}")
        return False

def main():
    """Fix alphabetical ordering for specific files"""
    schema_dir = Path(__file__).parent
    
    # Files that still need fixing based on validation
    files_to_fix = [
        'project-canvas-conversion.jsonld',
        'project-features.jsonld', 
        'project-modules.jsonld',
        'project-services.jsonld'
    ]
    
    print("🔧 Fixing alphabetical ordering for remaining files...")
    print("=" * 60)
    
    fixed_count = 0
    for filename in files_to_fix:
        file_path = schema_dir / filename
        if file_path.exists():
            if fix_alphabetical_order(file_path):
                fixed_count += 1
        else:
            print(f"⚠️  File not found: {filename}")
    
    print("=" * 60)
    print(f"📊 SUMMARY: Fixed {fixed_count}/{len(files_to_fix)} files")
    print("🎉 Alphabetical ordering fix complete!")

if __name__ == "__main__":
    main()