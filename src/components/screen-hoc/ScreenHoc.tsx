import React, { FC } from "react";
import {
  View,
  SafeAreaView,
  StatusBar,
  ImageRequireSource,
  ViewStyle,
} from "react-native";
import RenderBackground from "./Background";
import Header from "./Header";

interface IScreenHOCProps {
  children: JSX.Element[] | JSX.Element;
  hasImageBackground?: boolean;
  backgroundSource?: ImageRequireSource;
  leftAction?: () => void;
  hasHeader?: boolean;
  leftIcon?: JSX.Element;
  statusBackgroundColor?: string;
  rightIcon?: JSX.Element;
  rightAction?: () => void;
  statusBarColor?: string;
  heading?: string;
  subHeading?: string;
  isDarkHeader?: boolean;
  customLeftIconStyle?: ViewStyle;
  customRightIconStyle?: ViewStyle;
  backgroundColor?: string;
  headerBackgroundColor?: string;
}
const ScreenHOC: FC<IScreenHOCProps> = ({
  children,
  hasImageBackground,
  backgroundSource,
  hasHeader,
  leftAction,
  leftIcon,
  rightAction,
  rightIcon,
  statusBackgroundColor = "transparent",
  statusBarColor = "transparent",
  heading,
  subHeading,
  isDarkHeader,
  customLeftIconStyle,
  customRightIconStyle,
  backgroundColor,
  headerBackgroundColor
}) => {
  console.log("backgroundColor", backgroundColor)
  return (
    <RenderBackground
      hasImageBackground={hasImageBackground}
      backgroundSource={backgroundSource}
      backgroundColor={backgroundColor}
    >
      <SafeAreaView style={{ backgroundColor: statusBackgroundColor }} />
      <StatusBar
        animated
        barStyle={"dark-content"}
        backgroundColor={statusBarColor}
      />
      {hasHeader && (
        <Header
          leftAction={leftAction}
          leftIcon={leftIcon}
          rightAction={rightAction}
          rightIcon={rightIcon}
          heading={heading}
          subHeading={subHeading}
          isDarkHeader={isDarkHeader}
          customLeftIconStyle={customLeftIconStyle}
          customRightIconStyle={customRightIconStyle}
          backgroundColor={headerBackgroundColor}
        />
      )}
      <View style={{ flex: 1 }}>{children}</View>
    </RenderBackground>
  );
};

export default ScreenHOC;
