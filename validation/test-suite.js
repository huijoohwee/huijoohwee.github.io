#!/usr/bin/env node

/**
 * JSON-LD Schema Test Suite
 * Comprehensive testing for schema validation and compliance
 */

const fs = require('fs');
const path = require('path');
const { JSONLDValidator } = require('./validate-jsonld');

class TestSuite {
  constructor() {
    this.tests = [];
    this.passed = 0;
    this.failed = 0;
  }

  /**
   * Add a test case
   */
  test(name, testFn) {
    this.tests.push({ name, testFn });
  }

  /**
   * Run all tests
   */
  async run() {
    console.log('🧪 Running JSON-LD Schema Test Suite');
    console.log('====================================');
    
    for (const { name, testFn } of this.tests) {
      try {
        console.log(`\n🔬 ${name}`);
        await testFn();
        console.log(`✅ PASS: ${name}`);
        this.passed++;
      } catch (error) {
        console.log(`❌ FAIL: ${name}`);
        console.log(`   Error: ${error.message}`);
        this.failed++;
      }
    }
    
    this.generateReport();
  }

  /**
   * Generate test report
   */
  generateReport() {
    console.log('\n📊 Test Results');
    console.log('===============');
    console.log(`✅ Passed: ${this.passed}`);
    console.log(`❌ Failed: ${this.failed}`);
    console.log(`📈 Total: ${this.tests.length}`);
    
    if (this.failed === 0) {
      console.log('\n🎉 All tests passed!');
    } else {
      console.log(`\n⚠️  ${this.failed} test(s) failed`);
    }
    
    return this.failed === 0;
  }

  /**
   * Assert helper
   */
  assert(condition, message) {
    if (!condition) {
      throw new Error(message);
    }
  }

  /**
   * Assert file exists
   */
  assertFileExists(filePath) {
    this.assert(fs.existsSync(filePath), `File does not exist: ${filePath}`);
  }

  /**
   * Assert valid JSON
   */
  assertValidJSON(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    try {
      JSON.parse(content);
    } catch (error) {
      throw new Error(`Invalid JSON in ${filePath}: ${error.message}`);
    }
  }

  /**
   * Assert has property
   */
  assertHasProperty(obj, property, message) {
    this.assert(obj.hasOwnProperty(property), message || `Missing property: ${property}`);
  }
}

// Create test suite instance
const suite = new TestSuite();

// Test: Schema files exist
suite.test('Schema files exist', () => {
  const schemaDir = path.join(__dirname, '../schema');
  const requiredFiles = [
    'base.jsonld',
    'vocab.jsonld',
    'core.jsonld',
    'uc.jsonld',
    'wf.jsonld',
    'kg.jsonld',
    'nqds.jsonld',
    'jdbl.jsonld',
    'jjnhm.jsonld',
    'actions.jsonld',
    'agents.jsonld',
    'features.jsonld',
    'project-areas.jsonld',
    'project-issues.jsonld',
    'ui-ux-elements.jsonld'
  ];
  
  for (const file of requiredFiles) {
    const filePath = path.join(schemaDir, file);
    suite.assertFileExists(filePath);
  }
});

// Test: All schema files are valid JSON
suite.test('All schema files are valid JSON', () => {
  const schemaDir = path.join(__dirname, '../schema');
  const files = fs.readdirSync(schemaDir)
    .filter(file => file.endsWith('.jsonld'))
    .map(file => path.join(schemaDir, file));
  
  for (const file of files) {
    suite.assertValidJSON(file);
  }
});

// Test: Base schema structure
suite.test('Base schema has required structure', () => {
  const basePath = path.join(__dirname, '../schema/base.jsonld');
  const content = JSON.parse(fs.readFileSync(basePath, 'utf8'));
  
  suite.assertHasProperty(content, '@context');
  suite.assertHasProperty(content, 'meta');
  suite.assert(content['@type'] === 'ContextDefinition' || content.meta['@type'] === 'schema:Dataset', 'Base schema should have valid type');
});

// Test: Vocabulary schema structure
suite.test('Vocabulary schema has required structure', () => {
  const vocabPath = path.join(__dirname, '../schema/vocab.jsonld');
  const content = JSON.parse(fs.readFileSync(vocabPath, 'utf8'));
  
  suite.assertHasProperty(content, '@context');
  suite.assertHasProperty(content, 'meta');
  // Vocabulary may have classes/properties structure instead of @graph
  suite.assert(content['@graph'] || content.classes || content.properties, 'Vocabulary should have @graph, classes, or properties');
});

// Test: Core schema structure
suite.test('Core schema has required structure', () => {
  const corePath = path.join(__dirname, '../schema/core.jsonld');
  const content = JSON.parse(fs.readFileSync(corePath, 'utf8'));
  
  suite.assertHasProperty(content, '@context');
  suite.assertHasProperty(content, '@graph');
  suite.assert(Array.isArray(content['@graph']), 'Core @graph should be an array');
});

// Test: Domain-specific schemas have standardized structure
suite.test('Domain-specific schemas have standardized structure', () => {
  const domainSchemas = [
    'actions.jsonld',
    'agents.jsonld',
    'features.jsonld',
    'project-areas.jsonld',
    'project-issues.jsonld',
    'ui-ux-elements.jsonld'
  ];
  
  for (const schema of domainSchemas) {
    const filePath = path.join(__dirname, '../schema', schema);
    const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    // Check standardized @context structure
    suite.assert(Array.isArray(content['@context']), `${schema}: @context should be an array`);
    suite.assert(content['@context'][0] === 'https://huijoohwee.github.io/schema/base.jsonld', 
      `${schema}: First @context should import base.jsonld`);
    
    // Check metadata
    suite.assertHasProperty(content, 'meta', `${schema}: Missing meta section`);
    suite.assertHasProperty(content.meta, '@type', `${schema}: Missing meta @type`);
    
    // Check @graph structure
    suite.assertHasProperty(content, '@graph', `${schema}: Missing @graph`);
    suite.assert(Array.isArray(content['@graph']), `${schema}: @graph should be an array`);
  }
});

// Test: JJNHM schema compliance
suite.test('JJNHM schema has proper layer definitions', () => {
  const jjnhmPath = path.join(__dirname, '../schema/jjnhm.jsonld');
  const content = JSON.parse(fs.readFileSync(jjnhmPath, 'utf8'));
  
  // JJNHM may have @graph or layers structure
  const hasGraph = content['@graph'];
  const hasLayers = content.layers;
  
  suite.assert(hasGraph || hasLayers, 'JJNHM should have @graph or layers structure');
  
  if (hasGraph) {
    // Check for layer definitions in @graph
    const graph = content['@graph'];
    const hasJSONLD = graph.some(item => item['@id'] && item['@id'].includes('JSONLD'));
    const hasJDBL = graph.some(item => item['@id'] && item['@id'].includes('JDBL'));
    const hasNQDS = graph.some(item => item['@id'] && item['@id'].includes('NQDS'));
    const hasHBS = graph.some(item => item['@id'] && item['@id'].includes('HBS'));
    const hasMMD = graph.some(item => item['@id'] && item['@id'].includes('MMD'));
    
    suite.assert(hasJSONLD || hasJDBL || hasNQDS || hasHBS || hasMMD, 'JJNHM should define at least one layer');
  }
});

// Test: Context resolution URLs
suite.test('Context URLs are properly formatted', () => {
  const schemaDir = path.join(__dirname, '../schema');
  const files = fs.readdirSync(schemaDir)
    .filter(file => file.endsWith('.jsonld'))
    .map(file => path.join(schemaDir, file));
  
  for (const file of files) {
    const content = JSON.parse(fs.readFileSync(file, 'utf8'));
    
    if (Array.isArray(content['@context'])) {
      for (const context of content['@context']) {
        if (typeof context === 'string') {
          suite.assert(context.startsWith('https://'), 
            `${path.basename(file)}: Context URL should use HTTPS`);
          suite.assert(context.includes('huijoohwee.github.io'), 
            `${path.basename(file)}: Context URL should use correct domain`);
        }
      }
    }
  }
});

// Test: Metadata consistency
suite.test('Metadata is consistent across schemas', () => {
  const schemaDir = path.join(__dirname, '../schema');
  const files = fs.readdirSync(schemaDir)
    .filter(file => file.endsWith('.jsonld'))
    .map(file => path.join(schemaDir, file));
  
  for (const file of files) {
    const content = JSON.parse(fs.readFileSync(file, 'utf8'));
    
    if (content.meta) {
      // Check for creator (either dcterms:creator or creator)
      suite.assert(content.meta['dcterms:creator'] || content.meta['creator'], 
        `${path.basename(file)}: Missing creator in metadata`);
      // Check for version (either owl:versionInfo or versionInfo)
      suite.assert(content.meta['owl:versionInfo'] || content.meta['versionInfo'], 
        `${path.basename(file)}: Missing version in metadata`);
      // Check for created date (either dcterms:created or created)
      suite.assert(content.meta['dcterms:created'] || content.meta['created'], 
        `${path.basename(file)}: Missing created date in metadata`);
      // Check for modified date (either dcterms:modified or modified)
      suite.assert(content.meta['dcterms:modified'] || content.meta['modified'], 
        `${path.basename(file)}: Missing modified date in metadata`);
    }
  }
});

// Run the test suite
if (require.main === module) {
  suite.run().then(success => {
    process.exit(success ? 0 : 1);
  }).catch(error => {
    console.error('Test suite failed:', error);
    process.exit(1);
  });
}

module.exports = { TestSuite };