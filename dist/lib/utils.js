"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.hp = exports.wp = exports.heightPixel = exports.widthPixel = exports.getTheme = exports.setTheme = exports.setColorsPalette = exports.setFontFamilies = exports.tc = exports.themeColor = exports.getColor = exports.getFont = void 0;
const react_native_1 = require("react-native");
const config_js_1 = __importDefault(require("../config.js"));
var getColorScheme = react_native_1.Appearance.getColorScheme;
const { width, height } = react_native_1.Dimensions.get("window");
const shorter = Math.min(width, height);
const longer = Math.max(width, height);
const baseWidth = 375;
const baseHeight = 812;
const settings = {
    fontFamilies: (_a = config_js_1.default === null || config_js_1.default === void 0 ? void 0 : config_js_1.default.fonts) !== null && _a !== void 0 ? _a : {},
    colorsPalette: (_b = config_js_1.default === null || config_js_1.default === void 0 ? void 0 : config_js_1.default.colors) !== null && _b !== void 0 ? _b : {},
    theme: getColorScheme(),
};
function getDeviceBaseScale() {
    return {
        width: shorter / baseWidth,
        height: longer / baseHeight,
    };
}
function normalize(size, horizontal = true, round = false) {
    const { width, height } = getDeviceBaseScale();
    const newSize = horizontal ? size * width : size * height;
    return round ? Math.round(react_native_1.PixelRatio.roundToNearestPixel(newSize)) : newSize;
}
function getFont(fontFamily) {
    if (Object.keys(settings.fontFamilies).includes(fontFamily)) {
        return settings.fontFamilies[fontFamily];
    }
    else {
        return fontFamily;
    }
}
exports.getFont = getFont;
function getColor(value) {
    const theme = getColorScheme();
    const isDarkTheme = theme === "dark";
    const re = /(?:d|l|D|L)\((.*?)\)(?:\s*,\s*(?:d|l|D|L)\((.*?)\))?/;
    const isMultiTheme = value.match(re);
    if (isMultiTheme) {
        const isDarkFirst = value.charAt(0) === 'd';
        const matches = value.match(re);
        const darkColor = matches ? matches[isDarkFirst ? 1 : 2] : '';
        const lightColor = matches ? matches[isDarkFirst ? 2 : 1] : '';
        value = !isDarkTheme ? lightColor : darkColor;
    }
    const palette = settings.colorsPalette;
    return palette[value] ? palette[value] : value;
}
exports.getColor = getColor;
const themeColor = (lightColor, darkColor) => `d(${darkColor.toString()}), l(${lightColor.toString()})`;
exports.themeColor = themeColor;
const tc = (lightColor, darkColor) => `d(${darkColor.toString()}), l(${lightColor.toString()})`;
exports.tc = tc;
const setFontFamilies = (fontFamilies) => (settings.fontFamilies = fontFamilies);
exports.setFontFamilies = setFontFamilies;
const setColorsPalette = (colorsPalette) => (settings.colorsPalette = colorsPalette);
exports.setColorsPalette = setColorsPalette;
const setTheme = (theme) => (settings.theme = theme);
exports.setTheme = setTheme;
const getTheme = () => settings.theme;
exports.getTheme = getTheme;
const widthPixel = (value, round = false) => normalize(value, true, round);
exports.widthPixel = widthPixel;
const heightPixel = (value, round = false) => normalize(value, false, round);
exports.heightPixel = heightPixel;
const wp = (value, round = false) => (0, exports.widthPixel)(value, round);
exports.wp = wp;
const hp = (value, round = false) => (0, exports.heightPixel)(value, round);
exports.hp = hp;
