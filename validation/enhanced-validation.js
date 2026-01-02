#!/usr/bin/env node

/**
 * Enhanced JJNHM Schema Validation with DMAG & FLOW Governance
 * Version: 2.4.0
 * 
 * Comprehensive validation pipeline for:
 * - JJNHM layer compliance
 * - DMAG distributed modular architecture governance
 * - FLOW universal flow patterns
 * - JSON-LD semantic web compatibility
 * - Performance optimization metrics
 */

const fs = require('fs');
const path = require('path');
const jsonld = require('jsonld');

class EnhancedJJNHMValidator {
  constructor(schemaDir = 'schema') {
    this.schemaDir = schemaDir;
    this.validationResults = {
      jjnhmCompliance: { score: 0, errors: [], warnings: [] },
      dmagGovernance: { score: 0, errors: [], warnings: [] },
      flowPatterns: { score: 0, errors: [], warnings: [] },
      semanticWeb: { score: 0, errors: [], warnings: [] },
      performance: { score: 0, errors: [], warnings: [] },
      overall: { score: 0, status: 'unknown' }
    };
    
    // JJNHM v3.0.0 compliance requirements
    this.jjnhmRequirements = {
      layers: ['JSONLD', 'JDBL', 'NQDS', 'HBS', 'MMD'],
      metadataFields: ['title', 'description', 'versionInfo', 'license', 'creator'],
      governanceIntegration: ['dmag', 'flow', 'enhancedValidation']
    };
    
    // DMAG architecture patterns
    this.dmagPatterns = [
      'ModulePattern', 'AdapterPattern', 'ServiceFactory',
      'ActorInstance', 'ResiliencePrimitive', 'CoordinationPattern'
    ];
    
    // FLOW governance patterns
    this.flowPatterns = [
      'DataFlowPattern', 'ControlFlowPattern', 'StateFlowPattern',
      'ErrorFlowPattern', 'EventFlowPattern', 'ResourceFlowPattern',
      'TokenFlowPattern', 'StreamingPattern', 'PipelinePattern', 'OrchestrationPattern'
    ];
  }

  async validateAll() {
    console.log('🚀 Starting Enhanced JJNHM Validation v3.0.0...\n');
    
    try {
      // Get all JSON-LD files
      const schemaFiles = this.getSchemaFiles();
      console.log(`📁 Found ${schemaFiles.length} schema files to validate\n`);
      
      // Run validation phases
      await this.validateJJNHMCompliance(schemaFiles);
      await this.validateDMAGGovernance(schemaFiles);
      await this.validateFLOWPatterns(schemaFiles);
      await this.validateSemanticWebCompatibility(schemaFiles);
      await this.validatePerformanceOptimization(schemaFiles);
      
      // Calculate overall score
      this.calculateOverallScore();
      
      // Generate report
      this.generateValidationReport();
      
      return this.validationResults;
      
    } catch (error) {
      console.error('❌ Validation failed:', error.message);
      process.exit(1);
    }
  }

  getSchemaFiles() {
    const files = fs.readdirSync(this.schemaDir)
      .filter(file => file.endsWith('.jsonld'))
      .map(file => path.join(this.schemaDir, file));
    
    if (files.length === 0) {
      throw new Error(`No JSON-LD files found in ${this.schemaDir}`);
    }
    
    return files;
  }

  async validateJJNHMCompliance(schemaFiles) {
    console.log('🏗️ Validating JJNHM v3.0.0 Compliance...');
    
    let totalChecks = 0;
    let passedChecks = 0;
    
    for (const file of schemaFiles) {
      try {
        const schema = JSON.parse(fs.readFileSync(file, 'utf8'));
        const filename = path.basename(file);
        
        // Check required metadata structure
        totalChecks++;
        if (schema.meta) {
          passedChecks++;
          console.log(`  ✅ ${filename}: Meta section found`);
        } else {
          this.validationResults.jjnhmCompliance.errors.push(`${filename}: Missing meta section`);
          console.log(`  ❌ ${filename}: Missing meta section`);
        }
        
        // Check @context
        totalChecks++;
        if (schema['@context']) {
          passedChecks++;
          console.log(`  ✅ ${filename}: @context found`);
        } else {
          this.validationResults.jjnhmCompliance.errors.push(`${filename}: Missing @context`);
          console.log(`  ❌ ${filename}: Missing @context`);
        }
        
        // Check governance integration (for jjnhm.jsonld)
        if (filename === 'jjnhm.jsonld') {
          totalChecks++;
          if (schema.governanceIntegration) {
            passedChecks++;
            console.log(`  ✅ ${filename}: Governance integration found`);
            
            // Check DMAG integration
            totalChecks++;
            if (schema.governanceIntegration.dmag) {
              passedChecks++;
              console.log(`  ✅ ${filename}: DMAG integration found`);
            } else {
              this.validationResults.jjnhmCompliance.errors.push(`${filename}: Missing DMAG integration`);
              console.log(`  ❌ ${filename}: Missing DMAG integration`);
            }
            
            // Check FLOW integration
            totalChecks++;
            if (schema.governanceIntegration.flow) {
              passedChecks++;
              console.log(`  ✅ ${filename}: FLOW integration found`);
            } else {
              this.validationResults.jjnhmCompliance.errors.push(`${filename}: Missing FLOW integration`);
              console.log(`  ❌ ${filename}: Missing FLOW integration`);
            }
          } else {
            this.validationResults.jjnhmCompliance.errors.push(`${filename}: Missing governance integration`);
            console.log(`  ❌ ${filename}: Missing governance integration`);
          }
        }
        
        // Check required metadata fields
        if (schema.meta) {
          for (const field of this.jjnhmRequirements.metadataFields) {
            totalChecks++;
            if (schema.meta[field]) {
              passedChecks++;
              console.log(`  ✅ ${filename}: Meta field '${field}' found`);
            } else {
              this.validationResults.jjnhmCompliance.errors.push(`${filename}: Missing meta field '${field}'`);
              console.log(`  ❌ ${filename}: Missing meta field '${field}'`);
            }
          }
        }
        
      } catch (error) {
        this.validationResults.jjnhmCompliance.errors.push(`${path.basename(file)}: JSON parsing error - ${error.message}`);
        console.log(`  ❌ ${path.basename(file)}: JSON parsing error`);
      }
    }
    
    this.validationResults.jjnhmCompliance.score = Math.round((passedChecks / totalChecks) * 100);
    console.log(`📊 JJNHM Compliance Score: ${this.validationResults.jjnhmCompliance.score}%\n`);
  }

  async validateDMAGGovernance(schemaFiles) {
    console.log('🏗️ Validating DMAG Distributed Modular Architecture Governance...');
    
    const dmagFile = schemaFiles.find(file => path.basename(file) === 'dmag.jsonld');
    
    if (!dmagFile) {
      this.validationResults.dmagGovernance.errors.push('dmag.jsonld schema file not found');
      console.log('  ❌ dmag.jsonld schema file not found');
      this.validationResults.dmagGovernance.score = 0;
      return;
    }
    
    try {
      const dmagSchema = JSON.parse(fs.readFileSync(dmagFile, 'utf8'));
      let totalChecks = 0;
      let passedChecks = 0;
      
      // Check DMAG patterns
      for (const pattern of this.dmagPatterns) {
        totalChecks++;
        const patternFound = dmagSchema['@graph'] && 
          dmagSchema['@graph'].some(item => item['@id'] && item['@id'].includes(pattern));
        
        if (patternFound) {
          passedChecks++;
          console.log(`  ✅ DMAG pattern found: ${pattern}`);
        } else {
          this.validationResults.dmagGovernance.errors.push(`Missing DMAG pattern: ${pattern}`);
          console.log(`  ❌ Missing DMAG pattern: ${pattern}`);
        }
      }
      
      // Check DMAG KPI targets
      const dmagKPIs = ['module-cohesion', 'adapter-efficiency', 'service-creation-time', 
                       'actor-concurrency-efficiency', 'resilience-recovery-time', 'coordination-latency'];
      
      const governanceMetrics = dmagSchema['@graph'] && 
        dmagSchema['@graph'].find(item => item['@id'] === 'dmag:GovernanceMetrics');
      
      // Check if KPI targets exist in jjnhm section
      if (dmagSchema.jjnhm && dmagSchema.jjnhm['kpi-targets']) {
        for (const kpi of dmagKPIs) {
          totalChecks++;
          if (dmagSchema.jjnhm['kpi-targets'][kpi]) {
            passedChecks++;
            console.log(`  ✅ DMAG KPI target found: ${kpi}`);
          } else {
            this.validationResults.dmagGovernance.errors.push(`Missing DMAG KPI target: ${kpi}`);
            console.log(`  ❌ Missing DMAG KPI target: ${kpi}`);
          }
        }
      } else if (governanceMetrics && governanceMetrics['dmag:metrics']) {
        // Alternative check for metrics in governance section
        for (const kpi of dmagKPIs) {
          totalChecks++;
          const metricFound = governanceMetrics['dmag:metrics'].some(metric => 
            metric['dmag:name'] && metric['dmag:name'].toLowerCase().includes(kpi.replace('-', ' ')));
          if (metricFound) {
            passedChecks++;
            console.log(`  ✅ DMAG KPI metric found: ${kpi}`);
          } else {
            this.validationResults.dmagGovernance.errors.push(`Missing DMAG KPI metric: ${kpi}`);
            console.log(`  ❌ Missing DMAG KPI metric: ${kpi}`);
          }
        }
      } else {
        this.validationResults.dmagGovernance.errors.push('DMAG governance metrics not found');
        console.log('  ❌ DMAG governance metrics not found');
      }
      
      this.validationResults.dmagGovernance.score = Math.round((passedChecks / totalChecks) * 100);
      
    } catch (error) {
      this.validationResults.dmagGovernance.errors.push(`DMAG schema parsing error: ${error.message}`);
      console.log(`  ❌ DMAG schema parsing error: ${error.message}`);
      this.validationResults.dmagGovernance.score = 0;
    }
    
    console.log(`📊 DMAG Governance Score: ${this.validationResults.dmagGovernance.score}%\n`);
  }

  async validateFLOWPatterns(schemaFiles) {
    console.log('🌊 Validating FLOW Universal Flow Governance...');
    
    const flowFile = schemaFiles.find(file => path.basename(file) === 'flow.jsonld');
    
    if (!flowFile) {
      this.validationResults.flowPatterns.errors.push('flow.jsonld schema file not found');
      console.log('  ❌ flow.jsonld schema file not found');
      this.validationResults.flowPatterns.score = 0;
      return;
    }
    
    try {
      const flowSchema = JSON.parse(fs.readFileSync(flowFile, 'utf8'));
      let totalChecks = 0;
      let passedChecks = 0;
      
      // Check FLOW patterns
      for (const pattern of this.flowPatterns) {
        totalChecks++;
        const patternFound = flowSchema['@graph'] && 
          flowSchema['@graph'].some(item => item['@id'] && item['@id'].includes(pattern));
        
        if (patternFound) {
          passedChecks++;
          console.log(`  ✅ FLOW pattern found: ${pattern}`);
        } else {
          this.validationResults.flowPatterns.errors.push(`Missing FLOW pattern: ${pattern}`);
          console.log(`  ❌ Missing FLOW pattern: ${pattern}`);
        }
      }
      
      // Check FLOW KPI targets
      const flowKPIs = ['data-flow-efficiency', 'control-flow-latency', 'state-transition-reliability',
                       'error-recovery-success-rate', 'event-processing-throughput', 'resource-utilization-efficiency',
                       'token-density', 'streaming-throughput', 'pipeline-efficiency', 'orchestration-success-rate'];
      
      const flowGovernanceMetrics = flowSchema['@graph'] && 
        flowSchema['@graph'].find(item => item['@id'] === 'flow:FlowGovernanceMetrics');
      
      // Check if KPI targets exist in jjnhm section
      if (flowSchema.jjnhm && flowSchema.jjnhm['kpi-targets']) {
        for (const kpi of flowKPIs) {
          totalChecks++;
          if (flowSchema.jjnhm['kpi-targets'][kpi]) {
            passedChecks++;
            console.log(`  ✅ FLOW KPI target found: ${kpi}`);
          } else {
            this.validationResults.flowPatterns.errors.push(`Missing FLOW KPI target: ${kpi}`);
            console.log(`  ❌ Missing FLOW KPI target: ${kpi}`);
          }
        }
      } else if (flowGovernanceMetrics && flowGovernanceMetrics['flow:metrics']) {
        // Alternative check for metrics in governance section
        for (const kpi of flowKPIs) {
          totalChecks++;
          const metricFound = flowGovernanceMetrics['flow:metrics'].some(metric => 
            metric['flow:name'] && metric['flow:name'].toLowerCase().includes(kpi.replace('-', ' ')));
          if (metricFound) {
            passedChecks++;
            console.log(`  ✅ FLOW KPI metric found: ${kpi}`);
          } else {
            this.validationResults.flowPatterns.errors.push(`Missing FLOW KPI metric: ${kpi}`);
            console.log(`  ❌ Missing FLOW KPI metric: ${kpi}`);
          }
        }
      } else {
        this.validationResults.flowPatterns.errors.push('FLOW KPI targets not found');
        console.log('  ❌ FLOW KPI targets not found');
      }
      
      this.validationResults.flowPatterns.score = Math.round((passedChecks / totalChecks) * 100);
      
    } catch (error) {
      this.validationResults.flowPatterns.errors.push(`FLOW schema parsing error: ${error.message}`);
      console.log(`  ❌ FLOW schema parsing error: ${error.message}`);
      this.validationResults.flowPatterns.score = 0;
    }
    
    console.log(`📊 FLOW Patterns Score: ${this.validationResults.flowPatterns.score}%\n`);
  }

  async validateSemanticWebCompatibility(schemaFiles) {
    console.log('🕸️ Validating Semantic Web Compatibility...');
    
    let totalChecks = 0;
    let passedChecks = 0;
    
    for (const file of schemaFiles) {
      try {
        const schema = JSON.parse(fs.readFileSync(file, 'utf8'));
        const filename = path.basename(file);
        
        // Test JSON-LD expansion
        totalChecks++;
        try {
          await jsonld.expand(schema);
          passedChecks++;
          console.log(`  ✅ ${filename}: JSON-LD expansion successful`);
        } catch (error) {
          this.validationResults.semanticWeb.errors.push(`${filename}: JSON-LD expansion failed - ${error.message}`);
          console.log(`  ❌ ${filename}: JSON-LD expansion failed`);
        }
        
        // Test RDF conversion
        totalChecks++;
        try {
          await jsonld.toRDF(schema, { format: 'application/n-quads' });
          passedChecks++;
          console.log(`  ✅ ${filename}: RDF conversion successful`);
        } catch (error) {
          this.validationResults.semanticWeb.errors.push(`${filename}: RDF conversion failed - ${error.message}`);
          console.log(`  ❌ ${filename}: RDF conversion failed`);
        }
        
      } catch (error) {
        this.validationResults.semanticWeb.errors.push(`${path.basename(file)}: Schema parsing error - ${error.message}`);
        console.log(`  ❌ ${path.basename(file)}: Schema parsing error`);
      }
    }
    
    this.validationResults.semanticWeb.score = Math.round((passedChecks / totalChecks) * 100);
    console.log(`📊 Semantic Web Compatibility Score: ${this.validationResults.semanticWeb.score}%\n`);
  }

  async validatePerformanceOptimization(schemaFiles) {
    console.log('⚡ Validating Performance Optimization...');
    
    let totalSize = 0;
    let totalFiles = 0;
    let compressionWarnings = 0;
    
    for (const file of schemaFiles) {
      try {
        const stats = fs.statSync(file);
        const filename = path.basename(file);
        
        totalSize += stats.size;
        totalFiles++;
        
        // Check file size (warn if > 100KB)
        if (stats.size > 100 * 1024) {
          compressionWarnings++;
          this.validationResults.performance.warnings.push(`${filename}: Large file size (${Math.round(stats.size / 1024)}KB)`);
          console.log(`  ⚠️ ${filename}: Large file size (${Math.round(stats.size / 1024)}KB)`);
        } else {
          console.log(`  ✅ ${filename}: Optimal file size (${Math.round(stats.size / 1024)}KB)`);
        }
        
        // Check for token density optimization hints
        const content = fs.readFileSync(file, 'utf8');
        const schema = JSON.parse(content);
        
        if (schema.jjnhm && schema.jjnhm.kpiTargets && schema.jjnhm.kpiTargets.tokenDensity) {
          console.log(`  ✅ ${filename}: Token density target specified`);
        } else if (filename === 'jjnhm.jsonld' || filename === 'flow.jsonld') {
          this.validationResults.performance.warnings.push(`${filename}: Consider adding token density targets`);
          console.log(`  ⚠️ ${filename}: Consider adding token density targets`);
        }
        
      } catch (error) {
        this.validationResults.performance.errors.push(`${path.basename(file)}: Performance check error - ${error.message}`);
        console.log(`  ❌ ${path.basename(file)}: Performance check error`);
      }
    }
    
    const avgFileSize = totalSize / totalFiles;
    const performanceScore = Math.max(0, 100 - (compressionWarnings * 20) - (avgFileSize > 50000 ? 20 : 0));
    
    this.validationResults.performance.score = Math.round(performanceScore);
    console.log(`📊 Performance Optimization Score: ${this.validationResults.performance.score}%`);
    console.log(`📁 Total schema size: ${Math.round(totalSize / 1024)}KB across ${totalFiles} files\n`);
  }

  calculateOverallScore() {
    const scores = [
      this.validationResults.jjnhmCompliance.score,
      this.validationResults.dmagGovernance.score,
      this.validationResults.flowPatterns.score,
      this.validationResults.semanticWeb.score,
      this.validationResults.performance.score
    ];
    
    this.validationResults.overall.score = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
    
    if (this.validationResults.overall.score >= 80) {
      this.validationResults.overall.status = 'success';
    } else if (this.validationResults.overall.score >= 60) {
      this.validationResults.overall.status = 'warning';
    } else {
      this.validationResults.overall.status = 'failure';
    }
  }

  generateValidationReport() {
    console.log('📋 Enhanced JJNHM Validation Report v3.0.0');
    console.log('=' .repeat(50));
    console.log(`🏗️ JJNHM Compliance: ${this.validationResults.jjnhmCompliance.score}%`);
    console.log(`🏛️ DMAG Governance: ${this.validationResults.dmagGovernance.score}%`);
    console.log(`🌊 FLOW Patterns: ${this.validationResults.flowPatterns.score}%`);
    console.log(`🕸️ Semantic Web: ${this.validationResults.semanticWeb.score}%`);
    console.log(`⚡ Performance: ${this.validationResults.performance.score}%`);
    console.log('-'.repeat(50));
    console.log(`📊 Overall Score: ${this.validationResults.overall.score}% (${this.validationResults.overall.status.toUpperCase()})`);
    
    // Count total errors and warnings
    const totalErrors = Object.values(this.validationResults)
      .filter(result => result.errors)
      .reduce((total, result) => total + result.errors.length, 0);
    
    const totalWarnings = Object.values(this.validationResults)
      .filter(result => result.warnings)
      .reduce((total, result) => total + result.warnings.length, 0);
    
    console.log(`❌ Total Errors: ${totalErrors}`);
    console.log(`⚠️ Total Warnings: ${totalWarnings}`);
    
    if (totalErrors > 0) {
      console.log('\n❌ Errors Found:');
      Object.entries(this.validationResults).forEach(([category, result]) => {
        if (result.errors && result.errors.length > 0) {
          console.log(`  ${category}:`);
          result.errors.forEach(error => console.log(`    - ${error}`));
        }
      });
    }
    
    if (totalWarnings > 0) {
      console.log('\n⚠️ Warnings Found:');
      Object.entries(this.validationResults).forEach(([category, result]) => {
        if (result.warnings && result.warnings.length > 0) {
          console.log(`  ${category}:`);
          result.warnings.forEach(warning => console.log(`    - ${warning}`));
        }
      });
    }
    
    console.log('\n' + '='.repeat(50));
    
    // Exit with appropriate code
    if (this.validationResults.overall.status === 'failure') {
      console.log('❌ Validation FAILED - Please fix errors before publishing');
      process.exit(1);
    } else if (this.validationResults.overall.status === 'warning') {
      console.log('⚠️ Validation PASSED with warnings - Consider addressing warnings');
      process.exit(0);
    } else {
      console.log('✅ Validation PASSED - Ready for publishing');
      process.exit(0);
    }
  }
}

// Run validation if called directly
if (require.main === module) {
  const schemaDir = process.argv[2] || 'schema';
  const validator = new EnhancedJJNHMValidator(schemaDir);
  validator.validateAll().catch(error => {
    console.error('❌ Validation failed:', error);
    process.exit(1);
  });
}

module.exports = EnhancedJJNHMValidator;