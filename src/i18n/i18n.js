import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import nepalTranslation from "./locales/nepal.json";
import enTranslation from "./locales/en.json";

i18n
  .use(LanguageDetector) // 브라우저의 언어 감지
  .use(initReactI18next) // react-i18next 바인딩
  .init({
    resources: {
      eng: { translation: enTranslation },
      nep: { translation: nepalTranslation },
    },
    lng: "eng", // 기본 언어를 영어로 설정
    fallbackLng: "eng", // 지원하지 않는 언어가 있을 경우 기본 언어 설정
    debug: false, // 디버깅 활성화
    interpolation: {
      escapeValue: false, // React는 XSS 방지가 기본
    },
  });

export default i18n;
