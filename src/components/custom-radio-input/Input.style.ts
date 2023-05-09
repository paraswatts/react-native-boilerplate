import { ScreenWidth } from "@freakycoder/react-native-helpers";
import { ExtendedTheme } from "@react-navigation/native";
import { palette } from "@theme/themes";
import { ViewStyle, StyleSheet } from "react-native";
import { _scaleText } from "utils";

interface Style {
  container: ViewStyle;
  input: ViewStyle;
  error: ViewStyle;
  optionContainer: (include: boolean) => ViewStyle;
  option: ViewStyle;
}

export default (theme: ExtendedTheme) => {
  const { colors } = theme;
  return StyleSheet.create<Style>({
    container: {
      padding: _scaleText(16).fontSize,
      marginTop: _scaleText(16).fontSize,
      borderWidth: 1,
      borderRadius: 8,
      width: ScreenWidth * 0.9,
      borderColor: colors.borderColor,
      backgroundColor: colors.dynamicBackground,
    },
    input: {
      backgroundColor: colors.cultured,
      height: _scaleText(45).fontSize,
      marginTop: _scaleText(6).fontSize,
      borderRadius: 50,
      paddingHorizontal: _scaleText(16).fontSize,
    },
    error: {
      marginTop: _scaleText(4).fontSize,
    },
    optionContainer: (include: boolean) => ({
      flexDirection: "row",
      width: "100%",
      alignItems: "center",
      backgroundColor: include
        ? palette.white
        : colors.platinum,
      marginBottom: _scaleText(24).fontSize,
      padding: _scaleText(12).fontSize,
      borderRadius: 100,
      justifyContent: "center",
    }),
    option: {
      alignItems: "center",
      justifyContent: "center",
      position: "absolute",
      left: 8,
      width: _scaleText(30).fontSize,
      height: _scaleText(30).fontSize,
      borderRadius: 30,
      backgroundColor: colors.lumber,
    }
  });
};
