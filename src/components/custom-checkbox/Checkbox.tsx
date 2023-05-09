import React, { FC, useMemo } from "react";
import { View, ViewStyle } from "react-native";
import { useTheme } from "@react-navigation/native";
import createStyles from "./Checkbox.style";
import { FieldInputProps, FormikProps } from "formik";
import Text from "@shared-components/text-wrapper/TextWrapper";
import BouncyCheckbox, {
  IBouncyCheckboxProps,
} from "react-native-bouncy-checkbox";
import fonts from "@fonts";
import { IMAGES } from "@shared-constants";
import { palette } from "@theme/themes";

interface ICustomCheckboxProps extends IBouncyCheckboxProps {
  label: string;
  style: ViewStyle;
  customStyle: ViewStyle;
  onPressRight: () => void;
  field: FieldInputProps<any>;
  form: FormikProps<any>;
  addMarginTop?: boolean;
}

const CustomCheckbox: FC<ICustomCheckboxProps> = ({
  label,
  customStyle = {},
  onPressRight,
  field: { name },
  form: { errors, touched, setFieldValue },
  addMarginTop,
  ...props
}) => {
  const validationMessage = touched[name] && errors[name] ? errors[name] : "";
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);
  return (
    <View style={[customStyle, { marginTop: addMarginTop ? 24 : 0 }]}>
      <View>
        <BouncyCheckbox
          size={25}
          fillColor={colors.cultured}
          unfillColor={colors.cultured}
          text={label}
          iconStyle={{ borderRadius: 8 }}
          innerIconStyle={{ borderRadius: 8 }}
          textStyle={{
            fontFamily: fonts.sourcePro.regular,
            color: palette.white,
          }}
          checkIconImageSource={IMAGES.CHECK}
          onPress={(isChecked: boolean) => {
            setFieldValue(name, isChecked);
          }}
          {...props}
        />
      </View>
      {!!validationMessage && (
        <Text color={"red"} style={styles.error}>
          {validationMessage}
        </Text>
      )}
    </View>
  );
};

export default CustomCheckbox;
