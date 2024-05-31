import {StyleSheet, NativeModules, Platform} from "react-native";
import {getColor, hp, wp} from "../utils";
import {normalizedProperties} from "../mapping";
import settings from "../settings";

const LINKING_ERROR =
  `The package 'react-native-smart-styles' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

export const SmartStylesNativeModule = NativeModules.SmartStyles
  ? NativeModules.SmartStyles
  : new Proxy(
    {},
    {
      get() {
        throw new Error(LINKING_ERROR);
      },
    }
  );
(async () => {
  settings.theme = await SmartStylesNativeModule.getTheme();
})();

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
    if (typeof normalizedProperties[key] === 'function' && !key.toLowerCase().includes('color')) {
        if (typeof object[key] === 'number' ||
            (typeof object[key] === "string" && key === 'fontFamily')
        ) {
            object[key] = normalizedProperties[key]?.(object[key]);
        } else if (typeof object[key] === 'string') {
            const regex = /([hHwW]?)\s*(\d+)\s*(r?)/i;
            const match = object[key].match(regex);
            if (match) {
                const dimension = match[1]?.toLowerCase();
                const value = Number(match[2]);
                const shouldRound = match[3]?.toLowerCase() === 'r' ?? false;
                if (dimension && value) {
                    object[key] = dimension === 'h' ? hp(value,shouldRound) : wp(value,shouldRound);
                } else if (!dimension && !!value && shouldRound) {
                    object[key] = normalizedProperties[key]?.(value, true);
                }
            }
        }
    } else if (key.toLowerCase().includes('color')) {
        object[key] = getColor(object[key]);
    }
}

export function formatStyles<T>(styles: SmartStylesNamedStyles<T>) {
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

class SmartStylesClass {
  eventListeners: Array<SmartStylesThemeListener>;
  constructor() {
    this.eventListeners = [];
  }
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
  create<T>(styleSheet: SmartStylesNamedStyles<T>): SmartStylesNamedStyles<T> {
    return StyleSheet.create(formatStyles(styleSheet))
  }

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
  helper<T>(styleSheet: SmartStylesNamedStyles<T>): SmartStylesNamedStyles<T> {
    return styleSheet;
  }

  addThemeListener(listener: ThemeListener) {
    const listenerKey = this.getListenerKey();
    this.eventListeners.push({
      key: listenerKey,
      listener: listener,
    });
    return listenerKey;
  }

  removeThemeListener(key: string) {
    this.eventListeners = this.eventListeners.filter((listener) => listener.key !== key);
  }

  async notifyThemeListeners() {
    const theme = await SmartStylesNativeModule.getTheme();
    this.eventListeners.forEach((eventListener: SmartStylesThemeListener) => {
      eventListener.listener(theme);
    });
  }

  private getListenerKey(): string {
    const ABC = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*(';
    const res = [];
    for (let i = 0; i < 5; i++) {
      const char = ABC.charAt(Math.floor(Math.random() * ABC.length));
      res.push(char);
    }
    return res.join('');
  }

}

const SmartStyles = new SmartStylesClass();

export default SmartStyles;
