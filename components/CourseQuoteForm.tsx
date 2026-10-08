"use client";

import { useState } from "react";
import { ArrowRight } from "./Icons";
import { useI18n } from "./I18n";
import { submitRequest } from "@/lib/submit";

/* Vrijblijvende offerte-aanvraag voor cursussen */
export default function CourseQuoteForm() {
  const { lang, dict } = useI18n();
  const t = dict.coursesPage.quote;
  const [format, setFormat] = useState(t.formatOptions[0]);
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(false);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const v = (k: string) => String(f.get(k) ?? "");
    setBusy(true);
    setError(false);
    const ok = await submitRequest({
      type: "cursus",
      lang,
      name: v("name"),
      email: v("email"),
      fax: v("fax"),
      fields: [
        [t.course, v("course")],
        [t.participants, v("participants")],
        [t.format, format],
        [t.company, v("company")],
        [t.phone, v("phone")],
        [t.message, v("message")],
      ],
    });
    setBusy(false);
    if (ok) setSent(true);
    else setError(true);
  };

  if (sent)
    return (
      <div className="lead-form">
        <span className="tagline">{t.tagline}</span>
        <div className="form-done">
          <h3>{t.thanks}</h3>
          <p>{t.thanksText}</p>
        </div>
      </div>
    );

  return (
    <form className="lead-form" onSubmit={submit}>
      <span className="tagline">{t.tagline}</span>
      <input className="hp" tabIndex={-1} autoComplete="off" aria-hidden name="fax" />
      <div className="form-2">
        <label className="field">
          <span>{t.course}</span>
          <select className="input select" name="course" defaultValue={t.courseOptions[0]}>
            {t.courseOptions.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </label>
        <label className="field">
          <span>{t.participants}</span>
          <input className="input" name="participants" type="number" min={1} defaultValue={1} required />
        </label>
      </div>
      <div className="field">
        <span>{t.format}</span>
        <div className="toggle-row" style={{ marginBottom: 0 }}>
          {t.formatOptions.map((o) => (
            <button type="button" key={o} className={"toggle" + (format === o ? " on" : "")} aria-pressed={format === o} onClick={() => setFormat(o)}>
              {o}
            </button>
          ))}
        </div>
      </div>
      <div className="form-2">
        <label className="field">
          <span>
            {t.name} <i>*</i>
          </span>
          <input className="input" name="name" required placeholder={t.namePh} />
        </label>
        <label className="field">
          <span>{t.company}</span>
          <input className="input" name="company" placeholder={t.companyPh} />
        </label>
        <label className="field">
          <span>
            {t.email} <i>*</i>
          </span>
          <input className="input" name="email" type="email" required placeholder={t.emailPh} />
        </label>
        <label className="field">
          <span>{t.phone}</span>
          <input className="input" name="phone" type="tel" placeholder={t.phonePh} />
        </label>
      </div>
      <label className="field">
        <span>{t.message}</span>
        <textarea className="input" name="message" placeholder={t.messagePh} style={{ height: 90 }} />
      </label>
      {error && <p className="form-error" role="alert">{dict.common.formError}</p>}
      <button type="submit" className="btn btn-navy" disabled={busy}>
        {busy ? dict.common.sending : t.submit} <ArrowRight />
      </button>
    </form>
  );
}
