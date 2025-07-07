// src/app/[locale]/layout.tsx
import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n/config';
import "./globals.css";

export const metadata: Metadata = {
  title: "Advisor Calculator | 导师坑不坑测算版",
  description: "Scientific comparison of multiple advisors to help you avoid problematic supervisors",
  keywords: ["advisor", "calculator", "academic", "research", "supervisor", "evaluation"],
  authors: [{ name: "Advisor Calculator Team" }],
  creator: "Advisor Calculator",
  publisher: "Advisor Calculator",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Advisor Calculator | 导师坑不坑测算版",
    description: "Scientific comparison of multiple advisors to help you avoid problematic supervisors",
    type: "website",
    locale: "zh_CN",
    alternateLocale: ["en_US", "ja_JP"],
  },
};

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: LocaleLayoutProps) {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} dir="ltr">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* Locale-specific meta tags */}
        <link rel="alternate" hrefLang="zh" href="/zh" />
        <link rel="alternate" hrefLang="en" href="/en" />
        <link rel="alternate" hrefLang="ja" href="/ja" />
        <link rel="alternate" hrefLang="x-default" href="/zh" />
        
        {/* Preload critical resources */}
        <link rel="preload" href="/fonts" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <NextIntlClientProvider messages={messages} locale={locale}>
          {/* Main content wrapper */}
          <div id="root">
            {children}
          </div>
          
          {/* Analytics or other global scripts can go here */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                // Set locale for client-side JavaScript
                window.__LOCALE__ = '${locale}';
                
                // Optional: Analytics tracking for language usage
                if (typeof gtag !== 'undefined') {
                  gtag('config', 'GA_MEASUREMENT_ID', {
                    custom_map: { locale: '${locale}' }
                  });
                }
              `,
            }}
          />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

// Generate static params for all supported locales (for static export)
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}