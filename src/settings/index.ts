import config from "../config";
import { type SmartStylesTypes } from '../@types';
const conf = config as SmartStylesTypes.ConfigFile;
const settings: SmartStylesTypes.Settings = {
  fontFamilies: conf?.fonts ?? {},
  colorsPalette: conf?.colors ?? {},
  baseWidth: conf?.baseWidth ?? 375,
  baseHeight: conf?.baseHeight ?? 812,
  theme: 'light' as SmartStylesTypes.Theme,
};

export default settings;
