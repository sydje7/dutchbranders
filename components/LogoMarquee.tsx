/* Oneindig scrollende strip met logo's van klanten */

const logos = [
  { name: "Studio FHS", cls: "l-fhs" },
  { name: "EXTREMOS.", cls: "l-ext" },
  { name: "Jurist & Bewind", cls: "l-jb" },
  { name: "koffiebar noord", cls: "l-kb" },
  { name: "FietsenJansen", cls: "l-fj" },
  { name: "tandartszuid", cls: "l-tz" },
];

export default function LogoMarquee({ label }: { label: string }) {
  // Twee identieke sets achter elkaar, zodat de animatie naadloos doorloopt
  const set = (hidden: boolean) => (
    <ul className="marquee-set" aria-hidden={hidden || undefined}>
      {logos.map((l) => (
        <li key={l.name} className={l.cls}>
          {l.name}
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
