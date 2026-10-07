/* Nagebouwde website-screenshots van klanten (vervang later door echte screenshots in /public) */

export type MockId = "fj" | "tz" | "fhs" | "jb" | "ex" | "kb";

export function Mock({ id, style }: { id: MockId; style?: React.CSSProperties }) {
  switch (id) {
    case "fj":
      return (
        <div className="mock m-fj" style={style}>
          <div className="bar">
            <span className="brand">
              Fietsen<span>Jansen</span>
            </span>
          </div>
          <h4>
            Altijd een fiets
            <br />
            die <span>rijdt</span>.
          </h4>
          <div className="img">
            <svg viewBox="0 0 190 90" fill="none" stroke="currentColor" strokeWidth="5" aria-hidden>
              <circle cx="38" cy="58" r="28" />
              <circle cx="150" cy="58" r="28" />
              <path d="M38 58 62 28h70M62 28l-4 14 50-24" />
            </svg>
          </div>
        </div>
      );
    case "tz":
      return (
        <div className="mock m-tz" style={style}>
          <div className="bar">
            <span className="brand">
              tandarts<span>zuid</span>
            </span>
          </div>
          <span className="pill">Nieuwe patiënten welkom</span>
          <h4>
            Ontspannen
            <br />
            naar de tandarts
          </h4>
          <p>Persoonlijke zorg voor het hele gezin, in een rustige praktijk.</p>
          <span className="b">Maak een afspraak</span>
        </div>
      );
    case "fhs":
      return (
        <div className="mock m-fhs" style={style}>
          <div className="bar">
            <span className="brand">STUDIO FHS</span>
          </div>
          <small>SCHOONHEIDSSALON</small>
          <h4>
            Jouw moment
            <br />
            van <em>rust</em>.
          </h4>
          <p>Huidverzorging, behandelingen en producten met aandacht voor jou.</p>
          <div className="btns">
            <span>Afspraak maken</span>
            <span>Shop producten</span>
          </div>
        </div>
      );
    case "jb":
      return (
        <div className="mock m-jb" style={style}>
          <div className="bar">
            <span className="brand">
              Jurist <span>&amp;</span> Bewind
            </span>
            <span style={{ fontSize: "0.7em" }}>Bewindvoering</span>
          </div>
          <div className="hero">
            <span className="pill">★★★★★ Persoonlijke begeleiding</span>
            <h4>
              Weer grip op
              <br />
              je <em>financiën</em>.
            </h4>
            <p>Professionele bewindvoering en juridisch advies, zodat jij rust en overzicht krijgt.</p>
          </div>
          <div className="btns">
            <span>Gratis kennismaking</span>
            <span>Hoe werkt het? →</span>
          </div>
        </div>
      );
    case "ex":
      return (
        <div className="mock m-ex" style={style}>
          <div className="bar">
            <span className="brand">
              EXTREMOS<span>.</span>
            </span>
          </div>
          <small>DANSSCHOOL · AMSTERDAM</small>
          <h4>
            SALSA &amp;
            <br />
            BACHATA
          </h4>
          <p>Van je eerste stap tot de dansvloer. Lessen voor elk niveau, elke week.</p>
          <div className="boxes">
            <div>
              <small>BEGINNERS</small>
              <br />
              Salsa basis
            </div>
            <div>
              <small>GEVORDERD</small>
              <br />
              Bachata sensual
            </div>
            <div>
              <small>ELKE MAAND</small>
              <br />
              Social party
            </div>
          </div>
        </div>
      );
    case "kb":
      return (
        <div className="mock m-kb" style={style}>
          <div className="bar">
            <span className="brand">koffiebar noord</span>
          </div>
          <h4>
            Vers
            <br />
            gebrand<span>.</span>
            <br />
            Elke dag.
          </h4>
          <p>Specialty koffie, huisgemaakt gebak en een plek om even te zijn.</p>
        </div>
      );
  }
}
