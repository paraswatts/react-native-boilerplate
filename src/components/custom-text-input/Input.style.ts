import { ExtendedTheme } from "@react-navigation/native";
import { palette } from "@theme/themes";
import { ViewStyle, StyleSheet, TextStyle } from "react-native";
import { _scaleText } from "utils";

interface Style {
  container: ViewStyle;
  input: TextStyle;
  error: TextStyle;
  label: TextStyle;
  rightLabel: TextStyle;
}

export default (theme: ExtendedTheme) => {
  const { colors } = theme;
  return StyleSheet.create<Style>({
    container: {
      height: _scaleText(45).fontSize,
      marginTop: _scaleText(6).fontSize,
      borderRadius: 50,
      padding: _scaleText(8).fontSize,
      backgroundColor: palette.white,
      flexDirection: "row",
      alignItems: "center",
    },
    input: {
      flex: 1,
      textAlign: "center",
      color: colors.darkGrayText,
      padding: 0,
    },
    error: {
      marginTop: _scaleText(4).fontSize,
    },
    label: {
      position: "absolute",
      backgroundColor: colors.lumber,
      textAlign: "center",
      paddingHorizontal: _scaleText(8).fontSize,
      height: "100%",
      borderRadius: 20,
      justifyContent: "center",
      includeFontPadding: false,
      marginLeft: _scaleText(8).fontSize,
    },
    rightLabel: {
      marginRight: _scaleText(8).fontSize
    }
  });
};
