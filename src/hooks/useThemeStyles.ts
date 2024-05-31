import {useMemo} from 'react';
import SmartStyles from "../smart-styles/SmartStyles";
import useTheme from "./useTheme";

/**
 * React hook to listen to color theme changes and return formatted styles.
 *
 * This hook allows your component to react to changes in the application's color theme
 * and provides a styles object that is formatted based on the active color theme.
 *
 * @function
 * @name useThemeStyles
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
 * @param styles
 */
export default function useThemeStyles<T>(styles: SmartStylesNamedStyles<T>): SmartStylesNamedStyles<T>{
    const theme = useTheme();
    return useMemo(() => SmartStyles.create(styles), [styles, theme]);
}
