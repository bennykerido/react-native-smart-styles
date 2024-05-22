import {StyleSheet} from "react-native";
import {getColor, hp, wp} from "./utils";
import {normalizedProperties} from "./property-mapping";

function convertObject (object: Record<string, any>) {
    for (const key in object) {
        if (Array.isArray(object[key])) {
            object[key] = object[key].map((element: Record<string, any>) =>
                convertObject(element),
            );
        } else {
            convertValue(object, key);
        }
    }
}

function convertValue (object: Record<string, any>, key: string) {
    if (typeof normalizedProperties[key] === 'function') {
        if (typeof object[key] === 'number' ||
            (typeof object[key] === "string" && key === 'fontFamily')
        ) {
            object[key] = normalizedProperties[key](object[key]);
        } else if (typeof object[key] === 'string') {
            const regex = /([hHwW]?)\s*(\d+)\s*(r?)/i;
            const match = object[key].match(regex);
            if (match) {
                const dimension = match[1]?.toLowerCase();
                const value = Number(match[2]);
                const shouldRound = match[3]?.toLowerCase() === 'r' ?? false;
                if (dimension) {
                    object[key] = dimension === 'h' ? hp(value,shouldRound) : wp(value,shouldRound);
                } else {
                    object[key] = normalizedProperties[key](object[key], shouldRound);
                }
            }
        }
    } else if (key.toLowerCase().includes('color')) {
        object[key] = getColor(object[key]);
    }
}

export function formatStyles<T>(styles: NamedStyles<T>) {
    const res = JSON.parse(JSON.stringify(styles));
    for (const key in res) {
        convertObject(res[key]);
    }
    return res;
}

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
    create: function<T>(styleSheet: NamedStyles<T>): NamedStyles<T> {
        return StyleSheet.create(formatStyles(styleSheet))
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
    helper: function<T>(styleSheet: NamedStyles<T>): NamedStyles<T> {
        return styleSheet;
    }
};

export default SmartStyles;
