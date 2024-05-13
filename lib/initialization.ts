import {setColorsPalette, setFontFamilies} from "./utils";

const fs = require('fs');
const path = require('path')

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

const configPath = find('smart-styles.config.json');
const configObject = json(configPath);
setFontFamilies(configObject.fonts ?? {});
setColorsPalette(configObject.colors ?? {});
