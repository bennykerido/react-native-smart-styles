import {useMemo} from 'react';
import {StyleSheet} from "react-native";
import NamedStyles = StyleSheet.NamedStyles;
import SmartStyles from "./SmartStyles";
import {getTheme} from "./utils";

export default function useTheme<T>(styles: NamedStyles<T>) {
    return useMemo(() => SmartStyles.create(styles), [styles, getTheme()]);
}
