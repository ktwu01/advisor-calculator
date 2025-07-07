// src/i18n/config.ts
export const locales = ['en', 'zh', 'ja'] as const;
export type Locale = typeof locales[number];

export const defaultLocale: Locale = 'zh';

export const localeNames: Record<Locale, string> = {
  en: 'English',
  zh: '中文',
  ja: '日本語'
};

// src/i18n/request.ts
import {getRequestConfig} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {locales} from './config';
 
export default getRequestConfig(async ({locale}) => {
  if (!locales.includes(locale as any)) notFound();
 
  return {
    messages: (await import(`./locales/${locale}.json`)).default
  };
});

// next.config.js - Add this to your existing config
const createNextIntlPlugin = require('next-intl/plugin');
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
};

module.exports = withNextIntl(nextConfig);