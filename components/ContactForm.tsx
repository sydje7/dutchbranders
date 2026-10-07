"use client";

import { useState } from "react";
import { ArrowRight } from "./Icons";
import { useI18n } from "./I18n";

export default function ContactForm() {
  const t = useI18n().dict.contactForm;
  const [selected, setSelected] = useState<string[]>([t.options[0]]);
  const [sent, setSent] = useState(false);

  const toggle = (o: string) => setSelected((s) => (s.includes(o) ? s.filter((x) => x !== o) : [...s, o]));

  if (sent)
    return (
      <div className="contact-form form-done">
        <h3>{t.thanks}</h3>
        <p>{t.thanksText}</p>
      </div>
    );

  return (
    <form
      className="contact-form"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true); // TODO: koppel aan e-mail/CRM
      }}
    >
      <p className="q">{t.question}</p>
      <div className="toggle-row">
        {t.options.map((o) => (
          <button type="button" key={o} className={"toggle" + (selected.includes(o) ? " on" : "")} aria-pressed={selected.includes(o)} onClick={() => toggle(o)}>
            {o}
          </button>
        ))}
      </div>
      <div className="form-2">
        <label className="field">
          <span>{t.name}</span>
          <input className="input" name="name" required placeholder={t.namePh} />
        </label>
        <label className="field">
          <span>{t.company}</span>
          <input className="input" name="company" placeholder={t.companyPh} />
        </label>
        <label className="field">
          <span>{t.email}</span>
          <input className="input" name="email" type="email" required placeholder={t.emailPh} />
        </label>
        <label className="field">
          <span>{t.phone}</span>
          <input className="input" name="phone" type="tel" placeholder={t.phonePh} />
        </label>
      </div>
      <label className="field">
        <span>{t.message}</span>
        <textarea className="input" name="message" placeholder={t.messagePh} />
      </label>
      <button type="submit" className="btn btn-orange">
        {t.submit} <ArrowRight />
      </button>
    </form>
  );
}
