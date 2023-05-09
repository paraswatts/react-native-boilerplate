import React, { FC, useMemo, } from "react";
import {
  View,
} from "react-native";
import Text from "@shared-components/text-wrapper/TextWrapper";
import fonts from "@fonts";
import { useTheme } from "@react-navigation/native";
import createStyles from "./Input.style";

interface ICustomToastProps {
  toast: {
    data: {
      title: string;
      type: string;
    },
  }
}

const CustomToast: FC<ICustomToastProps> = ({
  toast,
}) => {
  const theme = useTheme();
  const { colors } = theme;
  const leftBorderColor = toast?.data?.type === "error" ? "#D0342C" : "#00C851";

  const styles = useMemo(() => createStyles(theme, leftBorderColor), [theme, leftBorderColor]);
  return (
    <View
      style={styles.container}
    >
      <Text
        style={styles.message}
        color={colors.darkGrayText}
        fontFamily={fonts.sourcePro.semiBold}
      >
        {toast.data.title}
      </Text>
    </View>
  );
};

export default CustomToast;
