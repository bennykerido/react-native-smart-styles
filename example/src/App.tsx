import * as React from 'react';

import {View, Text, Button} from 'react-native';
import {SmartStyles, tc, toggleTheme, useTheme, useThemeStyles} from "react-native-smart-styles";

export default function App() {
  const theme = useTheme();
  const styles = useThemeStyles(unformattedStyles);

  return (
    <View style={styles.container}>
      <Text>Active Theme: {theme}</Text>
      <Button
        onPress={toggleTheme}
        title={'Toggle Theme'}
      />
    </View>
  );
}

const unformattedStyles = SmartStyles.helper({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: tc('black', 'white'),
  },
});
