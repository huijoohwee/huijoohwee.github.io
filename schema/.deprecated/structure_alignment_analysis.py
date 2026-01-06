#!/usr/bin/env python3
"""
Analyze structure alignment across JSON-LD schema files
"""
import json
import os
from pathlib import Path
from collections import defaultdict, Counter

def analyze_structure(file_path):
    """Analyze the structure of a JSON-LD file"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        structure = {
            'has_context': '@context' in data,
            'has_id': '@id' in data,
            'has_type': '@type' in data,
            'has_meta': 'meta' in data,
            'has_graph': '@graph' in data,
            'context_structure': None,
            'meta_fields': [],
            'graph_entry_fields': set(),
            'graph_entry_count': 0
        }
        
        # Analyze @context structure
        if '@context' in data:
            context = data['@context']
            if isinstance(context, list):
                structure['context_structure'] = 'list'
            elif isinstance(context, dict):
                structure['context_structure'] = 'dict'
            elif isinstance(context, str):
                structure['context_structure'] = 'string'
        
        # Analyze meta fields
        if 'meta' in data:
            structure['meta_fields'] = list(data['meta'].keys())
        
        # Analyze @graph entries
        if '@graph' in data and isinstance(data['@graph'], list):
            structure['graph_entry_count'] = len(data['@graph'])
            for entry in data['@graph']:
                if isinstance(entry, dict):
                    structure['graph_entry_fields'].update(entry.keys())
        
        return structure
    except Exception as e:
        print(f"Error analyzing {file_path}: {e}")
        return None

def calculate_alignment_score(structures):
    """Calculate alignment score across all structures"""
    if not structures:
        return 0.0
    
    total_files = len(structures)
    scores = []
    
    # Check @context consistency
    context_types = [s['context_structure'] for s in structures if s['context_structure']]
    context_consistency = len(set(context_types)) == 1 if context_types else 0
    scores.append(context_consistency)
    
    # Check meta field consistency
    all_meta_fields = set()
    for s in structures:
        all_meta_fields.update(s['meta_fields'])
    
    meta_consistency_scores = []
    for field in all_meta_fields:
        field_count = sum(1 for s in structures if field in s['meta_fields'])
        meta_consistency_scores.append(field_count / total_files)
    
    avg_meta_consistency = sum(meta_consistency_scores) / len(meta_consistency_scores) if meta_consistency_scores else 0
    scores.append(avg_meta_consistency)
    
    # Check graph entry field consistency
    all_graph_fields = set()
    for s in structures:
        all_graph_fields.update(s['graph_entry_fields'])
    
    graph_consistency_scores = []
    for field in all_graph_fields:
        field_count = sum(1 for s in structures if field in s['graph_entry_fields'])
        graph_consistency_scores.append(field_count / total_files)
    
    avg_graph_consistency = sum(graph_consistency_scores) / len(graph_consistency_scores) if graph_consistency_scores else 0
    scores.append(avg_graph_consistency)
    
    # Check structural element presence
    structural_elements = ['has_context', 'has_id', 'has_type', 'has_meta', 'has_graph']
    for element in structural_elements:
        element_count = sum(1 for s in structures if s[element])
        scores.append(element_count / total_files)
    
    return sum(scores) / len(scores)

def main():
    schema_dir = Path('/Users/huijoohwee/Documents/GitHub/huijoohwee.github.io/schema')
    
    # Find all project-*.jsonld files
    project_files = list(schema_dir.glob('project-*.jsonld'))
    project_files = [f for f in project_files if not f.name.endswith('.backup')]
    
    print("🔍 Analyzing structure alignment in JSON-LD schema files...")
    print("=" * 70)
    
    structures = []
    file_structures = {}
    
    for file_path in sorted(project_files):
        print(f"\n📁 {file_path.name}")
        structure = analyze_structure(file_path)
        
        if structure:
            structures.append(structure)
            file_structures[file_path.name] = structure
            
            print(f"   Context: {structure['context_structure']}")
            print(f"   Meta fields: {len(structure['meta_fields'])}")
            print(f"   Graph entries: {structure['graph_entry_count']}")
            print(f"   Graph fields: {len(structure['graph_entry_fields'])}")
        else:
            print("   ❌ Failed to analyze")
    
    # Calculate alignment score
    alignment_score = calculate_alignment_score(structures)
    
    print("\n" + "=" * 70)
    print(f"📊 STRUCTURE ALIGNMENT ANALYSIS:")
    print(f"   Total files analyzed: {len(structures)}")
    print(f"   Overall alignment score: {alignment_score:.2%}")
    
    if alignment_score >= 0.95:
        print("   🎉 Achieved >95% structure alignment!")
    else:
        print(f"   ⚠️  Need {0.95 - alignment_score:.2%} more alignment to reach 95%")
    
    # Detailed analysis
    print(f"\n📋 DETAILED ANALYSIS:")
    
    # Context structure analysis
    context_types = Counter(s['context_structure'] for s in structures if s['context_structure'])
    print(f"   Context structures: {dict(context_types)}")
    
    # Meta field analysis
    all_meta_fields = set()
    for s in structures:
        all_meta_fields.update(s['meta_fields'])
    
    print(f"   Common meta fields:")
    for field in sorted(all_meta_fields):
        count = sum(1 for s in structures if field in s['meta_fields'])
        percentage = count / len(structures)
        print(f"     {field}: {count}/{len(structures)} ({percentage:.1%})")
    
    # Graph field analysis
    all_graph_fields = set()
    for s in structures:
        all_graph_fields.update(s['graph_entry_fields'])
    
    print(f"   Common graph entry fields:")
    for field in sorted(all_graph_fields):
        count = sum(1 for s in structures if field in s['graph_entry_fields'])
        percentage = count / len(structures)
        if percentage >= 0.5:  # Only show fields used in 50%+ of files
            print(f"     {field}: {count}/{len(structures)} ({percentage:.1%})")

if __name__ == "__main__":
    main()