import React from 'react';
import SmartStyles from "../smart-styles/SmartStyles";
import {getTheme} from "../utils";
import type { Theme } from '../types';

/**
 * React hook to listen to color theme changes.
 *
 * This hook allows your component to react to changes in the application's color theme.
 * It returns the current theme type, which can be either 'dark' or 'light'.
 *
 * @function
 * @name useTheme
 * @returns {Theme} - The current theme, either 'dark' or 'light'.
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
export default function useTheme(): Theme {
    const [activeTheme, setActiveTheme] = React.useState<Theme>('light' as Theme);
    React.useEffect(() => {
      getTheme().then(theme => setActiveTheme(theme as Theme));
      const listener: string = SmartStyles.addThemeListener((theme: string) => {
        setActiveTheme(theme as Theme);
      });

      return () => SmartStyles.removeThemeListener(listener);
    }, []);
    return activeTheme;
}
