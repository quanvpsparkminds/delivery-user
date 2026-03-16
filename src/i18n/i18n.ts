import i18n, { LanguageDetectorAsyncModule, TFunction } from "i18next";
import { initReactI18next, useTranslation } from "react-i18next";
import { storage, StorageKeys } from "utils";
import { en } from "./EN";
import { vi } from "./VI";
import { SupportedLngs } from "./i18n.types";

export type RecursiveKeyOf<TObj extends Record<string, any>> = {
  [TKey in keyof TObj & string]: TObj[TKey] extends Record<string, any>
    ? `${TKey}` | `${TKey}.${RecursiveKeyOf<TObj[TKey]>}`
    : `${TKey}`;
}[keyof TObj & string];

const languageDetector: LanguageDetectorAsyncModule = {
  type: "languageDetector",
  async: true,
  detect: async (callback) => {
    const result = storage.getString(StorageKeys.lng) ?? SupportedLngs.vi;
    callback(result);
    return result;
  },
  cacheUserLanguage: (lng) => {
    storage.set(StorageKeys.lng, lng);
  },
};

if (!i18n.isInitialized) {
  i18n
    .use(languageDetector)
    .use(initReactI18next)
    .init({
      fallbackLng: SupportedLngs.en,
      compatibilityJSON: "v4",
      resources: {
        [SupportedLngs.vi]: vi,
        [SupportedLngs.en]: en,
      },

      // have a common namespace used around the full app
      ns: Object.keys(en),
      nsSeparator: ".",
      keySeparator: false,
      debug: true,
      cache: { enabled: true },
    });
}

export type TxKeyPath = RecursiveKeyOf<typeof en>;
export type TxFn = TFunction<TxKeyPath, undefined>;

export const useTx = (): Omit<ReturnType<typeof useTranslation>, "t"> & {
  t: TxFn;
} => useTranslation();

export default i18n;
