import type { MetadataRoute } from "next";
import { localePath, locales } from "@/lib/i18n";

const SITE = "https://dutchbranders.nl";
const PAGES = ["/", "/diensten", "/werk", "/over-ons", "/werken-bij", "/contact", "/privacy"];

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.flatMap((p) => locales.map((lang) => ({ url: SITE + (localePath(lang, p) === "/" ? "" : localePath(lang, p)) })));
}
