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

function findRootDir(startDir: string) {
    let currentDir = startDir;
    while (currentDir !== path.parse(currentDir).root) {
        if (fs.existsSync(path.join(currentDir, configFileName))) {
            return currentDir;
        }
        currentDir = path.dirname(currentDir); // Move one directory up
    }

    throw new Error(`Could not find the root directory with ${file}`);
}

function readConfigFile(rootDir: string, configFile = configFileName) {
    const configPath = path.join(rootDir, configFile);
    if (fs.existsSync(configPath)) {
        return fs.readFileSync(configPath, 'utf-8');
    } else {
        return {};
    }
}

function writeToConfigFile(content: string) {
    const outputPath = path.join(process.cwd(), 'config.js');
    fs.writeFileSync(outputPath, `export default ${content}`);
}

const rootDir = findRootDir(process.cwd());
const config = readConfigFile(rootDir);
writeToConfigFile(config);
