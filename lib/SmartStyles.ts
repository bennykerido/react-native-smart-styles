import {StyleSheet} from "react-native";
import NamedStyles = StyleSheet.NamedStyles;
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
        if (typeof object[key] === 'number') {
            object[key] = normalizedProperties[key](object[key]);
        } else if (typeof object[key] === 'string') {
            if (object[key].charAt(0) === 'w') {
                const value = parseInt(object[key].replace('w', ''), 10);
                object[key] = wp(value);
            } else if (object[key].charAt(0) === 'h') {
                const value = parseInt(object[key].replace('h', ''), 10);
                object[key] = hp(value);
            } else if (key === 'fontFamily') {
                object[key] = normalizedProperties[key](object[key]);
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

const SmartStyles = {
    create: function<T>(styleSheet: NamedStyles<T>) {
        return StyleSheet.create(formatStyles(styleSheet))
    },
};

export default SmartStyles;
