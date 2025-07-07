// src/app/page.tsx (Root Page - Redirects to default locale)
import { redirect } from "next/navigation";
import { defaultLocale } from "@/i18n/config";

export default function RootPage() {
  // This will redirect users from "/" to "/zh" (or your default locale)
  redirect(`/${defaultLocale}`);
}

// This page should not be indexed since it's just a redirect
export const metadata = {
  robots: {
    index: false,
    follow: false,
  },
};