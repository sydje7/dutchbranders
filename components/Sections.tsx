import Link from "next/link";
import Rich from "./Rich";
import { GoogleG, Stars } from "./Icons";
import { contact, reviews } from "@/lib/data";
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
      <Stars /> {contact.reviewCount}+ {dict.common.reviewsOnGoogle}
    </span>
  );
}

export function ReviewsSection({ dict }: { dict: Dict }) {
  const t = dict.reviewsSection;
  return (
    <section className="section" id="reviews">
      <div className="container">
        <div className="reviews-head">
          <h2 className="h2">
            <Rich text={t.title} />
          </h2>
          <p>{t.sub}</p>
        </div>
        <div className="reviews">
          {reviews.map((r) => {
            const tr = dict.reviews[r.ini];
            return (
              <article className="review" key={r.ini}>
                <div className="review-head">
                  <span className="review-ini" style={{ background: r.color }}>
                    {r.ini}
                  </span>
                  <div>
                    <strong>{r.name}</strong>
                    <small>{tr.role}</small>
                  </div>
                </div>
                <Stars />
                <p>{tr.text}</p>
                <div className="review-foot">
                  <GoogleG /> {t.googleReview} · <time>{tr.date}</time>
                </div>
              </article>
            );
          })}
        </div>
        <p className="reviews-note">
          <Rich text={t.note} vars={{ rating: contact.rating, count: contact.reviewCount }} />
        </p>
      </div>
    </section>
  );
}
