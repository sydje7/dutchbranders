/* Oneindig scrollende strip met (klikbare) namen van klanten */

const logos: { name: string; cls: string; url?: string }[] = [
  { name: "DENK", cls: "l-denk", url: "https://denk.nl/" },
  { name: "Studio FHS", cls: "l-fhs" },
  { name: "Autobedrijf van Stalen", cls: "l-vs", url: "https://autobedrijfvanstalen.nl/" },
  { name: "EXTREMOS.", cls: "l-ext" },
  { name: "Dentville", cls: "l-dent", url: "https://dentville.nl/" },
  { name: "Jurist & Bewind", cls: "l-jb" },
  { name: "BedrijfskledingPlaza", cls: "l-bkp", url: "https://bedrijfskledingplaza.nl/" },
  { name: "koffiebar noord", cls: "l-kb" },
  { name: "ATAK Houtbouw", cls: "l-atak", url: "https://www.atakhoutbouw.nl/" },
  { name: "FietsenJansen", cls: "l-fj" },
  { name: "FireRocket", cls: "l-fire", url: "https://firerocket.nl/" },
  { name: "tandartszuid", cls: "l-tz" },
];

export default function LogoMarquee({ label }: { label: string }) {
  // Twee identieke sets achter elkaar, zodat de animatie naadloos doorloopt
  const set = (hidden: boolean) => (
    <ul className="marquee-set" aria-hidden={hidden || undefined}>
      {logos.map((l) => (
        <li key={l.name} className={l.cls}>
          {l.url ? (
            <a href={l.url} target="_blank" rel="noopener noreferrer" tabIndex={hidden ? -1 : undefined}>
              {l.name}
            </a>
          ) : (
            l.name
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <div className="logos">
      <span className="mono">{label}</span>
      <div className="marquee">
        <div className="marquee-track">
          {set(false)}
          {set(true)}
        </div>
      </div>
    </div>
  );
}
