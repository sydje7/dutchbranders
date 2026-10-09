import "server-only";
import { contact } from "./data";
import type { Locale } from "./i18n";

export type RequestType = "analyse" | "contact" | "cursus";

export type MailRequest = {
  type: RequestType;
  lang: Locale;
  name: string;
  email: string;
  fields: [string, string][];
};

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

const copy = {
  nl: {
    subject: "We hebben je aanvraag ontvangen – Dutch Branders",
    types: { analyse: "aanvraag voor een gratis analyse", contact: "aanvraag", cursus: "offerteaanvraag voor een cursus" },
    hi: (n: string) => `Hoi ${n},`,
    thanks: (t: string) => `Bedankt voor je ${t}! We hebben alles goed ontvangen en nemen binnen één werkdag persoonlijk contact met je op.`,
    summary: "Dit heb je ingevuld:",
    questions: "Heb je in de tussentijd een vraag? Beantwoord deze mail of bel ons op",
    regards: "Met vriendelijke groet,",
  },
  en: {
    subject: "We've received your request – Dutch Branders",
    types: { analyse: "request for a free analysis", contact: "request", cursus: "quote request for a course" },
    hi: (n: string) => `Hi ${n},`,
    thanks: (t: string) => `Thank you for your ${t}! We've received everything and will personally get in touch within one business day.`,
    summary: "Here's what you filled in:",
    questions: "Any questions in the meantime? Just reply to this email or call us on",
    regards: "Kind regards,",
  },
};

const ownerTypes: Record<RequestType, string> = {
  analyse: "Gratis analyse",
  contact: "Contactformulier",
  cursus: "Offerte cursus",
};

function table(fields: [string, string][]) {
  const rows = fields
    .filter(([, v]) => v.trim())
    .map(
      ([k, v]) =>
        `<tr><td style="padding:8px 12px 8px 0;color:#555180;vertical-align:top;white-space:nowrap">${esc(k)}</td><td style="padding:8px 0;color:#2b2467;font-weight:600">${esc(v).replace(/\n/g, "<br>")}</td></tr>`
    )
    .join("");
  return `<table style="border-collapse:collapse;font-size:14px;width:100%">${rows}</table>`;
}

function layout(body: string) {
  return `<!doctype html><html><body style="margin:0;background:#f4f3ef;font-family:Arial,Helvetica,sans-serif;color:#2b2467">
<div style="max-width:560px;margin:0 auto;padding:32px 16px">
  <div style="font-weight:700;font-size:18px;line-height:1">dutch<br>branders<span style="color:#f47549">.</span></div>
  <div style="margin-top:20px;background:#ffffff;border-radius:14px;padding:28px 24px;border-top:4px solid #f47549;font-size:15px;line-height:1.6">${body}</div>
  <p style="font-size:12px;color:#8e8ba8;margin-top:16px">Dutch Branders · ${esc(contact.address)} · ${esc(contact.phone)} · ${esc(contact.email)}</p>
</div></body></html>`;
}

/* Bevestiging voor de klant, in de taal van de pagina */
export function customerMail(r: MailRequest) {
  const t = copy[r.lang];
  const first = r.name.trim().split(/\s+/)[0];
  const html = layout(`
    <p style="margin:0 0 12px">${esc(t.hi(first))}</p>
    <p style="margin:0 0 20px">${esc(t.thanks(t.types[r.type]))}</p>
    <p style="margin:0 0 8px;font-weight:700">${esc(t.summary)}</p>
    ${table(r.fields)}
    <p style="margin:20px 0 0">${esc(t.questions)} <a href="${contact.phoneHref}" style="color:#f47549">${esc(contact.phone)}</a>.</p>
    <p style="margin:20px 0 0">${esc(t.regards)}<br><strong>Dutch Branders</strong></p>`);
  return { subject: t.subject, html };
}

/* Melding voor Dutch Branders zelf */
export function ownerMail(r: MailRequest) {
  const html = layout(`
    <p style="margin:0 0 4px;color:#f47549;font-weight:700">${esc(ownerTypes[r.type])} · ${r.lang.toUpperCase()}</p>
    <p style="margin:0 0 16px;font-size:20px;font-weight:700">${esc(r.name)}</p>
    ${table([["E-mail", r.email], ...r.fields])}
    <p style="margin:20px 0 0;font-size:13px;color:#555180">Beantwoord deze mail om direct te reageren aan ${esc(r.name)}.</p>`);
  return { subject: `Nieuwe aanvraag: ${ownerTypes[r.type]} – ${r.name}`, html };
}
