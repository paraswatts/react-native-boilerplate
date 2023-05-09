import { ScreenHeight, ScreenWidth } from "@freakycoder/react-native-helpers";
import { ExtendedTheme } from "@react-navigation/native";
import { palette } from "@theme/themes";
import { ViewStyle, StyleSheet, TextStyle, ImageStyle } from "react-native";
import { _scaleText } from "utils";

interface Style {
  container: ViewStyle;
  input: ViewStyle;
  error: ViewStyle;
  iconContainer: (width: number) => ViewStyle;
  uploadedFileContainer: ViewStyle;
  fileName: TextStyle;
  uploadBox: TextStyle;
  uploadIcon: ViewStyle;
  uploadPhotoText: TextStyle;
  instructions: ViewStyle;
  image: ImageStyle;
}

export default (theme: ExtendedTheme) => {
  const { colors } = theme;
  return StyleSheet.create<Style>({
    container: {
      alignItems: 'center'
    },
    input: {
      backgroundColor: colors.cultured,
      height: _scaleText(45).fontSize,
      marginTop: _scaleText(6).fontSize,
      borderRadius: 50,
      paddingHorizontal: _scaleText(16).fontSize,
      borderWidth: 1,
    },
    error: {
      marginTop: _scaleText(4).fontSize,
    },
    iconContainer: (width: number) => ({
      alignItems: "center",
      justifyContent: "center",
      width: _scaleText(width).fontSize,
      height: _scaleText(width).fontSize,
      borderRadius: _scaleText(width).fontSize,
      backgroundColor: colors.lumber,
    }),
    uploadedFileContainer: {
      flexDirection: "row",
      width: "100%",
      alignItems: "center",
      backgroundColor: palette.white,
      marginTop: _scaleText(16).fontSize,
      padding: _scaleText(8).fontSize,
      borderRadius: 100,
      alignSelf: 'center',
    },
    fileName: {
      fontSize: _scaleText(16).fontSize,
      marginLeft: _scaleText(8).fontSize,
      textAlign: "center",
      flex: 1,
      maxWidth: "80%",
    },
    uploadBox: {
      borderRadius: 32,
      backgroundColor: colors.brightGray,
      alignItems: "center",
      justifyContent: "center",
      marginHorizontal: _scaleText(32).fontSize,
      width: ScreenWidth * 0.5,
      height: ScreenWidth * 0.5,
    },
    uploadIcon: {
      position: "absolute",
      bottom: -_scaleText(10).fontSize,
      right: -_scaleText(19).fontSize
    },
    uploadPhotoText: {
      marginTop: _scaleText(16).fontSize,
      fontSize: _scaleText(17).fontSize
    },
    instructions: {
      alignSelf: "center",
      marginTop: _scaleText(24).fontSize
    },
    image: {
      width: _scaleText(82).fontSize,
      height: _scaleText(82).fontSize
    }
  });
};
