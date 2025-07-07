// src/app/layout.tsx (Root Layout)
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: '%s | Advisor Calculator',
    default: 'Advisor Calculator | 导师坑不坑测算版',
  },
  description: "Scientific comparison of multiple advisors to help you avoid problematic supervisors",
  metadataBase: new URL('https://your-domain.com'), // Replace with your actual domain
  alternates: {
    canonical: '/',
    languages: {
      'zh-CN': '/zh',
      'en-US': '/en',
      'ja-JP': '/ja',
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // google: "your-google-verification-code", // Add if you have Google Search Console
    // other: "your-other-verification-codes",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}