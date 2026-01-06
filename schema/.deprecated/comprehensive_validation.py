#!/usr/bin/env python3
"""
Comprehensive JSON-LD syntax validation and compliance verification
"""
import json
from pathlib import Path
import re

def validate_json_syntax(file_path):
    """Validate JSON syntax"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            json.load(f)
        return True, "Valid JSON syntax"
    except json.JSONDecodeError as e:
        return False, f"JSON syntax error: {e}"
    except Exception as e:
        return False, f"File error: {e}"

def validate_jsonld_structure(data):
    """Validate JSON-LD structure requirements"""
    issues = []
    
    # Check for required top-level fields
    if '@context' not in data:
        issues.append("Missing @context field")
    
    if '@graph' not in data:
        issues.append("Missing @graph field")
    
    if 'meta' not in data:
        issues.append("Missing meta field")
    
    # Validate @context structure
    if '@context' in data:
        context = data['@context']
        if not isinstance(context, (list, dict, str)):
            issues.append("@context must be list, dict, or string")
    
    # Validate @graph structure
    if '@graph' in data:
        graph = data['@graph']
        if not isinstance(graph, list):
            issues.append("@graph must be an array")
        else:
            for i, entry in enumerate(graph):
                if not isinstance(entry, dict):
                    issues.append(f"@graph[{i}] must be an object")
                elif '@id' not in entry:
                    issues.append(f"@graph[{i}] missing @id field")
                elif '@type' not in entry:
                    issues.append(f"@graph[{i}] missing @type field")
    
    return issues

def validate_ai_properties(data):
    """Validate AI-specific properties"""
    issues = []
    
    if '@graph' in data and isinstance(data['@graph'], list):
        for i, entry in enumerate(data['@graph']):
            if isinstance(entry, dict):
                if 'ai:jjnhmLayer' not in entry:
                    issues.append(f"@graph[{i}] missing ai:jjnhmLayer")
                elif entry['ai:jjnhmLayer'] not in ['C0-core', 'C1-edge', 'C2-outer', 'HBS', 'JDBL', 'NQDS', 'JSONLD']:
                    issues.append(f"@graph[{i}] invalid ai:jjnhmLayer value: {entry['ai:jjnhmLayer']}")
                
                if 'ai:dmagPattern' not in entry:
                    issues.append(f"@graph[{i}] missing ai:dmagPattern")
    
    return issues

def validate_alphabetical_order(data):
    """Validate alphabetical ordering of @id elements"""
    issues = []
    
    if '@graph' in data and isinstance(data['@graph'], list):
        ids = []
        for entry in data['@graph']:
            if isinstance(entry, dict) and '@id' in entry:
                ids.append(entry['@id'])
        
        sorted_ids = sorted(ids)
        if ids != sorted_ids:
            issues.append("@id elements are not in alphabetical order")
    
    return issues

def validate_enhanced_components(schema_dir):
    """Validate that enhanced components are documented"""
    required_components = [
        'EnhancedImportExportWorkflow',
        'FloatingCodeEditor', 
        'WorkspaceErrorHandling',
        'WorkflowSynchronizer'
    ]
    
    found_components = set()
    issues = []
    
    # Search through all schema files
    for file_path in schema_dir.glob('project-*.jsonld'):
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
            
            if '@graph' in data:
                for entry in data['@graph']:
                    if isinstance(entry, dict) and '@id' in entry:
                        id_value = entry['@id']
                        for component in required_components:
                            if component in id_value:
                                found_components.add(component)
        except Exception:
            continue
    
    for component in required_components:
        if component not in found_components:
            issues.append(f"Enhanced component '{component}' not found in schema")
    
    return issues

def comprehensive_validate_file(file_path):
    """Comprehensive validation of a single file"""
    results = {
        'file': file_path.name,
        'json_valid': False,
        'jsonld_issues': [],
        'ai_issues': [],
        'order_issues': [],
        'total_issues': 0
    }
    
    # JSON syntax validation
    json_valid, json_message = validate_json_syntax(file_path)
    results['json_valid'] = json_valid
    
    if not json_valid:
        results['jsonld_issues'].append(json_message)
        results['total_issues'] += 1
        return results
    
    # Load data for further validation
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
    except Exception as e:
        results['jsonld_issues'].append(f"Failed to load file: {e}")
        results['total_issues'] += 1
        return results
    
    # JSON-LD structure validation
    jsonld_issues = validate_jsonld_structure(data)
    results['jsonld_issues'].extend(jsonld_issues)
    
    # AI properties validation
    ai_issues = validate_ai_properties(data)
    results['ai_issues'].extend(ai_issues)
    
    # Alphabetical order validation
    order_issues = validate_alphabetical_order(data)
    results['order_issues'].extend(order_issues)
    
    results['total_issues'] = len(jsonld_issues) + len(ai_issues) + len(order_issues)
    
    return results

def main():
    schema_dir = Path('/Users/huijoohwee/Documents/GitHub/huijoohwee.github.io/schema')
    
    # Find all project-*.jsonld files
    project_files = list(schema_dir.glob('project-*.jsonld'))
    project_files = [f for f in project_files if not f.name.endswith('.backup')]
    
    print("🔍 Comprehensive JSON-LD validation and compliance verification...")
    print("=" * 70)
    
    all_results = []
    total_files = len(project_files)
    valid_files = 0
    total_issues = 0
    
    for file_path in sorted(project_files):
        results = comprehensive_validate_file(file_path)
        all_results.append(results)
        
        if results['total_issues'] == 0:
            print(f"📁 {results['file']} ✅")
            valid_files += 1
        else:
            print(f"📁 {results['file']} ❌ ({results['total_issues']} issues)")
            total_issues += results['total_issues']
    
    print("\n" + "=" * 70)
    print("📊 VALIDATION SUMMARY:")
    print(f"   Total files: {total_files}")
    print(f"   Valid files: {valid_files}")
    print(f"   Files with issues: {total_files - valid_files}")
    print(f"   Total issues: {total_issues}")
    
    # Enhanced components validation
    print("\n🔧 Enhanced Components Validation:")
    enhanced_issues = validate_enhanced_components(schema_dir)
    if enhanced_issues:
        for issue in enhanced_issues:
            print(f"   ❌ {issue}")
    else:
        print("   ✅ All enhanced components are documented")
    
    # Detailed issue report
    if total_issues > 0:
        print("\n📋 DETAILED ISSUES:")
        for results in all_results:
            if results['total_issues'] > 0:
                print(f"\n📁 {results['file']}:")
                for issue in results['jsonld_issues']:
                    print(f"   🔴 JSON-LD: {issue}")
                for issue in results['ai_issues']:
                    print(f"   🟡 AI Props: {issue}")
                for issue in results['order_issues']:
                    print(f"   🔵 Order: {issue}")
    
    print("\n" + "=" * 70)
    if total_issues == 0 and not enhanced_issues:
        print("🎉 ALL VALIDATIONS PASSED! Schema is fully compliant.")
    else:
        print(f"⚠️  {total_issues + len(enhanced_issues)} issues need attention.")

if __name__ == "__main__":
    main()