"use client";

import { useState } from "react";
import { useI18n } from "./I18n";
import { submitRequest } from "@/lib/submit";

const steps = 3;

/* Formulier in 3 stappen (33% → 66% → 100%) */
export default function LeadForm({ dark = false }: { dark?: boolean }) {
  const { lang, dict } = useI18n();
  const t = dict.leadForm;
  const [step, setStep] = useState(1);
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(false);
  const [fax, setFax] = useState("");
  const [data, setData] = useState({ company: "", website: "", name: "", email: "", phone: "", goal: "" });

  const set = (k: keyof typeof data) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setData({ ...data, [k]: e.target.value });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < steps) return setStep(step + 1);
    setBusy(true);
    setError(false);
    const ok = await submitRequest({
      type: "analyse",
      lang,
      name: data.name,
      email: data.email,
      fax,
      fields: [
        [t.company, data.company],
        [t.website, data.website],
        [t.phone, data.phone],
        [t.goal, data.goal],
      ],
    });
    setBusy(false);
    if (ok) setDone(true);
    else setError(true);
  };

  const pct = done ? 100 : [33, 66, 100][step - 1];

  return (
    <form className={"lead-form" + (dark ? " dark" : "")} onSubmit={submit}>
      <span className="tagline">{t.tagline}</span>
      <div className="progress">
        <span style={{ width: `${pct}%` }}>{pct}%</span>
      </div>

      {done ? (
        <div className="form-done">
          <h3>
            {t.thanks}
            {data.name ? `, ${data.name.split(" ")[0]}` : ""}!
          </h3>
          <p>{t.thanksText}</p>
        </div>
      ) : (
        <>
          <input className="hp" tabIndex={-1} autoComplete="off" aria-hidden name="fax" value={fax} onChange={(e) => setFax(e.target.value)} />
          {step === 1 && (
            <>
              <label className="field">
                <span>
                  {t.company} <i>*</i>
                </span>
                <input className="input" required placeholder={t.companyPh} value={data.company} onChange={set("company")} />
              </label>
              <label className="field">
                <span>{t.website}</span>
                <input className="input" placeholder={t.websitePh} value={data.website} onChange={set("website")} />
              </label>
            </>
          )}
          {step === 2 && (
            <>
              <label className="field">
                <span>
                  {t.name} <i>*</i>
                </span>
                <input className="input" required placeholder={t.namePh} value={data.name} onChange={set("name")} />
              </label>
              <label className="field">
                <span>
                  {t.email} <i>*</i>
                </span>
                <input className="input" type="email" required placeholder={t.emailPh} value={data.email} onChange={set("email")} />
              </label>
              <label className="field">
                <span>{t.phone}</span>
                <input className="input" type="tel" placeholder={t.phonePh} value={data.phone} onChange={set("phone")} />
              </label>
            </>
          )}
          {step === 3 && (
            <label className="field">
              <span>{t.goal}</span>
              <textarea className="input" placeholder={t.goalPh} value={data.goal} onChange={set("goal")} />
            </label>
          )}
          {error && <p className="form-error" role="alert">{dict.common.formError}</p>}
          <div className="form-actions">
            {step > 1 && (
              <button type="button" className={"btn " + (dark ? "btn-outline-light" : "btn-outline")} onClick={() => setStep(step - 1)} disabled={busy}>
                {t.back}
              </button>
            )}
            <button type="submit" className={"btn " + (dark ? "btn-orange" : "btn-navy")} disabled={busy}>
              {busy ? dict.common.sending : step < steps ? t.next : t.submit}
            </button>
          </div>
        </>
      )}
    </form>
  );
}
