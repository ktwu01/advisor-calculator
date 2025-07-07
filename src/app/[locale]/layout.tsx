// src/app/[locale]/layout.tsx
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { Inter } from "next/font/google";
import { locales, defaultLocale } from "@/i18n/config";
import ClientBody from "../ClientBody";
import "./globals.css";
import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Advisor Calculator",
    default: "Advisor Calculator | 导师坑不坑测算版",
  },
  description:
    "Scientific comparison of multiple advisors to help you avoid problematic supervisors",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Fallback to default locale if invalid
  const validLocale = locales.includes(locale as (typeof locales)[number])
    ? locale
    : defaultLocale;

  let messages;
  try {
    messages = (await import(`@/i18n/locales/${validLocale}.json`)).default;
  } catch (error) {
    // Fallback to default locale messages
    messages = (await import(`@/i18n/locales/${defaultLocale}.json`)).default;
  }

  return (
    <html lang={validLocale} suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <NextIntlClientProvider locale={validLocale} messages={messages}>
          <ClientBody>{children}</ClientBody>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
