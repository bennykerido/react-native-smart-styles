const {setColorsPalette, setFontFamilies} = require('./utils');
const fs = require('fs');
const path = require('path')
const configFileName = 'smart-styles.config.json';
function find(...args: string[]) {
    const rel = path.join.apply(null, [].slice.call(args));
    return findStartingWith(path.dirname(process.mainModule?.filename), rel);
}

function findStartingWith(start: string, rel: string) {
    const file = path.join(start, rel);
    try {
        fs.statSync(file);
        return file;
    } catch (err: any) {
        if (path.dirname(start) !== start) {
            return findStartingWith(path.dirname(start), rel);
        }
    }
}

function parse(content: any) {
    if (/^\s*{/.test(content)) {
        return JSON.parse(content);
    }
    return {};
}

function file(...args: any[]) {
    const nonNullArgs = [].slice.call(args).filter(arg => arg !== null);

    for (let i = 0; i < nonNullArgs.length; i++) {
        if (typeof nonNullArgs[i] !== 'string') {
            return;
        }
    }

    const file = path.join.apply(null, nonNullArgs);
    try {
        return fs.readFileSync(file, 'utf-8');
    } catch (err: any) {
        return undefined;
    }
}

function json(...args: string[]) {
    const content = file.apply(null, args);
    return content ? parse(content) : {};
}

function findRootDit(startDir: string) {
    let currentDir = startDir;
    while (currentDir !== path.parse(currentDir).root) {
        if (fs.existsSync(path.join(currentDir, configFileName))) {
            return currentDir;
        }
        currentDir = path.dirname(currentDir); // Move one directory up
    }

    throw new Error(`Could not find the root directory with ${file}`);
}

function readConfigFile(configFile = configFileName) {
    const rootDir = process.cwd();
    const configPath = path.join(rootDir, configFile);
    if (fs.existsSync(configPath)) {
        const configData = fs.readFileSync(configPath, 'utf-8');
        const outputPath = path.join(rootDir, 'config.js');
        fs.writeFileSync(outputPath, `export default ${configData}`);
    } else {
        throw new Error('Config file not found');
    }
}

readConfigFile();
