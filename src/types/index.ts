import type { ColorValue, ImageStyle, ShadowStyleIOS, StyleProp, TextStyle, ViewStyle } from 'react-native';

export type Theme = 'light' | 'dark';

export type ComponentStyles = {
  [key: string]: StyleProp<ViewStyle | TextStyle | ImageStyle | ColorValue | ShadowStyleIOS>;
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
  theme: Theme,
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
