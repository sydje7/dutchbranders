"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from "react";
import { useI18n } from "./I18n";
import { projects } from "@/lib/data";

/* Klantwebsites als stapel kaarten: tijdens het naar beneden scrollen schuift de bovenste weg
   en komt de volgende tevoorschijn. Op desktop blijft de paginakop daarbij even staan. */
export default function HeroStack({ first = [], count = 5 }: { first?: string[]; count?: number }) {
  const { dict } = useI18n();
  const deck = useRef<HTMLDivElement>(null);
  const [f, setF] = useState(0); // voortgang door de stapel: 0 … count-1

  const items = [
    ...first.map((s) => projects.find((p) => p.slug === s)),
    ...projects.filter((p) => !first.includes(p.slug)),
  ]
    .filter((p): p is (typeof projects)[number] => !!p && !!p.image)
    .slice(0, count);

  const active = Math.round(f);

  useEffect(() => {
    const el = deck.current;
    const section = el?.closest(".hy-hero") as HTMLElement | null;
    if (!el || !section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const desktop = window.matchMedia("(min-width: 1025px)");
    let raf = 0;
    const update = () => {
      raf = 0;
      let p: number;
      if (desktop.matches) {
        // De kop is extra hoog en blijft plakken: voortgang = hoe ver je door die hoogte bent
        const r = section.getBoundingClientRect();
        p = -r.top / Math.max(1, r.height - window.innerHeight);
      } else {
        // Mobiel: de stapel loopt mee terwijl hij door het scherm schuift
        const r = el.getBoundingClientRect();
        p = (window.innerHeight * 0.85 - r.top) / (window.innerHeight * 0.85);
      }
      setF(Math.min(1, Math.max(0, p)) * (items.length - 1));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [items.length]);

  return (
    <div className="hy-stack">
      <div className="hy-stack-deck" ref={deck}>
        {items.map((p, i) => {
          const d = i - active; // <0: al weggeschoven, 0: bovenop, >0: ligt eronder (per stap, zodat er altijd één hele website zichtbaar is)
          const t = dict.projects[p.slug as keyof typeof dict.projects];
          const style: React.CSSProperties =
            d < 0
              ? { transform: `translateY(-115%) rotate(-6deg)`, opacity: 0, zIndex: 50 + i }
              : {
                  transform: `translateY(${-Math.min(d, 3) * 26}px) scale(${1 - Math.min(d, 3) * 0.06})`,
                  opacity: d > 3 ? 0 : 1 - Math.min(d, 3) * 0.18,
                  zIndex: 50 - i,
                };
          return (
            <a
              key={p.slug}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hy-stack-card"
              style={style}
              tabIndex={i === active ? 0 : -1}
              aria-hidden={i !== active}
            >
              <div className="sv-bar">
                <i />
                <i />
                <i />
                <span>{p.url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}</span>
              </div>
              <img src={p.image} alt={`Website van ${p.name}`} loading={i < 2 ? "eager" : "lazy"} decoding="async" />
              <div className="hy-show-cap">
                <span>
                  <strong>{p.name}</strong>
                  <small>{t.sector}</small>
                </span>
              </div>
            </a>
          );
        })}
      </div>
      <div className="hy-stack-nav" aria-hidden>
        <span className="hy-show-count">
          {String(active + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
        </span>
        <div className="svc-dashes">
          {items.map((p, i) => (
            <i key={p.slug} className={i <= active ? "on" : ""} />
          ))}
        </div>
      </div>
    </div>
  );
}
