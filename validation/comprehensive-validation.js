#!/usr/bin/env node

/**
 * Comprehensive Schema Validation Pipeline
 * Orchestrates DMAG, FLOW, JJNHM, and semantic web validation
 */

const fs = require('fs');
const path = require('path');
const { JSONLDValidator } = require('./validate-jsonld');
const { DMAGValidator } = require('./validate-dmag');
const { FLOWValidator } = require('./validate-flow');
const { JJNHMValidator } = require('./validate-jjnhm');

class ComprehensiveValidator {
  constructor() {
    this.results = {
      jsonld: { passed: false, score: 0, errors: 0, warnings: 0 },
      dmag: { passed: false, score: 0, errors: 0, warnings: 0 },
      flow: { passed: false, score: 0, errors: 0, warnings: 0 },
      jjnhm: { passed: false, score: 0, errors: 0, warnings: 0 },
      semanticWeb: { passed: false, score: 0, errors: 0, warnings: 0 },
      performance: { passed: false, score: 0, errors: 0, warnings: 0 }
    };
    this.overallScore = 0;
    this.startTime = Date.now();
  }

  /**
   * Run JSON-LD validation
   */
  async runJSONLDValidation(schemaDir) {
    console.log('🔍 Phase 1: JSON-LD Syntax and Structure Validation');
    console.log('===================================================');
    
    try {
      const validator = new JSONLDValidator();
      const files = fs.readdirSync(schemaDir)
        .filter(file => file.endsWith('.jsonld'))
        .map(file => path.join(schemaDir, file));

      let allValid = true;
      for (const file of files) {
        const isValid = await validator.validateFile(file);
        if (!isValid) {
          allValid = false;
        }
      }

      const success = validator.generateReport();
      
      this.results.jsonld = {
        passed: success,
        score: success ? 100 : Math.max(0, 100 - (validator.errors.length * 10) - (validator.warnings.length * 2)),
        errors: validator.errors.length,
        warnings: validator.warnings.length
      };

      return success;

    } catch (error) {
      console.error('❌ JSON-LD validation failed:', error.message);
      this.results.jsonld = { passed: false, score: 0, errors: 1, warnings: 0 };
      return false;
    }
  }

  /**
   * Run DMAG validation
   */
  async runDMAGValidation(schemaDir) {
    console.log('\n🏗️  Phase 2: DMAG Architecture Validation');
    console.log('==========================================');
    
    try {
      const validator = new DMAGValidator();
      const success = await validator.runValidation(schemaDir);
      
      this.results.dmag = {
        passed: success,
        score: Math.max(0, 100 - (validator.errors.length * 10) - (validator.warnings.length * 2)),
        errors: validator.errors.length,
        warnings: validator.warnings.length
      };

      return success;

    } catch (error) {
      console.error('❌ DMAG validation failed:', error.message);
      this.results.dmag = { passed: false, score: 0, errors: 1, warnings: 0 };
      return false;
    }
  }

  /**
   * Run FLOW validation
   */
  async runFLOWValidation(schemaDir) {
    console.log('\n🌊 Phase 3: FLOW Governance Validation');
    console.log('======================================');
    
    try {
      const validator = new FLOWValidator();
      const success = await validator.runValidation(schemaDir);
      
      this.results.flow = {
        passed: success,
        score: Math.max(0, 100 - (validator.errors.length * 10) - (validator.warnings.length * 2)),
        errors: validator.errors.length,
        warnings: validator.warnings.length
      };

      return success;

    } catch (error) {
      console.error('❌ FLOW validation failed:', error.message);
      this.results.flow = { passed: false, score: 0, errors: 1, warnings: 0 };
      return false;
    }
  }

  /**
   * Run JJNHM integration validation
   */
  async runJJNHMValidation(schemaDir) {
    console.log('\n🔗 Phase 4: JJNHM Integration Validation');
    console.log('========================================');
    
    try {
      const validator = new JJNHMValidator();
      const success = await validator.runValidation(schemaDir);
      
      this.results.jjnhm = {
        passed: success,
        score: Math.max(0, 100 - (validator.errors.length * 10) - (validator.warnings.length * 2)),
        errors: validator.errors.length,
        warnings: validator.warnings.length
      };

      return success;

    } catch (error) {
      console.error('❌ JJNHM validation failed:', error.message);
      this.results.jjnhm = { passed: false, score: 0, errors: 1, warnings: 0 };
      return false;
    }
  }

  /**
   * Run semantic web compatibility validation
   */
  async runSemanticWebValidation(schemaDir) {
    console.log('\n🕸️  Phase 5: Semantic Web Compatibility Validation');
    console.log('==================================================');
    
    try {
      let errors = 0;
      let warnings = 0;

      const files = fs.readdirSync(schemaDir)
        .filter(file => file.endsWith('.jsonld'))
        .map(file => path.join(schemaDir, file));

      for (const file of files) {
        const content = fs.readFileSync(file, 'utf8');
        const schema = JSON.parse(content);

        // Check for RDF/SPARQL readiness
        if (!schema['@context']) {
          errors++;
          console.log(`❌ ${path.basename(file)}: Missing @context for RDF conversion`);
        }

        // Check for semantic web vocabularies
        const hasSemanticVocabs = JSON.stringify(schema['@context']).includes('schema.org') ||
                                  JSON.stringify(schema['@context']).includes('w3.org') ||
                                  JSON.stringify(schema['@context']).includes('dublin');
        
        if (!hasSemanticVocabs) {
          warnings++;
          console.log(`⚠️  ${path.basename(file)}: Missing semantic web vocabulary references`);
        }

        // Check for proper IRI usage
        if (schema['@graph']) {
          for (const item of schema['@graph']) {
            if (item['@id'] && !this.isValidIRI(item['@id'])) {
              warnings++;
              console.log(`⚠️  ${path.basename(file)}: Invalid IRI format in @id`);
            }
          }
        }
      }

      const success = errors === 0;
      const score = Math.max(0, 100 - (errors * 10) - (warnings * 2));

      this.results.semanticWeb = {
        passed: success,
        score: score,
        errors: errors,
        warnings: warnings
      };

      if (success) {
        console.log('✅ Semantic web compatibility validation passed');
      }

      return success;

    } catch (error) {
      console.error('❌ Semantic web validation failed:', error.message);
      this.results.semanticWeb = { passed: false, score: 0, errors: 1, warnings: 0 };
      return false;
    }
  }

  /**
   * Run performance optimization validation
   */
  async runPerformanceValidation(schemaDir) {
    console.log('\n⚡ Phase 6: Performance Optimization Validation');
    console.log('===============================================');
    
    try {
      let errors = 0;
      let warnings = 0;

      const files = fs.readdirSync(schemaDir)
        .filter(file => file.endsWith('.jsonld'))
        .map(file => path.join(schemaDir, file));

      let totalSize = 0;
      let totalFiles = files.length;

      for (const file of files) {
        const stats = fs.statSync(file);
        const fileSizeKB = stats.size / 1024;
        totalSize += fileSizeKB;

        // Check file size optimization
        if (fileSizeKB > 100) {
          warnings++;
          console.log(`⚠️  ${path.basename(file)}: Large file size ${fileSizeKB.toFixed(1)}KB (target: <100KB)`);
        }

        // Check for optimization patterns
        const content = fs.readFileSync(file, 'utf8');
        const schema = JSON.parse(content);

        // Check for redundant data
        const jsonString = JSON.stringify(schema);
        const compressedSize = JSON.stringify(schema, null, 0).length;
        const originalSize = jsonString.length;
        const compressionRatio = compressedSize / originalSize;

        if (compressionRatio > 0.8) {
          warnings++;
          console.log(`⚠️  ${path.basename(file)}: Low compression ratio ${(compressionRatio * 100).toFixed(1)}%`);
        }
      }

      // Calculate average file size
      const avgFileSize = totalSize / totalFiles;
      if (avgFileSize > 50) {
        warnings++;
        console.log(`⚠️  Average file size ${avgFileSize.toFixed(1)}KB exceeds target (50KB)`);
      }

      const success = errors === 0 && warnings < 5;
      const score = Math.max(0, 100 - (errors * 10) - (warnings * 2));

      this.results.performance = {
        passed: success,
        score: score,
        errors: errors,
        warnings: warnings
      };

      console.log(`✓ Performance metrics: ${totalFiles} files, ${totalSize.toFixed(1)}KB total, ${avgFileSize.toFixed(1)}KB average`);

      return success;

    } catch (error) {
      console.error('❌ Performance validation failed:', error.message);
      this.results.performance = { passed: false, score: 0, errors: 1, warnings: 0 };
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
   * Calculate overall validation score
   */
  calculateOverallScore() {
    const weights = {
      jsonld: 0.20,    // 20% - Foundation
      dmag: 0.20,      // 20% - Architecture
      flow: 0.20,      // 20% - Flow Governance
      jjnhm: 0.25,     // 25% - Integration
      semanticWeb: 0.10, // 10% - Semantic Web
      performance: 0.05  // 5% - Performance
    };

    let weightedScore = 0;
    for (const [category, weight] of Object.entries(weights)) {
      weightedScore += this.results[category].score * weight;
    }

    this.overallScore = Math.round(weightedScore);
    return this.overallScore;
  }

  /**
   * Generate comprehensive validation report
   */
  generateComprehensiveReport() {
    const endTime = Date.now();
    const duration = (endTime - this.startTime) / 1000;

    console.log('\n🎯 COMPREHENSIVE VALIDATION REPORT');
    console.log('==================================');
    
    console.log('\n📊 Validation Results by Category:');
    console.log('-----------------------------------');
    
    for (const [category, result] of Object.entries(this.results)) {
      const status = result.passed ? '✅ PASS' : '❌ FAIL';
      const categoryName = category.toUpperCase().replace(/([A-Z])/g, ' $1').trim();
      console.log(`${status} ${categoryName}: ${result.score}% (${result.errors} errors, ${result.warnings} warnings)`);
    }

    this.calculateOverallScore();

    console.log('\n🏆 Overall Assessment:');
    console.log('----------------------');
    console.log(`Overall Score: ${this.overallScore}%`);
    console.log(`Validation Duration: ${duration.toFixed(2)}s`);
    
    // Quality gates
    const qualityGates = {
      'Excellent': this.overallScore >= 95,
      'Good': this.overallScore >= 85,
      'Acceptable': this.overallScore >= 75,
      'Needs Improvement': this.overallScore >= 60,
      'Critical Issues': this.overallScore < 60
    };

    let qualityLevel = 'Critical Issues';
    for (const [level, condition] of Object.entries(qualityGates)) {
      if (condition) {
        qualityLevel = level;
        break;
      }
    }

    console.log(`Quality Level: ${qualityLevel}`);

    // Recommendations
    console.log('\n💡 Recommendations:');
    console.log('-------------------');
    
    if (this.results.jsonld.score < 90) {
      console.log('• Improve JSON-LD syntax and structure compliance');
    }
    if (this.results.dmag.score < 95) {
      console.log('• Enhance DMAG architecture pattern implementation');
    }
    if (this.results.flow.score < 93) {
      console.log('• Strengthen FLOW governance pattern coverage');
    }
    if (this.results.jjnhm.score < 96) {
      console.log('• Improve JJNHM layer integration and compliance');
    }
    if (this.results.semanticWeb.score < 97) {
      console.log('• Enhance semantic web compatibility and RDF readiness');
    }
    if (this.results.performance.score < 90) {
      console.log('• Optimize schema performance and file sizes');
    }

    if (this.overallScore >= 95) {
      console.log('🎉 Excellent! Schema system meets all quality standards.');
    } else if (this.overallScore >= 85) {
      console.log('👍 Good quality with minor improvements needed.');
    } else {
      console.log('⚠️  Significant improvements required before deployment.');
    }

    // Return success if overall score meets minimum threshold
    return this.overallScore >= 85;
  }

  /**
   * Run comprehensive validation pipeline
   */
  async runComprehensiveValidation(schemaDir) {
    console.log('🚀 COMPREHENSIVE SCHEMA VALIDATION PIPELINE');
    console.log('===========================================');
    console.log(`Schema Directory: ${schemaDir}`);
    console.log(`Start Time: ${new Date().toISOString()}\n`);

    try {
      // Run all validation phases
      await this.runJSONLDValidation(schemaDir);
      await this.runDMAGValidation(schemaDir);
      await this.runFLOWValidation(schemaDir);
      await this.runJJNHMValidation(schemaDir);
      await this.runSemanticWebValidation(schemaDir);
      await this.runPerformanceValidation(schemaDir);

      // Generate comprehensive report
      const success = this.generateComprehensiveReport();
      
      return success;

    } catch (error) {
      console.error('❌ Comprehensive validation pipeline failed:', error.message);
      return false;
    }
  }
}

/**
 * Main comprehensive validation function
 */
async function main() {
  const schemaDir = path.join(__dirname, '../schema');
  const validator = new ComprehensiveValidator();
  
  const success = await validator.runComprehensiveValidation(schemaDir);
  process.exit(success ? 0 : 1);
}

// Run if called directly
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { ComprehensiveValidator };