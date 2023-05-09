import React, { FC, useMemo } from "react";
import { View, ImageBackground, ImageRequireSource, Platform, StatusBar, StyleSheet, ViewStyle, ImageStyle } from "react-native";
import { palette } from "@theme/themes";
import { useTheme, ExtendedTheme } from "@react-navigation/native";

interface IBackgroundProps {
  children: any;
  hasImageBackground?: boolean;
  backgroundSource?: ImageRequireSource;
  backgroundColor?: string
}

const RenderBackground: FC<IBackgroundProps> = ({
  children,
  hasImageBackground,
  backgroundSource,
  backgroundColor = palette.white
}) => {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  console.log("backgroundColor", backgroundColor)
  if (hasImageBackground && backgroundSource) {
    return (
      <View style={styles.imageContainer}>
        <ImageBackground
          style={styles.image}
          source={backgroundSource}
          resizeMode={Platform.OS === 'android' ? "stretch" : "cover"}
        >
          {children}
        </ImageBackground>
      </View>
    );
  }

  return <View style={[styles.container, { backgroundColor }]}>
    {children}
  </View>;
};

interface Style {
  imageContainer: ViewStyle;
  image: ImageStyle;
  container: ViewStyle;
}

const createStyles = (theme: ExtendedTheme) => {
  return StyleSheet.create<Style>({
    imageContainer: {
      backgroundColor: palette.white,
      flex: 1,
      paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight - 5 : 0,
      borderWidth: 0
    },
    image: {
      flex: 1
    },
    container: {
      flex: 1,
      paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight - 5 : 0
    }
  })
};

export default RenderBackground;
