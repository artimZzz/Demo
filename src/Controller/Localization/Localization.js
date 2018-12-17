import ReactNative from 'react-native';
import I18n from 'react-native-i18n';

// Import all locales
import en from '../../../locales/en.json';
import zhhk from '../../../locales/zh-HK.json';

// Should the app fallback to English if user locale doesn't exists
I18n.fallbacks = true;

// Define the supported translations
I18n.translations = {
    en,
    zhhk
};

const currentLocale = I18n.currentLocale();

/* public */

// Is it a RTL language?
export const isRTL = currentLocale.indexOf('zh-HK') === 0;

// Allow RTL alignment in RTL languages
ReactNative.I18nManager.allowRTL(isRTL);

// The method we'll use instead of a regular string
export function strings(name, params = {}) {
    return I18n.t(name, params);
};

export function changeLocale(langCode) {
    I18n.locale = langCode;
}

export default I18n;