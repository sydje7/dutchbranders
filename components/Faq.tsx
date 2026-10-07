"use client";

import { useState } from "react";
import { ChevronDown } from "./Icons";
import { useI18n } from "./I18n";

export default function Faq() {
  const faqs = useI18n().dict.faqs;
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="faq">
      {faqs.map((f, i) => (
        <div className={"faq-item" + (open === i ? " open" : "")} key={f.q}>
          <button className="faq-q" aria-expanded={open === i} onClick={() => setOpen(open === i ? null : i)}>
            {f.q}
            <span className="ico">
              <ChevronDown />
            </span>
          </button>
          <div className="faq-a">
            <div>
              <p>{f.a}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
