"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "./Icons";
import { useI18n } from "./I18n";

/* Horizontale scroll-carrousel met pijlknoppen */
export default function Carousel({
  children,
  head,
  trackClass = "track",
  orange = false,
}: {
  children: React.ReactNode;
  head?: React.ReactNode;
  trackClass?: string;
  orange?: boolean;
}) {
  const { common } = useI18n().dict;
  const ref = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const update = () => {
    const el = ref.current;
    if (!el) return;
    setAtStart(el.scrollLeft < 8);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 8);
  };

  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const go = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    el.scrollBy({ left: dir * ((card?.offsetWidth ?? 300) + 16), behavior: "smooth" });
  };

  const cls = "round-btn" + (orange ? " orange" : "");

  return (
    <div className="carousel-wrap">
      <div className="container carousel-head">
        <div>{head}</div>
        <div className="round-btns">
          <button className={cls} onClick={() => go(-1)} disabled={atStart} aria-label={common.prev}>
            <ChevronLeft />
          </button>
          <button className={cls} onClick={() => go(1)} disabled={atEnd} aria-label={common.next}>
            <ChevronRight />
          </button>
        </div>
      </div>
      <div className={trackClass} ref={ref} onScroll={update}>
        {children}
      </div>
    </div>
  );
}
