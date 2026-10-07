import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Carousel from "@/components/ProjectCarousel";
import WorkCard from "@/components/WorkCard";
import Rich from "@/components/Rich";
import { Mock } from "@/components/Mockups";
import { Avatar, TeamFigure, looks } from "@/components/Avatar";
import { CtaBand, ReviewLine, ReviewsSection } from "@/components/Sections";
import { CheckCircle, XCircle } from "@/components/Icons";
import { contact, projects } from "@/lib/data";
import { getDict, hasLocale, localePath } from "@/lib/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]/over-ons">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = getDict(lang).aboutPage;
  return { title: t.metaTitle, description: t.metaDescription };
}

const team = [looks.glasses, looks.curly, looks.long, looks.beard];
const statThemes = ["navy", "orange", "", ""];

export default async function OverOns({ params }: PageProps<"/[lang]/over-ons">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const d = getDict(lang);
  const t = d.aboutPage;
  const L = (p: string) => localePath(lang, p);

  return (
    <>
      <section>
        <div className="container about-hero">
          <div style={{ paddingBottom: 60 }}>
            <ReviewLine dict={d} />
            <h1 className="h1">
              <Rich text={t.title} />
            </h1>
            <p className="lead">{t.lead}</p>
            <div className="btn-row">
              <Link href={L("/contact")} className="btn btn-navy btn-sm">
                {d.common.freeAnalysis}
              </Link>
              <Link href={L("/werk")} className="btn btn-outline btn-sm">
                {d.common.viewWork}
              </Link>
            </div>
          </div>
          <div className="about-phone-wrap">
            <span className="scribble">
              <Rich text={t.scribble} />
            </span>
            <div className="phone">
              <div className="screen" style={{ background: "#fff" }}>
                <Mock id="jb" style={{ fontSize: 6.6, paddingTop: 12 }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container story">
          <div>
            <span className="label">{t.story.label}</span>
            <h2 className="h2" style={{ fontSize: "clamp(30px, 3.8vw, 44px)" }}>
              <Rich text={t.story.title} />
            </h2>
            <p className="body">{t.story.text}</p>
            <div className="founder">
              <Avatar look={looks.founder} />
              <div>
                <strong>{contact.founder}</strong>
                <span>{d.common.founderRole}</span>
              </div>
            </div>
          </div>
          <div className="stat-grid">
            {t.story.stats.map((s, i) => (
              <div className={"stat-tile " + statThemes[i]} key={s.label}>
                <strong>
                  <Rich text={s.value} />
                </strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ paddingBottom: 100 }}>
        <Carousel
          orange
          trackClass="steps-track"
          head={
            <div>
              <span className="label">{t.steps.label}</span>
              <h2 className="h2" style={{ fontSize: "clamp(30px, 3.6vw, 42px)", maxWidth: 520 }}>
                <Rich text={t.steps.title} />
              </h2>
            </div>
          }
        >
          {t.steps.items.map((s) => (
            <article className="step-card" key={s.k}>
              <small>{s.k}</small>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
              <ul>
                {s.b.map((b) => (
                  <li key={b}>
                    <CheckCircle /> {b}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </Carousel>
      </section>

      <section style={{ paddingBottom: 100 }}>
        <div className="container compare-wrap">
          <h2 className="h2 center" style={{ fontSize: "clamp(28px, 3.4vw, 40px)" }}>
            <Rich text={t.compare.title} />
          </h2>
          <div className="compare">
            <div className="compare-card">
              <h3>{t.compare.badTitle}</h3>
              <p>{t.compare.badText}</p>
              <ul>
                {t.compare.bad.map((x) => (
                  <li key={x}>
                    <XCircle /> {x}
                  </li>
                ))}
              </ul>
            </div>
            <div className="compare-card navy">
              <span className="ribbon">{t.compare.ribbon}</span>
              <h3>{t.compare.goodTitle}</h3>
              <p>{t.compare.goodText}</p>
              <ul>
                {t.compare.good.map((x) => (
                  <li key={x}>
                    <CheckCircle /> {x}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section style={{ paddingBottom: 100 }}>
        <Carousel
          head={
            <h2 className="h2" style={{ fontSize: "clamp(30px, 3.6vw, 42px)" }}>
              <Rich text={t.projectsTitle} />
            </h2>
          }
        >
          {projects.map((p) => (
            <WorkCard
              key={p.slug}
              p={p}
              t={d.projects[p.slug as keyof typeof d.projects]}
              style={{ flex: "0 0 min(370px, 82vw)", scrollSnapAlign: "start" }}
            />
          ))}
        </Carousel>
      </section>

      <section>
        <div className="container">
          <span className="label">{t.team.label}</span>
          <h2 className="h2" style={{ fontSize: "clamp(30px, 3.6vw, 42px)" }}>
            <Rich text={t.team.title} />
          </h2>
          <div className="team">
            {team.map((l, i) => (
              <div key={i}>
                <div className="team-photo">
                  <TeamFigure look={l} />
                </div>
                <strong>{t.team.name}</strong>
                <span>{t.team.role}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ReviewsSection dict={d} />
      <CtaBand dict={d} lang={lang} />
    </>
  );
}
