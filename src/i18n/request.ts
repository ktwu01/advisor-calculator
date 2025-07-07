// src/i18n/request.ts
import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";
import { locales } from "./config";

export default getRequestConfig(async ({ locale }: { locale?: string }) => {
  // Use default locale if locale is invalid or undefined
  const validLocale =
    locale && locales.includes(locale as (typeof locales)[number])
      ? locale
      : "zh"; // default locale

  try {
    return {
      locale: validLocale,
      messages: (await import(`./locales/${validLocale}.json`)).default,
    };
  } catch (error) {
    console.error("Error loading locale messages:", error);
    // Fallback to Chinese locale
    return {
      locale: "zh",
      messages: (await import(`./locales/zh.json`)).default,
    };
  }
});
