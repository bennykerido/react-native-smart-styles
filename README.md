[![Buy Me A Beer](https://badgen.net/static/buymeacoffee/Buy%20Me%20A%20Beer?icon=&label=&color=cyan&labelColor=black&cache=300&scale=1.1)](https://www.buymeacoffee.com/bennykerido)
&nbsp;
[![NPM Version](https://badgen.net/npm/v/react-native-smart-styles?icon=npm&color=cyan&labelColor=black&label=Package&cache=300&scale=1.1)](https://www.npmjs.com/package/react-native-smart-styles)
&nbsp;
[![NPM Downloads](https://badgen.net/npm/dt/react-native-smart-styles?icon=npm&color=cyan&labelColor=black&label=Downloads&cache=300&scale=1.1)](https://www.npmjs.com/package/react-native-smart-styles)
&nbsp;
[![NPM License](https://badgen.net/npm/license/react-native-smart-styles?icon=npm&color=cyan&labelColor=black&label=License&cache=300&scale=1.1)](https://github.com/bennykerido/react-native-smart-styles/blob/main/LICENSE.md)
&nbsp;
[![Mimified Size](https://badgen.net/bundlephobia/min/react-native-smart-styles?color=cyan&labelColor=black&label=Minified%20Size&cache=300&scale=1.1)](https://github.com/bennykerido/react-native-smart-styles/blob/main/LICENSE.md)
&nbsp;
![Logo](https://github.com/bennykerido/react-native-smart-styles/blob/main/media/RNSS.png?raw=true)

---
## Table of Contents

1. [Introduction](#introduction)
1. [Installation](#installation)
1. [Configuration](#configuration)
1. [Usage](#usage)
   1. [Creating Styles](#creating-styles)
   1. [Helper Function](#helper-function)
   1. [toggleTheme](#toggletheme)
   1. [getTheme](#gettheme)
   1. [themeColor / tc](#themecolorlightcolor-darkcolor--tclightcolor-darkcolor)
   1. [useTheme](#usethemestylesheet)
   1. [widthPixel / wp](#widthpixelvalue-round--wpvalue-round)
   1. [heightPixel / hp](#heightpixelvalue-round--hpvalue-round)
   1. [Overriding Default Conversion Methods](#overriding-default-conversion-methods)
4. [Contributing](#contributing)


<ul>
<hr/>
<li>

## Introduction
React Native Smart Styles is designed to streamline the creation of style sheets in React Native projects by
automatically adjusting styles to accommodate different screen sizes. This package handles all the heavy lifting,
allowing developers to write styles quickly and easily without the need to manually account for device variability.
</li>
<hr/>

<li>

## Installation
To install the package, run the following command in your terminal:
  ```bash
   npm install react-native-smart-styles
   # or
   yarn add react-native-smart-styles
   
   # after install
   pod install
   ```
> **Note:** If you're facing any issues related to MMKV please refer to `react-native-mmkv` docs for more native
installations at https://github.com/mrousavy/react-native-mmkv/blob/master/README.md

</li>
<hr/>

<li>

## Configuration
<ul>
<li>

### Using `smart-styles.config.json`
  You can customize font names and colors by creating a `smart-styles.config.json` file in the root of your project.
  This JSON file allows you to specify your preferences which will be automatically applied during the package
  installation. Here’s an example of what the file might look like:
  ```json
  {
    "fonts": {
      "primary": "Arial",
      "secondary": "Roboto"
    },
    "colors": {
      "primary": "#333",
      "accent": "#007bff"
    }
  }
  ```
</li>
<li>
    
### Updating Configuration with CLI
  If you need to update your configuration after installation or if the `smart-styles.config.json` file does not
  exist, you can use the provided CLI tool. Simply run the following command:

  ```bash
  smart-styles update
  ```

  This command updates the configuration based on the settings specified in `smart-styles.config.json`.

</li>
</ul>

> **Note**: After updating the config file you might have to re-run the app
</li>
<hr/>
<li>

## Usage
<ul>
    <li>

### Importing
First, import the `SmartStyles` from the package:
```javascript
import {SmartStyles} from 'react-native-smart-styles';
```
</li><li>

### Creating Styles
Use `SmartStyles.create()` to pass your styling object. This method formats the styles according to different screen
sizes:
```javascript
const styles = SmartStyles.create({
container: {
flex: 1,
justifyContent: 'center',
alignItems: 'center',
padding: 20,
},
title: {
fontSize: 20,
fontWeight: 'bold',
}
});
```
</li><li>

### Helper Function
`SmartStyles.helper()` assists in writing stylesheets by providing autocomplete features but does not format the
styles:
```javascript
const unformattedStyles = SmartStyles.helper({
button: {
padding: 10,
margin: 5,
}
});
```
<hr/>
</li><li>

### Theme Related Methods and Hook
  <ul>
  <li>

#### `toggleTheme()`
The `toggleTheme()` function allows you to programmatically toggle the theme of your application between 'dark' and '
light' modes. This function can be easily imported from the `react-native-smart-styles` module and used within your
application to enhance the user
experience by providing theme-switching capabilities.

##### Importing and Usage

You can import and use `toggleTheme()` as follows:

  ```javascript
  import { toggleTheme } from 'react-native-smart-styles';
  // Toggle between 'dark' and 'light' theme
  toggleTheme();
  ```

##### Example
Here's an example of how you might use `toggleTheme()` in a button click handler to allow users to switch themes:

  ```javascript
  import React from 'react';
  import { Button } from 'react-native';
  import { toggleTheme } from 'react-native-smart-styles';

  const ThemeToggleButton = () => {
   return (
     <Button
       title="Toggle Theme"
       onPress={() => toggleTheme()}
     />
   );
  };

  export default ThemeToggleButton;
  ```
This function is particularly useful in apps where users might prefer different themes under different conditions (
e.g., darker themes at night).
   </li><li>

#### `getTheme()`

The `getTheme()` function allows you to retrieve the currently active theme within your application, enabling you to
make conditional decisions based on whether the theme is set to 'dark' or 'light'. This function can be imported from
the `react-native-smart-styles` module.

##### Importing and Usage

You can import and use `getTheme()` as follows:

  ```javascript
  import { getTheme } from 'react-native-smart-styles';

  // Retrieve the current theme
  const currentTheme = getTheme();
  console.log(currentTheme); // Outputs: 'dark' or 'light'
  ```

##### Example

Here's an example of how you might use `getTheme()` to conditionally apply styles based on the current theme:

  ```javascript
  import React from 'react';
  import { Text, View } from 'react-native';
  import { getTheme } from 'react-native-smart-styles';

  const ThemedText = () => {
     const theme = getTheme();
     const textStyle = {
       color: theme === 'dark' ? '#FFF' : '#000',
       backgroundColor: theme === 'dark' ? '#333' : '#CCC'
     };

     return (
       <View style={{ padding: 20 }}>
         <Text style={textStyle}>This text style changes with the theme!</Text>
       </View>
     );
  };

  export default ThemedText;
  ```

This method is especially useful for applications that need to dynamically adjust their appearance based on the
current theme settings, enhancing the user interface's adaptability and responsiveness.
  </li><li>

#### `themeColor(lightColor, darkColor)` / `tc(lightColor, darkColor)`
These functions dynamically specify colors based on the active color scheme and must be used
within `SmartStyles.create()` or `SmartStyles.helper()` to ensure proper functionality. Both `themeColor` and `tc`
perform the same operation and can be used interchangeably.

- **Parameters:**

    |   Argument   |   Type   | Required | Default Value | Description                                                       |
    |:------------:|:--------:|:--------:|:-------------:|:------------------------------------------------------------------|
    | `lightColor` | `string` |    ✅     |    (none)     | The color to be used in the light color scheme.         |
    |   `darkColor`    | `string` |    ✅     |    (none)     | The color to be used in the dark color scheme. |

- **Returns:** A color string that corresponds to the active color scheme, but only when called
  within `SmartStyles.create()` or `SmartStyles.helper()`.

##### Example:
  ```javascript
  import {SmartStyles, themeColor, tc} from 'react-native-smart-styles';

  const styles = SmartStyles.create({
      container: {
          backgroundColor: tc('#fff', '#333'),  // Light mode: white, Dark mode: dark grey
      },
      text: {
          color: themeColor('#000', '#fff'),  // Light mode: black, Dark mode: white
      },
  });

  // The styles object now contains theme-aware properties that adapt based on the active color scheme.
  ```

By integrating these functions directly into your style creation process and forwarding them into `useTheme` (forward
only when using `SmartStyles.helper()`), you ensure that your application's visual elements adapt seamlessly to the
current theme, providing a consistent and user-friendly experience.
  </li><li>

#### `useTheme(stylesheet)`
This hook takes a stylesheet (ideally created using `SmartStyles.helper()`) and returns a formatted stylesheet that
adapts to the active color scheme (either 'dark' or 'light').

- **Parameters:**

  |   Argument   |        Type        | Required | Default Value | Description                                    |
  |:------------:|:------------------:|:--------:|:-------------:|:-----------------------------------------------|
  | `stylesheet` | `NamedStyles<any>` |    ✅     |    (none)     | A style object created by `SmartStyles.helper()`.                                               |
- **Returns:** A style object formatted according to the active color scheme.

##### Example:
  ```javascript
  import { useTheme, tc } from 'react-native-smart-styles';

  const Component = (props) => {
      const styles = useTheme(themedStyles);
      return (
        <View style={styles.container}/>
      );
  };

  const themedStyles = SmartStyles.helper({
      container: {
        padding: 20,
      },
      text: {
        fontSize: 18,
        color: tc('#fff', '#000'),
      }
  });
  ```

This function allows developers to seamlessly integrate theme-based styling in their React Native applications,
ensuring consistency across different user preferences for dark or light modes.

  </li>
  </ul>
<hr/>
</li><li>

#### `widthPixel(value, round)` / `wp(value, round)`

These utility functions calculate and return a size value proportional to the current screen width. Both `widthPixel`
and `wp` perform the same operation and can be used interchangeably. They are particularly useful for dynamic
calculations outside of stylesheets, such as animations or layout calculations, ensuring correct scaling across
different devices.

- **Parameters:**

    | Argument |   Type    | Required | Default Value | Description                                                       |
    |:--------:|:---------:|:--------:|:-------------:|:------------------------------------------------------------------|
    | `value`  | `number`  |    ✅     |    (none)     | The size value to be scaled according to the screen width         |
    | `round`  | `boolean` |    ❌     |    `false`    | Whether to round the resulting value to the nearest whole number. |

- **Returns:** A numeric value scaled proportionally to the screen width, optionally rounded.

##### Example:

```javascript
import {wp} from 'react-native-smart-styles';

const screenWidthPortion = wp(50, true); // Returns the width equivalent to 50 units on the current screen, rounded to the nearest whole number.
```

<hr/>
</li><li>

#### `heightPixel(value, round)` / `hp(value, round)`

Similar to `widthPixel`, these functions calculate and return a size value proportional to the current screen height.
Use `heightPixel` or `hp` to adjust dimensions based on the screen's height for precise layout and animation work.

- **Parameters:**

    | Argument |   Type    | Required | Default Value | Description                                                       |
    |:--------:|:---------:|:--------:|:-------------:|:------------------------------------------------------------------|
    | `value`  | `number`  |    ✅     |    (none)     | The size value to be scaled according to the screen height        |
    | `round`  | `boolean` |    ❌     |    `false`    | Whether to round the resulting value to the nearest whole number. |

- **Returns:** A numeric value scaled proportionally to the screen height, optionally rounded.

##### Example:

```javascript
import {hp} from 'react-native-smart-styles';

const screenHeightPortion = hp(20, true); // Returns the height equivalent to 20 units on the current screen, rounded to the nearest whole number.
```

These functions should not be used directly within `SmartStyles.create()` definitions to avoid double conversion of
values. They are best utilized in contexts where precise, scaled measurements are necessary outside of static styling,
such as in dynamic visual components or animations.

<hr/>
</li><li>

### Overriding Default Conversion Methods

`React Native Smart Styles` allows you to override the default conversion method for dimension properties such
as `width` and `height`. By default, numerical values are scaled relative to the axis they're sitting on. However, you
can specify a different scaling basis using prefixes:

- **`h` Prefix**: Use this prefix to indicate that the value should be calculated relative to the screen height. For
  instance, `h50` will calculate the value as 50 units relative to the height of the screen.

- **`w` Prefix**: This prefix can be used when you want the value to explicitly be calculated based on the screen width,
  which is useful when working with dimensions that must maintain consistent scaling with width.

#### Example of Overriding Conversion

When designing a UI element like a circle that needs to maintain its aspect ratio regardless of screen dimensions, you
might specify:

```javascript
const styles = SmartStyles.create({
    circle: {
        width: 'h100',  // Ensures the width of the circle is always 100 units relative to the screen height
        height: 100     // Automatically calculated relativly to the screen height
    },
    widthCircle: {
        width: 100,     // Automatically calculated relativly to the screen width
        height: 'w100'  // Ensures the height of the circle is always 100 units relative to the screen width
    }
});
```

This feature is particularly useful for maintaining design integrity across devices with varying aspect ratios and
dimensions.
</li>
</ul>
<hr/>
</li>

<li>

## Contributing
Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any
contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also
simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

<ol>
<li>Fork the Project</li>
<li>Create your Feature Branch (`git checkout -b feature/AmazingFeature`)</li>
<li>Commit your Changes (`git commit -m 'Add some AmazingFeature'`)</li>
<li>Push to the Branch (`git push origin feature/AmazingFeature`)</li>
<li>Open a Pull Request</li>
</ol>
</li>
</ul>
