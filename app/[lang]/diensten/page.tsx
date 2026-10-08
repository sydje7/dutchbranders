import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Rich from "@/components/Rich";
import { CtaBand } from "@/components/Sections";
import { ArrowRight, ArrowUpRight, Check } from "@/components/Icons";
import { getDict, hasLocale, localePath } from "@/lib/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]/diensten">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = getDict(lang).servicesPage;
  return { title: t.metaTitle, description: t.metaDescription };
}

const themes = ["navy", "", "orange", "", "navy"];

export default async function Diensten({ params }: PageProps<"/[lang]/diensten">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const d = getDict(lang);
  const t = d.servicesPage;
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
          <div className="btn-row">
            <Link href={L("/contact")} className="btn btn-orange">
              {d.common.freeAnalysis} <ArrowRight />
            </Link>
            <Link href={L("/werk")} className="btn btn-white">
              {d.common.viewWork}
            </Link>
          </div>
        </div>
      </section>

      <section style={{ paddingBottom: 70 }}>
        <div className="container svc-rows">
          {d.services.map((s, i) => {
            const theme = themes[i];
            return (
              <article className={"svc-row " + theme} id={s.slug} key={s.slug}>
                <div>
                  <span className="mono" style={{ fontSize: 10 }}>
                    0{i + 1} / 05
                  </span>
                  <h2>{s.longTitle}</h2>
                  <p>{s.long}</p>
                  <div className="price-line">
                    <Link href={L("/contact")} className={"btn btn-sm " + (theme === "orange" ? "btn-navy" : "btn-orange")}>
                      {d.common.requestQuote} <ArrowUpRight />
                    </Link>
                  </div>
                </div>
                <div>
                  <span className="mono" style={{ fontSize: 10 }}>
                    {t.youGet}
                  </span>
                  <ul>
                    {s.bullets.map((b) => (
                      <li key={b}>
                        <Check /> {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section style={{ padding: "50px 0 90px" }}>
        <div className="container">
          <div className="process">
            <span className="mono" style={{ fontSize: 10 }}>
              {t.process.label}
            </span>
            <h2 className="h2">{t.process.title}</h2>
            <div className="process-line" />
            <div className="process-steps">
              {t.process.steps.map((p, i) => (
                <div key={p.t}>
                  <span className={"n" + (i === 0 ? " on" : "")}>0{i + 1}</span>
                  <h3>{p.t}</h3>
                  <p>{p.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CtaBand dict={d} lang={lang} />
    </>
  );
}
