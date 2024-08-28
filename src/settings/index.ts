import config from "../config";
import type { ConfigFile, Settings, Theme } from '../types';
const conf = config as ConfigFile;
const settings: Settings = {
  fontFamilies: conf?.fonts ?? {},
  colorsPalette: conf?.colors ?? {},
  baseWidth: conf?.baseWidth ?? 375,
  baseHeight: conf?.baseHeight ?? 812,
  theme: 'light' as Theme,
};

export default settings;
