#!/usr/bin/env node
const args = process.argv.slice(2);
const cliPath = require('path');
const path = require("path");
const fs = require("fs");

if (args.length === 0) {
    console.log('Usage: smart-styles update');
    process.exit(1);
}

const command = args[0];
switch (command) {
    case 'update':
        try {
            process.chdir(cliPath.join('node_modules/react-native-smart-styles'));
            console.log('Updating config file...');
            setSettings();
            console.log('Config file successfully updated');
        } catch (e) {
            console.error(`Failed to change directory: ${e}`);
            process.exit(1);
        }
        break;
    default:
        console.log('Unknown Command');
        process.exit(1);
}



function setSettings() {
    const configFileName = 'smart-styles.config.json';

    function findRootDir(startDir) {
        let currentDir = startDir;
        while (currentDir !== path.parse(currentDir).root) {
            if (fs.existsSync(path.join(currentDir, configFileName))) {
                console.log(currentDir);
                return currentDir;
            }
            currentDir = path.dirname(currentDir); // Move one directory up
        }
        return undefined;
    }

    function readConfigFile(rootDir, configFile) {
        if (configFile === void 0) { configFile = configFileName; }
        const configPath = path.join(rootDir, configFile);
        if (fs.existsSync(configPath)) {
            return fs.readFileSync(configPath, 'utf-8');
        }
        else {
            return {};
        }
    }

    function writeToConfigFile(content) {
        const outputPath = path.join(process.cwd(), 'dist/config/index.js');
        fs.writeFileSync(outputPath, "export default ".concat(content, ";"));
    }

    const rootDir = findRootDir(process.cwd());
    if (rootDir) {
        const config = readConfigFile(rootDir);
        writeToConfigFile(config);
    }
    else {
        writeToConfigFile('{}');
    }

}
