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
        if (typeof object[key] === 'number' ||
            (typeof object[key] === "string" && key === 'fontFamily')
        ) {
            object[key] = normalizedProperties[key](object[key]);
        } else if (typeof object[key] === 'string') {
            const regex = /([hHwW])(\d+)/;
            const match = object[key].match(regex);
            const dimension = (match[1] as string).toLowerCase();
            const value = Number(match[2]);
            object[key] = dimension === 'h' ? hp(value) : wp(value);
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
