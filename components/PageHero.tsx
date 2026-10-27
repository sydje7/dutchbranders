import HeroShowcase from "./HeroShowcase";
import Rich from "./Rich";

/* Donkere paginakop in de stijl van de homepage, met rechts klantwebsites of eigen inhoud */
export default function PageHero({
  label,
  title,
  lead,
  children,
  aside,
  shots = ["dentville", "denk", "bkp"],
}: {
  label?: string;
  title: string;
  lead?: string;
  children?: React.ReactNode;
  aside?: React.ReactNode;
  shots?: string[];
}) {
  return (
    <section className="hy-hero">
      <div className="container hy-hero-grid">
        <div className="hy-hero-text">
          {label && <span className="eyebrow">{label}</span>}
          <h1 className="display display-xl">
            <Rich text={title} />
          </h1>
          {lead && <p className="hy-hero-lead">{lead}</p>}
          {children}
        </div>
        <div className="hy-hero-aside">
          {aside ?? <HeroShowcase first={shots} />}
        </div>
      </div>
    </section>
  );
}
