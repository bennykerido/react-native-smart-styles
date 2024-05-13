"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatStyles = void 0;
const react_native_1 = require("react-native");
const utils_1 = require("./utils");
const property_mapping_1 = require("./property-mapping");
/* ============= Types ============= */
function convertObject(object) {
    for (const key in object) {
        if (Array.isArray(object[key])) {
            object[key] = object[key].map((element) => convertObject(element));
        }
        else {
            convertValue(object, key);
        }
    }
}
function convertValue(object, key) {
    var _a;
    if (typeof property_mapping_1.normalizedProperties[key] === 'function') {
        if (typeof object[key] === 'number' ||
            (typeof object[key] === "string" && key === 'fontFamily')) {
            object[key] = property_mapping_1.normalizedProperties[key](object[key]);
        }
        else if (typeof object[key] === 'string') {
            const regex = /([hHwW])(\d+)/;
            const match = object[key].match(regex);
            if (match) {
                const dimension = (_a = match[1]) === null || _a === void 0 ? void 0 : _a.toLowerCase();
                if (dimension) {
                    const value = Number(match[2]);
                    object[key] = dimension === 'h' ? (0, utils_1.hp)(value) : (0, utils_1.wp)(value);
                }
            }
        }
    }
    else if (key.toLowerCase().includes('color')) {
        object[key] = (0, utils_1.getColor)(object[key]);
    }
}
function formatStyles(styles) {
    const res = JSON.parse(JSON.stringify(styles));
    for (const key in res) {
        convertObject(res[key]);
    }
    return res;
}
exports.formatStyles = formatStyles;
const SmartStyles = {
    create: function (styleSheet) {
        return react_native_1.StyleSheet.create(formatStyles(styleSheet));
    },
    helper: function (styleSheet) {
        return styleSheet;
    }
};
exports.default = SmartStyles;
