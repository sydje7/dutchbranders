import nl, { type Dict } from "./nl";
import en from "./en";

export const locales = ["nl", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "nl";

const dictionaries: Record<Locale, Dict> = { nl, en };

export const hasLocale = (l: string): l is Locale => (locales as readonly string[]).includes(l);

export const getDict = (l: Locale) => dictionaries[l];

/* Nederlands zonder prefix (/werk), Engels met /en (/en/werk) */
export const localePath = (l: Locale, path: string) => (l === defaultLocale ? path : `/${l}${path === "/" ? "" : path}`);

export type { Dict };
