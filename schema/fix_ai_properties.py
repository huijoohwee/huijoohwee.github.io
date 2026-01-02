#!/usr/bin/env python3
"""
Fix missing AI properties in JSON-LD schema files
"""

import json
from pathlib import Path

def fix_ai_properties():
    """Add missing ai:jjnhmLayer and ai:dmagPattern properties"""
    
    schema_dir = Path("/Users/huijoohwee/Documents/GitHub/huijoohwee.github.io/schema")
    components_file = schema_dir / "project-components.jsonld"
    
    # Load existing components
    with open(components_file, 'r', encoding='utf-8') as f:
        data = json.load(f, strict=False)
    
    fixed_count = 0
    
    # Fix missing AI properties
    for item in data.get("@graph", []):
        item_id = item.get("@id", "")
        
        # Add missing ai:jjnhmLayer if not present
        if "ai:jjnhmLayer" not in item:
            item["ai:jjnhmLayer"] = "HBS"
            fixed_count += 1
            print(f"✅ Added ai:jjnhmLayer to {item_id}")
        
        # Add missing ai:dmagPattern if not present  
        if "ai:dmagPattern" not in item:
            item["ai:dmagPattern"] = "Component"
            fixed_count += 1
            print(f"✅ Added ai:dmagPattern to {item_id}")
    
    # Sort alphabetically by @id
    data["@graph"].sort(key=lambda x: x.get("@id", ""))
    
    # Write back to file
    with open(components_file, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    
    print(f"\n✅ Successfully fixed {fixed_count} missing AI properties")
    print(f"📁 Updated: {components_file}")
    
    return fixed_count

if __name__ == "__main__":
    try:
        fixed = fix_ai_properties()
        print(f"\n🎯 AI properties fix completed with {fixed} properties added")
    except Exception as e:
        print(f"❌ Error: {e}")
        exit(1)