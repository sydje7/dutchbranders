import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Rich from "@/components/Rich";
import { CtaBand } from "@/components/Sections";
import { ArrowRight, ArrowUpRight, Check } from "@/components/Icons";
import { getDict, hasLocale, localePath } from "@/lib/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]/cursussen">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = getDict(lang).coursesPage;
  return { title: t.metaTitle, description: t.metaDescription };
}

export default async function Cursussen({ params }: PageProps<"/[lang]/cursussen">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const d = getDict(lang);
  const t = d.coursesPage;
  const L = (p: string) => localePath(lang, p);

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
              <div className="c-price">{t.price}</div>
              <small>{t.info}</small>
              <Link href={L("/contact")} className="btn btn-orange btn-sm">
                {t.enroll} <ArrowUpRight />
              </Link>
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
            <Link href={L("/contact")} className="btn btn-navy btn-sm">
              {t.custom.button} <ArrowUpRight />
            </Link>
          </div>
        </div>
      </section>

      <CtaBand dict={d} lang={lang} />
    </>
  );
}
