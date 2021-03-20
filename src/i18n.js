import i18n from "i18next";
import detector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import translationENUS from "./locales/en-US/translation.json";
import translationES from "./locales/es/translation.json";
import translationPTBR from "./locales/pt-BR/translation.json";

const resources = {
  "en-US": {
    translation: translationENUS,
  },
  es: {
    translation: translationES,
  },
  "pt-BR": {
    translation: translationPTBR,
  },
};

i18n
  .use(detector)
  .use(initReactI18next)
  .init({
    resources,
    lng: i18n.language,
    fallbackLng: "en-US",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
