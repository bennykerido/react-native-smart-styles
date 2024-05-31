import {getFont, hp, wp} from "../utils";

type normalizedProperty = {[property: string]: Function};
export const normalizedProperties: normalizedProperty = {
    // FONTS
    fontFamily: getFont,
    fontSize: hp,
    letterSpacing: wp,
    lineHeight: hp,

    // POSITION
    top: hp,
    bottom: hp,
    left: wp,
    right: wp,

    // WIDTH
    width: wp,
    maxWidth: wp,
    minWidth: wp,

    // HEIGHT
    height: hp,
    maxHeight: hp,
    minHeight: hp,

    // MARGIN
    margin: wp,
    marginLeft: wp,
    marginRight: wp,
    marginHorizontal: wp,
    marginEnd: wp,
    marginStart: wp,
    marginTop: hp,
    marginBottom: hp,
    marginVertical: hp,

    // PADDING
    padding: wp,
    paddingRight: wp,
    paddingLeft: wp,
    paddingHorizontal: wp,
    paddingEnd: wp,
    paddingStart: wp,
    paddingTop: hp,
    paddingBottom: hp,
    paddingVertical: hp,

    // OFFSET
    x: wp,
    y: hp,

    // TRANSFORM
    translate: wp,
    translateX: wp,
    translateY: hp,
};
