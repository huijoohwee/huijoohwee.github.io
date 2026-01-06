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
    return this.failed === 0;
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

function listJsonldFiles(rootDir) {
  const results = [];
  const stack = [rootDir];

  while (stack.length > 0) {
    const currentDir = stack.pop();
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.name === 'node_modules' || entry.name === '.deprecated') continue;
      const fullPath = path.join(currentDir, entry.name);
      if (entry.isDirectory()) {
        stack.push(fullPath);
        continue;
      }
      if (entry.isFile() && entry.name.endsWith('.jsonld')) {
        results.push(fullPath);
      }
    }
  }

  return results.sort();
}

// Test: AgenticRAG schema files exist
suite.test('AgenticRAG schema files exist', () => {
  const agenticDir = path.join(__dirname, '../schema/AgenticRAG');
  const requiredFiles = [
    'v1/context.jsonld',
    'node-schema.jsonld',
    'edge-schema.jsonld',
    'graph-schema.jsonld',
    'example-graph.jsonld'
  ];

  for (const relPath of requiredFiles) {
    suite.assertFileExists(path.join(agenticDir, relPath));
  }
});

// Test: All active schema files are valid JSON
suite.test('All active schema files are valid JSON', () => {
  const schemaDir = path.join(__dirname, '../schema');
  const files = listJsonldFiles(schemaDir);
  suite.assert(files.length > 0, 'No active .jsonld files found under schema/');

  for (const file of files) {
    suite.assertValidJSON(file);
  }
});

// Test: All active schema files have @context
suite.test('All active schema files include @context', () => {
  const schemaDir = path.join(__dirname, '../schema');
  const files = listJsonldFiles(schemaDir);

  for (const file of files) {
    const content = JSON.parse(fs.readFileSync(file, 'utf8'));
    suite.assertHasProperty(content, '@context', `${path.basename(file)}: Missing @context`);
  }
});

// Test: AgenticRAG core schemas have expected structural fields
suite.test('AgenticRAG core schemas have expected structure', () => {
  const agenticDir = path.join(__dirname, '../schema/AgenticRAG');
  const nodeSchema = JSON.parse(fs.readFileSync(path.join(agenticDir, 'node-schema.jsonld'), 'utf8'));
  const edgeSchema = JSON.parse(fs.readFileSync(path.join(agenticDir, 'edge-schema.jsonld'), 'utf8'));
  const graphSchema = JSON.parse(fs.readFileSync(path.join(agenticDir, 'graph-schema.jsonld'), 'utf8'));

  suite.assertHasProperty(nodeSchema, 'propertyDefinitions', 'node-schema.jsonld: Missing propertyDefinitions');
  suite.assertHasProperty(edgeSchema, 'propertyDefinitions', 'edge-schema.jsonld: Missing propertyDefinitions');
  suite.assertHasProperty(graphSchema, 'propertyDefinitions', 'graph-schema.jsonld: Missing propertyDefinitions');

  suite.assert(Array.isArray(nodeSchema.required), 'node-schema.jsonld: required should be an array');
  suite.assert(Array.isArray(edgeSchema.required), 'edge-schema.jsonld: required should be an array');
});

// Test: Context resolution URLs
suite.test('Context URLs are properly formatted', () => {
  const schemaDir = path.join(__dirname, '../schema');
  const files = listJsonldFiles(schemaDir);
  
  for (const file of files) {
    const content = JSON.parse(fs.readFileSync(file, 'utf8'));
    
    const contexts = Array.isArray(content['@context']) ? content['@context'] : [content['@context']];
    for (const context of contexts) {
      if (typeof context === 'string') {
        suite.assert(context.startsWith('https://'), `${path.basename(file)}: Context URL should use HTTPS`);
      }
    }
  }
});

// Test: Optional schemaVersion fields are well-formed
suite.test('Schema version fields are well-formed', () => {
  const schemaDir = path.join(__dirname, '../schema');
  const files = listJsonldFiles(schemaDir);

  for (const file of files) {
    const content = JSON.parse(fs.readFileSync(file, 'utf8'));
    const version = content.schemaVersion ?? content.schema_version;
    if (version !== undefined) {
      suite.assert(typeof version === 'string', `${path.basename(file)}: schemaVersion should be a string`);
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
