#!/usr/bin/env node

/**
 * JJNHM (JSON-LD + JDBL + NQDS + HBS + MMD) Integration Validation Script
 * Validates hybrid architecture layer integration and compliance
 */

const fs = require('fs');
const path = require('path');

class JJNHMValidator {
  constructor() {
    this.errors = [];
    this.warnings = [];
    this.layers = {
      'JSONLD': 'jsonld',
      'JDBL': 'jdbl', 
      'NQDS': 'nqds',
      'HBS': 'hbs',
      'MMD': 'mmd'
    };
    this.complexityLevels = ['C0-Foundation', 'C1-MVP-Production', 'C2-Enterprise-Scale'];
  }

  /**
   * Validate JJNHM layer schemas existence
   */
  async validateLayerSchemas(schemaDir) {
    let layersFound = 0;

    for (const [layerName, fileName] of Object.entries(this.layers)) {
      const filePath = path.join(schemaDir, `${fileName}.jsonld`);
      
      if (!fs.existsSync(filePath)) {
        this.errors.push(`Missing ${layerName} layer schema: ${fileName}.jsonld`);
      } else {
        layersFound++;
        await this.validateLayerStructure(filePath, layerName);
      }
    }

    const layerCoverage = (layersFound / Object.keys(this.layers).length) * 100;
    console.log(`✓ JJNHM layer coverage: ${layerCoverage}%`);

    if (layerCoverage < 100) {
      this.errors.push(`Incomplete JJNHM layer coverage: ${layerCoverage}% (required: 100%)`);
    }

    return layersFound === Object.keys(this.layers).length;
  }

  /**
   * Validate individual layer structure
   */
  async validateLayerStructure(filePath, layerName) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const layer = JSON.parse(content);

      // Validate basic JSON-LD structure
      if (!layer['@context']) {
        this.errors.push(`${layerName}: Missing @context`);
      }

      if (!layer.meta) {
        this.errors.push(`${layerName}: Missing meta section`);
      }

      // Layer-specific validations
      switch (layerName) {
        case 'JSONLD':
          this.validateJSONLDLayer(layer, filePath);
          break;
        case 'JDBL':
          this.validateJDBLLayer(layer, filePath);
          break;
        case 'NQDS':
          this.validateNQDSLayer(layer, filePath);
          break;
        case 'HBS':
          this.validateHBSLayer(layer, filePath);
          break;
        case 'MMD':
          this.validateMMDLayer(layer, filePath);
          break;
      }

      console.log(`✓ ${layerName} layer structure validation passed`);

    } catch (error) {
      this.errors.push(`${layerName}: JSON parsing error - ${error.message}`);
    }
  }

  /**
   * Validate JSONLD layer (Ontology Alignment Layer)
   */
  validateJSONLDLayer(layer, filePath) {
    // Check for ontology alignment features
    if (!layer['@graph'] && !layer.classes && !layer.properties) {
      this.warnings.push('JSONLD: Missing ontology definitions (@graph, classes, or properties)');
    }

    // Check for semantic web compatibility
    if (layer['@context']) {
      const hasSemanticWebVocabs = JSON.stringify(layer['@context']).includes('schema.org') ||
                                   JSON.stringify(layer['@context']).includes('w3.org') ||
                                   JSON.stringify(layer['@context']).includes('dublin');
      
      if (!hasSemanticWebVocabs) {
        this.warnings.push('JSONLD: Missing semantic web vocabulary references');
      }
    }
  }

  /**
   * Validate JDBL layer (Directive Orchestration Layer)
   */
  validateJDBLLayer(layer, filePath) {
    // Check for directive structures
    if (layer['@graph']) {
      const hasDirectives = layer['@graph'].some(item => 
        item.directive || item['active-verbs'] || item.orchestration
      );
      
      if (!hasDirectives) {
        this.warnings.push('JDBL: Missing directive orchestration structures');
      }

      // Check for active verbs
      const hasActiveVerbs = layer['@graph'].some(item => 
        item['active-verbs'] || item.activeVerbs
      );
      
      if (!hasActiveVerbs) {
        this.warnings.push('JDBL: Missing active verb definitions');
      }
    }
  }

  /**
   * Validate NQDS layer (Semantic Payload Layer)
   */
  validateNQDSLayer(layer, filePath) {
    // Check for semantic payload structures
    if (layer['@graph']) {
      const hasSemanticPayload = layer['@graph'].some(item => 
        item.semanticGraph || item.knowledgeGraph || item.payload
      );
      
      if (!hasSemanticPayload) {
        this.warnings.push('NQDS: Missing semantic payload structures');
      }

      // Check for N-Quads compatibility
      const hasNQuadsStructure = layer['@graph'].some(item => 
        item.subject || item.predicate || item.object || item.graph
      );
      
      if (!hasNQuadsStructure) {
        this.warnings.push('NQDS: Missing N-Quads compatible structures');
      }
    }
  }

  /**
   * Validate HBS layer (Schema Templating Engine Layer)
   */
  validateHBSLayer(layer, filePath) {
    // Check for templating structures
    if (layer['@graph']) {
      const hasTemplates = layer['@graph'].some(item => 
        item.template || item.handlebars || item.mustache
      );
      
      if (!hasTemplates) {
        this.warnings.push('HBS: Missing template definitions');
      }

      // Check for rendering capabilities
      const hasRendering = layer['@graph'].some(item => 
        item.rendering || item.generation || item.output
      );
      
      if (!hasRendering) {
        this.warnings.push('HBS: Missing rendering capability definitions');
      }
    }
  }

  /**
   * Validate MMD layer (Visualization Engine Layer)
   */
  validateMMDLayer(layer, filePath) {
    // Check for visualization structures
    if (layer['@graph']) {
      const hasVisualization = layer['@graph'].some(item => 
        item.mermaid || item.diagram || item.visualization
      );
      
      if (!hasVisualization) {
        this.warnings.push('MMD: Missing visualization definitions');
      }

      // Check for diagram types
      const hasDiagramTypes = layer['@graph'].some(item => 
        item.flowchart || item.sequence || item.graph || item.gantt
      );
      
      if (!hasDiagramTypes) {
        this.warnings.push('MMD: Missing diagram type definitions');
      }
    }
  }

  /**
   * Validate layer integration and dependencies
   */
  async validateLayerIntegration(schemaDir) {
    const integrationMatrix = {
      'JSONLD': ['JDBL', 'NQDS'],
      'JDBL': ['NQDS', 'HBS'],
      'NQDS': ['HBS', 'MMD'],
      'HBS': ['MMD'],
      'MMD': []
    };

    for (const [sourceLayer, targetLayers] of Object.entries(integrationMatrix)) {
      const sourceFile = path.join(schemaDir, `${this.layers[sourceLayer]}.jsonld`);
      
      if (fs.existsSync(sourceFile)) {
        const content = fs.readFileSync(sourceFile, 'utf8');
        const schema = JSON.parse(content);

        for (const targetLayer of targetLayers) {
          const hasIntegration = JSON.stringify(schema).includes(targetLayer) ||
                                JSON.stringify(schema).includes(this.layers[targetLayer]);
          
          if (!hasIntegration) {
            this.warnings.push(`${sourceLayer}: Missing integration with ${targetLayer} layer`);
          }
        }
      }
    }

    console.log('✓ Layer integration validation completed');
  }

  /**
   * Validate JJNHM complexity levels
   */
  async validateComplexityLevels(schemaDir) {
    const files = fs.readdirSync(schemaDir)
      .filter(file => file.endsWith('.jsonld'))
      .map(file => path.join(schemaDir, file));

    let complexityLevelsFound = 0;

    for (const file of files) {
      try {
        const content = fs.readFileSync(file, 'utf8');
        const schema = JSON.parse(content);

        for (const level of this.complexityLevels) {
          const found = JSON.stringify(schema).includes(level);
          if (found) {
            complexityLevelsFound++;
            break;
          }
        }
      } catch (error) {
        // Skip invalid JSON files
      }
    }

    const complexityCoverage = (complexityLevelsFound / this.complexityLevels.length) * 100;
    if (complexityCoverage < 66) {
      this.warnings.push(`JJNHM complexity levels coverage: ${complexityCoverage.toFixed(1)}% (target: ≥66%)`);
    }

    console.log(`✓ JJNHM complexity levels coverage: ${complexityCoverage.toFixed(1)}%`);
  }

  /**
   * Validate token density optimization
   */
  async validateTokenDensity(schemaDir) {
    const files = fs.readdirSync(schemaDir)
      .filter(file => file.endsWith('.jsonld'))
      .map(file => path.join(schemaDir, file));

    let totalTokens = 0;
    let totalConcepts = 0;

    for (const file of files) {
      try {
        const content = fs.readFileSync(file, 'utf8');
        const schema = JSON.parse(content);

        // Estimate tokens (simplified)
        const tokens = JSON.stringify(schema).split(/\s+/).length;
        totalTokens += tokens;

        // Estimate concepts (simplified)
        if (schema['@graph']) {
          totalConcepts += schema['@graph'].length;
        } else {
          totalConcepts += Object.keys(schema).length;
        }

      } catch (error) {
        // Skip invalid JSON files
      }
    }

    const tokenDensity = totalTokens > 0 ? totalConcepts / totalTokens : 0;
    const targetDensity = 6.5;

    if (tokenDensity < targetDensity) {
      this.warnings.push(`Token density: ${tokenDensity.toFixed(2)} concepts/token (target: ≥${targetDensity})`);
    }

    console.log(`✓ Token density: ${tokenDensity.toFixed(2)} concepts/token`);
  }

  /**
   * Validate semantic clarity
   */
  async validateSemanticClarity(schemaDir) {
    const files = fs.readdirSync(schemaDir)
      .filter(file => file.endsWith('.jsonld'))
      .map(file => path.join(schemaDir, file));

    let clarityScore = 0;
    let totalFiles = files.length;

    for (const file of files) {
      try {
        const content = fs.readFileSync(file, 'utf8');
        const schema = JSON.parse(content);

        let fileScore = 0;

        // Check for clear naming
        if (schema['@id'] && schema['@id'].includes('http')) {
          fileScore += 20;
        }

        // Check for documentation
        if (schema.meta && (schema.meta.description || schema.meta['dcterms:description'])) {
          fileScore += 20;
        }

        // Check for type definitions
        if (schema['@type'] || (schema.meta && schema.meta['@type'])) {
          fileScore += 20;
        }

        // Check for structured content
        if (schema['@graph'] && Array.isArray(schema['@graph'])) {
          fileScore += 20;
        }

        // Check for context definitions
        if (schema['@context'] && Array.isArray(schema['@context'])) {
          fileScore += 20;
        }

        clarityScore += fileScore;

      } catch (error) {
        // Skip invalid JSON files
      }
    }

    const averageClarity = totalFiles > 0 ? clarityScore / totalFiles : 0;
    const targetClarity = 95;

    if (averageClarity < targetClarity) {
      this.warnings.push(`Semantic clarity: ${averageClarity.toFixed(1)}% (target: ≥${targetClarity}%)`);
    }

    console.log(`✓ Semantic clarity: ${averageClarity.toFixed(1)}%`);
  }

  /**
   * Generate JJNHM integration report
   */
  generateReport() {
    console.log('\n📊 JJNHM Integration Report');
    console.log('===========================');
    
    if (this.errors.length === 0 && this.warnings.length === 0) {
      console.log('✅ All JJNHM integrations passed successfully!');
    } else {
      if (this.errors.length > 0) {
        console.log('\n❌ JJNHM Errors:');
        this.errors.forEach(error => console.log(`  - ${error}`));
      }
      
      if (this.warnings.length > 0) {
        console.log('\n⚠️  JJNHM Warnings:');
        this.warnings.forEach(warning => console.log(`  - ${warning}`));
      }
    }
    
    // Calculate JJNHM integration score
    const totalIssues = this.errors.length + this.warnings.length;
    const integrationScore = Math.max(0, 100 - (this.errors.length * 10) - (this.warnings.length * 2));
    
    console.log(`\n📈 JJNHM Integration Score: ${integrationScore}% (target: ≥96%)`);
    console.log(`Summary: ${this.errors.length} errors, ${this.warnings.length} warnings`);
    
    return this.errors.length === 0 && integrationScore >= 96;
  }

  /**
   * Run all JJNHM validations
   */
  async runValidation(schemaDir) {
    console.log('🔗 Starting JJNHM Integration Validation');
    console.log('========================================');
    
    try {
      await this.validateLayerSchemas(schemaDir);
      await this.validateLayerIntegration(schemaDir);
      await this.validateComplexityLevels(schemaDir);
      await this.validateTokenDensity(schemaDir);
      await this.validateSemanticClarity(schemaDir);

      return this.generateReport();

    } catch (error) {
      console.error('❌ JJNHM integration validation failed:', error.message);
      return false;
    }
  }
}

/**
 * Main JJNHM validation function
 */
async function main() {
  const schemaDir = path.join(__dirname, '../schema');
  const validator = new JJNHMValidator();
  
  const success = await validator.runValidation(schemaDir);
  process.exit(success ? 0 : 1);
}

// Run if called directly
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { JJNHMValidator };