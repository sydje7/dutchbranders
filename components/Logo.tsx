"use client";

import Link from "next/link";
import { useI18n } from "./I18n";

export default function Logo({ light = false }: { light?: boolean }) {
  const { href } = useI18n();
  return (
    <Link href={href("/")} className={"logo" + (light ? " logo-light" : "")} aria-label="Dutch Branders – home">
      <svg className="logo-mark" viewBox="0 0 14 30" fill="none" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M2 9 7 2l5 7" stroke="currentColor" />
        <path d="M2 13.5 12 16.5" stroke="#f47549" />
        <path d="m2 21 5 7 5-7" stroke="currentColor" />
      </svg>
      <span className="logo-text">
        <span>dutch</span>
        <span>
          branders<span className="dot" style={{ display: "inline", padding: 0 }}>.</span>
        </span>
      </span>
    </Link>
  );
}
