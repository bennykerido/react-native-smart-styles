"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const SmartStyles_1 = __importDefault(require("./SmartStyles"));
const utils_1 = require("./utils");
function useTheme(styles) {
    return (0, react_1.useMemo)(() => SmartStyles_1.default.create(styles), [styles, (0, utils_1.getTheme)()]);
}
exports.default = useTheme;
