![Logo](media/RNSS.png)

## Introduction
React Native Smart Styles is designed to streamline the creation of style sheets in React Native projects by automatically adjusting styles to accommodate different screen sizes. This package handles all the heavy lifting, allowing developers to write styles quickly and easily without the need to manually account for device variability.

## Installation
To install the package, run the following command in your terminal:
```bash
npm install https://github.com/bennykerido/react-native-smart-styles.git
# or
yarn add https://github.com/bennykerido/react-native-smart-styles.git
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

### Updating Configuration with CLI
If you need to update your configuration after installation or if the `smart-styles.config.json` file does not exist, you can use the provided CLI tool. Simply run the following command:

```bash
smart-styles update
```

This command updates the configuration based on the settings specified in `smart-styles.config.json`.


## Usage

### Importing
First, import the `SmartStyles` from the package:
```javascript
import {SmartStyles} from 'react-native-smart-styles';
```

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
