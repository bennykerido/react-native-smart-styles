"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizedProperties = void 0;
const utils_1 = require("./utils");
exports.normalizedProperties = {
    // FONTS
    fontFamily: utils_1.getFont,
    fontSize: utils_1.hp,
    letterSpacing: utils_1.wp,
    lineHeight: utils_1.hp,
    // POSITION
    top: utils_1.hp,
    bottom: utils_1.hp,
    left: utils_1.wp,
    right: utils_1.wp,
    // WIDTH
    width: utils_1.wp,
    maxWidth: utils_1.wp,
    minWidth: utils_1.wp,
    // HEIGHT
    height: utils_1.hp,
    maxHeight: utils_1.hp,
    minHeight: utils_1.hp,
    // MARGIN
    margin: utils_1.wp,
    marginLeft: utils_1.wp,
    marginRight: utils_1.wp,
    marginHorizontal: utils_1.wp,
    marginEnd: utils_1.wp,
    marginStart: utils_1.wp,
    marginTop: utils_1.hp,
    marginBottom: utils_1.hp,
    marginVertical: utils_1.hp,
    // PADDING
    padding: utils_1.wp,
    paddingRight: utils_1.wp,
    paddingLeft: utils_1.wp,
    paddingHorizontal: utils_1.wp,
    paddingEnd: utils_1.wp,
    paddingStart: utils_1.wp,
    paddingTop: utils_1.hp,
    paddingBottom: utils_1.hp,
    paddingVertical: utils_1.hp,
    // OFFSET
    x: utils_1.wp,
    y: utils_1.hp,
    // TRANSFORM
    translate: utils_1.wp,
    translateX: utils_1.wp,
    translateY: utils_1.hp,
};
