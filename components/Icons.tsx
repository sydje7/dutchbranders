type P = { className?: string };

export const ArrowUpRight = ({ className = "arrow-ico" }: P) => (
  <svg className={className} viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M3 9 9 3M4 3h5v5" />
  </svg>
);

export const ArrowRight = ({ className = "arrow-ico" }: P) => (
  <svg className={className} viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M2 6h8M7 3l3 3-3 3" />
  </svg>
);

export const ChevronDown = ({ className }: P) => (
  <svg className={className} viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="m3 4.5 3 3 3-3" />
  </svg>
);

export const ChevronLeft = ({ className }: P) => (
  <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="m12 5-5 5 5 5" />
  </svg>
);

export const ChevronRight = ({ className }: P) => (
  <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="m8 5 5 5-5 5" />
  </svg>
);

export const Star = ({ className, on = true }: P & { on?: boolean }) => (
  <svg className={className + (on ? " on" : "")} viewBox="0 0 20 20" fill="currentColor" aria-hidden>
    <path d="m10 1.5 2.6 5.5 6 .8-4.4 4.1 1.1 6-5.3-2.9-5.3 2.9 1.1-6L1.4 7.8l6-.8z" />
  </svg>
);

export const Stars = () => (
  <span className="stars" aria-label="5 sterren">
    {[0, 1, 2, 3, 4].map((i) => (
      <Star key={i} />
    ))}
  </span>
);

/* Oranje cirkel met vinkje */
export const CheckCircle = ({ className = "check" }: P) => (
  <svg className={className} viewBox="0 0 20 20" aria-hidden>
    <circle cx="10" cy="10" r="10" fill="currentColor" />
    <path d="m5.8 10.2 2.8 2.8 5.6-5.8" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* Oranje cirkel met kruisje */
export const XCircle = ({ className = "x-ico" }: P) => (
  <svg className={className} viewBox="0 0 20 20" aria-hidden>
    <circle cx="10" cy="10" r="10" fill="currentColor" />
    <path d="m7 7 6 6M13 7l-6 6" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

/* Losse vinkje-lijn */
export const Check = ({ className = "check-plain" }: P) => (
  <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="m2.5 8.5 3.5 3.5 7.5-8" />
  </svg>
);

export const Shield = ({ className }: P) => (
  <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M10 2 3.5 4.5V9c0 4.2 2.8 7.4 6.5 9 3.7-1.6 6.5-4.8 6.5-9V4.5z" />
    <path d="m7 10 2 2 4-4" />
  </svg>
);

export const Phone = ({ className }: P) => (
  <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M4 2.5h3l1.5 4-2 1.3a10 10 0 0 0 5.7 5.7l1.3-2 4 1.5v3a1.5 1.5 0 0 1-1.6 1.5A15 15 0 0 1 2.5 4.1 1.5 1.5 0 0 1 4 2.5z" />
  </svg>
);

export const Mail = ({ className }: P) => (
  <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <rect x="2.5" y="4" width="15" height="12" rx="2" />
    <path d="m3 5 7 6 7-6" />
  </svg>
);

export const Pin = ({ className }: P) => (
  <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M10 18s6-5.4 6-10a6 6 0 0 0-12 0c0 4.6 6 10 6 10z" />
    <circle cx="10" cy="8" r="2.2" />
  </svg>
);

export const LinkedIn = ({ className }: P) => (
  <svg className={className} viewBox="0 0 16 16" fill="currentColor" aria-hidden>
    <path d="M1.5 5.5h3v9h-3zM3 1.2a1.7 1.7 0 1 1 0 3.4 1.7 1.7 0 0 1 0-3.4zM6.5 5.5h2.9v1.3c.4-.8 1.4-1.5 2.9-1.5 3 0 3.6 2 3.6 4.6v4.6h-3v-4c0-1 0-2.3-1.4-2.3s-1.6 1.1-1.6 2.2v4.1h-3z" />
  </svg>
);

export const Instagram = ({ className }: P) => (
  <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
    <rect x="1.5" y="1.5" width="13" height="13" rx="3.5" />
    <circle cx="8" cy="8" r="3" />
    <circle cx="11.8" cy="4.2" r=".6" fill="currentColor" />
  </svg>
);

export const Menu = ({ className }: P) => (
  <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
    <path d="M3 6h14M3 10h14M3 14h14" />
  </svg>
);

export const Close = ({ className }: P) => (
  <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
    <path d="m5 5 10 10M15 5 5 15" />
  </svg>
);

/* Oranje kroontje boven de hero-badge */
export const Crown = ({ className }: P) => (
  <svg className={className} viewBox="0 0 24 18" aria-hidden>
    <path d="M2 4 7 9l5-8 5 8 5-5-2 12H4z" fill="#f47549" stroke="#2b2467" strokeWidth="1.6" strokeLinejoin="round" />
  </svg>
);

/* Handgetekende pijl */
export const ScribbleArrow = ({ className }: P) => (
  <svg className={className} viewBox="0 0 34 56" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M14 2C6 12 4 30 16 50" />
    <path d="M8 44l8 7 5-9" />
  </svg>
);

export const GoogleG = ({ className }: P) => (
  <svg className={className} viewBox="0 0 24 24" aria-hidden>
    <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5a5.6 5.6 0 0 1-2.4 3.6v3h3.9c2.3-2.1 3.5-5.2 3.5-8.8z" />
    <path fill="#34A853" d="M12 24c3.2 0 6-1.1 8-2.9l-3.9-3c-1.1.7-2.5 1.2-4.1 1.2-3.1 0-5.8-2.1-6.7-5H1.3v3.1A12 12 0 0 0 12 24z" />
    <path fill="#FBBC05" d="M5.3 14.3a7.2 7.2 0 0 1 0-4.6V6.6h-4a12 12 0 0 0 0 10.8z" />
    <path fill="#EA4335" d="M12 4.8c1.8 0 3.3.6 4.6 1.8l3.4-3.4A12 12 0 0 0 1.3 6.6l4 3.1c.9-2.9 3.6-4.9 6.7-4.9z" />
  </svg>
);
