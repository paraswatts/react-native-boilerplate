import React, { useMemo, useState } from "react";
import { View } from "react-native";
import { useTheme } from "@react-navigation/native";
/**
 * ? Local Imports
 */
import createStyles from "./HomeScreen.style";
/**
 * ? Shared Imports
 */
import ScreenHOC from "components/screen-hoc/ScreenHoc";
import Text from "@shared-components/text-wrapper/TextWrapper";
import CheckIconSvg from "assets/icons/CheckIconSvg";
import { Field, Formik } from "formik";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as Yup from "yup";
import { FIELD_NAMES, IMAGES } from "@shared-constants";
import CustomTextInput from "components/custom-text-input/Input";
import CustomRadioInput from "components/custom-radio-input/Input";
import { Countries, FavoriteSports, Genders } from "utils";
import CustomDropdownInput from "components/custom-dropdown-input/Input";
import CustomUploadBox from "components/custom-upload-box/Input";
import CustomTextArea from "components/custom-text-area/Input";
import CustomCheckbox from "components/custom-checkbox/Checkbox";
import { palette } from "@theme/themes";
import RNBounceable from "@freakycoder/react-native-bounceable";
import fonts from "@fonts";
import { trans } from "shared/localization";

interface HomeScreenProps { }

const FormSchema = Yup.object().shape({
  [FIELD_NAMES.NAME]: Yup.string()
    .required(trans("errors.name_required")),
  [FIELD_NAMES.EMAIL]: Yup.string()
    .email()
    .required(trans("errors.email_required"))
})

const HomeScreen: React.FC<HomeScreenProps> = () => {
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [hasImage] = useState<boolean>(false);

  return (
    <ScreenHOC
      hasImageBackground={hasImage}
      backgroundSource={IMAGES.GRADIENT}
      hasHeader
      leftIcon={<CheckIconSvg />}
      rightIcon={<CheckIconSvg />}
      heading={trans('heading.home')}
      subHeading={trans('sub-heading.home')}
      leftAction={() => alert("Left Icon Clicked")}
      rightAction={() => alert("Right Icon Clicked")}
      backgroundColor="teal"
      headerBackgroundColor={colors.secondaryColor}
      isDarkHeader
      statusBackgroundColor={colors.secondaryColor}
    >
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <View style={styles.innerContainer}>
          <Text color={palette.white}>
            {trans('labels.welcome')}
          </Text>
          <Formik
            initialValues={{
              name: '',
              email: ''
            }}
            validationSchema={FormSchema}
            onSubmit={(values) => {
              alert(JSON.stringify(values))
            }}
          >
            {({ handleSubmit, setFieldValue }) =>
              <View>
                <Field
                  addMarginTop
                  key={FIELD_NAMES.NAME}
                  label={trans("fields.name")}
                  name={FIELD_NAMES.NAME}
                  component={CustomTextInput}
                  maxLength={500}
                />
                <Field
                  addMarginTop
                  label={trans("fields.email")}
                  name={FIELD_NAMES.EMAIL}
                  component={CustomTextInput}
                  maxLength={500}
                  keyboardType="email-address"
                />
                <Field
                  addMarginTop
                  label={trans("fields.gender")}
                  name={FIELD_NAMES.GENDER}
                  component={CustomRadioInput}
                  options={Genders}
                  onItemPress={(value: string) => {
                    setFieldValue(FIELD_NAMES.GENDER, value);
                  }}
                />
                <Field
                  addMarginTop
                  label={trans("fields.multi")}
                  name={FIELD_NAMES.SPORTS}
                  component={CustomRadioInput}
                  options={FavoriteSports}
                  onItemPress={(value: string) => {
                    setFieldValue(FIELD_NAMES.SPORTS, value);
                  }}
                  multiSelect
                />
                <Field
                  addMarginTop
                  label={trans("fields.country")}
                  name={FIELD_NAMES.COUNTRY}
                  component={CustomDropdownInput}
                  options={Countries}
                  onItemPress={(value: string) => {
                    setFieldValue(FIELD_NAMES.COUNTRY, value);
                  }}
                  multiSelect
                />
                <Field
                  addMarginTop
                  label={trans("fields.country")}
                  name={FIELD_NAMES.SINGLE_COUNTRY}
                  component={CustomDropdownInput}
                  options={Countries}
                  onItemPress={(value: string) => {
                    setFieldValue(FIELD_NAMES.SINGLE_COUNTRY, value);
                  }}
                />
                <Field
                  addMarginTop
                  name={FIELD_NAMES.PHOTO}
                  component={CustomUploadBox}
                  onImageSelected={(value) => {
                    setFieldValue(FIELD_NAMES.PHOTO, value);
                  }}
                />
                <Field
                  addMarginTop
                  placeholder={trans("placeholder.description")}
                  name={FIELD_NAMES.DESCRIPTION}
                  component={CustomTextArea}
                />
                <Field
                  addMarginTop
                  label={trans("labels.terms")}
                  name={FIELD_NAMES.TERMS}
                  component={CustomCheckbox}
                />
                <RNBounceable style={styles.button} onPress={handleSubmit}>
                  <Text
                    color={palette.white}
                    fontFamily={fonts.sourcePro.semiBold}
                    style={styles.buttonText}
                  >
                    {trans("buttons.submit")}
                  </Text>
                </RNBounceable>
              </View>}
          </Formik>
        </View>
      </KeyboardAwareScrollView>

    </ScreenHOC >
  );
};

export default HomeScreen;
