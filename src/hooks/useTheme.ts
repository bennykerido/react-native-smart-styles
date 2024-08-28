import React from 'react';
import SmartStyles from "../smart-styles/SmartStyles";
import {getTheme} from "../utils";
import { type SmartStylesTypes } from '../@types';

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
export default function useTheme(): SmartStylesTypes.Theme {
    const [activeTheme, setActiveTheme] = React.useState<SmartStylesTypes.Theme>('light' as SmartStylesTypes.Theme);
    React.useEffect(() => {
      getTheme().then(theme => setActiveTheme(theme as SmartStylesTypes.Theme));
      const listener: string = SmartStyles.addThemeListener((theme: string) => {
        setActiveTheme(theme as SmartStylesTypes.Theme);
      });

      return () => SmartStyles.removeThemeListener(listener);
    }, []);
    return activeTheme;
}
