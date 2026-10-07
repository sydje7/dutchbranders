"use client";

import { useMemo, useState } from "react";
import WorkCard from "./WorkCard";
import { useI18n } from "./I18n";
import { projects } from "@/lib/data";

const PAGE = 4;

export default function WorkGrid() {
  const { dict } = useI18n();
  const t = dict.workPage;
  const [branche, setBranche] = useState("");
  const [dienst, setDienst] = useState("");
  const [limit, setLimit] = useState(PAGE);

  const items = projects.map((p) => ({ p, t: dict.projects[p.slug as keyof typeof dict.projects] }));
  const branches = useMemo(() => [...new Set(items.map((x) => x.t.branche))], [items]);
  const diensten = useMemo(() => [...new Set(items.flatMap((x) => x.t.services))], [items]);

  const filtered = items.filter((x) => (!branche || x.t.branche === branche) && (!dienst || x.t.services.includes(dienst)));
  const visible = filtered.slice(0, limit);

  return (
    <div className="werk-wrap">
      <div className="filter-bar">
        <h3>{t.filter}</h3>
        <select className="select" value={branche} onChange={(e) => { setBranche(e.target.value); setLimit(PAGE); }} aria-label={t.branche}>
          <option value="">{t.selectBranche}</option>
          {branches.map((b) => (
            <option key={b}>{b}</option>
          ))}
        </select>
        <select className="select" value={dienst} onChange={(e) => { setDienst(e.target.value); setLimit(PAGE); }} aria-label={t.service}>
          <option value="">{t.selectService}</option>
          {diensten.map((d) => (
            <option key={d}>{d}</option>
          ))}
        </select>
        <span className="count">
          {filtered.length} {t.projects}
        </span>
      </div>

      <div className="werk-grid">
        {visible.map((x) => (
          <WorkCard key={x.p.slug} p={x.p} t={x.t} />
        ))}
      </div>

      {filtered.length === 0 && <p className="center" style={{ padding: 40 }}>{t.none}</p>}

      {filtered.length > limit && (
        <div className="center" style={{ marginTop: 22 }}>
          <button className="btn btn-navy btn-sm" onClick={() => setLimit(limit + PAGE)}>
            {t.loadMore}
          </button>
        </div>
      )}
    </div>
  );
}
