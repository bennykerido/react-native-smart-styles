"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureSmartStyles = exports.tc = exports.themeColor = exports.setColorsPalette = exports.setFontFamilies = exports.SmartStyles = void 0;
const utils_1 = require("./lib/utils");
Object.defineProperty(exports, "configureSmartStyles", { enumerable: true, get: function () { return utils_1.configureSmartStyles; } });
Object.defineProperty(exports, "setFontFamilies", { enumerable: true, get: function () { return utils_1.setFontFamilies; } });
Object.defineProperty(exports, "setColorsPalette", { enumerable: true, get: function () { return utils_1.setColorsPalette; } });
Object.defineProperty(exports, "themeColor", { enumerable: true, get: function () { return utils_1.themeColor; } });
Object.defineProperty(exports, "tc", { enumerable: true, get: function () { return utils_1.tc; } });
const SmartStyles_1 = __importDefault(require("./lib/SmartStyles"));
exports.SmartStyles = SmartStyles_1.default;
