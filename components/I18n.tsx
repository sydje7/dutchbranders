"use client";

import { createContext, useContext } from "react";
import { localePath, type Dict, type Locale } from "@/lib/i18n";

const Ctx = createContext<{ lang: Locale; dict: Dict } | null>(null);

export function I18nProvider({ lang, dict, children }: { lang: Locale; dict: Dict; children: React.ReactNode }) {
  return <Ctx.Provider value={{ lang, dict }}>{children}</Ctx.Provider>;
}

export function useI18n() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useI18n moet binnen I18nProvider gebruikt worden");
  return { ...v, href: (path: string) => localePath(v.lang, path) };
}
