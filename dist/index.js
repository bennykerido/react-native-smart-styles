"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.widthPixel = exports.heightPixel = exports.wp = exports.hp = exports.tc = exports.themeColor = exports.setColorsPalette = exports.setFontFamilies = exports.useTheme = exports.SmartStyles = void 0;
const utils_1 = require("./lib/utils");
Object.defineProperty(exports, "setFontFamilies", { enumerable: true, get: function () { return utils_1.setFontFamilies; } });
Object.defineProperty(exports, "setColorsPalette", { enumerable: true, get: function () { return utils_1.setColorsPalette; } });
Object.defineProperty(exports, "themeColor", { enumerable: true, get: function () { return utils_1.themeColor; } });
Object.defineProperty(exports, "tc", { enumerable: true, get: function () { return utils_1.tc; } });
Object.defineProperty(exports, "hp", { enumerable: true, get: function () { return utils_1.hp; } });
Object.defineProperty(exports, "wp", { enumerable: true, get: function () { return utils_1.wp; } });
Object.defineProperty(exports, "heightPixel", { enumerable: true, get: function () { return utils_1.heightPixel; } });
Object.defineProperty(exports, "widthPixel", { enumerable: true, get: function () { return utils_1.widthPixel; } });
const SmartStyles_1 = __importDefault(require("./lib/SmartStyles"));
exports.SmartStyles = SmartStyles_1.default;
const useTheme_1 = __importDefault(require("./lib/useTheme"));
exports.useTheme = useTheme_1.default;
