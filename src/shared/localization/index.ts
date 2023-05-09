import { I18n } from "i18n-js";
// import * as RNLocalize from "react-native-localize";
// Import all locales

import en from "./en.json";
import getTextTemplate, { TextTemplateTokenDict } from "./textTemplate";
import isNumber from "lodash/isNumber";

// const locales = RNLocalize.getLocales();
const MI18n = new I18n();
MI18n.locale = "en";
MI18n.defaultLocale = "en";

MI18n.enableFallback = false;
MI18n.translations = {
  en,
};

export const trans = (
  name: string,
  paramsOrPluralIndex?: TextTemplateTokenDict | number,
  pluralParams?: TextTemplateTokenDict,
): any => {
  const text = MI18n.t(name, { defaultValue: name });
  if (isNumber(paramsOrPluralIndex)) {
    return pluralParse(text, paramsOrPluralIndex, pluralParams);
  }
  if (paramsOrPluralIndex) {
    return getTextTemplate(text, paramsOrPluralIndex);
  }

  return text;
};

export function hasTranslation(key: string) {
  return key in MI18n.translations["en"];
}
