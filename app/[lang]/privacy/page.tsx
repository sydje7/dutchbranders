import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
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
    <>
      <PageHero label={t.label} title={t.title} lead={t.updated} aside={<span className="hy-hero-mark" aria-hidden>§</span>} />

      <section className="pm hy-legal">
        <div className="container legal-page">
          {t.sections.map((s, i) => (
            <div key={s.h} className="hy-legal-block">
              <span className="hy-paren">({String(i + 1).padStart(2, "0")})</span>
              <div>
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
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
