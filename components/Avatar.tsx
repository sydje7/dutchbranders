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
