import { ExtendedTheme } from "@react-navigation/native";
import { ViewStyle, StyleSheet, TextStyle } from "react-native";
import { _scaleText } from "utils";

interface Style {
  container: ViewStyle;
  message: TextStyle;
}

export default (theme: ExtendedTheme, leftBorderColor: string) => {
  const { colors } = theme;
  return StyleSheet.create<Style>({
    container: {
      maxWidth: "85%",
      paddingHorizontal: _scaleText(15).fontSize,
      paddingVertical: _scaleText(16).fontSize,
      backgroundColor: "#fff",
      marginVertical: _scaleText(4).fontSize,
      borderRadius: _scaleText(8).fontSize,
      borderLeftColor: leftBorderColor,
      borderLeftWidth: _scaleText(6).fontSize,
      justifyContent: "center",
      paddingLeft: _scaleText(16).fontSize,
      shadowOpacity: 0.2,
      shadowRadius: 3,
      shadowOffset: {
        height: 0,
        width: 0,
      },
      elevation: 2,
    },
    message: {
      fontSize: _scaleText(16).fontSize,
    }
  });
};
