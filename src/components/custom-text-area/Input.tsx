import React, { FC, ReactNode, useMemo } from "react";
import { TextInput, View, ViewStyle, TextInputProps } from "react-native";
import RNBounceable from "@freakycoder/react-native-bounceable";
import { useTheme } from "@react-navigation/native";
import createStyles from "./Input.style";
import { FieldInputProps, FormikProps } from "formik";
import Text from "@shared-components/text-wrapper/TextWrapper";

interface ICustomInputProps extends TextInputProps {
  rightIcon: ReactNode;
  label: string;
  style: ViewStyle;
  customStyle: ViewStyle;
  onPressRight: () => void;
  field: FieldInputProps<any>;
  form: FormikProps<any>;
  addMarginTop?: boolean;
}

const CustomTextArea: FC<ICustomInputProps> = ({
  rightIcon,
  label,
  customStyle = {},
  onPressRight,
  field: { name, value, onChange },
  form: { touched, errors, setFieldTouched },
  addMarginTop,
  ...props
}) => {
  const validationMessage = touched[name] && errors[name] ? errors[name] : "";
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={[customStyle, { marginTop: addMarginTop ? 24 : 0 }]}>
      {label && <Text color={colors.primaryFontColor}>{label}</Text>}
      <View>
        <TextInput
          {...props}
          onChangeText={(text) => {
            onChange(name)(text);
          }}
          style={styles.input}
          multiline={true}
          onBlur={() => {
            setFieldTouched(name);
          }}
          value={value}
          placeholderTextColor={colors.darkGrayText}
        />
        {rightIcon ? (
          <RNBounceable onPress={onPressRight}>{rightIcon}</RNBounceable>
        ) : null}
      </View>
      {!!validationMessage && (
        <Text color={"red"} style={styles.error}>
          {validationMessage}
        </Text>
      )}
    </View>
  );
};

export default CustomTextArea;
