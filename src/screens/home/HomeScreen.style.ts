import { ViewStyle, StyleSheet } from "react-native";
import { ExtendedTheme } from "@react-navigation/native";
import { ScreenWidth } from "@freakycoder/react-native-helpers";
import { _scaleText } from "utils";

interface Style {
  container: ViewStyle;
  innerContainer: ViewStyle;
}

export default (theme: ExtendedTheme) => {
  const { colors } = theme;
  return StyleSheet.create<Style>({
    container: {
      alignItems: 'center',
      paddingBottom: _scaleText(100).fontSize,
    },
    innerContainer: {
      paddingHorizontal: ScreenWidth * 0.0625,
      width: '100%'
    }
  });
};
