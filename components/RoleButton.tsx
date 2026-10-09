"use client";

import { ArrowUpRight } from "./Icons";

/* Springt naar het formulier en kiest daar meteen "Vacature" of "Stage" */
export default function RoleButton({ kind, label, className }: { kind: string; label: string; className?: string }) {
  return (
    <a
      href="#solliciteren"
      className={className}
      onClick={() => window.dispatchEvent(new CustomEvent("pick-job-kind", { detail: kind }))}
    >
      {label} <ArrowUpRight />
    </a>
  );
}
