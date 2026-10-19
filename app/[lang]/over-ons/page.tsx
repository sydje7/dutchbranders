import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Carousel from "@/components/ProjectCarousel";
import PageHero from "@/components/PageHero";
import WorkCard from "@/components/WorkCard";
import Rich from "@/components/Rich";
import { ReviewsSection } from "@/components/Sections";
import { ArrowRight, Check } from "@/components/Icons";
import { projects } from "@/lib/data";
import { getDict, hasLocale, localePath } from "@/lib/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]/over-ons">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = getDict(lang).aboutPage;
  return { title: t.metaTitle, description: t.metaDescription };
}

export default async function OverOns({ params }: PageProps<"/[lang]/over-ons">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const d = getDict(lang);
  const t = d.aboutPage;
  const L = (p: string) => localePath(lang, p);

  return (
    <>
      <PageHero label={t.metaTitle} title={t.title} lead={t.lead} shots={["atak", "vanstalen", "cnk"]}>
        <div className="btn-row">
          <Link href={L("/contact")} className="btn btn-orange">
            {d.common.freeAnalysis} <ArrowRight />
          </Link>
          <Link href={L("/werk")} className="btn btn-outline-light">
            {d.common.viewWork}
          </Link>
        </div>
      </PageHero>

      {/* Verhaal + cijfers */}
      <section className="pm hy-story">
        <div className="container hy-story-grid">
          <div data-reveal>
            <span className="eyebrow">{t.story.label}</span>
            <h2 className="display">
              <Rich text={t.story.title} />
            </h2>
            <p className="pm-text">{t.story.text}</p>
          </div>
          <div className="hy-story-stats" data-reveal>
            {t.story.stats.map((s) => (
              <div key={s.label}>
                <strong>
                  <Rich text={s.value} />
                </strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ReviewsSection dict={d} lang={lang} light />

      {/* Stappen */}
      <section className="hy-reviews hy-steps">
        <Carousel
          orange
          trackClass="track hy-review-track"
          head={
            <div data-reveal>
              <span className="eyebrow">{t.steps.label}</span>
              <h2 className="hy-h2" style={{ maxWidth: 620 }}>
                <Rich text={t.steps.title} />
              </h2>
            </div>
          }
        >
          {t.steps.items.map((s) => (
            <article className="hy-rv hy-step" key={s.k}>
              <span className="hy-paren">{s.k}</span>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
              <ul>
                {s.b.map((b) => (
                  <li key={b}>
                    <Check /> {b}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </Carousel>
      </section>

      {/* Vergelijking */}
      <section className="pm hy-compare">
        <div className="container">
          <h2 className="display center" data-reveal style={{ maxWidth: 820, margin: "0 auto 56px" }}>
            <Rich text={t.compare.title} />
          </h2>
          <div className="hy-compare-grid">
            <div className="hy-compare-card" data-reveal>
              <span className="hy-paren">(01)</span>
              <h3>{t.compare.badTitle}</h3>
              <p>{t.compare.badText}</p>
              <ul className="hy-lines muted">
                {t.compare.bad.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>
            <div className="hy-compare-card dark" data-reveal>
              <span className="hy-paren">(02) {t.compare.ribbon}</span>
              <h3>{t.compare.goodTitle}</h3>
              <p>{t.compare.goodText}</p>
              <ul className="hy-lines">
                {t.compare.good.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Projecten */}
      <section className="hy-work hy-work-carousel">
        <Carousel
          head={
            <h2 className="hy-serif" data-reveal>
              <Rich text={t.projectsTitle} />
            </h2>
          }
        >
          {projects.map((p, i) => (
            <WorkCard
              key={p.slug}
              p={p}
              t={d.projects[p.slug as keyof typeof d.projects]}
              labels={d.workPage}
              index={i}
              style={{ flex: "0 0 min(440px, 84vw)", scrollSnapAlign: "start" }}
            />
          ))}
        </Carousel>
      </section>

    </>
  );
}
