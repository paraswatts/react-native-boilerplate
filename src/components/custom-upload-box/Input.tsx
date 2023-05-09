import React, { FC, useMemo } from "react";
import { Image, View, ViewStyle } from "react-native";
import RNBounceable from "@freakycoder/react-native-bounceable";
import { useTheme } from "@react-navigation/native";
import createStyles from "./Input.style";
import { FieldInputProps, FormikProps } from "formik";
import Text from "@shared-components/text-wrapper/TextWrapper";
import CheckIconSvg from "assets/icons/CheckIconSvg";
import { trans } from "shared/localization";
import { _scaleText, pickImage } from "utils";
import CameraIconSvg from "assets/icons/CameraIconSvg";
interface ICustomInputProps {
  style: ViewStyle;
  customStyle: ViewStyle;
  onImageSelected: () => void;
  field: FieldInputProps<any>;
  form: FormikProps<any>;
  addMarginTop?: boolean;
  options: any;
  placeholder?: string;
}

const CustomUploadBox: FC<ICustomInputProps> = ({
  customStyle = {},
  field: { name, value },
  form: { errors },
  onImageSelected = () => { },
  placeholder = "",
  addMarginTop
}) => {
  const validationMessage = errors[name] ? errors[name] : "";
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);
  const CheckBox = ({ width = 30, iconWidth = 15 }) => {
    return (
      <View
        style={styles.iconContainer(width)}
      >
        <CheckIconSvg width={_scaleText(iconWidth).fontSize} />
      </View>
    );
  };

  return (
    <View style={[customStyle, styles.container, { marginTop: addMarginTop ? 24 : 0 }]}>
      <RNBounceable
        style={styles.uploadBox}
        onPress={() => {
          pickImage().then((image) => onImageSelected(image))
        }}
      >
        {
          value ?
            <Image source={{ uri: value.path }} style={styles.image} /> :
            <CameraIconSvg width={_scaleText(82).fontSize} height={_scaleText(72).fontSize} />
        }
        <Text
          color={colors.darkGrayText}
          style={styles.uploadPhotoText}
        >
          {trans("labels.select_photo")}
        </Text>
      </RNBounceable>
      {!!placeholder && <Text
        color={colors.darkGrayText}
        style={styles.instructions}
      >
        {placeholder}
      </Text>}
      {!!validationMessage && (
        <Text color={"red"} style={styles.error}>
          {validationMessage}
        </Text>
      )}
    </View>
  );
};

export default CustomUploadBox;
