import {Appearance, Dimensions, PixelRatio, AppState} from "react-native";
import config from '../../config.js';
import getColorScheme = Appearance.getColorScheme;
import {MMKV} from 'react-native-mmkv';

const { width, height } = Dimensions.get("window");
const shorter = Math.min(width, height);
const longer = Math.max(width, height);

export let storageInstance: MMKV = new MMKV();
function onAppStateChange(nextAppState: string) {
    if (nextAppState === 'active') {
        storageInstance = new MMKV({
            id: "react-native-smart-styles",
            path: `react-native-smart-styles/settings`,
            encryptionKey: 'RNSS',
        });
        AppState.removeEventListener('change', onAppStateChange);
    }
}
AppState.addEventListener('change', onAppStateChange);

const baseWidth = 375;
const baseHeight = 812;
type Settings = {
    fontFamilies: Record<string, string>,
    colorsPalette: Record<string, string>,
    theme: 'dark' | 'light',
}
const settings: Settings = {
    fontFamilies: config?.fonts ?? {},
    colorsPalette: config?.colors ?? {},
    theme: (storageInstance.getString('theme') ?? getColorScheme()) as 'dark' | 'light',
}

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
    if(Object.keys(settings.fontFamilies).includes(fontFamily)) {
        return settings.fontFamilies[fontFamily];
    } else {
        return fontFamily;
    }
}

export function getColor(value: string) {
    const theme = settings.theme;
    const isDarkTheme = theme === "dark";
    const re = /(?:d|l|D|L)\((.*?)\)(?:\s*,\s*(?:d|l|D|L)\((.*?)\))?/;
    const isMultiTheme = value.match(re);
    if (isMultiTheme) {
        const isDarkFirst = value.charAt(0) === 'd';
        const matches = isMultiTheme;
        const darkColor = matches[isDarkFirst ? 1 : 2];
        const lightColor = matches[isDarkFirst ? 2 : 1];
        value = !isDarkTheme ? lightColor : darkColor as string;
    }

    const palette = settings.colorsPalette;
    return palette[value] ? palette[value] : value;
}

export function toggleTheme() {
    const isDarkTheme = settings.theme === 'dark';
    const newTheme = isDarkTheme ? 'light' : 'dark';
    settings.theme = newTheme;
    storageInstance.set("theme", newTheme);
}


export const themeColor = (lightColor: string, darkColor: string) => `d(${darkColor.toString()}), l(${lightColor.toString()})`;
export const tc = (lightColor: string, darkColor: string) => `d(${darkColor.toString()}), l(${lightColor.toString()})`;
export const getTheme = () => settings.theme;
export const widthPixel = (value: number, round = false) => normalize(value, true, round);
export const heightPixel = (value: number, round = false) => normalize(value, false, round);
export const wp = (value: number, round = false) => widthPixel(value, round);
export const hp = (value: number, round = false) => heightPixel(value, round);
