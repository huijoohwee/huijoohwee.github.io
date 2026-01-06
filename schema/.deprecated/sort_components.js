#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Read the project-components.jsonld file
const filePath = '/Users/huijoohwee/Documents/GitHub/huijoohwee.github.io/schema/project-components.jsonld';
const content = fs.readFileSync(filePath, 'utf8');

try {
  const jsonData = JSON.parse(content);
  
  // Extract the @graph array which contains all components
  const components = jsonData['@graph'];
  
  if (!Array.isArray(components)) {
    console.error('Error: @graph is not an array');
    process.exit(1);
  }
  
  console.log(`Found ${components.length} components to sort`);
  
  // Sort components alphabetically by @id
  const sortedComponents = components.sort((a, b) => {
    const idA = a['@id'] || '';
    const idB = b['@id'] || '';
    return idA.localeCompare(idB);
  });
  
  // Update the @graph with sorted components
  jsonData['@graph'] = sortedComponents;
  
  // Write the sorted JSON back to file with proper formatting
  const sortedContent = JSON.stringify(jsonData, null, 2);
  fs.writeFileSync(filePath, sortedContent, 'utf8');
  
  console.log('✅ Successfully sorted components alphabetically');
  console.log('First 10 component IDs:');
  sortedComponents.slice(0, 10).forEach((comp, index) => {
    console.log(`${index + 1}. ${comp['@id']}`);
  });
  
} catch (error) {
  console.error('Error processing file:', error.message);
  process.exit(1);
}