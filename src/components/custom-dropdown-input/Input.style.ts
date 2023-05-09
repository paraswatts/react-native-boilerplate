import { ScreenHeight } from "@freakycoder/react-native-helpers";
import { ExtendedTheme } from "@react-navigation/native";
import { palette } from "@theme/themes";
import { ViewStyle, StyleSheet, TextStyle } from "react-native";
import { _scaleText } from "utils";

interface Style {
  container: ViewStyle;
  input: ViewStyle;
  error: ViewStyle;
  optionsContainer: (include: boolean) => ViewStyle;
  option: ViewStyle;
  optionText: TextStyle;
  listContainer: ViewStyle;
}

export default (theme: ExtendedTheme, addMarginTop: boolean) => {
  const { colors } = theme;
  return StyleSheet.create<Style>({
    listContainer: {
      paddingHorizontal: _scaleText(8).fontSize,
      maxHeight: ScreenHeight * 0.32
    },
    container: {
      marginTop: addMarginTop ? _scaleText(24).fontSize : 0,
      backgroundColor: palette.white,
      borderRadius: 24,
      paddingHorizontal: _scaleText(8).fontSize,
      paddingVertical: _scaleText(16).fontSize,
      shadowOpacity: 0.2,
      shadowRadius: 3,
      shadowOffset: {
        height: 0,
        width: 0,
      },
      elevation: 2,
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
    optionsContainer: (include: boolean) => ({
      flexDirection: "row",
      width: "100%",
      alignItems: "center",
      backgroundColor: include
        ? colors.lumber
        : palette.white,
      marginBottom: _scaleText(12).fontSize,
      padding: _scaleText(12).fontSize,
      borderRadius: 100,
    }),
    option: {
      alignItems: "center",
      justifyContent: "center",
      position: "absolute",
      left: _scaleText(8).fontSize,
      width: _scaleText(30).fontSize,
      height: _scaleText(30).fontSize,
      borderRadius: 30,
    },
    optionText: {
      fontSize: _scaleText(16).fontSize,
      flex: 1,
      marginLeft: _scaleText(40).fontSize
    }
  });
};
