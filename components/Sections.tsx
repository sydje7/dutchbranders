import Rich from "./Rich";
import { ArrowUpRight, GoogleG, Stars } from "./Icons";
import { googleReviewsUrl, reviews } from "@/lib/data";
import type { Dict, Locale } from "@/lib/i18n";

export function ReviewLine({ dict }: { dict: Dict }) {
  return (
    <span className="review-line">
      <Stars /> <span><Rich text={dict.common.ratingLine} /></span>
    </span>
  );
}

export function ReviewsSection({ dict, lang, light = false }: { dict: Dict; lang: Locale; light?: boolean }) {
  const t = dict.reviewsSection;
  const fmt = (d: string) =>
    new Date(d).toLocaleDateString(lang === "nl" ? "nl-NL" : "en-GB", { day: "numeric", month: "long", year: "numeric" });

  // Echte Google-reviews als die er zijn, anders de klantreacties van de homepage
  const quotes = reviews.length
    ? reviews.map((r) => ({ name: r.name, role: fmt(r.date), text: r.text }))
    : dict.home.reviews.items;

  return (
    <section className={"hy-reviews hy-quotes" + (light ? " light" : "")} id="reviews">
      <div className="container">
        <div className="hy-quotes-head">
          <div data-reveal>
            <span className="eyebrow">{dict.home.reviews.label}</span>
            <h2 className="display">
              <Rich text={t.title} />
            </h2>
            <p className="hy-reviews-sub">{t.sub}</p>
          </div>
          <div className="hy-score" data-reveal>
            <strong>5/5</strong>
            <div>
              <Stars />
              <span>{t.empty}</span>
              <a href={googleReviewsUrl} target="_blank" rel="noopener noreferrer" className="eyebrow-link">
                <GoogleG /> {t.readAll} <ArrowUpRight />
              </a>
            </div>
          </div>
        </div>

        <div className="hy-quote-grid">
          {quotes.map((q, i) => (
            <figure className="hy-quote" key={q.name} data-reveal style={{ transitionDelay: `${i * 90}ms` }}>
              <span className="hy-quote-mark" aria-hidden>
                “
              </span>
              <Stars />
              <blockquote>{q.text}</blockquote>
              <figcaption>
                <span className="hy-rv-logo">{q.name.slice(0, 1)}</span>
                <span>
                  <strong>{q.name}</strong>
                  <small>{q.role}</small>
                </span>
              </figcaption>
              <span className="hy-rv-slash" aria-hidden />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
