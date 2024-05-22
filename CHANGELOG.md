# Changelog

## v0.0.4

### Added
1. Functions and hooks documentations in the JavaScript files.
2. New `useTheme` hook with different functionality, now returns a string with 'dark' or 'light' based on the active theme.
3. 'r' snippet for dimensions values, which will indicate the conversion function to round the result.
4. Enum that can be imported from the main package called `SmartStylesTheme` with `DARK` and `LIGHT`.

### Changed
1. `useTheme` to `useThemeStyles`.
2. 'w' and 'h' snippets to work with 'r' snippet and now can find all of the following variations: `h98r`, `h 98r`, `h98 r`, and `h 98 r`. All of the snippets are optional and can be passed as upper or lower case text.
