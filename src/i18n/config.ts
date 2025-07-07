// src/i18n/config.ts
export const locales = ["zh", "en", "ja", "es", "fr"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
  en: "English",
  zh: "中文",
  ja: "日本語",
  es: "Español",
  fr: "Français",
};
