import {Appearance, Dimensions, PixelRatio} from "react-native";
import getColorScheme = Appearance.getColorScheme;

const { width, height } = Dimensions.get("window");
const shorter = Math.min(width, height);
const longer = Math.max(width, height);

const baseWidth = 375;
const baseHeight = 812;

let FontFamilies: Record<string, string> = {}; // Can be initialized via `setFontFamilies`
let ColorsPalette: Record<string, string> = {};

function getDeviceBaseScale() {
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
    console.log(FontFamilies);
    if(Object.keys(FontFamilies).includes(fontFamily)) {
        return FontFamilies[fontFamily];
    } else {
        return fontFamily;
    }
}

export function getColor(value: string) {
    const theme = getColorScheme();
    const isDarkTheme = theme === "dark";
    const re = /(?:d|l|D|L)\((.*?)\)(?:\s*,\s*(?:d|l|D|L)\((.*?)\))?/;
    const isMultiTheme = value.match(re);
    if (isMultiTheme) {
        const isDarkFirst = value.charAt(0) === 'd';
        const matches = value.match(re);
        const darkColor = matches ? matches[isDarkFirst ? 1 : 2] : '';
        const lightColor = matches ? matches[isDarkFirst ? 2 : 1] : '';
        value = !isDarkTheme ? lightColor : darkColor as any;
    }

    const palette = ColorsPalette;
    return palette[value] ? palette[value] : value;
}
type Config = {
    fonts?: Record<string, string>;
    colors?: Record<string, string>;
}
export async function configureSmartStyles(config: Config) {
    if (config.colors) setColorsPalette(config.colors);
    if (config.fonts) setFontFamilies(config.fonts);
    return new Promise((resolve, reject) => {
        const to = setTimeout(() => {
            if (
                ((config.colors && config.colors === ColorsPalette) || !config.colors) &&
                ((config.fonts && config.fonts === FontFamilies) || !config.fonts)) {
                resolve(true);
            }
            clearTimeout(to);
        }, 50);
    });
}
export const themeColor = (lightColor: string, darkColor: string) => `d(${darkColor.toString()}), l(${lightColor.toString()})`;
export const tc = (lightColor: string, darkColor: string) => `d(${darkColor.toString()}), l(${lightColor.toString()})`;
export const setFontFamilies = (fontFamilies: Record<string, string>) => (FontFamilies = fontFamilies);
export const setColorsPalette = (colorsPalette: Record<string, string>) => (ColorsPalette = colorsPalette);
export const widthPixel = (value: number, round = false) => normalize(value, true, round);
export const heightPixel = (value: number, round = false) => normalize(value, false, round);
export const wp = (value: number, round = false) => normalize(value, true, round);
export const hp = (value: number, round = false) => normalize(value, false, round);
