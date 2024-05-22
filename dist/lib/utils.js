"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.hp = exports.wp = exports.heightPixel = exports.widthPixel = exports.getTheme = exports.tc = exports.themeColor = exports.toggleTheme = exports.getColor = exports.getFont = exports.storageInstance = void 0;
const react_native_1 = require("react-native");
const config_js_1 = __importDefault(require("../config.js"));
const react_native_mmkv_1 = require("react-native-mmkv");
var getColorScheme = react_native_1.Appearance.getColorScheme;
const { width, height } = react_native_1.Dimensions.get("window");
const shorter = Math.min(width, height);
const longer = Math.max(width, height);
exports.storageInstance = new react_native_mmkv_1.MMKV({
    id: "react-native-smart-styles",
});
const baseWidth = 375;
const baseHeight = 812;
const settings = {
    fontFamilies: (_a = config_js_1.default === null || config_js_1.default === void 0 ? void 0 : config_js_1.default.fonts) !== null && _a !== void 0 ? _a : {},
    colorsPalette: (_b = config_js_1.default === null || config_js_1.default === void 0 ? void 0 : config_js_1.default.colors) !== null && _b !== void 0 ? _b : {},
    theme: ((_c = exports.storageInstance.getString('theme')) !== null && _c !== void 0 ? _c : getColorScheme()),
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
    const theme = settings.theme;
    const searchRegex = /[dl]\(.*?\)/gi;
    const themeColors = value.match(searchRegex);
    if (themeColors) {
        const extractRegex = /[dl]\((.*?)\)/i;
        const extractedColors = {};
        themeColors.forEach((color) => {
            if (color.toLowerCase().startsWith('d') || color.toLowerCase().startsWith('D')) {
                const c = extractRegex.exec(color);
                extractedColors.dark = c ? c[1] : '#CC0000';
            }
            if (color.toLowerCase().startsWith('l') || color.toLowerCase().startsWith('L')) {
                const c = extractRegex.exec(color);
                extractedColors.light = c ? c[1] : '#CC0000';
            }
        });
        value = extractedColors[theme];
    }
    const palette = settings.colorsPalette;
    return palette[value] ? palette[value] : value;
}
exports.getColor = getColor;
/**
 * Toggles the application's color theme.
 *
 * This function switches the current color theme between 'dark' and 'light'.
 * It is typically used to allow users to switch themes dynamically within the application.
 *
 * @function
 * @name toggleTheme
 * @returns {void}
 *
 * @example
 * import { toggleTheme } from 'react-native-smart-styles';
 *
 * const ThemeSwitcher = () => {
 *   return (
 *     <button onClick={toggleTheme}>
 *       Toggle Theme
 *     </button>
 *   );
 * };
 *
 * export default ThemeSwitcher;
 */
function toggleTheme() {
    const isDarkTheme = settings.theme === 'dark';
    const newTheme = (isDarkTheme ? 'light' : 'dark');
    settings.theme = newTheme;
    exports.storageInstance.set("theme", newTheme);
}
exports.toggleTheme = toggleTheme;
/**
 * Generates a color string formatted for the current theme.
 *
 * This function takes two color strings as input: one for the light theme and one for the dark theme.
 * It returns a formatted string that can be used with the theme formatter to apply the appropriate color
 * based on the active theme.
 *
 * @function
 * @name themeColor
 * @param {string} lightColor - The color string for the light theme.
 * @param {string} darkColor - The color string for the dark theme.
 * @returns {string} - A formatted color string for the theme formatter.
 *
 * @example
 * import { themeColor } from 'react-native-smart-styles';
 *
 * const color = themeColor('#ffffff', '#000000');
 * console.log(`Formatted color: ${color}`);
 */
const themeColor = (lightColor, darkColor) => `d(${darkColor.toString()}), l(${lightColor.toString()})`;
exports.themeColor = themeColor;
/**
 * Generates a color string formatted for the current theme.
 *
 * This function takes two color strings as input: one for the light theme and one for the dark theme.
 * It returns a formatted string that can be used with the theme formatter to apply the appropriate color
 * based on the active theme.
 *
 * @function
 * @name tc
 * @param {string} lightColor - The color string for the light theme.
 * @param {string} darkColor - The color string for the dark theme.
 * @returns {string} - A formatted color string for the theme formatter.
 *
 * @example
 * import { tc } from 'react-native-smart-styles';
 *
 * const color = tc('#ffffff', '#000000');
 * console.log(`Formatted color: ${color}`);
 */
const tc = (lightColor, darkColor) => `d(${darkColor.toString()}), l(${lightColor.toString()})`;
exports.tc = tc;
/**
 * Retrieves the current color theme of the application.
 *
 * This function returns the current theme, which can be either 'dark' or 'light'.
 * It is useful for determining the active theme within the application.
 *
 * @function
 * @name getTheme
 * @returns {SmartStylesTheme} - The current theme, either 'dark' or 'light'.
 *
 * @example
 * import { getTheme } from 'path-to-your-function';
 *
 * const currentTheme = getTheme();
 * console.log(`The current theme is: ${currentTheme}`);
 */
const getTheme = () => settings.theme;
exports.getTheme = getTheme;
/**
 * Calculates a value relative to the device's width.
 *
 * This function takes a number and an optional parameter to determine if the result should be rounded.
 * It returns a value that is calculated relative to the device's width.
 *
 * @function
 * @name widthPixel
 * @param {number} value - The number to be converted relative to the device's width.
 * @param {boolean} [round=false] - Optional parameter to determine if the result should be rounded.
 * @returns {number} - The calculated value relative to the device's width.
 *
 * @example
 * import { widthPixel } from 'react-native-smart-styles';
 *
 * const widthValue = widthPixel(100);
 * console.log(`Calculated width: ${widthValue}`);
 *
 * const roundedWidthValue = widthPixel(100, true);
 * console.log(`Calculated and rounded width: ${roundedWidthValue}`);
 */
const widthPixel = (value, round = false) => normalize(value, true, round);
exports.widthPixel = widthPixel;
/**
 * Calculates a value relative to the device's height.
 *
 * This function takes a number and an optional parameter to determine if the result should be rounded.
 * It returns a value that is calculated relative to the device's height.
 *
 * @function
 * @name heightPixel
 * @param {number} value - The number to be converted relative to the device's height.
 * @param {boolean} [round=false] - Optional parameter to determine if the result should be rounded.
 * @returns {number} - The calculated value relative to the device's height.
 *
 * @example
 * import { heightPixel } from 'react-native-smart-styles';
 *
 * const heightValue = heightPixel(100);
 * console.log(`Calculated height: ${heightValue}`);
 *
 * const roundedHeightValue = heightPixel(100, true);
 * console.log(`Calculated and rounded height: ${roundedHeightValue}`);
 */
const heightPixel = (value, round = false) => normalize(value, false, round);
exports.heightPixel = heightPixel;
/**
 * Calculates a value relative to the device's width.
 *
 * This function takes a number and an optional parameter to determine if the result should be rounded.
 * It returns a value that is calculated relative to the device's width.
 *
 * @function
 * @name wp
 * @param {number} value - The number to be converted relative to the device's width.
 * @param {boolean} [round=false] - Optional parameter to determine if the result should be rounded.
 * @returns {number} - The calculated value relative to the device's width.
 *
 * @example
 * import { wp } from 'react-native-smart-styles';
 *
 * const widthValue = wp(100);
 * console.log(`Calculated width: ${widthValue}`);
 *
 * const roundedWidthValue = wp(100, true);
 * console.log(`Calculated and rounded width: ${roundedWidthValue}`);
 */
const wp = (value, round = false) => (0, exports.widthPixel)(value, round);
exports.wp = wp;
/**
 * Calculates a value relative to the device's height.
 *
 * This function takes a number and an optional parameter to determine if the result should be rounded.
 * It returns a value that is calculated relative to the device's height.
 *
 * @function
 * @name hp
 * @param {number} value - The number to be converted relative to the device's height.
 * @param {boolean} [round=false] - Optional parameter to determine if the result should be rounded.
 * @returns {number} - The calculated value relative to the device's height.
 *
 * @example
 * import { hp } from 'react-native-smart-styles';
 *
 * const heightValue = hp(100);
 * console.log(`Calculated height: ${heightValue}`);
 *
 * const roundedHeightValue = hp(100, true);
 * console.log(`Calculated and rounded height: ${roundedHeightValue}`);
 */
const hp = (value, round = false) => (0, exports.heightPixel)(value, round);
exports.hp = hp;
