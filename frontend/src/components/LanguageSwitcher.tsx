"use client";
import React from "react";
import { usePathname, useRouter } from "@/i18n/routing";
import { useLocale } from "next-intl";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLocale = () => {
    const nextLocale = locale === "en" ? "ko" : "en";
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <button
      onClick={toggleLocale}
      className="px-3 py-1.5 text-xs font-semibold rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-slate-300 hover:text-white ml-4"
    >
      {locale === "en" ? "KO" : "EN"}
    </button>
  );
}
