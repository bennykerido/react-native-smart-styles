"use strict";
const fs = require('fs');
const path = require('path');
const configFileName = 'smart-styles.config.json';
function findRootDir(startDir) {
    let currentDir = startDir;
    while (currentDir !== path.parse(currentDir).root) {
        if (fs.existsSync(path.join(currentDir, configFileName))) {
            return currentDir;
        }
        currentDir = path.dirname(currentDir); // Move one directory up
    }
    return undefined;
}
function readConfigFile(rootDir, configFile = configFileName) {
    const configPath = path.join(rootDir, configFile);
    if (fs.existsSync(configPath)) {
        return fs.readFileSync(configPath, 'utf-8');
    }
    else {
        return {};
    }
}
function writeToConfigFile(content) {
    const outputPath = path.join(process.cwd(), 'config.js');
    fs.writeFileSync(outputPath, `export default ${content};`);
}
const rootDir = findRootDir(process.cwd());
if (rootDir) {
    const config = readConfigFile(rootDir);
    writeToConfigFile(config);
}
else {
    writeToConfigFile('{}');
}
