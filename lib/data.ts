export const contact = {
  phone: "085 06 08 154",
  phoneHref: "tel:+31850608154",
  email: "info@dutchbranders.nl",
  address: "Handelweg 12H, 1521 NH Wormerveer",
  mapsUrl: "https://www.google.com/maps/place/data=!4m2!3m1!1s0x47c5e3b905585495:0x7416b8aba98b1faf",
  kvk: "81843895",
  btw: "NL864519886B01",
  linkedin: "https://www.linkedin.com/company/dutchbranders/",
};

/* Projecten op de Werk-pagina en Over ons (screenshots in /public/klanten); teksten staan in lib/i18n */
export const projects: { slug: string; name: string; url: string; image?: string }[] = [
  { slug: "enka", name: "Enka Keukens", url: "https://enkakeukens.nl/", image: `/klanten/enka.jpg` },
  { slug: "nextsleep", name: "Next Sleep", url: "https://nextsleep.nl/", image: `/klanten/nextsleep.jpg` },
  { slug: "denk", name: "DENK", url: "https://denk.nl/", image: `/klanten/denk.jpg` },
  { slug: "cnk", name: "CNK Clinic", url: "https://cnkclinic.nl/", image: `/klanten/cnk.jpg` },
  { slug: "atak", name: "Atak Houtbouw", url: "https://www.atakhoutbouw.nl/", image: `/klanten/atak.jpg` },
  { slug: "vanstalen", name: "Autobedrijf van Stalen", url: "https://autobedrijfvanstalen.nl/", image: `/klanten/vanstalen.jpg` },
  { slug: "wagentransport", name: "Wagentransport", url: "https://wagentransport.nl/", image: `/klanten/wagentransport.jpg` },
  { slug: "firerocket", name: "FireRocket", url: "https://firerocket.nl/", image: `/klanten/firerocket.jpg` },
  { slug: "bkp", name: "BedrijfskledingPlaza", url: "https://bedrijfskledingplaza.nl/", image: `/klanten/bkp.jpg` },
  { slug: "shadow", name: "Shadow Security", url: "https://shadow-security.nl/", image: `/klanten/shadow.jpg` },
  { slug: "village", name: "Salon The Village", url: "https://salonthevillage.com/", image: `/klanten/village.jpg` },
  { slug: "lust109", name: "Lust109", url: "https://lust109.nl/", image: `/klanten/lust109.jpg` },
  { slug: "ultra", name: "Ultra Group", url: "https://ultragroup.nl/", image: `/klanten/ultra.jpg` },
  { slug: "dentville", name: "Dentville", url: "https://dentville.nl/", image: `/klanten/dentville.jpg` },
];

/*
 * Echte Google-reviews van Dutch Branders.
 * Voeg per review toe: naam (zoals op Google), datum (JJJJ-MM-DD), sterren en de tekst letterlijk zoals op Google.
 * Zolang deze lijst leeg is, toont de site alleen de 5/5-beoordeling.
 */
export const reviews: { name: string; date: string; stars: number; text: string }[] = [];

export const googleReviewsUrl =
  "https://www.google.com/maps/place/data=!4m2!3m1!1s0x47c5e3b905585495:0x7416b8aba98b1faf";
