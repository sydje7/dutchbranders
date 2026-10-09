import { NextResponse } from "next/server";
import { Resend } from "resend";
import { customerMail, ownerMail, type MailRequest, type RequestType } from "@/lib/mail";
import { hasLocale } from "@/lib/i18n";

const TYPES: RequestType[] = ["analyse", "contact", "sollicitatie"];
const CV_TYPES = /\.(pdf|docx?)$/i;
const CV_MAX_BASE64 = 7_000_000; // ± 5 MB bestand
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const FROM = process.env.MAIL_FROM ?? "Dutch Branders <info@dutchbranders.nl>";
const TO = process.env.MAIL_TO ?? "info@dutchbranders.nl";

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  // Spamfilter: dit verborgen veld vullen alleen bots in. Doe alsof het gelukt is.
  if (typeof body.fax === "string" && body.fax.trim()) return NextResponse.json({ ok: true });

  const { type, lang, name, email, fields } = body;
  const valid =
    typeof type === "string" && TYPES.includes(type as RequestType) &&
    typeof lang === "string" && hasLocale(lang) &&
    typeof name === "string" && name.trim().length > 0 && name.length <= 200 &&
    typeof email === "string" && email.length <= 254 && EMAIL_RE.test(email) &&
    Array.isArray(fields) && fields.length <= 20 &&
    fields.every((f) => Array.isArray(f) && f.length === 2 && f.every((x) => typeof x === "string" && x.length <= 5000));
  if (!valid) return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });

  // Optioneel cv (alleen bij sollicitaties): { name, data(base64) }
  let attachments: { filename: string; content: string }[] | undefined;
  const cv = (body.cv ?? null) as { name?: unknown; data?: unknown } | null;
  if (cv && type === "sollicitatie") {
    const { name: file, data } = cv;
    const ok =
      typeof file === "string" && CV_TYPES.test(file) && file.length <= 200 &&
      typeof data === "string" && data.length <= CV_MAX_BASE64 && /^[A-Za-z0-9+/=]+$/.test(data);
    if (!ok) return NextResponse.json({ ok: false, error: "invalid_cv" }, { status: 400 });
    attachments = [{ filename: (file as string).replace(/[^\w.\- ]/g, "_"), content: data as string }];
  }

  const r = { type, lang, name: name.trim(), email: email.trim(), fields } as MailRequest;

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    // Nog geen mailkoppeling: lokaal tonen we de aanvraag in de terminal, live geven we een fout.
    console.warn("[aanvraag] RESEND_API_KEY ontbreekt – mail niet verstuurd:", JSON.stringify(r, null, 2));
    return process.env.NODE_ENV === "production"
      ? NextResponse.json({ ok: false, error: "mail_not_configured" }, { status: 500 })
      : NextResponse.json({ ok: true, sent: false });
  }

  const resend = new Resend(key);

  const owner = ownerMail(r);
  const ownerRes = await resend.emails.send({ from: FROM, to: TO, replyTo: r.email, subject: owner.subject, html: owner.html, attachments });
  if (ownerRes.error) {
    console.error("[aanvraag] melding niet verstuurd:", ownerRes.error);
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
  }

  // De aanvraag is binnen; een mislukte bevestiging aan de klant blokkeert dat niet.
  const cust = customerMail(r);
  const custRes = await resend.emails.send({ from: FROM, to: r.email, replyTo: TO, subject: cust.subject, html: cust.html });
  if (custRes.error) console.error("[aanvraag] bevestiging niet verstuurd:", custRes.error);

  return NextResponse.json({ ok: true, sent: true });
}
