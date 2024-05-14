[![NPM Version](https://img.shields.io/npm/v/react-native-smart-styles.svg?style=flat)]()[![NPM Downloads](https://img.shields.io/npm/d18m/react-native-smart-styles.svg?style=flat)]()[![NPM License](https://img.shields.io/npm/l/react-native-smart-styles.svg?style=flat)](https://github.com/bennykerido/react-native-smart-styles/blob/main/LICENSE.md)
![Logo](https://github.com/bennykerido/react-native-smart-styles/blob/main/media/RNSS.png?raw=true)
[![NPM](https://nodei.co/npm/react-native-smart-styles.png?downloads=true)](https://www.npmjs.com/package/react-native-smart-styles)
## Table of Contents
1. [Introduction](#introduction)
2. [Installation](#installation)
3. [Configuration](#configuration)
4. [Usage](#usage)
   - [Creating Styles](#creating-styles)
   - [Helper Function](#helper-function)
   - [themeColor / tc](#themecolorlightcolor-darkcolor--tclightcolor-darkcolor)
   - [useTheme](#usethemestylesheet)
   - [widthPixel / wp](#widthpixelvalue-round--wpvalue-round)
   - [heightPixel / hp](#heightpixelvalue-round--hpvalue-round)
   - [Overriding Default Conversion Methods](#overriding-default-conversion-methods)
5. [Contributing](#contributing)

## Introduction
React Native Smart Styles is designed to streamline the creation of style sheets in React Native projects by automatically adjusting styles to accommodate different screen sizes. This package handles all the heavy lifting, allowing developers to write styles quickly and easily without the need to manually account for device variability.

---

## Installation
To install the package, run the following command in your terminal:
```bash
npm install react-native-smart-styles
# or
yarn add react-native-smart-styles
```

---

## Configuration

### Using `smart-styles.config.json`
You can customize font names and colors by creating a `smart-styles.config.json` file in the root of your project. This JSON file allows you to specify your preferences which will be automatically applied during the package installation. Here’s an example of what the file might look like:

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

---

### Updating Configuration with CLI
If you need to update your configuration after installation or if the `smart-styles.config.json` file does not exist, you can use the provided CLI tool. Simply run the following command:

```bash
smart-styles update
```

This command updates the configuration based on the settings specified in `smart-styles.config.json`.
> **Note**: After updating the config file you might have to re-run the app

---

## Usage

### Importing
First, import the `SmartStyles` from the package:
```javascript
import {SmartStyles} from 'react-native-smart-styles';
```

---

### Creating Styles
Use `SmartStyles.create()` to pass your styling object. This method formats the styles according to different screen sizes:
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

---

### Helper Function
`SmartStyles.helper()` assists in writing stylesheets by providing autocomplete features but does not format the styles:
```javascript
const unformattedStyles = SmartStyles.helper({
  button: {
    padding: 10,
    margin: 5,
  }
});
```

To reflect the specific usage requirements of the `themeColor` and `tc` functions, here's an updated description for your README that includes these important details:

---

### `themeColor(lightColor, darkColor)` / `tc(lightColor, darkColor)`
These functions dynamically specify colors based on the active color scheme and must be used within `SmartStyles.create()` or `SmartStyles.helper()` to ensure proper functionality. Both `themeColor` and `tc` perform the same operation and can be used interchangeably.

- **Parameters:**
  - `lightColor`: The color to be used in the light color scheme.
  - `darkColor`: The color to be used in the dark color scheme.
- **Returns:** A color string that corresponds to the active color scheme, but only when called within `SmartStyles.create()` or `SmartStyles.helper()`.

**Example:**
```javascript
import {SmartStyles, themeColor, tc} from 'react-native-smart-styles';

const styles = SmartStyles.create({
  container: {
    backgroundColor: tc('#fff', '#333'),  // Light mode: white, Dark mode: dark grey
  },
  text: {
    color: themeColor('#000', '#fff'),  // Light mode: black, Dark mode: white
  }
});

// The styles object now contains theme-aware properties that adapt based on the active color scheme.
```

By integrating these functions directly into your style creation process and forwarding them into `useTheme` (if using `SmartStyles.helper()`), you ensure that your application's visual elements adapt seamlessly to the current theme, providing a consistent and user-friendly experience.

---

### `useTheme(stylesheet)`
This hook takes a stylesheet (ideally created using `SmartStyles.helper()`) and returns a formatted stylesheet that adapts to the active color scheme (either 'dark' or 'light').

- **Parameters:**
  - `stylesheet`: A style object created by `SmartStyles.helper()`.
- **Returns:** A style object formatted according to the active color scheme.

**Example:**
```javascript
import { useTheme, tc } from 'react-native-smart-styles';

const Component = (props) => {
  const styles = useTheme(themedStyles);
  return (
    <View style={styles.container}>
    </View>
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

This function allows developers to seamlessly integrate theme-based styling in their React Native applications, ensuring consistency across different user preferences for dark or light modes.

---

### `widthPixel(value, round)` / `wp(value, round)`
These utility functions calculate and return a size value proportional to the current screen width. Both `widthPixel` and `wp` perform the same operation and can be used interchangeably. They are particularly useful for dynamic calculations outside of stylesheets, such as animations or layout calculations, ensuring correct scaling across different devices.

- **Parameters:**
  - `value`: The size value to be scaled according to the screen width.
  - `round` (optional, default `false`): Whether to round the resulting value to the nearest whole number.
- **Returns:** A numeric value scaled proportionally to the screen width, optionally rounded.

**Example:**
```javascript
import { wp } from 'react-native-smart-styles';

const screenWidthPortion = wp(50, true); // Returns the width equivalent to 50 units on the current screen, rounded to the nearest whole number.
```

---

### `heightPixel(value, round)` / `hp(value, round)`
Similar to `widthPixel`, these functions calculate and return a size value proportional to the current screen height. Use `heightPixel` or `hp` to adjust dimensions based on the screen's height for precise layout and animation work.

- **Parameters:**
  - `value`: The size value to be scaled according to the screen height.
  - `round` (optional, default `false`): Whether to round the resulting value to the nearest whole number.
- **Returns:** A numeric value scaled proportionally to the screen height, optionally rounded.

**Example:**
```javascript
import { hp } from 'react-native-smart-styles';

const screenHeightPortion = hp(20, true); // Returns the height equivalent to 20 units on the current screen, rounded to the nearest whole number.
```

These functions should not be used directly within stylesheet definitions to avoid double conversion of values. They are best utilized in contexts where precise, scaled measurements are necessary outside of static styling, such as in dynamic visual components or animations.

---

## Overriding Default Conversion Methods

`React Native Smart Styles` allows you to override the default conversion method for dimension properties such as `width` and `height`. By default, numerical values are scaled relative to the axis they're sitting on. However, you can specify a different scaling basis using prefixes:

- **`h` Prefix**: Use this prefix to indicate that the value should be calculated relative to the screen height. For instance, `h50` will calculate the value as 50 units relative to the height of the screen.
  
- **`w` Prefix**: This prefix can be used when you want the value to explicitly be calculated based on the screen width, which is useful when working with dimensions that must maintain consistent scaling with width.

### Example of Overriding Conversion

When designing a UI element like a circle that needs to maintain its aspect ratio regardless of screen dimensions, you might specify:

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

This feature is particularly useful for maintaining design integrity across devices with varying aspect ratios and dimensions.

---

## Contributing
Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

This format should help you avoid any issues when you add the Markdown yourself later!
