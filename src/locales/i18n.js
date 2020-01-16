import I18n from 'i18n-js';
import * as RNLocalize from 'react-native-localize';

import en from './en';
import ta from './ta';

const locales = RNLocalize.getLocales();

if (Array.isArray(locales)) {
  I18n.locale = 'en'; // 'ta'; //locales[0].languageTag;
}

I18n.fallbacks = true;
I18n.translations = {
  en,
  ta,
};

export default I18n;
