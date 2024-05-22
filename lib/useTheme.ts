import {storageInstance} from "./utils";
import {useMMKVString} from "react-native-mmkv";
import {SmartStylesTheme} from "../types/global";

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
export default function useTheme(): SmartStylesTheme {
    const [theme] = useMMKVString('theme', storageInstance) as [SmartStylesTheme, any];
    return theme;
}
