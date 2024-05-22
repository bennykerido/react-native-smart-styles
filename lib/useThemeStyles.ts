import {useMemo} from 'react';
import {StyleSheet} from "react-native";
import NamedStyles = StyleSheet.NamedStyles;
import SmartStyles from "./SmartStyles";
import {storageInstance} from "./utils";
import {useMMKVString} from "react-native-mmkv";
import {SmartStylesTheme} from "../types/global";

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
export default function useThemeStyles<T>(styles: NamedStyles<T>): NamedStyles<T>{
    const [theme] = useMMKVString('theme', storageInstance) as [SmartStylesTheme, any];
    return useMemo(() => SmartStyles.create(styles), [styles, theme]);
}
