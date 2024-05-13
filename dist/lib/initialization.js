"use strict";
const fs = require('fs');
const path = require('path');
const configFileName = 'smart-styles.config.json';
function find(...args) {
    var _a;
    const rel = path.join.apply(null, [].slice.call(args));
    return findStartingWith(path.dirname((_a = process.mainModule) === null || _a === void 0 ? void 0 : _a.filename), rel);
}
function findStartingWith(start, rel) {
    const file = path.join(start, rel);
    try {
        fs.statSync(file);
        return file;
    }
    catch (err) {
        if (path.dirname(start) !== start) {
            return findStartingWith(path.dirname(start), rel);
        }
    }
}
function parse(content) {
    if (/^\s*{/.test(content)) {
        return JSON.parse(content);
    }
    return {};
}
function file(...args) {
    const nonNullArgs = [].slice.call(args).filter(arg => arg !== null);
    for (let i = 0; i < nonNullArgs.length; i++) {
        if (typeof nonNullArgs[i] !== 'string') {
            return;
        }
    }
    const file = path.join.apply(null, nonNullArgs);
    try {
        return fs.readFileSync(file, 'utf-8');
    }
    catch (err) {
        return undefined;
    }
}
function json(...args) {
    const content = file.apply(null, args);
    return content ? parse(content) : {};
}
function findRootDir(startDir) {
    let currentDir = startDir;
    while (currentDir !== path.parse(currentDir).root) {
        if (fs.existsSync(path.join(currentDir, configFileName))) {
            return currentDir;
        }
        currentDir = path.dirname(currentDir); // Move one directory up
    }
    throw new Error(`Could not find the root directory with ${file}`);
}
function readConfigFile(rootDir, configFile = configFileName) {
    const configPath = path.join(rootDir, configFile);
    if (fs.existsSync(configPath)) {
        const configData = fs.readFileSync(configPath, 'utf-8');
        return configData;
    }
    else {
        throw new Error(`Config file not found at the root directory, please create a new file called ${configFileName}`);
    }
}
function writeToConfigFile(content) {
    const outputPath = path.join(process.cwd(), 'config.js');
    fs.writeFileSync(outputPath, `export default ${content}`);
}
const rootDir = findRootDir(process.cwd());
const config = readConfigFile(rootDir);
writeToConfigFile(config);
