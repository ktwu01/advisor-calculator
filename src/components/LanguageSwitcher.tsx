// src/components/LanguageSwitcher.tsx - Fixed for Next.js 15
"use client";

import { useRouter, usePathname } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Globe } from "lucide-react";
import { locales, localeNames, type Locale } from "@/i18n/config";

interface LanguageSwitcherProps {
  currentLocale: string;
}

export default function LanguageSwitcher({ currentLocale }: LanguageSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (newLocale: string) => {
    // Remove current locale from pathname and add new one
    const pathWithoutLocale = pathname.replace(`/${currentLocale}`, '');
    const newPath = `/${newLocale}${pathWithoutLocale}`;
    
    // Save preference to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferred-locale', newLocale);
    }
    
    router.push(newPath);
  };

  return (
    <div className="flex items-center gap-2">
      <Globe className="h-4 w-4 text-gray-600" />
      <Select value={currentLocale} onValueChange={handleLanguageChange}>
        <SelectTrigger className="w-32">
          <SelectValue />
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