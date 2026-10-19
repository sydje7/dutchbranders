import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Rich from "@/components/Rich";
import JobForm from "@/components/JobForm";
import PageHero from "@/components/PageHero";
import RoleButton from "@/components/RoleButton";
import { ArrowRight } from "@/components/Icons";
import { contact } from "@/lib/data";
import { getDict, hasLocale } from "@/lib/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]/werken-bij">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = getDict(lang).jobsPage;
  return { title: t.metaTitle, description: t.metaDescription };
}

export default async function WerkenBij({ params }: PageProps<"/[lang]/werken-bij">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDict(lang).jobsPage;

  return (
    <>
      <PageHero label={t.label} title={t.title} lead={t.lead} shots={["ultra", "shadow", "nextsleep"]}>
        <div className="btn-row">
          <a href="#solliciteren" className="btn btn-orange">
            {t.apply} <ArrowRight />
          </a>
          <a href="#vacatures" className="btn btn-outline-light">
            {t.seeRoles}
          </a>
        </div>
      </PageHero>

      {/* Wat we bieden */}
      <section className="pm hy-offer">
        <div className="container">
          <div className="pm-head" data-reveal>
            <div>
              <span className="eyebrow">{t.offerLabel}</span>
              <h2 className="display">
                <Rich text={t.offerTitle} />
              </h2>
            </div>
          </div>
          <div className="hy-offer-grid">
            {t.offer.map((o, i) => (
              <div key={o.t} data-reveal style={{ transitionDelay: `${i * 70}ms` }}>
                <span className="hy-paren">({String(i + 1).padStart(2, "0")})</span>
                <h3>{o.t}</h3>
                <p>{o.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vacatures & stages */}
      <section className="hy-bento hy-roles" id="vacatures">
        <div className="container">
          <div className="pm-head" data-reveal>
            <div>
              <span className="eyebrow">{t.rolesLabel}</span>
              <h2 className="hy-h2">
                <Rich text={t.rolesTitle} />
              </h2>
            </div>
            <p className="pm-text">{t.rolesText}</p>
          </div>
          <div className="hy-role-grid">
            {t.roles.map((r, i) => (
              <article className={"hy-card hy-role" + (i === 2 ? " accent" : "")} key={r.t} data-reveal>
                <span className="hy-role-kind">{r.k}</span>
                <h3>{r.t}</h3>
                <p>{r.d}</p>
                <RoleButton kind={r.k} label={t.roleCta} className={"btn btn-sm " + (i === 2 ? "btn-navy" : "btn-orange")} />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Zo werkt het */}
      <section className="pm hy-job-steps">
        <div className="container">
          <span className="eyebrow" data-reveal>
            {t.stepsLabel}
          </span>
          <ol className="pm-rows" style={{ marginTop: 30 }}>
            {t.steps.map((s, i) => (
              <li key={s.t} data-reveal>
                <span className="pm-row-n">{String(i + 1).padStart(2, "0")}</span>
                <h3>{s.t}</h3>
                <div>
                  <p>{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Sollicitatieformulier */}
      <section className="hy-cta" id="solliciteren">
        <div className="container">
          <span className="eyebrow center-eyebrow">{t.form.label}</span>
          <h2 className="hy-cta-title" data-reveal>
            <Rich text={t.form.title} />
          </h2>
          <p className="hy-cta-text" data-reveal>
            {t.form.text}
          </p>
          <div className="hy-cta-grid">
            <div className="hy-cta-lines" data-reveal>
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
              <a href={contact.phoneHref}>{contact.phone}</a>
              <span>{contact.address}</span>
            </div>
            <JobForm />
          </div>
        </div>
      </section>
    </>
  );
}
