"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const SmartStyles_1 = __importDefault(require("./SmartStyles"));
const utils_1 = require("./utils");
const react_native_mmkv_1 = require("react-native-mmkv");
function useTheme(styles) {
    const [theme] = (0, react_native_mmkv_1.useMMKVString)('theme', utils_1.storageInstance);
    return (0, react_1.useMemo)(() => SmartStyles_1.default.create(styles), [styles, theme]);
}
exports.default = useTheme;
