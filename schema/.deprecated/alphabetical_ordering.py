#!/usr/bin/env python3
"""
Alphabetical Ordering Script for JSON-LD Schema Files
Ensures ALL @id elements are in strict alphabetical order (A->Z) across all schema files
"""

import json
import os
import glob
from typing import Dict, List, Any

def sort_graph_entries_by_id(data: Dict[str, Any]) -> Dict[str, Any]:
    """Sort @graph entries by @id in alphabetical order"""
    if "@graph" in data and isinstance(data["@graph"], list):
        # Sort entries by @id alphabetically
        data["@graph"] = sorted(
            data["@graph"], 
            key=lambda x: x.get("@id", "").lower()
        )
    return data

def check_alphabetical_order(file_path: str) -> tuple[bool, List[str]]:
    """Check if @graph entries are in alphabetical order by @id"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        if "@graph" not in data or not isinstance(data["@graph"], list):
            return True, []
        
        ids = [entry.get("@id", "") for entry in data["@graph"]]
        sorted_ids = sorted(ids, key=str.lower)
        
        is_sorted = ids == sorted_ids
        issues = []
        
        if not is_sorted:
            issues.append(f"@id elements not in alphabetical order")
            for i, (current, expected) in enumerate(zip(ids, sorted_ids)):
                if current != expected:
                    issues.append(f"  Position {i}: '{current}' should be '{expected}'")
        
        return is_sorted, issues
        
    except Exception as e:
        return False, [f"Error reading file: {str(e)}"]

def fix_alphabetical_order(file_path: str) -> bool:
    """Fix alphabetical ordering in a JSON-LD file"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        # Sort @graph entries
        data = sort_graph_entries_by_id(data)
        
        # Write back with proper formatting
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        
        return True
        
    except Exception as e:
        print(f"Error fixing {file_path}: {str(e)}")
        return False

def main():
    """Main function to check and fix alphabetical ordering"""
    schema_dir = "/Users/huijoohwee/Documents/GitHub/huijoohwee.github.io/schema"
    pattern = os.path.join(schema_dir, "project-*.jsonld")
    files = glob.glob(pattern)
    
    print(f"Checking alphabetical ordering for {len(files)} schema files...")
    print("=" * 60)
    
    issues_found = 0
    files_fixed = 0
    
    for file_path in sorted(files):
        filename = os.path.basename(file_path)
        is_sorted, issues = check_alphabetical_order(file_path)
        
        if not is_sorted:
            print(f"\n❌ {filename}:")
            for issue in issues:
                print(f"   {issue}")
            
            # Fix the ordering
            if fix_alphabetical_order(file_path):
                print(f"   ✅ Fixed alphabetical ordering")
                files_fixed += 1
            else:
                print(f"   ❌ Failed to fix ordering")
            
            issues_found += 1
        else:
            print(f"✅ {filename}: Already in alphabetical order")
    
    print("\n" + "=" * 60)
    print(f"Summary:")
    print(f"  Total files checked: {len(files)}")
    print(f"  Files with ordering issues: {issues_found}")
    print(f"  Files fixed: {files_fixed}")
    
    if issues_found == 0:
        print("🎉 All files are already in perfect alphabetical order!")
    elif files_fixed == issues_found:
        print("🎉 All ordering issues have been fixed!")
    else:
        print("⚠️  Some files could not be fixed automatically")

if __name__ == "__main__":
    main()

def sort_graph_entries_by_id(data: Dict[str, Any]) -> Dict[str, Any]:
    """Sort @graph entries by @id in alphabetical order"""
    if "@graph" in data and isinstance(data["@graph"], list):
        # Sort entries by @id alphabetically
        data["@graph"] = sorted(
            data["@graph"], 
            key=lambda x: x.get("@id", "").lower()
        )
    return data

def check_alphabetical_order(file_path: str) -> tuple[bool, List[str]]:
    """Check if @graph entries are in alphabetical order by @id"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        if "@graph" not in data or not isinstance(data["@graph"], list):
            return True, []
        
        ids = [entry.get("@id", "") for entry in data["@graph"]]
        sorted_ids = sorted(ids, key=str.lower)
        
        is_sorted = ids == sorted_ids
        issues = []
        
        if not is_sorted:
            issues.append(f"@id elements not in alphabetical order")
            for i, (current, expected) in enumerate(zip(ids, sorted_ids)):
                if current != expected:
                    issues.append(f"  Position {i}: '{current}' should be '{expected}'")
        
        return is_sorted, issues
        
    except Exception as e:
        return False, [f"Error reading file: {str(e)}"]

def fix_alphabetical_order(file_path: str) -> bool:
    """Fix alphabetical ordering in a JSON-LD file"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        # Sort @graph entries
        data = sort_graph_entries_by_id(data)
        
        # Write back with proper formatting
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        
        return True
        
    except Exception as e:
        print(f"Error fixing {file_path}: {str(e)}")
        return False

def main():
    """Main function to check and fix alphabetical ordering"""
    schema_dir = "/Users/huijoohwee/Documents/GitHub/huijoohwee.github.io/schema"
    pattern = os.path.join(schema_dir, "project-*.jsonld")
    files = glob.glob(pattern)
    
    print(f"Checking alphabetical ordering for {len(files)} schema files...")
    print("=" * 60)
    
    issues_found = 0
    files_fixed = 0
    
    for file_path in sorted(files):
        filename = os.path.basename(file_path)
        is_sorted, issues = check_alphabetical_order(file_path)
        
        if not is_sorted:
            print(f"\n❌ {filename}:")
            for issue in issues:
                print(f"   {issue}")
            
            # Fix the ordering
            if fix_alphabetical_order(file_path):
                print(f"   ✅ Fixed alphabetical ordering")
                files_fixed += 1
            else:
                print(f"   ❌ Failed to fix ordering")
            
            issues_found += 1
        else:
            print(f"✅ {filename}: Already in alphabetical order")
    
    print("\n" + "=" * 60)
    print(f"Summary:")
    print(f"  Total files checked: {len(files)}")
    print(f"  Files with ordering issues: {issues_found}")
    print(f"  Files fixed: {files_fixed}")
    
    if issues_found == 0:
        print("🎉 All files are already in perfect alphabetical order!")
    elif files_fixed == issues_found:
        print("🎉 All ordering issues have been fixed!")
    else:
        print("⚠️  Some files could not be fixed automatically")

if __name__ == "__main__":
    main()