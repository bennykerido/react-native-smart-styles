"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hp = exports.wp = exports.heightPixel = exports.widthPixel = exports.setColorsPalette = exports.setFontFamilies = exports.tc = exports.themeColor = exports.configureSmartStyles = exports.getColor = exports.getFont = void 0;
const react_native_1 = require("react-native");
var getColorScheme = react_native_1.Appearance.getColorScheme;
const { width, height } = react_native_1.Dimensions.get("window");
const shorter = Math.min(width, height);
const longer = Math.max(width, height);
const baseWidth = 375;
const baseHeight = 812;
let FontFamilies = {}; // Can be initialized via `setFontFamilies`
let ColorsPalette = {};
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
    console.log(FontFamilies);
    if (Object.keys(FontFamilies).includes(fontFamily)) {
        return FontFamilies[fontFamily];
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
    const palette = ColorsPalette;
    return palette[value] ? palette[value] : value;
}
exports.getColor = getColor;
function configureSmartStyles(config) {
    if (config.colors)
        (0, exports.setColorsPalette)(config.colors);
    if (config.fonts)
        (0, exports.setFontFamilies)(config.fonts);
}
exports.configureSmartStyles = configureSmartStyles;
const themeColor = (lightColor, darkColor) => `d(${darkColor.toString()}), l(${lightColor.toString()})`;
exports.themeColor = themeColor;
const tc = (lightColor, darkColor) => `d(${darkColor.toString()}), l(${lightColor.toString()})`;
exports.tc = tc;
const setFontFamilies = (fontFamilies) => (FontFamilies = fontFamilies);
exports.setFontFamilies = setFontFamilies;
const setColorsPalette = (colorsPalette) => (ColorsPalette = colorsPalette);
exports.setColorsPalette = setColorsPalette;
const widthPixel = (value, round = false) => normalize(value, true, round);
exports.widthPixel = widthPixel;
const heightPixel = (value, round = false) => normalize(value, false, round);
exports.heightPixel = heightPixel;
const wp = (value, round = false) => normalize(value, true, round);
exports.wp = wp;
const hp = (value, round = false) => normalize(value, false, round);
exports.hp = hp;
