"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatStyles = void 0;
const react_native_1 = require("react-native");
const utils_1 = require("./utils");
const property_mapping_1 = require("./property-mapping");
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
    if (typeof property_mapping_1.normalizedProperties[key] === 'function') {
        if (typeof object[key] === 'number') {
            object[key] = property_mapping_1.normalizedProperties[key](object[key]);
        }
        else if (typeof object[key] === 'string') {
            if (object[key].charAt(0) === 'w') {
                const value = parseInt(object[key].replace('w', ''), 10);
                object[key] = (0, utils_1.wp)(value);
            }
            else if (object[key].charAt(0) === 'h') {
                const value = parseInt(object[key].replace('h', ''), 10);
                object[key] = (0, utils_1.hp)(value);
            }
            else if (key === 'fontFamily') {
                object[key] = property_mapping_1.normalizedProperties[key](object[key]);
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
};
exports.default = SmartStyles;
