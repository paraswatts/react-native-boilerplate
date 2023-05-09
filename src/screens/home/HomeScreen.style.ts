import { ViewStyle, StyleSheet } from "react-native";
import { ExtendedTheme } from "@react-navigation/native";
import { ScreenWidth } from "@freakycoder/react-native-helpers";
import { _scaleText } from "utils";

interface Style {
  container: ViewStyle;
  innerContainer: ViewStyle;
  button: ViewStyle;
  buttonText: TextStyle;
}

export default (theme: ExtendedTheme) => {
  const { colors } = theme;
  return StyleSheet.create<Style>({
    container: {
      alignItems: 'center',
    },
    innerContainer: {
      padding: ScreenWidth * 0.0625,
      width: '100%'
    },
    button: {
      backgroundColor: colors.primaryColor,
      borderRadius: 40,
      padding: 12,
      marginTop: 40,
    },
    buttonText: {
      fontSize: 18,
      textAlign: "center",
    },
  });
};
