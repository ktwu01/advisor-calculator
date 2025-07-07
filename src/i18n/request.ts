// src/i18n/request.ts
import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from './config';

export default getRequestConfig(async ({ locale }: { locale?: string }) => {
  // Validate locale parameter
  if (!locale || !locales.includes(locale as typeof locales[number])) {
    console.error('Invalid locale:', locale);
    notFound();
  }

  try {
    return {
      locale,
      messages: (await import(`./locales/${locale}.json`)).default
    };
  } catch (error) {
    console.error('Error loading locale messages:', error);
    notFound();
  }
});