import Link from "next/link";
import { notFound } from "next/navigation";
/* eslint-disable @next/next/no-img-element */
import Carousel from "@/components/ProjectCarousel";
import Faq from "@/components/Faq";
import ServiceStack from "@/components/ServiceStack";
import LogoMarquee from "@/components/LogoMarquee";
import LeadForm from "@/components/LeadForm";
import Rich from "@/components/Rich";
import { ReviewLine } from "@/components/Sections";
import { ArrowUpRight, Crown, GoogleG, Stars } from "@/components/Icons";
import { contact, googleReviewsUrl, projects } from "@/lib/data";
import { getDict, hasLocale, localePath } from "@/lib/i18n";


/* Lijniconen rond de cirkel in het bento-blok */
const ico = (d: string) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);
const orbitIcons = [
  ico("M3 5h18v11H3zM8 20h8M12 16v4"),
  ico("M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM21 21l-5-5"),
  ico("M4 20V10M10 20V4M16 20v-7M22 20H2"),
  ico("M3 11v2a1 1 0 0 0 1 1h3l5 4V6L7 10H4a1 1 0 0 0-1 1zM16 9a4 4 0 0 1 0 6"),
];

/* Uitgelichte projecten in "Recent werk" */
const featured = ["dentville", "denk", "bkp", "atak"].map((slug) => projects.find((p) => p.slug === slug)!);

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const d = getDict(lang);
  const h = d.home;
  const L = (p: string) => localePath(lang, p);

  return (
    <>
      {/* HERO */}
      <section className="hero-home">
        <div className="container">
          <span className="hero-badge">
            <Crown className="crown" />
            {h.badge}
          </span>
          <h1 className="h-display">
            <Rich text={h.title} />
          </h1>
          <p className="lead">{h.lead}</p>
          <div className="btn-row">
            <Link href={L("/contact")} className="btn btn-navy">
              {d.common.freeAnalysis}
            </Link>
            <Link href={L("/werk")} className="btn btn-outline">
              {d.common.viewWork}
            </Link>
          </div>
          <ReviewLine dict={d} />
        </div>

        <div className="container hero-logos">
          <LogoMarquee label={h.logosLabel} />
        </div>
      </section>

      {/* BENTO – WPmasters */}
      <section className="hy-bento">
        <div className="container">
          <h2 className="hy-bento-title" data-reveal>
            <Rich text={h.bento.title} />
          </h2>
          <div className="hy-grid">
            <article className="hy-card hy-a" data-reveal>
              <div className="hy-card-text">
                <h3>{h.bento.a.t}</h3>
                <p>{h.bento.a.d}</p>
              </div>
              <div className="hy-orbit" aria-hidden>
                <span className="ring" />
                <span className="ring r2" />
                {orbitIcons.map((ico, i) => (
                  <span className={"ico i" + i} key={i}>
                    {ico}
                  </span>
                ))}
              </div>
            </article>
            <article className="hy-card hy-b" data-reveal>
              <div className="hy-card-text">
                <h3>{h.bento.b.t}</h3>
                <p>{h.bento.b.d}</p>
              </div>
              <div className="hy-charts" aria-hidden>
                <svg viewBox="0 0 220 120" className="hy-line">
                  <path d="M10 100 L50 88 L90 92 L130 60 L170 52 L210 20" fill="none" stroke="currentColor" strokeWidth="2.5" />
                  <path d="M10 100 L50 88 L90 92 L130 60 L170 52 L210 20 L210 115 L10 115 Z" fill="currentColor" opacity="0.18" />
                </svg>
                <div className="hy-donut" />
              </div>
            </article>
            <article className="hy-card hy-c" data-reveal>
              <div className="hy-card-text">
                <h3>{h.bento.c.t}</h3>
                <p>{h.bento.c.d}</p>
              </div>
              <div className="hy-strip" aria-hidden>
                {(["denk", "vanstalen", "village", "lust109"] as const).map((id) => (
                  <img key={id} src={`/klanten/${id}.jpg`} alt="" loading="lazy" decoding="async" />
                ))}
              </div>
            </article>
            <article className="hy-card hy-d" data-reveal>
              <div className="hy-card-text">
                <h3>{h.bento.d.t}</h3>
                <p>{h.bento.d.d}</p>
                <Link href={L("/contact")} className="btn btn-orange btn-sm">
                  {h.bento.d.button}
                </Link>
              </div>
              <div className="hy-pills" aria-hidden>
                {h.bento.pills.map((x, i) => (
                  <span key={x} className={i === 3 ? "on" : ""}>
                    {x}
                  </span>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* RECENT WERK – Webfluencer */}
      <section className="hy-work">
        <div className="container">
          <div className="hy-head" data-reveal>
            <h2 className="hy-serif">{h.work.label}</h2>
            <Link href={L("/werk")} className="eyebrow-link">
              {h.work.all} <ArrowUpRight />
            </Link>
          </div>
          <div className="pm-cases">
            {featured.map((p, i) => {
              const info = d.projects[p.slug as keyof typeof d.projects];
              return (
                <a key={p.slug} href={p.url} target="_blank" rel="noopener noreferrer" className="pm-case" data-reveal>
                  <img src={`/klanten/${p.slug}.jpg`} alt={`Website van ${p.name}`} loading="lazy" decoding="async" />
                  <div className="pm-case-top" aria-hidden>
                    <span>{String(i + 1).padStart(2, "0")}</span>
                    <span>{info.branche}</span>
                  </div>
                  <div className="pm-case-foot">
                    <div>
                      <h3>{p.name}</h3>
                      <div className="pm-tags">
                        <span>{info.sector}</span>
                        {info.services.map((x) => (
                          <span key={x}>{x}</span>
                        ))}
                      </div>
                    </div>
                    <span className="pm-go" aria-label={h.work.visit}>
                      <ArrowUpRight />
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* DIENSTEN – Webfluencer */}
      <section className="pm pm-dark pm-services">
        <div className="container">
          <ServiceStack />
        </div>
      </section>

      {/* MANIFEST – We Are Boring */}
      <section className="hy-manifest">
        <div className="container">
          <div className="hy-manifest-top" data-reveal>
            <span className="hy-paren">{h.manifesto.label}</span>
            <h2 className="hy-condensed">{h.manifesto.title}</h2>
          </div>
          <div className="hy-columns">
            <Link href={L("/contact")} className="hy-tag-btn" data-reveal>
              {h.manifesto.button} <ArrowUpRight />
            </Link>
            {h.manifesto.columns.map((c, i) => (
              <div key={c.t} data-reveal style={{ transitionDelay: `${i * 90}ms` }}>
                <span className="hy-paren">(0{i + 1})</span>
                <h3 className="hy-condensed">{c.t}</h3>
                <ul>
                  {c.items.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CIJFERS – Studio Brabo */}
      <section className="hy-proof">
        <div className="container hy-proof-grid">
          <div className="hy-proof-img" data-reveal>
            <img src="/klanten/atak.jpg" alt="" loading="lazy" decoding="async" />
          </div>
          <div data-reveal>
            <p className="hy-proof-text">{h.proof.text}</p>
            <div className="hy-proof-stats">
              {h.stats.map((x) => (
                <div key={x.l}>
                  <strong>{x.v}</strong>
                  <span>{x.l}</span>
                </div>
              ))}
            </div>
            <Link href={L("/contact")} className="hy-tag-btn light">
              {h.proof.button} <ArrowUpRight />
            </Link>
          </div>
        </div>
      </section>

      {/* REVIEWS – WPmasters */}
      <section className="hy-reviews">
        <Carousel
          trackClass="track hy-review-track"
          orange
          head={
            <div data-reveal>
              <span className="eyebrow">{h.reviews.label}</span>
              <h2 className="hy-h2">
                <Rich text={h.reviews.title} />
              </h2>
            </div>
          }
        >
          {h.reviews.items.map((r) => (
            <figure className="hy-rv" key={r.name}>
              <GoogleG className="hy-rv-g" />
              <div className="hy-rv-top">
                <span className="hy-rv-logo">{r.name.slice(0, 1)}</span>
                <div>
                  <strong>{r.name}</strong>
                  <span>{r.role}</span>
                </div>
              </div>
              <Stars />
              <blockquote>“{r.text}”</blockquote>
              <span className="hy-rv-slash" aria-hidden />
            </figure>
          ))}
        </Carousel>
        <div className="container hy-reviews-foot">
          <a href={googleReviewsUrl} target="_blank" rel="noopener noreferrer" className="eyebrow-link">
            <GoogleG /> {d.reviewsSection.readAll} <ArrowUpRight />
          </a>
        </div>
      </section>

      {/* FAQ */}
      <section className="pm pm-faq">
        <div className="container faq-split">
          <div className="faq-side" data-reveal>
            <span className="eyebrow">{h.faq.label}</span>
            <h2 className="display">
              <Rich text={h.faq.title} />
            </h2>
            <p className="pm-text">{h.faq.text}</p>
            <div className="faq-contact">
              <a href={contact.phoneHref}>{contact.phone}</a>
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </div>
          </div>
          <Faq />
        </div>
      </section>

      {/* INTERESSE – WPmasters */}
      <section className="hy-cta" id="analyse">
        <div className="container">
          <h2 className="hy-cta-title" data-reveal>
            <Rich text={h.leadSection.title} />
          </h2>
          <p className="hy-cta-text" data-reveal>
            {h.leadSection.text}
          </p>
          <div className="hy-cta-grid">
            <div className="hy-cta-lines" data-reveal>
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
              <a href={contact.phoneHref}>{contact.phone}</a>
              <span>{contact.address}</span>
            </div>
            <LeadForm />
          </div>
        </div>
      </section>

      {/* WERKEN BIJ */}
      <section className="pm pm-jobs" id="werken-bij">
        <div className="container">
          <Link href={L("/werken-bij")} className="pm-jobs-row" data-reveal>
            <span className="eyebrow">{h.jobs.label}</span>
            <h2 className="display">
              <Rich text={h.jobs.title} />
            </h2>
            <span className="pm-go">
              <ArrowUpRight />
            </span>
          </Link>
        </div>
      </section>
    </>
  );
}
