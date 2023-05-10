import React, { FC, useMemo } from "react";
import { View, ViewStyle, StyleSheet, Platform, TextStyle } from "react-native";
import { ExtendedTheme, useTheme } from "@react-navigation/native";
import RNBounceable from "@freakycoder/react-native-bounceable";
import { ScreenWidth } from "@freakycoder/react-native-helpers";
import Text from "@shared-components/text-wrapper/TextWrapper";
import fonts from "@fonts";
import { palette } from "@theme/themes";

interface IBackgroundProps {
  leftAction?: () => void;
  leftIcon?: JSX.Element;
  rightAction?: () => void;
  rightIcon?: JSX.Element;
  heading?: string;
  subHeading?: string;
  isDarkHeader?: boolean;
  customLeftIconStyle?: ViewStyle;
  customRightIconStyle?: ViewStyle;
  backgroundColor?: string;
  headingTextColor?: string;
  subHeadingTextColor?: string;
}

const Header: FC<IBackgroundProps> = ({
  leftAction,
  leftIcon,
  rightAction,
  rightIcon,
  heading,
  subHeading,
  isDarkHeader = false,
  customLeftIconStyle = {},
  customRightIconStyle = {},
  backgroundColor = "transparent",
  headingTextColor = palette.darkGrayText,
  subHeadingTextColor = palette.darkGrayText,
}) => {
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme, isDarkHeader), [theme]);
  return (
    <View style={[styles.container, { backgroundColor }]}>
      {leftIcon &&
        <View style={styles.leftView}>
          <RNBounceable style={[styles.icon, customLeftIconStyle]} onPress={leftAction}>
            {leftIcon}
          </RNBounceable>
        </View>}
      <View style={styles.middleView}>
        <View style={styles.headingContainer}>
          {heading &&
            <Text
              color={headingTextColor}
              fontFamily={fonts.sourcePro.semiBold}
              style={styles.heading}
              numberOfLines={1}
            >
              {heading}
            </Text>}
          {subHeading && <Text
            color={subHeadingTextColor}
            style={styles.subHeading}
          >
            {subHeading}
          </Text>}
        </View>
      </View>
      {rightIcon && (
        <View style={styles.rightView}>
          <RNBounceable style={[styles.icon, customRightIconStyle]} onPress={rightAction}>
            {rightIcon}
          </RNBounceable>
        </View>)}
    </View>
  );
};

interface Style {
  container: ViewStyle;
  leftView: ViewStyle;
  middleView: ViewStyle;
  rightView: ViewStyle;
  icon: ViewStyle;
  heading: TextStyle;
  headingContainer: ViewStyle;
  subHeading: TextStyle;
}

const createStyles = (theme: ExtendedTheme, isDarkHeader: boolean) => {
  const { colors } = theme;
  return StyleSheet.create<Style>({
    container: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingTop: ScreenWidth * 0.0625,
      alignItems: 'center',
      paddingBottom: ScreenWidth * 0.0625,
    },
    icon: {
      alignItems: "center",
      justifyContent: "center",
      width: 50,
      height: 50,
      backgroundColor: isDarkHeader ? palette.white : colors.secondaryColor,
      borderRadius: 50,
    },
    leftView: {
      flex: 1.5,
      borderWidth: 0,
      borderColor: 'red',
      paddingLeft: ScreenWidth * 0.0625,
    },
    middleView: {
      flex: 7,
      borderWidth: 0,
      borderColor: 'blue',
      alignItems: 'center',
    },
    rightView: {
      flex: 1.5,
      borderWidth: 0,
      borderColor: 'green',
      paddingRight: ScreenWidth * 0.0625,
    },
    heading: {
      fontSize: 26
    },
    headingContainer: {
      paddingHorizontal: ScreenWidth * 0.0225,
    },
    subHeading: {
      fontSize: 16
    }
  });
};

export default Header;
