import type { ViewStyle, TextStyle, ImageStyle, ShadowStyleIOS, StyleProp, ColorValue } from 'react-native';

declare type ComponentStyles = {
  [key: string]: StyleProp<ViewStyle | TextStyle | ImageStyle | Fonts | ColorValue | Colors | ShadowStyleIOS>;
}
declare enum SmartStylesTheme {
  DARK = 'dark',
  LIGHT = 'light',
}
declare type ThemeListener = (theme: string) => void;
declare interface SmartStylesThemeListener {
  key: string;
  listener: ThemeListener;
}

// export type SmartStylesThemeListener = {
//   key: string;
//   listener: ThemeListener;
// };
declare interface Settings {
  fontFamilies: Record<string, string>,
  colorsPalette: Record<string, string>,
  baseWidth: number,
  baseHeight: number,
  theme: SmartStylesTheme,
}

export interface SmartStylesNamedStyles extends ComponentStyles {
  // settings?: Record<string, any>;
}

export interface ConfigFile {
  fonts?: Record<string, string>;
  colors?: Record<string, string>;
  baseWidth?: number;
  baseHeight?: number;
}
