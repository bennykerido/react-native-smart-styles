"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const SmartStyles_1 = __importDefault(require("./SmartStyles"));
const utils_1 = require("./utils");
const react_native_mmkv_1 = require("react-native-mmkv");
/**
 * React hook to listen to color theme changes and return formatted styles.
 *
 * This hook allows your component to react to changes in the application's color theme
 * and provides a styles object that is formatted based on the active color theme.
 *
 * @function
 * @name useThemeStyles
 * @param {Object} unformattedStyles - A stylesheet object created using `SmartStyles.helper()`.
 * @returns {Object} - A styles object formatted according to the current theme.
 *
 * @example
 * import { tc, SmartStyles, useThemeStyles } from 'react-native-smart-styles';
 *
 * const MyComponent = () => {
 *   const styles = useThemeStyles(unformattedStyles);
 *
 *   return (
 *     <div style={styles.container}>
 *       This is a themed container.
 *     </div>
 *   );
 * };
 *
 * export default MyComponent;
 *
 * const unformattedStyles = SmartStyles.helper({
 *   container: {
 *     backgroundColor: tc('#fff', '#000'),
 *   },
 * });
 */
function useThemeStyles(styles) {
    const [theme] = (0, react_native_mmkv_1.useMMKVString)('theme', utils_1.storageInstance);
    return (0, react_1.useMemo)(() => SmartStyles_1.default.create(styles), [styles, theme]);
}
exports.default = useThemeStyles;
