#!/usr/bin/env node

/**
 * FLOW (Universal Flow Governance) Validation Script
 * Validates flow taxonomy, orchestration agents, and KPI targets
 */

const fs = require('fs');
const path = require('path');

class FLOWValidator {
  constructor() {
    this.errors = [];
    this.warnings = [];
    this.flowPatterns = [
      'DataFlowPattern',
      'ControlFlowPattern',
      'StateFlowPattern',
      'ErrorFlowPattern',
      'EventFlowPattern',
      'ResourceFlowPattern',
      'TokenFlowPattern',
      'StreamingPattern',
      'PipelinePattern',
      'OrchestrationPattern'
    ];
    this.kpiTargets = {
      'data-flow-efficiency': 92,
      'control-flow-latency': 200,
      'state-transition-reliability': 99.5,
      'event-processing-throughput': 1000,
      'resource-utilization-efficiency': 88,
      'token-density': 6.5,
      'streaming-throughput': 10,
      'pipeline-efficiency': 90,
      'orchestration-success-rate': 98
    };
  }

  /**
   * Validate FLOW schema existence and structure
   */
  async validateFLOWSchema(schemaDir) {
    const flowPath = path.join(schemaDir, 'flow.jsonld');
    
    if (!fs.existsSync(flowPath)) {
      this.errors.push('Missing flow.jsonld schema file');
      return false;
    }

    try {
      const content = fs.readFileSync(flowPath, 'utf8');
      const flow = JSON.parse(content);

      // Validate FLOW schema structure
      if (!flow['@context']) {
        this.errors.push('flow.jsonld: Missing @context');
      }

      if (!flow['@graph']) {
        this.errors.push('flow.jsonld: Missing @graph');
      }

      // Validate FLOW patterns in @graph
      if (flow['@graph']) {
        const patterns = flow['@graph'].filter(item => 
          item['@type'] && (item['@type'].includes('Flow') || item['@type'].includes('Pattern'))
        );

        for (const pattern of this.flowPatterns) {
          const found = patterns.some(p => 
            p['@id'] && p['@id'].includes(pattern)
          );
          if (!found) {
            this.warnings.push(`flow.jsonld: Missing ${pattern} definition`);
          }
        }

        // Validate orchestration agents
        const agents = flow['@graph'].filter(item => 
          item['@type'] && item['@type'].includes('Agent')
        );

        if (agents.length === 0) {
          this.warnings.push('flow.jsonld: Missing orchestration agent definitions');
        }
      }

      console.log('✓ FLOW schema validation passed');
      return true;

    } catch (error) {
      this.errors.push(`flow.jsonld: JSON parsing error - ${error.message}`);
      return false;
    }
  }

  /**
   * Validate FLOW pattern implementations in schema files
   */
  async validateFLOWPatterns(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const schema = JSON.parse(content);

      // Check for FLOW pattern usage
      if (schema['@graph']) {
        for (const item of schema['@graph']) {
          // Validate DataFlowPattern implementation
          if (item['@type'] && item['@type'].includes('DataFlow')) {
            this.validateDataFlowPattern(item, path.basename(filePath));
          }

          // Validate ControlFlowPattern implementation
          if (item['@type'] && item['@type'].includes('ControlFlow')) {
            this.validateControlFlowPattern(item, path.basename(filePath));
          }

          // Validate StateFlowPattern implementation
          if (item['@type'] && item['@type'].includes('StateFlow')) {
            this.validateStateFlowPattern(item, path.basename(filePath));
          }

          // Validate EventFlowPattern implementation
          if (item['@type'] && item['@type'].includes('EventFlow')) {
            this.validateEventFlowPattern(item, path.basename(filePath));
          }

          // Validate TokenFlowPattern implementation
          if (item['@type'] && item['@type'].includes('TokenFlow')) {
            this.validateTokenFlowPattern(item, path.basename(filePath));
          }
        }
      }

      return true;

    } catch (error) {
      this.errors.push(`${path.basename(filePath)}: FLOW pattern validation error - ${error.message}`);
      return false;
    }
  }

  /**
   * Validate DataFlowPattern implementation
   */
  validateDataFlowPattern(dataFlow, fileName) {
    // Check for required data flow properties
    if (!dataFlow.source) {
      this.warnings.push(`${fileName}: DataFlow missing source definition`);
    }

    if (!dataFlow.target) {
      this.warnings.push(`${fileName}: DataFlow missing target definition`);
    }

    if (!dataFlow.transformation) {
      this.warnings.push(`${fileName}: DataFlow missing transformation definition`);
    }

    // Check data flow efficiency metrics
    if (dataFlow.efficiency && parseFloat(dataFlow.efficiency) < this.kpiTargets['data-flow-efficiency']) {
      this.warnings.push(`${fileName}: DataFlow efficiency below ${this.kpiTargets['data-flow-efficiency']}% threshold`);
    }
  }

  /**
   * Validate ControlFlowPattern implementation
   */
  validateControlFlowPattern(controlFlow, fileName) {
    // Check for required control flow properties
    if (!controlFlow.conditions) {
      this.warnings.push(`${fileName}: ControlFlow missing conditions definition`);
    }

    if (!controlFlow.branches) {
      this.warnings.push(`${fileName}: ControlFlow missing branches definition`);
    }

    // Check control flow latency metrics
    if (controlFlow.latency && parseFloat(controlFlow.latency) > this.kpiTargets['control-flow-latency']) {
      this.warnings.push(`${fileName}: ControlFlow latency exceeds ${this.kpiTargets['control-flow-latency']}ms threshold`);
    }
  }

  /**
   * Validate StateFlowPattern implementation
   */
  validateStateFlowPattern(stateFlow, fileName) {
    // Check for required state flow properties
    if (!stateFlow.states) {
      this.warnings.push(`${fileName}: StateFlow missing states definition`);
    }

    if (!stateFlow.transitions) {
      this.warnings.push(`${fileName}: StateFlow missing transitions definition`);
    }

    // Check state transition reliability metrics
    if (stateFlow.reliability && parseFloat(stateFlow.reliability) < this.kpiTargets['state-transition-reliability']) {
      this.warnings.push(`${fileName}: StateFlow reliability below ${this.kpiTargets['state-transition-reliability']}% threshold`);
    }
  }

  /**
   * Validate EventFlowPattern implementation
   */
  validateEventFlowPattern(eventFlow, fileName) {
    // Check for required event flow properties
    if (!eventFlow.publishers) {
      this.warnings.push(`${fileName}: EventFlow missing publishers definition`);
    }

    if (!eventFlow.subscribers) {
      this.warnings.push(`${fileName}: EventFlow missing subscribers definition`);
    }

    // Check event processing throughput metrics
    if (eventFlow.throughput && parseFloat(eventFlow.throughput) < this.kpiTargets['event-processing-throughput']) {
      this.warnings.push(`${fileName}: EventFlow throughput below ${this.kpiTargets['event-processing-throughput']} events/sec threshold`);
    }
  }

  /**
   * Validate TokenFlowPattern implementation
   */
  validateTokenFlowPattern(tokenFlow, fileName) {
    // Check for required token flow properties
    if (!tokenFlow.tokenization) {
      this.warnings.push(`${fileName}: TokenFlow missing tokenization definition`);
    }

    if (!tokenFlow.semanticDensity) {
      this.warnings.push(`${fileName}: TokenFlow missing semanticDensity definition`);
    }

    // Check token density metrics
    if (tokenFlow.density && parseFloat(tokenFlow.density) < this.kpiTargets['token-density']) {
      this.warnings.push(`${fileName}: TokenFlow density below ${this.kpiTargets['token-density']} concepts/token threshold`);
    }
  }

  /**
   * Validate FLOW taxonomy compliance
   */
  async validateFlowTaxonomy(schemaDir) {
    const taxonomyCategories = [
      'data-processing',
      'control-logic',
      'state-management',
      'error-handling',
      'event-coordination',
      'resource-allocation',
      'semantic-optimization',
      'streaming-processing',
      'pipeline-orchestration',
      'workflow-coordination'
    ];

    const files = fs.readdirSync(schemaDir)
      .filter(file => file.endsWith('.jsonld'))
      .map(file => path.join(schemaDir, file));

    let categoriesFound = 0;

    for (const file of files) {
      try {
        const content = fs.readFileSync(file, 'utf8');
        const schema = JSON.parse(content);

        if (schema['@graph']) {
          for (const category of taxonomyCategories) {
            const found = schema['@graph'].some(item => 
              JSON.stringify(item).toLowerCase().includes(category.replace('-', ''))
            );
            if (found) {
              categoriesFound++;
              break;
            }
          }
        }
      } catch (error) {
        // Skip invalid JSON files
      }
    }

    const coveragePercentage = (categoriesFound / taxonomyCategories.length) * 100;
    if (coveragePercentage < 80) {
      this.warnings.push(`FLOW taxonomy coverage: ${coveragePercentage.toFixed(1)}% (target: ≥80%)`);
    }

    console.log(`✓ FLOW taxonomy coverage: ${coveragePercentage.toFixed(1)}%`);
  }

  /**
   * Validate orchestration agents
   */
  async validateOrchestrationAgents(schemaDir) {
    const requiredAgents = [
      'DataFlowAgent',
      'ControlFlowAgent',
      'StateFlowAgent',
      'EventFlowAgent',
      'ResourceFlowAgent',
      'TokenFlowAgent',
      'StreamingAgent',
      'PipelineAgent',
      'OrchestrationAgent'
    ];

    const files = fs.readdirSync(schemaDir)
      .filter(file => file.endsWith('.jsonld'))
      .map(file => path.join(schemaDir, file));

    let agentsFound = 0;

    for (const file of files) {
      try {
        const content = fs.readFileSync(file, 'utf8');
        const schema = JSON.parse(content);

        if (schema['@graph']) {
          for (const agent of requiredAgents) {
            const found = schema['@graph'].some(item => 
              item['@id'] && item['@id'].includes(agent)
            );
            if (found) {
              agentsFound++;
              break;
            }
          }
        }
      } catch (error) {
        // Skip invalid JSON files
      }
    }

    const agentCoverage = (agentsFound / requiredAgents.length) * 100;
    if (agentCoverage < 70) {
      this.warnings.push(`Orchestration agent coverage: ${agentCoverage.toFixed(1)}% (target: ≥70%)`);
    }

    console.log(`✓ Orchestration agent coverage: ${agentCoverage.toFixed(1)}%`);
  }

  /**
   * Validate KPI targets
   */
  async validateKPITargets(schemaDir) {
    const files = fs.readdirSync(schemaDir)
      .filter(file => file.endsWith('.jsonld'))
      .map(file => path.join(schemaDir, file));

    let kpiTargetsFound = 0;
    const totalKPIs = Object.keys(this.kpiTargets).length;

    for (const file of files) {
      try {
        const content = fs.readFileSync(file, 'utf8');
        const schema = JSON.parse(content);

        if (schema['@graph']) {
          for (const kpi of Object.keys(this.kpiTargets)) {
            const found = schema['@graph'].some(item => 
              JSON.stringify(item).toLowerCase().includes(kpi.replace('-', ''))
            );
            if (found) {
              kpiTargetsFound++;
              break;
            }
          }
        }
      } catch (error) {
        // Skip invalid JSON files
      }
    }

    const kpiCoverage = (kpiTargetsFound / totalKPIs) * 100;
    if (kpiCoverage < 80) {
      this.warnings.push(`KPI targets coverage: ${kpiCoverage.toFixed(1)}% (target: ≥80%)`);
    }

    console.log(`✓ KPI targets coverage: ${kpiCoverage.toFixed(1)}%`);
  }

  /**
   * Generate FLOW validation report
   */
  generateReport() {
    console.log('\n📊 FLOW Validation Report');
    console.log('=========================');
    
    if (this.errors.length === 0 && this.warnings.length === 0) {
      console.log('✅ All FLOW validations passed successfully!');
    } else {
      if (this.errors.length > 0) {
        console.log('\n❌ FLOW Errors:');
        this.errors.forEach(error => console.log(`  - ${error}`));
      }
      
      if (this.warnings.length > 0) {
        console.log('\n⚠️  FLOW Warnings:');
        this.warnings.forEach(warning => console.log(`  - ${warning}`));
      }
    }
    
    // Calculate FLOW governance score
    const totalIssues = this.errors.length + this.warnings.length;
    const governanceScore = Math.max(0, 100 - (this.errors.length * 10) - (this.warnings.length * 2));
    
    console.log(`\n📈 FLOW Governance Score: ${governanceScore}% (target: ≥93%)`);
    console.log(`Summary: ${this.errors.length} errors, ${this.warnings.length} warnings`);
    
    return this.errors.length === 0 && governanceScore >= 93;
  }

  /**
   * Run all FLOW validations
   */
  async runValidation(schemaDir) {
    console.log('🌊 Starting FLOW Validation');
    console.log('===========================');
    
    try {
      await this.validateFLOWSchema(schemaDir);
      await this.validateFlowTaxonomy(schemaDir);
      await this.validateOrchestrationAgents(schemaDir);
      await this.validateKPITargets(schemaDir);

      // Validate FLOW patterns in all schema files
      const files = fs.readdirSync(schemaDir)
        .filter(file => file.endsWith('.jsonld'))
        .map(file => path.join(schemaDir, file));

      for (const file of files) {
        await this.validateFLOWPatterns(file);
      }

      return this.generateReport();

    } catch (error) {
      console.error('❌ FLOW validation failed:', error.message);
      return false;
    }
  }
}

/**
 * Main FLOW validation function
 */
async function main() {
  const schemaDir = path.join(__dirname, '../schema');
  const validator = new FLOWValidator();
  
  const success = await validator.runValidation(schemaDir);
  process.exit(success ? 0 : 1);
}

// Run if called directly
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { FLOWValidator };