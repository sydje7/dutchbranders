import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Rich from "@/components/Rich";
import CourseQuoteForm from "@/components/CourseQuoteForm";
import { contact } from "@/lib/data";
import { ArrowRight, ArrowUpRight, Check } from "@/components/Icons";
import { getDict, hasLocale } from "@/lib/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]/cursussen">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = getDict(lang).coursesPage;
  return { title: t.metaTitle, description: t.metaDescription };
}

export default async function Cursussen({ params }: PageProps<"/[lang]/cursussen">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDict(lang).coursesPage;

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="label">{t.label}</span>
          <h1 className="h-display" style={{ fontWeight: 700 }}>
            <Rich text={t.title} />
          </h1>
          <p className="lead">{t.lead}</p>
          <a href="#cursussen" className="btn btn-orange">
            {t.button} <ArrowRight />
          </a>
        </div>
      </section>

      <section id="cursussen" style={{ paddingBottom: 100, scrollMarginTop: 80 }}>
        <div className="container courses">
          {[1, 2, 3].map((n) => (
            <article className={"course" + (n === 2 ? " navy" : "")} key={n}>
              <div className="course-top">
                <span className="mono">
                  {t.course} 0{n}
                </span>
                <span className="level">{t.level}</span>
              </div>
              <h3>{t.name}</h3>
              <p>{t.desc}</p>
              <ul>
                {t.goals.map((g) => (
                  <li key={g}>
                    <Check /> {g}
                  </li>
                ))}
              </ul>
              <small>{t.info}</small>
              <a href="#offerte" className="btn btn-orange btn-sm">
                {t.enroll} <ArrowUpRight />
              </a>
            </article>
          ))}
        </div>
      </section>

      <section style={{ paddingBottom: 90 }}>
        <div className="container maatwerk">
          <div>
            <span className="mono" style={{ fontSize: 9 }}>
              {t.custom.label}
            </span>
            <h2 className="h1">
              <Rich text={t.custom.title} />
            </h2>
          </div>
          <div className="maatwerk-box">
            <p>{t.custom.text}</p>
            <a href="#offerte" className="btn btn-navy btn-sm">
              {t.custom.button} <ArrowUpRight />
            </a>
          </div>
        </div>
      </section>

      <section className="lead-section" id="offerte" style={{ scrollMarginTop: 60 }}>
        <div className="container lead-grid">
          <div>
            <span className="label">{t.quote.label}</span>
            <h2 className="h1">
              <Rich text={t.quote.title} />
            </h2>
            <p className="body">{t.quote.text}</p>
            <div className="contact-person">
              <span className="contact-logo" aria-hidden>db.</span>
              <div>
                <strong>Dutch Branders</strong>
                <br />
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
                <br />
                <a href={contact.phoneHref}>{contact.phone}</a>
              </div>
            </div>
          </div>
          <CourseQuoteForm />
        </div>
      </section>
    </>
  );
}
