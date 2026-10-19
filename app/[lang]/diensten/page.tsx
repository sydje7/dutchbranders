import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import Rich from "@/components/Rich";
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
      <PageHero label={t.label} title={t.title} lead={t.lead} shots={["firerocket", "enka", "village"]}>
        <div className="btn-row">
          <Link href={L("/contact")} className="btn btn-orange">
            {d.common.freeAnalysis} <ArrowRight />
          </Link>
          <Link href={L("/werk")} className="btn btn-outline-light">
            {d.common.viewWork}
          </Link>
        </div>
      </PageHero>

      <section className="svc-rows-section">
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

      <section className="pm pm-dark hy-process">
        <div className="container">
          <div className="pm-head" data-reveal>
            <div>
              <span className="eyebrow">{t.process.label}</span>
              <h2 className="display">
                <Rich text={t.process.title} />
              </h2>
            </div>
          </div>
          <ol className="pm-rows">
            {t.process.steps.map((p, i) => (
              <li key={p.t} data-reveal>
                <span className="pm-row-n">{String(i + 1).padStart(2, "0")}</span>
                <h3>{p.t}</h3>
                <div>
                  <p>{p.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
