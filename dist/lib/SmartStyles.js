"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatStyles = void 0;
const react_native_1 = require("react-native");
const utils_1 = require("../react-native-smart-styles/lib/utils");
const property_mapping_1 = require("../react-native-smart-styles/lib/property-mapping");
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
    var _a, _b, _c;
    if (typeof property_mapping_1.normalizedProperties[key] === 'function' && !key.toLowerCase().includes('color')) {
        if (typeof object[key] === 'number' ||
            (typeof object[key] === "string" && key === 'fontFamily')) {
            object[key] = property_mapping_1.normalizedProperties[key](object[key]);
        }
        else if (typeof object[key] === 'string') {
            const regex = /([hHwW]?)\s*(\d+)\s*(r?)/i;
            const match = object[key].match(regex);
            if (match) {
                const dimension = (_a = match[1]) === null || _a === void 0 ? void 0 : _a.toLowerCase();
                const value = Number(match[2]);
                const shouldRound = (_c = ((_b = match[3]) === null || _b === void 0 ? void 0 : _b.toLowerCase()) === 'r') !== null && _c !== void 0 ? _c : false;
                if (dimension && value) {
                    object[key] = dimension === 'h' ? (0, utils_1.hp)(value, shouldRound) : (0, utils_1.wp)(value, shouldRound);
                }
                else if (!dimension && !!value && shouldRound) {
                    object[key] = property_mapping_1.normalizedProperties[key](value, true);
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
/**
 * SmartStyles
 *
 * An object providing utility functions for creating and managing stylesheets
 * in a React Native application. It offers methods to create formatted stylesheets
 * and to assist in writing stylesheets with auto-complete support.
 */
const SmartStyles = {
    /**
     * Formats the given stylesheet object.
     *
     * This function takes a stylesheet object and formats it according to the application's
     * active color theme (upon creation). It processes the styles and returns a formatted version of the stylesheet.
     *
     * @function
     * @name SmartStyles.create
     * @returns {Object} - The formatted stylesheet object.
     *
     * @example
     * const formattedStyles = SmartStyles.create({
     *   container: {
     *     backgroundColor: '#fff',
     *   },
     * });
     */
    create: function (styleSheet) {
        return react_native_1.StyleSheet.create(formatStyles(styleSheet));
    },
    /**
     * Helps in writing stylesheets with auto-complete support.
     *
     * This function assists in writing stylesheets by providing auto-complete
     * support for the properties and values. It does not format the stylesheet.
     *
     * @function
     * @name SmartStyles.helper
     * @returns {Object} - The same stylesheet object, intended for further formatting.
     *
     * @example
     * const unformattedStyles = SmartStyles.helper({
     *   container: {
     *     backgroundColor: tc('#fff', '#000'),
     *   },
     * });
     */
    helper: function (styleSheet) {
        return styleSheet;
    }
};
exports.default = SmartStyles;
