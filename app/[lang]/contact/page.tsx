import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ContactForm from "@/components/ContactForm";
import PageHero from "@/components/PageHero";
import { ArrowUpRight, Mail, Phone, Pin } from "@/components/Icons";
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

  const lines = [
    { href: contact.phoneHref, label: t.callLabel, value: contact.phone, icon: <Phone />, ext: false },
    { href: `mailto:${contact.email}`, label: t.mailLabel, value: contact.email, icon: <Mail />, ext: false },
    { href: contact.mapsUrl, label: t.visitLabel, value: contact.address, icon: <Pin />, ext: true },
  ];

  return (
    <>
      <PageHero
        label={t.label}
        title={t.title}
        lead={t.lead}
        aside={
          <div className="hy-contact-lines">
            {lines.map((l) => (
              <a key={l.label} href={l.href} {...(l.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                <span className="hy-contact-ico">{l.icon}</span>
                <span>
                  <small>{l.label}</small>
                  <strong>{l.value}</strong>
                </span>
                <ArrowUpRight />
              </a>
            ))}
            <div className="hy-contact-partner">
              <small>{t.partnerLabel}</small>
              <strong>{t.partnerTitle}</strong>
              <span>{t.partnerText}</span>
            </div>
          </div>
        }
      />

      <section className="pm hy-contact-form">
        <div className="container">
          <ContactForm />
        </div>
      </section>
    </>
  );
}
