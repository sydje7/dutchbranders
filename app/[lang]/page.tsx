import Link from "next/link";
import { notFound } from "next/navigation";
import Carousel from "@/components/ProjectCarousel";
import CasesTabs from "@/components/CasesTabs";
import RoiCalculator from "@/components/RoiCalculator";
import Faq from "@/components/Faq";
import LogoMarquee from "@/components/LogoMarquee";
import LeadForm from "@/components/LeadForm";
import Rich from "@/components/Rich";
import { Mock, type MockId } from "@/components/Mockups";
import { Avatar, looks } from "@/components/Avatar";
import { ReviewLine } from "@/components/Sections";
import { ArrowUpRight, CheckCircle, Crown, ScribbleArrow, Shield, Star, Stars } from "@/components/Icons";
import { contact } from "@/lib/data";
import { getDict, hasLocale, localePath } from "@/lib/i18n";

const heroProjects: { id: MockId; name: string }[] = [
  { id: "fj", name: "Fietsen Jansen" },
  { id: "tz", name: "Tandartspraktijk Zuid" },
  { id: "fhs", name: "Studio FHS" },
  { id: "jb", name: "Jurist & Bewind" },
  { id: "ex", name: "Extremos Amsterdam" },
  { id: "kb", name: "Koffiebar Noord" },
];

const inboxTimes = [
  { t: "10:42", star: false },
  { t: "09:31", star: true },
  { t: "08:15", star: false },
  { t: "", star: false },
  { t: "", star: false, fade: true },
  { t: "", star: false, fade: true },
];

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const d = getDict(lang);
  const h = d.home;
  const L = (p: string) => localePath(lang, p);
  const svc = d.services;

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

        <Carousel
          head={
            <div className="scribble">
              <Rich text={h.scribble} />
              <ScribbleArrow />
            </div>
          }
        >
          {heroProjects.map((p) => (
            <Link href={L("/werk")} className="project-card" key={p.id}>
              <Mock id={p.id} />
              <div className="caption">
                <strong>{p.name}</strong>
                <span>{h.heroTags[p.id]}</span>
              </div>
            </Link>
          ))}
        </Carousel>

        <div className="container">
          <LogoMarquee label={h.logosLabel} />
        </div>
      </section>

      {/* MOTTO */}
      <section className="section-sm">
        <div className="container">
          <div className="motto">
            <div>
              <span className="label label-orange">{h.motto.label}</span>
              <h2 className="h1">
                <Rich text={h.motto.title} />
              </h2>
              <p>{h.motto.text}</p>
              <Link href={L("/over-ons")} className="btn btn-orange btn-sm">
                {h.motto.button}
              </Link>
            </div>
            <div className="stat-stack">
              <div className="stat-box white">
                <Stars />
                <div>
                  <Rich text={h.motto.rating} vars={{ rating: contact.rating, count: contact.reviewCount }} />
                </div>
              </div>
              {[h.motto.stat1, h.motto.stat2].map((s) => (
                <div className="stat-box" key={s.label}>
                  <strong>{s.value}</strong>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* EIGEN MARKETINGAFDELING */}
      <section className="section">
        <div className="container split">
          <div>
            <span className="label">{h.team.label}</span>
            <h2 className="h2">
              <Rich text={h.team.title} />
            </h2>
            <p className="body">{h.team.text}</p>
            <Link href={L("/contact")} className="btn btn-navy btn-sm">
              {d.common.freeAnalysis}
            </Link>
          </div>
          <div className="feature-list">
            {h.team.features.map((f) => (
              <div className="feature" key={f.t}>
                <h3>
                  <CheckCircle /> {f.t}
                </h3>
                <p>
                  <Rich text={f.d} />
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BEWEZEN AANPAK */}
      <section style={{ paddingBottom: 90 }}>
        <div className="container">
          <h2 className="h2 proof-title" style={{ fontSize: "clamp(30px, 3.8vw, 46px)" }}>
            <Rich text={h.proof.title} />
          </h2>
          <div className="proof">
            <div className="proof-main">
              <h3>
                <Rich text={h.proof.mainTitle} />
              </h3>
              <p>{h.proof.mainText}</p>
              <Link href={L("/werk")} className="btn btn-orange btn-sm">
                {d.common.viewWork}
              </Link>
              <div className="phone">
                <div className="screen">
                  <Mock id="fhs" style={{ fontSize: 6.2, paddingTop: 10 }} />
                </div>
              </div>
            </div>
            <div className="inbox-card">
              <div className="inbox">
                {inboxTimes.map((r, i) => (
                  <div className={"inbox-row" + (r.fade ? " fade" : "")} key={i}>
                    <span className="box" />
                    <Star on={r.star} />
                    <b>jouwbedrijf.nl</b>
                    <span className="s">{h.proof.inboxSubject}</span>
                    <span className="t">{r.t || h.proof.yesterday}</span>
                  </div>
                ))}
              </div>
              <h3>{h.proof.inboxTitle}</h3>
              <p>{h.proof.inboxText}</p>
            </div>
            <div className="proof-banner">
              <h3>{h.proof.bannerTitle}</h3>
              <p>{h.proof.bannerText}</p>
              <div className="btn-row">
                <Link href={L("/contact")} className="btn btn-navy btn-sm">
                  {d.common.freeAnalysis}
                </Link>
                <a href="#pakketten" className="btn btn-outline btn-sm">
                  {h.proof.bannerButton}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DIENSTEN */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="label">{h.servicesBlock.label}</span>
              <h2 className="h2">
                <Rich text={h.servicesBlock.title} />
              </h2>
            </div>
            <Link href={L("/diensten")} className="link-arrow">
              {h.servicesBlock.all} <ArrowUpRight />
            </Link>
          </div>
          <div className="svc-grid">
            <Link href={L(`/diensten#${svc[0].slug}`)} className="svc big">
              <span className="mono">01</span>
              <span className="go">
                <ArrowUpRight />
              </span>
              <div>
                <h3>{svc[0].title}</h3>
                <p style={{ maxWidth: 330 }}>{svc[0].short}</p>
                <div className="chips">
                  {svc[0].chips.map((c) => (
                    <span className="chip" key={c}>
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
            <Link href={L(`/diensten#${svc[1].slug}`)} className="svc">
              <span className="mono">02</span>
              <div>
                <h3>{svc[1].title}</h3>
                <p>{svc[1].short}</p>
              </div>
            </Link>
          </div>
          <div className="svc-grid-row2">
            {svc.slice(2).map((s, i) => (
              <Link href={L(`/diensten#${s.slug}`)} className={"svc" + (i === 2 ? " orange" : "")} key={s.slug}>
                <span className="mono">0{i + 3}</span>
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.short}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CASES */}
      <section className="section" style={{ paddingTop: 30 }}>
        <div className="container">
          <div className="section-head" style={{ marginBottom: 22 }}>
            <div>
              <span className="label">{h.cases.label}</span>
              <h2 className="h2" style={{ fontSize: "clamp(30px, 3.8vw, 44px)" }}>
                <Rich text={h.cases.title} />
              </h2>
            </div>
            <Link href={L("/werk")} className="btn btn-outline btn-sm">
              {h.cases.all}
            </Link>
          </div>
          <CasesTabs />
        </div>
      </section>

      {/* PERSOONLIJK */}
      <section style={{ paddingBottom: 90 }}>
        <div className="container">
          <span className="label">{h.personal.label}</span>
          <h2 className="h2" style={{ fontSize: "clamp(30px, 3.8vw, 44px)" }}>
            <Rich text={h.personal.title} />
          </h2>
          <p className="body" style={{ maxWidth: 680, marginTop: 20 }}>
            {h.personal.text}
          </p>
          <div className="founder">
            <Avatar look={looks.founder} />
            <div>
              <strong>{contact.founder}</strong>
              <span>{d.common.founderRole}</span>
            </div>
          </div>
          <div className="usp-bar">
            <ul>
              {h.personal.usps.map((u) => (
                <li key={u}>
                  <CheckCircle /> {u}
                </li>
              ))}
            </ul>
            <Link href={L("/contact")} className="btn btn-orange btn-sm">
              {h.personal.button}
            </Link>
          </div>
        </div>
      </section>

      {/* PAKKETTEN */}
      <section className="section" id="pakketten" style={{ paddingTop: 40, scrollMarginTop: 60 }}>
        <div className="container">
          <h2 className="h2" style={{ fontSize: "clamp(30px, 3.8vw, 44px)" }}>
            <Rich text={h.pricing.title} />
          </h2>
          <p className="body" style={{ maxWidth: 560, marginTop: 10 }}>
            {h.pricing.text}
          </p>
          <div className="pricing">
            <div className="price-card featured">
              <span className="ribbon">{h.pricing.popular}</span>
              <h3>{h.pricing.basic.name}</h3>
              <p>{h.pricing.basic.text}</p>
              <div className="price">{h.pricing.basic.price}</div>
              <ul className="price-list">
                {h.pricing.basic.items.map((x) => (
                  <li key={x}>
                    <CheckCircle /> {x}
                  </li>
                ))}
              </ul>
              <Link href={L("/contact")} className="btn btn-navy">
                {d.common.askQuote}
              </Link>
            </div>
            <RoiCalculator />
            <div className="price-card">
              <h3>{h.pricing.full.name}</h3>
              <p>{h.pricing.full.text}</p>
              <div className="price">{h.pricing.full.price}</div>
              <ul className="price-list">
                {h.pricing.full.items.map((x) => (
                  <li key={x}>
                    <CheckCircle /> {x}
                  </li>
                ))}
              </ul>
              <Link href={L("/contact")} className="btn btn-navy">
                {d.common.askQuote}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* KLANTEN */}
      <section className="section" style={{ paddingTop: 20 }}>
        <div className="container">
          <span className="label">{h.clients.label}</span>
          <blockquote className="big-quote" style={{ margin: 0 }}>
            {h.clients.quote}
            <br />
            <em>{h.clients.quoteEnd}</em>”
          </blockquote>
          <div className="founder" style={{ marginTop: 20 }}>
            <Avatar look={looks.long} />
            <div>
              <strong style={{ fontSize: 14 }}>{h.clients.quoteName}</strong>
              <span style={{ fontSize: 12 }}>{h.clients.quoteRole}</span>
            </div>
          </div>
          <div className="quote-grid">
            {h.clients.cards.map((c) => (
              <div className="quote-card" key={c.name}>
                {c.text}
                <footer>
                  <b>{c.name}</b> · {c.role}
                </footer>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" style={{ paddingTop: 40 }}>
        <div className="container">
          <h2 className="h2" style={{ fontSize: "clamp(30px, 3.8vw, 44px)" }}>
            <Rich text={h.faq.title} />
          </h2>
          <p className="body" style={{ marginTop: 10 }}>
            {h.faq.text}
          </p>
          <Faq />

          <h2 className="h3" style={{ marginTop: 90 }}>
            <Rich text={h.trust.title} />
          </h2>
          <div className="trust">
            {h.trust.items.map((x) => (
              <div className="trust-card" key={x.t}>
                <span className="trust-ico">{x.icon === "shield" ? <Shield /> : x.icon}</span>
                <div>
                  <strong>{x.t}</strong>
                  <span>{x.d}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LEAD */}
      <section className="lead-section">
        <div className="container lead-grid">
          <div>
            <h2 className="h1">
              <Rich text={h.leadSection.title} />
            </h2>
            <p className="body">{h.leadSection.text}</p>
            <div className="contact-person">
              <Avatar look={looks.founder} />
              <div>
                <strong>{contact.founder}</strong>
                <br />
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
                <br />
                <a href={contact.phoneHref}>{contact.phone}</a>
              </div>
            </div>
          </div>
          <LeadForm />
        </div>
      </section>

      {/* WERKEN BIJ */}
      <section className="section" id="werken-bij" style={{ scrollMarginTop: 60 }}>
        <div className="container jobs">
          <div className="collage" aria-hidden>
            <div className="collage-inner">
              {(["ex", "jb", "tz", "fj", "kb", "fhs", "tz", "ex", "jb"] as const).map((id, i) => (
                <div className="collage-tile" key={i}>
                  <Mock id={id} style={{ fontSize: 5.2 }} />
                </div>
              ))}
            </div>
          </div>
          <div>
            <span className="label">{h.jobs.label}</span>
            <h2 className="h2" style={{ fontSize: "clamp(30px, 3.8vw, 44px)" }}>
              <Rich text={h.jobs.title} />
            </h2>
            <p className="body">{h.jobs.text}</p>
            <div className="btn-row">
              <Link href={L("/contact")} className="btn btn-navy btn-sm">
                {h.jobs.vacancies}
              </Link>
              <Link href={L("/contact")} className="btn btn-outline btn-sm">
                {h.jobs.open}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
