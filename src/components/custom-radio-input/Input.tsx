import React, { FC, useMemo, useRef } from "react";
import { View, ViewStyle } from "react-native";
import RNBounceable from "@freakycoder/react-native-bounceable";
import { useTheme } from "@react-navigation/native";
import createStyles from "./Input.style";
import { FieldInputProps, FormikProps } from "formik";
import Text from "@shared-components/text-wrapper/TextWrapper";
import { palette } from "@theme/themes";
import CheckIconSvg from "assets/icons/CheckIconSvg";
import { FlatList } from "react-native";

interface ICustomInputProps {
  style: ViewStyle;
  customStyle: ViewStyle;
  onItemPress: () => void;
  field: FieldInputProps<any>;
  form: FormikProps<any>;
  addMarginTop?: boolean;
  options: any;
  multiSelect?: boolean;
}

const CustomRadioInput: FC<ICustomInputProps> = ({
  customStyle = {},
  field: { name, value },
  form: { errors },
  addMarginTop,
  onItemPress = (keys: string) => { },
  options = [],
  multiSelect = false,
}) => {
  const validationMessage = errors[name] ? errors[name] : "";
  const theme = useTheme();
  const { colors } = theme;
  const flatList = useRef();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const currentValue = value;

  const selectedOptions = options.filter((option) => currentValue?.includes(option.key))

  const filteredOptions = options.filter((option) => !currentValue?.includes(option.key))

  const finalOptions = [...selectedOptions, ...filteredOptions]
  const renderItem = ({ item }: { item: { key: string; value: string } }) => {
    let keys = currentValue?.split(",") || [];
    return (
      <RNBounceable
        onPress={() => {
          if (keys?.includes(item.key)) {
            keys = keys.filter((key: string) => key !== item.key);
          } else {
            if (!multiSelect) keys = [];
            keys.push(item.key);
          }
          if (flatList?.current) flatList.current.scrollToIndex({ index: 0 });
          onItemPress(keys.toString());
        }}
        style={styles.optionContainer(keys?.includes(item?.key))}
      >
        {keys?.includes(item?.key) && (
          <View
            style={styles.option}
          >
            <CheckIconSvg width={15} />
          </View>
        )}
        <Text
          color={colors.darkGrayText}
          style={{
            fontSize: 16,
            borderWidth: 0,
            textAlign: "center",
            maxWidth: "80%",
          }}
        >
          {item?.value}
        </Text>
      </RNBounceable>
    );
  };
  return (
    <View
      style={[
        customStyle,
        { marginTop: addMarginTop ? 24 : 0, borderWidth: 0 },
      ]}
    >
      <View>
        <FlatList
          ref={flatList}
          indicatorStyle="black"
          showsVerticalScrollIndicator
          keyExtractor={(item, index) => index.toString()}
          data={finalOptions}
          renderItem={renderItem}
          style={{ borderWidth: 0 }}
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

export default CustomRadioInput;
