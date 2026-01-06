#!/usr/bin/env python3
"""
Check alphabetical ordering of @id elements in JSON-LD schema files
"""
import json
import os
import re
from pathlib import Path

def extract_ids_from_jsonld(file_path):
    """Extract all @id values from a JSON-LD file"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Find all @id patterns
        id_pattern = r'"@id":\s*"([^"]+)"'
        matches = re.findall(id_pattern, content)
        
        # Filter for project: namespace IDs and preserve line numbers
        project_ids = []
        lines = content.split('\n')
        for i, line in enumerate(lines, 1):
            match = re.search(id_pattern, line)
            if match and match.group(1).startswith('project:'):
                project_ids.append((match.group(1), i))
        
        return project_ids
    except Exception as e:
        print(f"Error processing {file_path}: {e}")
        return []

def check_alphabetical_order(ids_with_lines):
    """Check if IDs are in alphabetical order"""
    ids = [id_info[0] for id_info in ids_with_lines]
    sorted_ids = sorted(ids)
    
    issues = []
    for i, (original_id, line_num) in enumerate(ids_with_lines):
        expected_id = sorted_ids[i] if i < len(sorted_ids) else None
        if original_id != expected_id:
            issues.append({
                'line': line_num,
                'found': original_id,
                'expected': expected_id,
                'position': i
            })
    
    return issues, sorted_ids

def main():
    schema_dir = Path('/Users/huijoohwee/Documents/GitHub/huijoohwee.github.io/schema')
    
    # Find all project-*.jsonld files
    project_files = list(schema_dir.glob('project-*.jsonld'))
    
    print("🔍 Checking alphabetical ordering in JSON-LD schema files...")
    print("=" * 60)
    
    total_files = 0
    files_with_issues = 0
    total_issues = 0
    
    for file_path in sorted(project_files):
        if file_path.name.endswith('.backup'):
            continue
            
        total_files += 1
        print(f"\n📁 {file_path.name}")
        
        ids_with_lines = extract_ids_from_jsonld(file_path)
        
        if not ids_with_lines:
            print("   ✅ No project: IDs found or file empty")
            continue
        
        issues, sorted_ids = check_alphabetical_order(ids_with_lines)
        
        if not issues:
            print(f"   ✅ All {len(ids_with_lines)} IDs are in alphabetical order")
        else:
            files_with_issues += 1
            total_issues += len(issues)
            print(f"   ❌ Found {len(issues)} ordering issues:")
            
            for issue in issues[:5]:  # Show first 5 issues
                print(f"      Line {issue['line']}: '{issue['found']}' should be '{issue['expected']}'")
            
            if len(issues) > 5:
                print(f"      ... and {len(issues) - 5} more issues")
    
    print("\n" + "=" * 60)
    print(f"📊 SUMMARY:")
    print(f"   Total files checked: {total_files}")
    print(f"   Files with issues: {files_with_issues}")
    print(f"   Total ordering issues: {total_issues}")
    
    if files_with_issues == 0:
        print("   🎉 All files have proper alphabetical ordering!")
    else:
        print(f"   ⚠️  {files_with_issues} files need alphabetical ordering fixes")

if __name__ == "__main__":
    main()