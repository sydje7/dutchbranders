"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "./Icons";
import { useI18n } from "./I18n";
import { submitRequest } from "@/lib/submit";

const MAX_BYTES = 5 * 1024 * 1024;
const CV_TYPES = /\.(pdf|docx?)$/i;

/* Sollicitatieformulier: vacature, stage of open sollicitatie, met optioneel cv */
export default function JobForm() {
  const { lang, dict } = useI18n();
  const t = dict.jobsPage.form;
  const [kind, setKind] = useState(t.kinds[0]);
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState(false);
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(false);

  // Knoppen "Solliciteer" bij een vacature of stage kiezen meteen het juiste type
  useEffect(() => {
    const pick = (e: Event) => {
      const k = (e as CustomEvent<string>).detail;
      if (t.kinds.includes(k)) setKind(k);
    };
    window.addEventListener("pick-job-kind", pick);
    return () => window.removeEventListener("pick-job-kind", pick);
  }, [t.kinds]);

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    const ok = !f || (f.size <= MAX_BYTES && CV_TYPES.test(f.name));
    setFileError(!ok);
    setFile(ok ? f : null);
    if (!ok) e.target.value = "";
  };

  const toBase64 = (f: File) =>
    new Promise<string>((resolve, reject) => {
      const r = new FileReader();
      r.onload = () => resolve(String(r.result).split(",")[1] ?? "");
      r.onerror = reject;
      r.readAsDataURL(f);
    });

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const v = (k: string) => String(f.get(k) ?? "");
    setBusy(true);
    setError(false);
    const cv = file ? { name: file.name, data: await toBase64(file) } : undefined;
    const ok = await submitRequest({
      type: "sollicitatie",
      lang,
      name: v("name"),
      email: v("email"),
      fax: v("fax"),
      cv,
      fields: [
        [t.kind, kind],
        [t.field, v("field")],
        [t.phone, v("phone")],
        [t.link, v("link")],
        [t.period, v("period")],
        [t.motivation, v("motivation")],
        ...(file ? ([[t.cv, file.name]] as [string, string][]) : []),
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

      <div className="field">
        <span>{t.kind}</span>
        <div className="toggle-row" style={{ marginBottom: 0 }}>
          {t.kinds.map((o) => (
            <button type="button" key={o} className={"toggle" + (kind === o ? " on" : "")} aria-pressed={kind === o} onClick={() => setKind(o)}>
              {o}
            </button>
          ))}
        </div>
      </div>

      <label className="field">
        <span>{t.field}</span>
        <select className="input select" name="field" defaultValue={t.fields[0]}>
          {t.fields.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </label>

      <div className="form-2">
        <label className="field">
          <span>
            {t.name} <i>*</i>
          </span>
          <input className="input" name="name" required placeholder={t.namePh} />
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
        <label className="field">
          <span>{t.link}</span>
          <input className="input" name="link" type="url" placeholder={t.linkPh} />
        </label>
      </div>

      <label className="field">
        <span>{t.period}</span>
        <input className="input" name="period" placeholder={t.periodPh} />
      </label>

      <label className="field">
        <span>
          {t.motivation} <i>*</i>
        </span>
        <textarea className="input" name="motivation" required placeholder={t.motivationPh} style={{ height: 110 }} />
      </label>

      <div className="field">
        <span>{t.cv}</span>
        <label className="file-pick">
          <input type="file" accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" onChange={onFile} />
          <span className="btn btn-outline btn-sm">{t.cvChoose}</span>
          <span className="file-name">{file ? file.name : t.cvNone}</span>
        </label>
        {fileError && <p className="form-error" style={{ marginTop: 8 }}>{t.cvTooBig}</p>}
      </div>

      {error && <p className="form-error" role="alert">{dict.common.formError}</p>}
      <button type="submit" className="btn btn-navy" disabled={busy}>
        {busy ? dict.common.sending : t.submit} <ArrowRight />
      </button>
    </form>
  );
}
