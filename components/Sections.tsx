import Link from "next/link";
import Rich from "./Rich";
import { GoogleG, Stars } from "./Icons";
import { contact, googleReviewsUrl, reviews } from "@/lib/data";
import { localePath, type Dict, type Locale } from "@/lib/i18n";

export function CtaBand({ dict, lang }: { dict: Dict; lang: Locale }) {
  return (
    <section className="cta-band">
      <div className="container">
        <div>
          <h2>
            <Rich text={dict.cta.title} />
          </h2>
          <p>{dict.cta.text}</p>
        </div>
        <div className="btn-row">
          <Link href={localePath(lang, "/contact")} className="btn btn-navy">
            {dict.common.freeAnalysis}
          </Link>
          <a href={contact.phoneHref} className="btn btn-outline">
            {dict.common.call} {contact.phone}
          </a>
        </div>
      </div>
    </section>
  );
}

export function ReviewLine({ dict }: { dict: Dict }) {
  return (
    <span className="review-line">
      <Stars /> <span><Rich text={dict.common.ratingLine} /></span>
    </span>
  );
}

export function ReviewsSection({ dict, lang }: { dict: Dict; lang: Locale }) {
  const t = dict.reviewsSection;
  const fmt = (d: string) =>
    new Date(d).toLocaleDateString(lang === "nl" ? "nl-NL" : "en-GB", { day: "numeric", month: "long", year: "numeric" });
  const initials = (n: string) =>
    n.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]!.toUpperCase()).join("");

  return (
    <section className="section" id="reviews">
      <div className="container">
        <div className="reviews-head">
          <h2 className="h2">
            <Rich text={t.title} />
          </h2>
          <p>{t.sub}</p>
        </div>

        {reviews.length > 0 ? (
          <>
            <div className="reviews">
              {reviews.map((r) => (
                <article className="review" key={r.name + r.date}>
                  <div className="review-head">
                    <span className="review-ini">{initials(r.name)}</span>
                    <div>
                      <strong>{r.name}</strong>
                    </div>
                  </div>
                  <Stars />
                  <p>{r.text}</p>
                  <div className="review-foot">
                    <GoogleG /> {t.googleReview} · <time dateTime={r.date}>{fmt(r.date)}</time>
                  </div>
                </article>
              ))}
            </div>
            <p className="reviews-note">
              <Rich text={t.note} />
            </p>
          </>
        ) : (
          <div className="rating-hero">
            <Stars />
            <strong>5/5</strong>
            <p>{t.empty}</p>
          </div>
        )}

        <div className="center" style={{ marginTop: 22 }}>
          <a href={googleReviewsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm">
            <GoogleG /> {t.readAll}
          </a>
        </div>
      </div>
    </section>
  );
}
