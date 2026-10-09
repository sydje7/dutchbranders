import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDict, hasLocale } from "@/lib/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]/privacy">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = getDict(lang).privacyPage;
  return { title: t.metaTitle, description: t.metaDescription };
}

export default async function Privacy({ params }: PageProps<"/[lang]/privacy">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDict(lang).privacyPage;

  return (
    <section className="page-hero">
      <div className="container legal-page">
        <span className="label">{t.label}</span>
        <h1 className="h1">{t.title}</h1>
        <p className="mono" style={{ fontSize: 11 }}>
          {t.updated}
        </p>
        {t.sections.map((s) => (
          <div key={s.h}>
            <h2 id={s.id}>{s.h}</h2>
            {s.p.map((p) => (
              <p key={p}>{p}</p>
            ))}
            {s.ul && (
              <ul>
                {s.ul.map((li) => (
                  <li key={li}>{li}</li>
                ))}
              </ul>
            )}
            {s.after && <p style={{ marginTop: 12 }}>{s.after}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}
