import { ArrowRight, ArrowUpRight } from "./Icons";
import type { projects } from "@/lib/data";
import type { Dict } from "@/lib/i18n";

type Project = (typeof projects)[number];
type ProjectText = Dict["projects"][keyof Dict["projects"]];

export default function WorkCard({
  p,
  t,
  labels,
  style,
}: {
  p: Project;
  t: ProjectText;
  labels: { visit: string; offline: string };
  style?: React.CSSProperties;
}) {
  const domain = p.url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
  const online = Boolean(p.image);

  const visual = (
    <>
      {p.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={p.image} alt={`Website van ${p.name}`} loading="lazy" decoding="async" className="shot" />
      ) : (
        <div className="shot-fallback">
          <strong>{p.name}</strong>
          <span>{labels.offline}</span>
        </div>
      )}
      <div className="cap">
        <small>{t.sector}</small>
        <strong>{p.name}</strong>
        <span className="tag">{t.services.join(" · ")}</span>
        {online && (
          <span className="go">
            <ArrowRight />
          </span>
        )}
      </div>
    </>
  );

  return (
    <article className="werk-card" style={style}>
      {online ? (
        <a className="visual" href={p.url} target="_blank" rel="noopener noreferrer">
          {visual}
        </a>
      ) : (
        <div className="visual">{visual}</div>
      )}
      <div className="werk-foot">
        {online ? (
          <a href={p.url} target="_blank" rel="noopener noreferrer">
            {labels.visit} <ArrowUpRight />
          </a>
        ) : (
          <span>{labels.offline}</span>
        )}
        <span className="domain">{domain}</span>
      </div>
    </article>
  );
}
