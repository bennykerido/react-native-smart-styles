"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const react_native_mmkv_1 = require("react-native-mmkv");
/**
 * React hook to listen to color theme changes.
 *
 * This hook allows your component to react to changes in the application's color theme.
 * It returns the current theme type, which can be either 'dark' or 'light'.
 *
 * @function
 * @name useTheme
 * @returns {SmartStylesTheme} - The current theme, either 'dark' or 'light'.
 *
 * @example
 * import { useTheme, SmartStylesTheme } from 'react-native-smart-styles';
 *
 * const MyComponent = () => {
 *   const theme = useTheme();
 *
 *   return (
 *     <div style={{ background: theme === SmartStylesTheme.DARK ? '#000' : '#fff' }}>
 *       Current theme: {theme}
 *     </div>
 *   );
 * };
 *
 * export default MyComponent;
 */
function useTheme() {
    const [theme] = (0, react_native_mmkv_1.useMMKVString)('theme', utils_1.storageInstance);
    return theme;
}
exports.default = useTheme;
