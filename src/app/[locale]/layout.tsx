// src/app/[locale]/layout.tsx
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { Inter } from "next/font/google";
import { locales, defaultLocale } from "@/i18n/config";
import ClientBody from "../ClientBody";
import "./globals.css";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

const inter = Inter({ subsets: ["latin"] });



export async function generateMetadata({
  params,
}: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({ locale, namespace: "app" });

  return {
    title: {
      template: t("titleTemplate"),
      default: t("defaultTitle"),
    },
    description: t("description"),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

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
