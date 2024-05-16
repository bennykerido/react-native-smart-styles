import {useMemo} from 'react';
import {StyleSheet} from "react-native";
import NamedStyles = StyleSheet.NamedStyles;
import SmartStyles from "./SmartStyles";
import {getTheme, storageInstance} from "./utils";
import {useMMKVString} from "react-native-mmkv";

export default function useTheme<T>(styles: NamedStyles<T>) {
    const [theme] = useMMKVString('theme', storageInstance);
    return useMemo(() => SmartStyles.create(styles), [styles, theme]);
}
