/* Geïllustreerde avatars in de stijl van het design (placeholder tot er echte foto's zijn) */

type Look = {
  skin: string;
  hair: string;
  shirt: string;
  bg: string;
  style?: "short" | "curly" | "long" | "bald";
  glasses?: boolean;
  beard?: boolean;
};

export const looks = {
  founder: { skin: "#e9b08c", hair: "#5a3a26", shirt: "#3b3480", bg: "#f1ece8", style: "short" },
  glasses: { skin: "#f1c6a4", hair: "#2b2467", shirt: "#2b2467", bg: "#e9e6f4", style: "bald", glasses: true },
  curly: { skin: "#8a5536", hair: "#1e1512", shirt: "#f47549", bg: "#fde4d8", style: "curly" },
  long: { skin: "#ebb894", hair: "#c4712e", shirt: "#2b2467", bg: "#e4ebf5", style: "long" },
  beard: { skin: "#c98d63", hair: "#2b1a12", shirt: "#3b3480", bg: "#efede8", style: "bald", beard: true },
} satisfies Record<string, Look>;

function Hair({ l }: { l: Look }) {
  if (l.style === "curly")
    return (
      <g fill={l.hair}>
        <circle cx="38" cy="18" r="7" />
        <circle cx="50" cy="14" r="8" />
        <circle cx="62" cy="18" r="7" />
      </g>
    );
  if (l.style === "long")
    return (
      <path d="M33 30c0-12 7-18 17-18s17 6 17 18v18h-6V30H39v18h-6z" fill={l.hair} />
    );
  if (l.style === "short") return <path d="M35 26c0-10 7-14 15-14 9 0 15 5 15 13-6-4-18-5-30 1z" fill={l.hair} />;
  return null;
}

/* Rond portret (founder, chat-widget, contactpersoon) */
export function Avatar({ look = looks.founder, className = "avatar" }: { look?: Look; className?: string }) {
  const l = look;
  return (
    <svg className={className} viewBox="0 0 100 100" aria-hidden>
      <rect width="100" height="100" fill={l.bg} />
      <circle cx="78" cy="22" r="11" fill="#f47549" />
      <path d="M18 100c2-20 15-30 32-30s30 10 32 30z" fill={l.shirt} />
      <rect x="44" y="52" width="12" height="20" rx="5" fill={l.skin} />
      <ellipse cx="50" cy="38" rx="15" ry="17" fill={l.skin} />
      <Hair l={l} />
      <circle cx="44" cy="38" r="1.6" fill="#1d1a4b" />
      <circle cx="56" cy="38" r="1.6" fill="#1d1a4b" />
      <path d="M45 46q5 4 10 0" fill="none" stroke="#1d1a4b" strokeWidth="1.6" strokeLinecap="round" />
      {l.glasses && (
        <g fill="none" stroke="#1d1a4b" strokeWidth="1.5">
          <circle cx="44" cy="38" r="4.5" />
          <circle cx="56" cy="38" r="4.5" />
          <path d="M48.5 38h3" />
        </g>
      )}
    </svg>
  );
}

/* Grote teamkaart: figuur steekt boven de kaart uit, zoals in het design */
export function TeamFigure({ look }: { look: Look }) {
  const l = look;
  return (
    <svg viewBox="0 0 200 230" aria-hidden>
      <rect x="0" y="60" width="200" height="170" rx="16" fill={l.bg} />
      <circle cx="150" cy="58" r="16" fill={l.style === "curly" ? "#3b3480" : "#f47549"} />
      <rect x="18" y="160" width="22" height="22" rx="5" fill={l.shirt === "#f47549" ? "#8a7fae" : "#f2a184"} transform="rotate(-12 29 171)" />
      <path d="M50 230c2-45 22-70 50-70s48 25 50 70z" fill={l.shirt} />
      <ellipse cx="100" cy="166" rx="14" ry="7" fill="#fff" opacity=".15" />
      <rect x="90" y="100" width="20" height="66" rx="9" fill={l.skin} />
      <ellipse cx="100" cy="72" rx="26" ry="30" fill={l.skin} />
      <circle cx="73" cy="74" r="5" fill={l.skin} />
      <circle cx="127" cy="74" r="5" fill={l.skin} />
      {l.style === "curly" && (
        <g fill={l.hair}>
          <circle cx="80" cy="44" r="12" />
          <circle cx="100" cy="38" r="13" />
          <circle cx="120" cy="44" r="12" />
        </g>
      )}
      {l.style === "long" && <path d="M72 70c0-24 12-36 28-36s28 12 28 36v40h-8V62H80v48h-8z" fill={l.hair} />}
      <circle cx="90" cy="72" r="2.4" fill="#1d1a4b" />
      <circle cx="110" cy="72" r="2.4" fill="#1d1a4b" />
      {l.beard ? (
        <path d="M86 84q14 14 28 0q-2 12-14 12t-14-12z" fill="#1d1a4b" />
      ) : (
        <path d="M92 86q8 5 16 0" fill="none" stroke="#1d1a4b" strokeWidth="2.2" strokeLinecap="round" />
      )}
      {l.glasses && (
        <g fill="none" stroke="#1d1a4b" strokeWidth="2.4">
          <circle cx="90" cy="72" r="7" />
          <circle cx="110" cy="72" r="7" />
          <path d="M97 72h6" />
        </g>
      )}
    </svg>
  );
}
