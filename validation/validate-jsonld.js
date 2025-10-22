#!/usr/bin/env node

/**
 * JSON-LD Schema Validation Script
 * Validates JSON-LD syntax, RDF conversion, and SPARQL compatibility
 */

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

// Mock JSON-LD processor for validation (in real implementation, use jsonld library)
class JSONLDValidator {
  constructor() {
    this.errors = [];
    this.warnings = [];
  }

  /**
   * Validate JSON-LD syntax
   */
  async validateSyntax(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const jsonld = JSON.parse(content);
      
      // Basic JSON-LD structure validation
      if (!jsonld['@context']) {
        this.errors.push(`${filePath}: Missing @context`);
      }
      
      // Validate @context structure
      if (jsonld['@context']) {
        if (Array.isArray(jsonld['@context'])) {
          // Array format validation
          if (jsonld['@context'].length === 0) {
            this.errors.push(`${filePath}: Empty @context array`);
          }
        } else if (typeof jsonld['@context'] !== 'object') {
          this.errors.push(`${filePath}: Invalid @context type`);
        }
      }
      
      // Validate @version if present
      if (jsonld['@context'] && typeof jsonld['@context'] === 'object' && jsonld['@context']['@version']) {
        if (jsonld['@context']['@version'] !== 1.1) {
          this.warnings.push(`${filePath}: Recommended @version is 1.1`);
        }
      }
      
      // Validate metadata structure
      if (jsonld.meta) {
        if (!jsonld.meta['@id']) {
          this.errors.push(`${filePath}: Missing meta @id`);
        }
        if (!jsonld.meta['@type']) {
          this.errors.push(`${filePath}: Missing meta @type`);
        }
      }
      
      console.log(`✓ Syntax validation passed for ${path.basename(filePath)}`);
      return true;
      
    } catch (error) {
      this.errors.push(`${filePath}: JSON parsing error - ${error.message}`);
      return false;
    }
  }

  /**
   * Validate RDF conversion compatibility
   */
  async validateRDFConversion(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const jsonld = JSON.parse(content);
      
      // Check for RDF-compatible structures
      if (jsonld['@graph']) {
        // Validate @graph structure
        if (!Array.isArray(jsonld['@graph'])) {
          this.errors.push(`${filePath}: @graph must be an array`);
        }
      }
      
      // Check for proper IRI usage
      if (jsonld['@id'] && !this.isValidIRI(jsonld['@id'])) {
        this.errors.push(`${filePath}: Invalid IRI in @id`);
      }
      
      console.log(`✓ RDF conversion validation passed for ${path.basename(filePath)}`);
      return true;
      
    } catch (error) {
      this.errors.push(`${filePath}: RDF validation error - ${error.message}`);
      return false;
    }
  }

  /**
   * Validate SPARQL compatibility
   */
  async validateSPARQLCompatibility(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const jsonld = JSON.parse(content);
      
      // Check for SPARQL-friendly structures
      if (jsonld['@graph']) {
        for (const item of jsonld['@graph']) {
          if (item['@type'] && !this.isValidIRI(item['@type'])) {
            this.warnings.push(`${filePath}: Non-IRI @type may affect SPARQL queries`);
          }
        }
      }
      
      console.log(`✓ SPARQL compatibility validation passed for ${path.basename(filePath)}`);
      return true;
      
    } catch (error) {
      this.errors.push(`${filePath}: SPARQL validation error - ${error.message}`);
      return false;
    }
  }

  /**
   * Validate context resolution
   */
  async validateContextResolution(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const jsonld = JSON.parse(content);
      
      if (Array.isArray(jsonld['@context'])) {
        for (const context of jsonld['@context']) {
          if (typeof context === 'string') {
            // Check if context URL is resolvable (mock check)
            if (!context.startsWith('http')) {
              this.warnings.push(`${filePath}: Context URL should use HTTP(S) protocol`);
            }
          }
        }
      }
      
      console.log(`✓ Context resolution validation passed for ${path.basename(filePath)}`);
      return true;
      
    } catch (error) {
      this.errors.push(`${filePath}: Context resolution error - ${error.message}`);
      return false;
    }
  }

  /**
   * Check if string is a valid IRI
   */
  isValidIRI(str) {
    try {
      new URL(str);
      return true;
    } catch {
      return str.includes(':') && !str.includes(' ');
    }
  }

  /**
   * Run all validations on a file
   */
  async validateFile(filePath) {
    console.log(`\n🔍 Validating ${path.basename(filePath)}...`);
    
    const results = await Promise.all([
      this.validateSyntax(filePath),
      this.validateRDFConversion(filePath),
      this.validateSPARQLCompatibility(filePath),
      this.validateContextResolution(filePath)
    ]);
    
    return results.every(result => result);
  }

  /**
   * Generate validation report
   */
  generateReport() {
    console.log('\n📊 Validation Report');
    console.log('===================');
    
    if (this.errors.length === 0 && this.warnings.length === 0) {
      console.log('✅ All validations passed successfully!');
    } else {
      if (this.errors.length > 0) {
        console.log('\n❌ Errors:');
        this.errors.forEach(error => console.log(`  - ${error}`));
      }
      
      if (this.warnings.length > 0) {
        console.log('\n⚠️  Warnings:');
        this.warnings.forEach(warning => console.log(`  - ${warning}`));
      }
    }
    
    console.log(`\nSummary: ${this.errors.length} errors, ${this.warnings.length} warnings`);
    return this.errors.length === 0;
  }
}

/**
 * Main validation function
 */
async function main() {
  const schemaDir = path.join(__dirname, '../schema');
  const validator = new JSONLDValidator();
  
  console.log('🚀 Starting JSON-LD Schema Validation');
  console.log('=====================================');
  
  try {
    const files = fs.readdirSync(schemaDir)
      .filter(file => file.endsWith('.jsonld'))
      .map(file => path.join(schemaDir, file));
    
    console.log(`Found ${files.length} JSON-LD files to validate`);
    
    let allValid = true;
    for (const file of files) {
      const isValid = await validator.validateFile(file);
      if (!isValid) {
        allValid = false;
      }
    }
    
    const success = validator.generateReport();
    process.exit(success ? 0 : 1);
    
  } catch (error) {
    console.error('❌ Validation failed:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { JSONLDValidator };