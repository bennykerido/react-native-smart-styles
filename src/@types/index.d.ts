import type { ColorValue, ImageStyle, ShadowStyleIOS, StyleProp, TextStyle, ViewStyle } from 'react-native';
import { type ComponentStyles, SmartStylesTheme, type ThemeListener } from './globals';

declare namespace SmartStylesTypes {
  export type Theme = 'light' | 'dark';

  export type ComponentStyles = {
    [key: string]: StyleProp<ViewStyle | TextStyle | ImageStyle | Fonts | ColorValue | Colors | ShadowStyleIOS>;
  }

  export type ThemeListener = (theme: string) => void;

  export interface SmartStylesThemeListener {
    key: string;
    listener: ThemeListener;
  }

  export interface Settings {
    fontFamilies: Record<string, string>,
    colorsPalette: Record<string, string>,
    baseWidth: number,
    baseHeight: number,
    theme: SmartStylesTheme,
  }

  export interface SmartStylesNamedStyles extends ComponentStyles {
    settings?: Record<string, any>;
  }

  export interface ConfigFile {
    fonts?: Record<string, string>;
    colors?: Record<string, string>;
    baseWidth?: number;
    baseHeight?: number;
  }
}
