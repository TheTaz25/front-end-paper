import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEn from '../translations/en.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: translationEn
      }
    },
    // Remove if using a lang detector
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false // React handles this already
    }
  });

export default i18n;
