import React, { FC, useMemo, useRef } from "react";
import { View, ViewStyle, FlatList } from "react-native";
import RNBounceable from "@freakycoder/react-native-bounceable";
import { useTheme } from "@react-navigation/native";
import createStyles from "./Input.style";
import { FieldInputProps, FormikProps } from "formik";
import Text from "@shared-components/text-wrapper/TextWrapper";
import { palette } from "@theme/themes";
import CheckIconSvg from "assets/icons/CheckIconSvg";
import { ScreenHeight } from "@freakycoder/react-native-helpers";

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

const CustomDropdownInput: FC<ICustomInputProps> = ({
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
  const styles = useMemo(() => createStyles(theme, addMarginTop), [theme, addMarginTop]);
  const currentValue = value;
  const flatList = useRef();

  const selectedOptions = options.filter((option: { key: string, value: string }) => currentValue?.includes(option.key))

  const filteredOptions = options.filter((option: { key: string, value: string }) => !currentValue?.includes(option.key))

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
        style={styles.optionsContainer(keys?.includes(item?.key))}
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
          style={styles.optionText}
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
        styles.container,
      ]}
    >
      <View>
        <FlatList
          ref={flatList}
          style={styles.listContainer}
          indicatorStyle="black"
          showsVerticalScrollIndicator
          data={finalOptions}
          renderItem={renderItem}
          persistentScrollbar={true}
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

export default CustomDropdownInput;
