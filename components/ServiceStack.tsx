"use client";

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Rich from "./Rich";
import { ArrowUpRight } from "./Icons";
import { useI18n } from "./I18n";
import { serviceImages as images } from "@/lib/data";


/* Diensten als grote beeldkaarten die tijdens het scrollen op elkaar stapelen, met een teller ernaast */
export default function ServiceStack() {
  const { dict, href } = useI18n();
  const t = dict.home.serviceStack;
  const items = dict.services;
  const refs = useRef<(HTMLElement | null)[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      // De actieve kaart is de laatste waarvan de bovenkant de helft van het scherm voorbij is
      let a = 0;
      refs.current.forEach((el, i) => {
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.5) a = i;
      });
      setActive(a);
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
  }, []);

  const total = String(items.length).padStart(2, "0");

  return (
    <div className="svc-stack">
      <aside className="svc-stack-side">
        <span className="eyebrow">{t.label}</span>
        <h2 className="display">
          <Rich text={t.title} />
        </h2>
        <div className="svc-counter" aria-hidden>
          <strong>{String(active + 1).padStart(2, "0")}</strong>
          <div className="svc-dashes">
            {items.map((s, i) => (
              <i key={s.slug} className={i <= active ? "on" : ""} />
            ))}
          </div>
          <span className="eyebrow">{items[active].longTitle}</span>
        </div>
      </aside>

      <div className="svc-stack-cards">
        {items.map((s, i) => (
          <article
            key={s.slug}
            ref={(el) => {
              refs.current[i] = el;
            }}
            className={"svc-card" + (i < active ? " behind" : "")}
            style={{ "--i": i } as React.CSSProperties}
          >
            <img src={images[s.slug] ?? images.webdesign} alt="" loading="lazy" decoding="async" />
            <div className="svc-card-top" aria-hidden>
              <span>{String(i + 1).padStart(2, "0")}</span>
              <span>{total}</span>
            </div>
            <div className="svc-card-body">
              <h3>{s.longTitle}</h3>
              <p>{s.long}</p>
              <Link href={href(`/diensten#${s.slug}`)} className="pill-link">
                {t.more} {s.title} <ArrowUpRight />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
