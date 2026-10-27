"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "./Icons";
import { useI18n } from "./I18n";
import { projects } from "@/lib/data";

/* Klantwebsites om doorheen te scrollen: swipen, pijltjes of vanzelf */
export default function HeroShowcase({ first = [] }: { first?: string[] }) {
  const { dict } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const paused = useRef(false);

  // Gekozen websites eerst, daarna de rest
  const items = [
    ...first.map((s) => projects.find((p) => p.slug === s)).filter((p): p is (typeof projects)[number] => !!p),
    ...projects.filter((p) => !first.includes(p.slug)),
  ].filter((p) => p.image);

  const go = (i: number) => {
    const el = ref.current;
    if (!el) return;
    const n = (i + items.length) % items.length;
    const card = el.children[n] as HTMLElement | undefined;
    if (card) el.scrollTo({ left: card.offsetLeft - el.offsetLeft, behavior: "smooth" });
  };

  // Bijhouden welke website in beeld is
  const onScroll = () => {
    const el = ref.current;
    if (!el) return;
    const w = (el.children[0] as HTMLElement | undefined)?.offsetWidth ?? 1;
    setIndex(Math.round(el.scrollLeft / (w + 14)));
  };

  // Vanzelf doorschuiven, behalve als iemand ermee bezig is of minder beweging wil
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      if (!paused.current) go(index + 1);
    }, 4500);
    return () => window.clearInterval(id);
  });

  const pause = () => (paused.current = true);
  const resume = () => (paused.current = false);

  return (
    <div className="hy-show" onMouseEnter={pause} onMouseLeave={resume} onTouchStart={pause} onFocus={pause} onBlur={resume}>
      <div className="hy-show-track" ref={ref} onScroll={onScroll}>
        {items.map((p) => {
          const t = dict.projects[p.slug as keyof typeof dict.projects];
          return (
            <a key={p.slug} href={p.url} target="_blank" rel="noopener noreferrer" className="hy-show-card">
              <div className="sv-bar">
                <i />
                <i />
                <i />
                <span>{p.url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}</span>
              </div>
              <img src={p.image} alt={`Website van ${p.name}`} loading="lazy" decoding="async" />
              <div className="hy-show-cap">
                <span>
                  <strong>{p.name}</strong>
                  <small>{t.sector}</small>
                </span>
                <ArrowUpRight />
              </div>
            </a>
          );
        })}
      </div>
      <div className="hy-show-nav">
        <span className="hy-show-count">
          {String(Math.min(index, items.length - 1) + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
        </span>
        <div className="hy-show-btns">
          <button type="button" className="round-btn" onClick={() => go(index - 1)} aria-label={dict.common.prev}>
            <ChevronLeft />
          </button>
          <button type="button" className="round-btn orange" onClick={() => go(index + 1)} aria-label={dict.common.next}>
            <ChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
}
