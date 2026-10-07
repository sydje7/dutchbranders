"use client";

import { useState } from "react";
import { useI18n } from "./I18n";

export default function RoiCalculator() {
  const { lang, dict } = useI18n();
  const t = dict.home.pricing.roi;
  const [value, setValue] = useState("1500");
  const n = Number(value.replace(/\D/g, "")) || 0;
  const fmt = (v: number) => "€" + v.toLocaleString(lang === "nl" ? "nl-NL" : "en-GB");

  return (
    <div className="roi">
      <h3>{t.title}</h3>
      <p>{t.text}</p>
      <label htmlFor="klantwaarde">{t.value}</label>
      <div className="roi-input">
        €
        <input id="klantwaarde" inputMode="numeric" value={value} onChange={(e) => setValue(e.target.value.replace(/\D/g, "").slice(0, 7))} />
      </div>
      <label style={{ marginTop: 16 }}>{t.scenarios}</label>
      <div className="roi-scen">
        {t.items.map((s) => (
          <div className="scen" key={s.name}>
            <div className="scen-top">
              <b>{s.name}</b>
              <span>{s.label}</span>
            </div>
            <strong>{fmt(n * s.n * 12)}</strong>
            <small>{t.perYear}</small>
          </div>
        ))}
      </div>
    </div>
  );
}
