#!/usr/bin/env node

/**
 * DMAG (Distributed Modular Architecture Governance) Validation Script
 * Validates DMAG pattern implementations, layer alignment, and governance principles
 */

const fs = require('fs');
const path = require('path');

class DMAGValidator {
  constructor() {
    this.errors = [];
    this.warnings = [];
    this.dmagPatterns = [
      'ModulePattern',
      'AdapterPattern', 
      'ServiceFactory',
      'ActorInstance',
      'ResiliencePrimitive',
      'CoordinationPattern'
    ];
  }

  /**
   * Validate DMAG schema existence and structure
   */
  async validateDMAGSchema(schemaDir) {
    const dmagPath = path.join(schemaDir, 'dmag.jsonld');
    
    if (!fs.existsSync(dmagPath)) {
      this.errors.push('Missing dmag.jsonld schema file');
      return false;
    }

    try {
      const content = fs.readFileSync(dmagPath, 'utf8');
      const dmag = JSON.parse(content);

      // Validate DMAG schema structure
      if (!dmag['@context']) {
        this.errors.push('dmag.jsonld: Missing @context');
      }

      if (!dmag['@graph']) {
        this.errors.push('dmag.jsonld: Missing @graph');
      }

      // Validate DMAG patterns in @graph
      if (dmag['@graph']) {
        const patterns = dmag['@graph'].filter(item => 
          item['@type'] && item['@type'].includes('Pattern')
        );

        for (const pattern of this.dmagPatterns) {
          const found = patterns.some(p => 
            p['@id'] && p['@id'].includes(pattern)
          );
          if (!found) {
            this.warnings.push(`dmag.jsonld: Missing ${pattern} definition`);
          }
        }
      }

      console.log('✓ DMAG schema validation passed');
      return true;

    } catch (error) {
      this.errors.push(`dmag.jsonld: JSON parsing error - ${error.message}`);
      return false;
    }
  }

  /**
   * Validate DMAG pattern implementations in schema files
   */
  async validateDMAGPatterns(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const schema = JSON.parse(content);

      // Check for DMAG pattern usage
      if (schema['@graph']) {
        for (const item of schema['@graph']) {
          // Validate ModulePattern implementation
          if (item['@type'] && item['@type'].includes('Module')) {
            this.validateModulePattern(item, path.basename(filePath));
          }

          // Validate AdapterPattern implementation
          if (item['@type'] && item['@type'].includes('Adapter')) {
            this.validateAdapterPattern(item, path.basename(filePath));
          }

          // Validate ServiceFactory implementation
          if (item['@type'] && item['@type'].includes('Service')) {
            this.validateServiceFactory(item, path.basename(filePath));
          }
        }
      }

      return true;

    } catch (error) {
      this.errors.push(`${path.basename(filePath)}: DMAG pattern validation error - ${error.message}`);
      return false;
    }
  }

  /**
   * Validate ModulePattern implementation
   */
  validateModulePattern(module, fileName) {
    // Check for required module properties
    if (!module.responsibilities) {
      this.warnings.push(`${fileName}: Module missing responsibilities definition`);
    }

    if (!module.interfaces) {
      this.warnings.push(`${fileName}: Module missing interfaces definition`);
    }

    if (!module.dependencies) {
      this.warnings.push(`${fileName}: Module missing dependencies definition`);
    }

    // Check module cohesion metrics
    if (module.cohesion && parseFloat(module.cohesion) < 0.9) {
      this.warnings.push(`${fileName}: Module cohesion below 90% threshold`);
    }
  }

  /**
   * Validate AdapterPattern implementation
   */
  validateAdapterPattern(adapter, fileName) {
    // Check for required adapter properties
    if (!adapter.sourceInterface) {
      this.warnings.push(`${fileName}: Adapter missing sourceInterface definition`);
    }

    if (!adapter.targetInterface) {
      this.warnings.push(`${fileName}: Adapter missing targetInterface definition`);
    }

    if (!adapter.transformationLogic) {
      this.warnings.push(`${fileName}: Adapter missing transformationLogic definition`);
    }

    // Check adapter efficiency metrics
    if (adapter.efficiency && parseFloat(adapter.efficiency) < 0.95) {
      this.warnings.push(`${fileName}: Adapter efficiency below 95% threshold`);
    }
  }

  /**
   * Validate ServiceFactory implementation
   */
  validateServiceFactory(service, fileName) {
    // Check for required service factory properties
    if (!service.factoryMethod) {
      this.warnings.push(`${fileName}: Service missing factoryMethod definition`);
    }

    if (!service.instanceManagement) {
      this.warnings.push(`${fileName}: Service missing instanceManagement definition`);
    }

    // Check service creation time metrics
    if (service.creationTime && parseFloat(service.creationTime) > 100) {
      this.warnings.push(`${fileName}: Service creation time exceeds 100ms threshold`);
    }
  }

  /**
   * Validate DMAG layer alignment
   */
  async validateLayerAlignment(schemaDir) {
    const layerFiles = [
      'jdbl.jsonld',  // Directive Orchestration Layer
      'nqds.jsonld',  // Semantic Payload Layer
      'hbs.jsonld',   // Schema Templating Engine Layer
      'mmd.jsonld'    // Visualization Engine Layer
    ];

    for (const layerFile of layerFiles) {
      const filePath = path.join(schemaDir, layerFile);
      if (fs.existsSync(filePath)) {
        await this.validateLayerDMAGCompliance(filePath);
      }
    }
  }

  /**
   * Validate layer DMAG compliance
   */
  async validateLayerDMAGCompliance(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const layer = JSON.parse(content);

      const fileName = path.basename(filePath);

      // Check for DMAG governance principles
      if (layer['@graph']) {
        const hasModularDesign = layer['@graph'].some(item => 
          item.modularDesign || item.modularity
        );
        
        const hasInterfaceDefinition = layer['@graph'].some(item => 
          item.interfaces || item.interface
        );

        const hasDependencyManagement = layer['@graph'].some(item => 
          item.dependencies || item.dependencyManagement
        );

        if (!hasModularDesign) {
          this.warnings.push(`${fileName}: Missing modular design principles`);
        }

        if (!hasInterfaceDefinition) {
          this.warnings.push(`${fileName}: Missing interface definitions`);
        }

        if (!hasDependencyManagement) {
          this.warnings.push(`${fileName}: Missing dependency management`);
        }
      }

    } catch (error) {
      this.errors.push(`${path.basename(filePath)}: Layer DMAG compliance error - ${error.message}`);
    }
  }

  /**
   * Validate DMAG governance principles
   */
  async validateGovernancePrinciples(schemaDir) {
    const principles = [
      'modular-encapsulation',
      'interface-segregation',
      'dependency-inversion',
      'single-responsibility',
      'open-closed-principle'
    ];

    // Check if governance principles are documented
    const files = fs.readdirSync(schemaDir)
      .filter(file => file.endsWith('.jsonld'))
      .map(file => path.join(schemaDir, file));

    let principlesFound = 0;

    for (const file of files) {
      try {
        const content = fs.readFileSync(file, 'utf8');
        const schema = JSON.parse(content);

        if (schema['@graph']) {
          for (const principle of principles) {
            const found = schema['@graph'].some(item => 
              JSON.stringify(item).toLowerCase().includes(principle.replace('-', ''))
            );
            if (found) {
              principlesFound++;
              break;
            }
          }
        }
      } catch (error) {
        // Skip invalid JSON files
      }
    }

    const coveragePercentage = (principlesFound / principles.length) * 100;
    if (coveragePercentage < 80) {
      this.warnings.push(`DMAG governance principles coverage: ${coveragePercentage.toFixed(1)}% (target: ≥80%)`);
    }

    console.log(`✓ DMAG governance principles coverage: ${coveragePercentage.toFixed(1)}%`);
  }

  /**
   * Generate DMAG validation report
   */
  generateReport() {
    console.log('\n📊 DMAG Validation Report');
    console.log('=========================');
    
    if (this.errors.length === 0 && this.warnings.length === 0) {
      console.log('✅ All DMAG validations passed successfully!');
    } else {
      if (this.errors.length > 0) {
        console.log('\n❌ DMAG Errors:');
        this.errors.forEach(error => console.log(`  - ${error}`));
      }
      
      if (this.warnings.length > 0) {
        console.log('\n⚠️  DMAG Warnings:');
        this.warnings.forEach(warning => console.log(`  - ${warning}`));
      }
    }
    
    // Calculate DMAG compliance score
    const totalIssues = this.errors.length + this.warnings.length;
    const complianceScore = Math.max(0, 100 - (this.errors.length * 10) - (this.warnings.length * 2));
    
    console.log(`\n📈 DMAG Compliance Score: ${complianceScore}% (target: ≥95%)`);
    console.log(`Summary: ${this.errors.length} errors, ${this.warnings.length} warnings`);
    
    return this.errors.length === 0 && complianceScore >= 95;
  }

  /**
   * Run all DMAG validations
   */
  async runValidation(schemaDir) {
    console.log('🏗️  Starting DMAG Validation');
    console.log('============================');
    
    try {
      await this.validateDMAGSchema(schemaDir);
      await this.validateLayerAlignment(schemaDir);
      await this.validateGovernancePrinciples(schemaDir);

      // Validate DMAG patterns in all schema files
      const files = fs.readdirSync(schemaDir)
        .filter(file => file.endsWith('.jsonld'))
        .map(file => path.join(schemaDir, file));

      for (const file of files) {
        await this.validateDMAGPatterns(file);
      }

      return this.generateReport();

    } catch (error) {
      console.error('❌ DMAG validation failed:', error.message);
      return false;
    }
  }
}

/**
 * Main DMAG validation function
 */
async function main() {
  const schemaDir = path.join(__dirname, '../schema');
  const validator = new DMAGValidator();
  
  const success = await validator.runValidation(schemaDir);
  process.exit(success ? 0 : 1);
}

// Run if called directly
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { DMAGValidator };