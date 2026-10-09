import type { RequestType } from "./mail";
import type { Locale } from "./i18n";

/* Stuurt een formulier naar /api/aanvraag; geeft true terug als het gelukt is */
export async function submitRequest(data: {
  type: RequestType;
  lang: Locale;
  name: string;
  email: string;
  fields: [string, string][];
  fax?: string;
  cv?: { name: string; data: string };
}) {
  try {
    const res = await fetch("/api/aanvraag", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.ok;
  } catch {
    return false;
  }
}
