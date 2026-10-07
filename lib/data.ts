import type { MockId } from "@/components/Mockups";

export const contact = {
  phone: "085 06 08 154",
  phoneHref: "tel:+31850608154",
  email: "info@dutchbranders.nl",
  address: "Handelweg 12H, 1521 NH Wormerveer",
  mapsUrl: "https://www.google.com/maps/place/data=!4m2!3m1!1s0x47c5e3b905585495:0x7416b8aba98b1faf",
  kvk: "81843895",
  btw: "[nummer]",
  founder: "Burak Demirozcan",
  reviewCount: "[aantal]",
  rating: "[x]",
};

/* Taalonafhankelijke projectgegevens; teksten staan in lib/i18n */
export const projects: { slug: string; name: string; mock: MockId }[] = [
  { slug: "jurist-bewind", name: "Jurist & Bewind BV", mock: "jb" },
  { slug: "studio-fhs", name: "Studio FHS", mock: "fhs" },
  { slug: "extremos", name: "Extremos Amsterdam", mock: "ex" },
  { slug: "koffiebar-noord", name: "Koffiebar Noord", mock: "kb" },
  { slug: "fietsen-jansen", name: "Fietsen Jansen", mock: "fj" },
  { slug: "tandartspraktijk-zuid", name: "Tandartspraktijk Zuid", mock: "tz" },
];

/*
 * Reviews. LET OP: reviews met `voorbeeld: true` zijn voorbeeldteksten.
 * Vervang ze (tekst + datum in lib/i18n/nl.ts en en.ts) door echte Google-reviews vóór livegang.
 */
export const reviews = [
  { ini: "JB", color: "#7b74b0", name: "Jurist & Bewind BV" },
  { ini: "SF", color: "#c9a094", name: "Studio FHS" },
  { ini: "EA", color: "#df7c86", name: "Extremos Amsterdam" },
  { ini: "KN", color: "#8a6a55", name: "Koffiebar Noord", voorbeeld: true },
  { ini: "FJ", color: "#3a9a5d", name: "Fietsen Jansen", voorbeeld: true },
  { ini: "TZ", color: "#2d8fcb", name: "Tandartspraktijk Zuid", voorbeeld: true },
] as const;
