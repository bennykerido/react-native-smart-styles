import config from "../config";

const settings: Settings = {
  fontFamilies: config?.fonts ?? {},
  colorsPalette: config?.colors ?? {},
  baseWidth: config?.baseWidth ?? 375,
  baseHeight: config?.baseHeight ?? 812,
  theme: 'light' as SmartStylesTheme,
};

export default settings;
