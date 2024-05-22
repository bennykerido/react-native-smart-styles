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

<p align="center">
    <img src="https://github.com/bennykerido/react-native-smart-styles/blob/main/media/RNSS-Transparent.png?raw=true" alt="Logo" />
</p>

---
## Table of Contents

1. [Introduction](#introduction)
1. [Installation](#installation)
1. [Configuration](#configuration)
1. [API Reference](#api-reference)
   1. [Creating Styles](#creating-styles)
   1. [Helper Function](#helper-function)
   1. [Theme Related Methods And Hook](#theme-related-methods-and-hook)
      1. [toggleTheme](#toggletheme)
      1. [getTheme](#gettheme)
      1. [themeColor / tc](#themecolorlightcolor-darkcolor--tclightcolor-darkcolor)
      1. [useThemeStyles](#usethemestylesheet)
   1. [widthPixel / wp](#widthpixelvalue-round--wpvalue-round)
   1. [heightPixel / hp](#heightpixelvalue-round--hpvalue-round)
   1. [Overriding Default Conversion Methods](#overriding-default-conversion-methods)
1. [Migrating to v0.0.4](#migrating-to-v004)
1. [Contributing](#contributing)


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

## API Reference
- [`SmartStyles.create()`](https://www.bennykerido.dev/react-native-smart-styles/docs/api/creating-styles#creating-styles)
- [`SmartStyles.helper()`](https://www.bennykerido.dev/react-native-smart-styles/docs/api/creating-styles#helper-function)
- **Theme Related**
    - [`toggleTheme()`](https://www.bennykerido.dev/react-native-smart-styles/docs/api/theme-related#toggletheme)
    - [`getTheme()`](https://www.bennykerido.dev/react-native-smart-styles/docs/api/theme-related#gettheme)
    - [`themeColor()/tc()`](https://www.bennykerido.dev/react-native-smart-styles/docs/api/theme-related#themecolor--tc)
    - [`useThemeStyles()`](https://www.bennykerido.dev/react-native-smart-styles/docs/api/theme-related#usethemestyles)
    - [`useTheme()`](https://www.bennykerido.dev/react-native-smart-styles/docs/api/theme-related#usetheme)
- [`widthPixel()`/`wp()`](https://www.bennykerido.dev/react-native-smart-styles/docs/api/utility-functions#widthpixel--wp)
- [`heightPixel()`/`hp()`](https://www.bennykerido.dev/react-native-smart-styles/docs/api/utility-functions#heightpixel--hp)
- [*Snippets*](https://www.bennykerido.dev/react-native-smart-styles/docs/snippets) ⁠

</li>
<li>

## Migrating to v0.0.4
If you previously used `useTheme` to obtain themed styles, you will need to replace it with `useThemeStyles` in your code. Here is an example of how to update your code:

#### Before (v0.0.3)
```javascript
import { useTheme } from 'react-native-smart-styles';

const MyComponent = () => {
  const styles = useTheme(unformattedStyles); // Returns styles object
  return <View style={styles.container}></View>;
};
```

#### After (v0.0.4)
```javascript
import { useThemeStyles } from 'react-native-smart-styles';

const MyComponent = () => {
  const styles = useThemeStyles(unformattedStyles); // New hook for obtaining themed styles
  return <View style={styles.container}></View>;
};

// If you need to access the theme directly:
import { useTheme } from 'react-native-smart-styles';

const MyOtherComponent = () => {
  const theme = useTheme(); // Returns 'dark' or 'light'
  return <Text>{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</Text>;
};
```
> **Note:** For more information please refer to the [docs](https://www.bennykerido.dev/react-native-smart-styles/docs/migration)

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
