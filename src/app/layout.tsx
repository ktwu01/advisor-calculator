// Simple layout without internationalization
import { Inter } from 'next/font/google';
import ClientBody from './ClientBody';
import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: '%s | Advisor Calculator',
    default: 'Advisor Calculator | 导师坑不坑测算版',
  },
  description: "Scientific comparison of multiple advisors to help you avoid problematic supervisors",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <ClientBody>
          {children}
        </ClientBody>
      </body>
    </html>
  );
}