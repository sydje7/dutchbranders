"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import { ArrowUpRight, ChevronDown, Close, Menu } from "./Icons";
import { useI18n } from "./I18n";
import { localePath } from "@/lib/i18n";

export default function Header() {
  const { lang, dict, href } = useI18n();
  const t = dict.nav;
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Pad zonder taalprefix, bijv. "/werk"
  const base = pathname.replace(/^\/(nl|en)(?=\/|$)/, "") || "/";

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const nav = [
    { path: "/diensten", label: t.services, dropdown: true },
    { path: "/werk", label: t.work },
    { path: "/over-ons", label: t.about },
    { path: "/cursussen", label: t.courses },
  ];

  const isActive = (p: string) => base === p || base.startsWith(p + "/");

  return (
    <header className="site-header">
      <div className="container">
        <Logo />

        <nav className="nav" aria-label={t.mainMenu}>
          {nav.map((item) =>
            item.dropdown ? (
              <div className="dropdown" key={item.path}>
                <Link href={href(item.path)} className={"nav-link" + (isActive(item.path) ? " active" : "")}>
                  {item.label} <ChevronDown />
                </Link>
                <div className="dropdown-menu">
                  {dict.services.map((s, i) => (
                    <Link key={s.slug} href={href(`/diensten#${s.slug}`)}>
                      <span className="num">0{i + 1}</span>
                      {s.longTitle}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link key={item.path} href={href(item.path)} className={"nav-link" + (isActive(item.path) ? " active" : "")}>
                {item.label}
              </Link>
            )
          )}
          <LangSwitch base={base} />
          <Link href={href("/contact")} className="btn btn-navy btn-sm header-cta">
            {t.start} <ArrowUpRight />
          </Link>
        </nav>

        <button className="menu-toggle" aria-label={open ? t.closeMenu : t.openMenu} onClick={() => setOpen(!open)}>
          {open ? <Close /> : <Menu />}
        </button>
      </div>

      <div className={"mobile-nav" + (open ? " open" : "")}>
        {nav.map((item) => (
          <div key={item.path}>
            <Link href={href(item.path)}>{item.label}</Link>
            {item.dropdown && (
              <div className="sub">
                {dict.services.map((s) => (
                  <Link key={s.slug} href={href(`/diensten#${s.slug}`)}>
                    {s.longTitle}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
        <Link href={href("/contact")}>{t.contact}</Link>
        <div className="mobile-lang">
          <LangSwitch base={base} />
        </div>
        <Link href={href("/contact")} className="btn btn-navy">
          {t.start} <ArrowUpRight />
        </Link>
      </div>
    </header>
  );

  function LangSwitch({ base }: { base: string }) {
    return (
      <div className="lang" aria-label={t.switchTo}>
        <Link href={localePath("nl", base)} className={lang === "nl" ? "on" : ""} hrefLang="nl" aria-current={lang === "nl" || undefined}>
          NL
        </Link>
        <i />
        <Link href={localePath("en", base)} className={lang === "en" ? "on" : ""} hrefLang="en" aria-current={lang === "en" || undefined}>
          EN
        </Link>
      </div>
    );
  }
}
