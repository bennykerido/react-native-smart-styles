"use strict";
var _a, _b;
const { setColorsPalette, setFontFamilies } = require('./utils');
const fs = require('fs');
const path = require('path');
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
const configPath = find('smart-styles.config.json');
const configObject = json(configPath);
setFontFamilies((_a = configObject.fonts) !== null && _a !== void 0 ? _a : {});
setColorsPalette((_b = configObject.colors) !== null && _b !== void 0 ? _b : {});
