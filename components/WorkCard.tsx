import { ArrowUpRight } from "./Icons";
import type { projects } from "@/lib/data";
import type { Dict } from "@/lib/i18n";

type Project = (typeof projects)[number];
type ProjectText = Dict["projects"][keyof Dict["projects"]];

/* Projectkaart in dezelfde stijl als "Recent werk" op de homepage */
export default function WorkCard({
  p,
  t,
  labels,
  index,
  style,
}: {
  p: Project;
  t: ProjectText;
  labels: { visit: string; offline: string };
  index?: number;
  style?: React.CSSProperties;
}) {
  const domain = p.url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

  const body = (
    <>
      {p.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={p.image} alt={`Website van ${p.name}`} loading="lazy" decoding="async" />
      ) : (
        <div className="pm-case-fallback">{labels.offline}</div>
      )}
      <div className="pm-case-top" aria-hidden>
        <span>{index !== undefined ? String(index + 1).padStart(2, "0") : domain}</span>
        <span>{t.branche}</span>
      </div>
      <div className="pm-case-foot">
        <div>
          <h3>{p.name}</h3>
          <div className="pm-tags">
            <span>{t.sector}</span>
            {t.services.map((x) => (
              <span key={x}>{x}</span>
            ))}
          </div>
        </div>
        {p.image && (
          <span className="pm-go" aria-label={labels.visit}>
            <ArrowUpRight />
          </span>
        )}
      </div>
    </>
  );

  return p.image ? (
    <a className="pm-case" href={p.url} target="_blank" rel="noopener noreferrer" style={style}>
      {body}
    </a>
  ) : (
    <div className="pm-case" style={style}>
      {body}
    </div>
  );
}
