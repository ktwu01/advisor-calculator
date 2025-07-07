// src/components/LanguageSwitcher.tsx - Fixed for Next.js 15
"use client";

import { useRouter, usePathname } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Languages } from "lucide-react";
import { locales, localeNames, type Locale } from "@/i18n/config";

interface LanguageSwitcherProps {
  currentLocale: string;
}

export default function LanguageSwitcher({
  currentLocale,
}: LanguageSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (newLocale: string) => {
    // Remove current locale from pathname and add new one
    const pathWithoutLocale = pathname.replace(`/${currentLocale}`, "");
    const newPath = `/${newLocale}${pathWithoutLocale}`;

    // Save preference to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("preferred-locale", newLocale);
    }

    router.push(newPath);
  };

  return (
    <div className="flex items-center gap-2">
      <Languages className="h-5 w-5 text-gray-600" />
      <Select value={currentLocale} onValueChange={handleLanguageChange}>
        <SelectTrigger className="w-40 h-10 text-base flex items-center gap-2">
        <SelectValue>{localeNames[currentLocale as Locale]}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          {locales.map((locale) => (
            <SelectItem key={locale} value={locale}>
              {localeNames[locale]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
