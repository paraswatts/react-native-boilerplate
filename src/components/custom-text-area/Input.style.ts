import { ExtendedTheme } from "@react-navigation/native";
import { ViewStyle, StyleSheet } from "react-native";
import { _scaleText } from "utils";

interface Style {
  input: ViewStyle;
  error: ViewStyle;
}

export default (theme: ExtendedTheme) => {
  const { colors } = theme;
  return StyleSheet.create<Style>({
    input: {
      backgroundColor: colors.cultured,
      height: _scaleText(250).fontSize,
      marginTop: _scaleText(6).fontSize,
      borderRadius: 8,
      padding: _scaleText(16).fontSize,
      shadowOpacity: 0.2,
      shadowRadius: 3,
      shadowOffset: {
        height: 0,
        width: 0,
      },
      elevation: 2,
      color: colors.darkGrayText,
      textAlignVertical: 'top'
    },
    error: {
      marginTop: _scaleText(4).fontSize,
    },
  });
};
