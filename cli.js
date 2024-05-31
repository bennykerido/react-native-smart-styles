#!/usr/bin/env node
const args = process.argv.slice(2);
const fs = require('fs');
const path = require('path');

if (args.length === 0) {
    console.log('Usage: smart-styles update');
    process.exit(1);
}

const command = args[0];
switch (command) {
    case 'update':
        setSettings();
        break;
    default:
        console.log('Unknown Command');
        process.exit(1);
}



function setSettings() {
    const configFileName = 'smart-styles.config.json';

    function findProjectRoot(startDir) {
      if (fs.existsSync(path.join(startDir, 'package.json'))) {
        return startDir;
      }
      const parentDir = path.resolve(startDir, '..');
      if (parentDir === startDir) {
        throw new Error('Project root not found');
      }
      return findProjectRoot(parentDir);
    }

    try {
      const packageDir = process.cwd();
      const projectRoot = findProjectRoot(packageDir);
      const rootConfigPath = path.join(projectRoot, configFileName);
      let content = {};
      if (fs.existsSync(rootConfigPath)) {
        content = fs.readFileSync(rootConfigPath, 'utf-8');
      }
      const packageConfigPath = path.join(packageDir, 'lib', 'config', 'index.js');
      fs.writeFileSync(packageConfigPath, `export default `.concat(content));
      console.log('Config file updated successfully');
    } catch (error) {
      console.error('Error updating config file:', error);
    }
}
