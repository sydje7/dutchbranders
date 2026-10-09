import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Rich from "@/components/Rich";
import JobForm from "@/components/JobForm";
import RoleButton from "@/components/RoleButton";
import { Mock } from "@/components/Mockups";
import { ArrowRight, CheckCircle } from "@/components/Icons";
import { contact } from "@/lib/data";
import { getDict, hasLocale } from "@/lib/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]/werken-bij">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = getDict(lang).jobsPage;
  return { title: t.metaTitle, description: t.metaDescription };
}

const roleThemes = ["navy", "", "orange"];

export default async function WerkenBij({ params }: PageProps<"/[lang]/werken-bij">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDict(lang).jobsPage;

  return (
    <>
      <section className="page-hero">
        <div className="container jobs-hero">
          <div>
            <span className="label">{t.label}</span>
            <h1 className="h1">
              <Rich text={t.title} />
            </h1>
            <p className="lead">{t.lead}</p>
            <div className="btn-row">
              <a href="#solliciteren" className="btn btn-orange">
                {t.apply} <ArrowRight />
              </a>
              <a href="#vacatures" className="btn btn-white">
                {t.seeRoles}
              </a>
            </div>
          </div>
          <div className="collage" aria-hidden>
            <div className="collage-inner">
              {(["ex", "jb", "tz", "fj", "kb", "fhs", "tz", "ex", "jb"] as const).map((id, i) => (
                <div className="collage-tile" key={i}>
                  <Mock id={id} style={{ fontSize: 5.2 }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 30 }}>
        <div className="container">
          <span className="label">{t.offerLabel}</span>
          <h2 className="h2" style={{ fontSize: "clamp(30px, 3.8vw, 44px)" }}>
            <Rich text={t.offerTitle} />
          </h2>
          <div className="offer-grid">
            {t.offer.map((o) => (
              <div className="feature" key={o.t}>
                <h3>
                  <CheckCircle /> {o.t}
                </h3>
                <p>{o.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="vacatures" style={{ paddingTop: 20, scrollMarginTop: 60 }}>
        <div className="container">
          <div className="section-head">
            <div>
              <span className="label">{t.rolesLabel}</span>
              <h2 className="h2" style={{ fontSize: "clamp(30px, 3.8vw, 44px)" }}>
                <Rich text={t.rolesTitle} />
              </h2>
            </div>
            <p className="body" style={{ maxWidth: 380 }}>
              {t.rolesText}
            </p>
          </div>
          <div className="courses">
            {t.roles.map((r, i) => (
              <article className={"course role " + roleThemes[i]} key={r.t}>
                <div className="course-top">
                  <span className="level">{r.k}</span>
                </div>
                <h3>{r.t}</h3>
                <p>{r.d}</p>
                <RoleButton kind={r.k} label={t.roleCta} className={"btn btn-sm " + (i === 2 ? "btn-navy" : "btn-orange")} />
              </article>
            ))}
          </div>

          <div className="process" style={{ marginTop: 12 }}>
            <span className="mono" style={{ fontSize: 10 }}>
              {t.stepsLabel}
            </span>
            <div className="process-line" />
            <div className="process-steps steps-3">
              {t.steps.map((s, i) => (
                <div key={s.t}>
                  <span className={"n" + (i === 0 ? " on" : "")}>0{i + 1}</span>
                  <h3>{s.t}</h3>
                  <p>{s.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="lead-section" id="solliciteren" style={{ scrollMarginTop: 60 }}>
        <div className="container lead-grid">
          <div>
            <span className="label">{t.form.label}</span>
            <h2 className="h1">
              <Rich text={t.form.title} />
            </h2>
            <p className="body">{t.form.text}</p>
            <div className="contact-person">
              <span className="contact-logo" aria-hidden>
                db.
              </span>
              <div>
                <strong>Dutch Branders</strong>
                <br />
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
                <br />
                <a href={contact.phoneHref}>{contact.phone}</a>
              </div>
            </div>
          </div>
          <JobForm />
        </div>
      </section>
    </>
  );
}
