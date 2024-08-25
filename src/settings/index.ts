import config from "../config";
import type { SmartStylesTheme, Settings, ConfigFile } from '../@types/globals';
const conf = config as ConfigFile;
const settings: Settings = {
  fontFamilies: conf?.fonts ?? {},
  colorsPalette: conf?.colors ?? {},
  baseWidth: conf?.baseWidth ?? 375,
  baseHeight: conf?.baseHeight ?? 812,
  theme: 'light' as SmartStylesTheme,
};

export default settings;
