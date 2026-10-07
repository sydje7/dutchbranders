"use client";

import { useState } from "react";
import { Mock, type MockId } from "./Mockups";
import { useI18n } from "./I18n";

export default function CasesTabs() {
  const t = useI18n().dict.home.cases;
  const [i, setI] = useState(0);
  const c = t.items[i];
  return (
    <>
      <div className="tabs" role="tablist">
        {t.items.map((x, idx) => (
          <button key={x.tab} role="tab" aria-selected={i === idx} className={"tab" + (i === idx ? " on" : "")} onClick={() => setI(idx)}>
            {x.tab}
          </button>
        ))}
      </div>
      <div className="case">
        <div className="case-visual">
          <Mock id={c.mock as MockId} />
        </div>
        <div className="case-body">
          <span className="kicker">{c.sector}</span>
          <h3>{c.title}</h3>
          <h4>{t.challenge}</h4>
          <p>{c.challenge}</p>
          <h4>{t.approach}</h4>
          <p>{c.approach}</p>
          <div className="metrics">
            {c.metrics.map((m) => (
              <div key={m.label}>
                <strong>{m.value}</strong>
                <span>{m.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
