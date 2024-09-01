import * as React from 'react';
import { SmartStyles, tc, toggleTheme, withTheme } from 'react-native-smart-styles';
import { Button, Text, View } from 'react-native';

function App({theme}: {theme: string}) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Active Theme: {theme}</Text>
      <Button
        onPress={toggleTheme}
        title={'Toggle Theme'}
      />
    </View>
  );
}

export default withTheme(App);


const styles = SmartStyles.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: tc('white', 'black'),
  },
  text: {
    color: tc('black', 'white'),
  }
});
