const fs = require('fs');
const path = require('path');

// Validate JSON-LD files
const schemaFiles = fs.readdirSync('.').filter(f => f.endsWith('.jsonld'));
console.log('Validating', schemaFiles.length, 'schema files...');

let validCount = 0;
let errors = [];

schemaFiles.forEach(file => {
  try {
    const content = fs.readFileSync(file, 'utf8');
    const parsed = JSON.parse(content);
    
    // Check required fields
    if (!parsed['@context']) errors.push(file + ': Missing @context');
    if (!parsed['@id']) errors.push(file + ': Missing @id');
    if (!parsed.meta) errors.push(file + ': Missing meta section');
    
    // Check version info
    if (parsed.meta && parsed.meta.version !== '3.0.0') {
      errors.push(file + ': Version should be 3.0.0, found ' + parsed.meta.version);
    }
    
    validCount++;
    console.log('✓', file, 'valid');
  } catch (e) {
    errors.push(file + ': ' + e.message);
    console.log('✗', file, 'invalid:', e.message);
  }
});

console.log('\nValidation Summary:');
console.log('Valid files:', validCount);
console.log('Errors:', errors.length);
if (errors.length > 0) {
  console.log('\nErrors:');
  errors.forEach(err => console.log('  -', err));
}