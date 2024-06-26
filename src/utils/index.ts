import {Dimensions, PixelRatio} from "react-native";
import SmartStyles, {SmartStylesNativeModule} from "../smart-styles/SmartStyles";
import settings from "../settings";


const { width, height } = Dimensions.get("window");
const shorter = Math.min(width, height);
const longer = Math.max(width, height);


function getDeviceBaseScale() {
    const {baseHeight, baseWidth} = settings;
    return {
        width: shorter / baseWidth,
        height: longer / baseHeight,
    };
}

function normalize(size: number, horizontal = true, round = false) {
    const { width, height } = getDeviceBaseScale();
    const newSize = horizontal ? size * width : size * height;
    return round ? Math.round(PixelRatio.roundToNearestPixel(newSize)) : newSize;
}

export function getFont(fontFamily: string) {
    if(Object.keys(settings.fontFamilies).includes(fontFamily)) {
        return settings.fontFamilies[fontFamily];
    } else {
        return fontFamily;
    }
}

export function getColor(value: string) {
    const theme = settings.theme;
    const searchRegex = /[dl]\(.*?\)/gi;
    const themeColors = value.match(searchRegex);
    if (themeColors) {
        const extractRegex = /[dl]\((.*?)\)/i;
        const extractedColors: Record<string, string> = {};
        themeColors.forEach((color) => {
            if (color.toLowerCase().startsWith('d') || color.toLowerCase().startsWith('D')) {
                const c = extractRegex.exec(color);
                extractedColors.dark = c?.[1] ?? '#CC0000';
            }
            if (color.toLowerCase().startsWith('l') || color.toLowerCase().startsWith('L')) {
                const c = extractRegex.exec(color);
                extractedColors.light = c?.[1] ?? '#CC0000';
            }
        });
        value = extractedColors[theme] ?? '#CC0000';
    }
    const palette = settings.colorsPalette;
    return palette[value] ? palette[value] : value;
}
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
export async function toggleTheme(): Promise<void> {
  await SmartStylesNativeModule.toggleTheme();
  const newTheme = await getTheme();
  settings.theme = newTheme as SmartStylesTheme;
  await SmartStyles.notifyThemeListeners();
}

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
export const themeColor = (lightColor: string, darkColor: string): string => `d(${darkColor.toString()}), l(${lightColor.toString()})`;
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
export const tc = (lightColor: string, darkColor: string): string => `d(${darkColor.toString()}), l(${lightColor.toString()})`;
/**
 * Retrieves the current color theme of the application.
 *
 * This function returns the current theme, which can be either 'dark' or 'light'.
 * It is useful for determining the active theme within the application.
 *
 * @function
 * @name getTheme
 * @returns {Promise<string>} - Promise with the current theme, either 'dark' or 'light'.
 *
 * @example
 * import { getTheme } from 'react-native-smart-styles';
 *
 * getTheme().then(theme => {
 *  console.log(`The current theme is: ${theme}`);
 * });
 */
export function getTheme(): Promise<string> {
  return SmartStylesNativeModule.getTheme();
}
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
export const widthPixel = (value: number, round: boolean = false): number => normalize(value, true, round);
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
export const heightPixel = (value: number, round: boolean = false): number => normalize(value, false, round);
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
export const wp = (value: number, round: boolean = false): number => widthPixel(value, round);
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
export const hp = (value: number, round: boolean = false): number => heightPixel(value, round);
