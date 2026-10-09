import type { MetadataRoute } from "next";

export const dynamic = "force-dynamic";

// Preview met wachtwoord: zoekmachines buiten de deur houden
export default function robots(): MetadataRoute.Robots {
  return process.env.SITE_PASSWORD
    ? { rules: { userAgent: "*", disallow: "/" } }
    : { rules: { userAgent: "*", allow: "/" }, sitemap: "https://dutchbranders.nl/sitemap.xml" };
}
