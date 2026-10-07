import { ArrowRight } from "./Icons";
import { Mock } from "./Mockups";
import type { projects } from "@/lib/data";
import type { Dict } from "@/lib/i18n";

type Project = (typeof projects)[number];
type ProjectText = Dict["projects"][keyof Dict["projects"]];

export default function WorkCard({ p, t, style }: { p: Project; t: ProjectText; style?: React.CSSProperties }) {
  return (
    <article className="werk-card" style={style}>
      <div className="visual">
        <Mock id={p.mock} />
        <div className="cap">
          <small>{t.sector}</small>
          <strong>{p.name}</strong>
          <span className="tag">{t.services.join(" · ")}</span>
          <span className="go">
            <ArrowRight />
          </span>
        </div>
      </div>
      <div className="metrics">
        {t.metrics.map((m) => (
          <div key={m.label}>
            <strong>{m.value}</strong>
            <span>{m.label}</span>
          </div>
        ))}
      </div>
    </article>
  );
}
