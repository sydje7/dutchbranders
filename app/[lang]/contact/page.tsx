import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ContactForm from "@/components/ContactForm";
import Rich from "@/components/Rich";
import { Mail, Phone, Pin } from "@/components/Icons";
import { contact } from "@/lib/data";
import { getDict, hasLocale } from "@/lib/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]/contact">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = getDict(lang).contactPage;
  return { title: t.metaTitle, description: t.metaDescription };
}

export default async function Contact({ params }: PageProps<"/[lang]/contact">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDict(lang).contactPage;

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="label">{t.label}</span>
          <h1 className="h-display" style={{ fontWeight: 700 }}>
            <Rich text={t.title} />
          </h1>
          <p className="lead" style={{ marginBottom: 0 }}>
            {t.lead}
          </p>
        </div>
      </section>

      <section style={{ paddingBottom: 80 }}>
        <div className="container contact-grid">
          <ContactForm />
          <div className="info-stack">
            <a href={contact.phoneHref} className="info-card">
              <span className="trust-ico">
                <Phone />
              </span>
              <div>
                <span className="mono">{t.callLabel}</span>
                <strong>{contact.phone}</strong>
              </div>
            </a>
            <a href={`mailto:${contact.email}`} className="info-card">
              <span className="trust-ico">
                <Mail />
              </span>
              <div>
                <span className="mono">{t.mailLabel}</span>
                <strong>{contact.email}</strong>
              </div>
            </a>
            <a href={contact.mapsUrl} target="_blank" rel="noopener noreferrer" className="info-card">
              <span className="trust-ico">
                <Pin />
              </span>
              <div>
                <span className="mono">{t.visitLabel}</span>
                <strong>{contact.address}</strong>
              </div>
            </a>
            <div className="info-card navy">
              <span className="mono">{t.partnerLabel}</span>
              <strong>{t.partnerTitle}</strong>
              <p>{t.partnerText}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
