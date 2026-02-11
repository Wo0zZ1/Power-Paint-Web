export const LANGUAGES = {
  en: { code: "en", name: "English", nativeName: "English" },
  ru: { code: "ru", name: "Russian", nativeName: "Русский" },
} as const;

export type SupportedLanguageCode = keyof typeof LANGUAGES;
export type ISupportedLanguage = (typeof LANGUAGES)[SupportedLanguageCode];

export const SUPPORTED_LANGUAGES = Object.values(LANGUAGES);
export const DEFAULT_LANGUAGE: SupportedLanguageCode = "en";

export const getLanguage = (code: SupportedLanguageCode) => LANGUAGES[code];

export const isLanguageSupported = (code: string): code is SupportedLanguageCode => {
  return code in LANGUAGES;
};
