"use client";

import Link from "next/link";
import Logo from "./Logo";
import Rich from "./Rich";
import { LinkedIn, Stars } from "./Icons";
import { useI18n } from "./I18n";
import { contact } from "@/lib/data";

export default function Footer() {
  const { dict, href } = useI18n();
  const t = dict.footer;
  const n = dict.nav;

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <Logo light />
            <div className="review-badge">
              <Stars /> <span><Rich text={dict.common.ratingLine} /></span>
            </div>
            <p className="footer-note">{dict.common.googlePartner}</p>
          </div>
          <div>
            <h4>{t.menu}</h4>
            <ul>
              <li><Link href={href("/diensten")}>{n.services}</Link></li>
              <li><Link href={href("/werk")}>{n.work}</Link></li>
              <li><Link href={href("/over-ons")}>{n.about}</Link></li>
              <li><Link href={href("/werken-bij")}>{t.careers}</Link></li>
              <li><Link href={href("/contact")}>{t.quote}</Link></li>
            </ul>
          </div>
          <div>
            <h4>{t.contact}</h4>
            <ul>
              <li><a href={`mailto:${contact.email}`}>{contact.email}</a></li>
              <li><a href={contact.phoneHref}>{contact.phone}</a></li>
              <li><a href={contact.mapsUrl} target="_blank" rel="noopener noreferrer">{contact.address}</a></li>
              <li>{t.coc} {contact.kvk}</li>
            </ul>
          </div>
          <div>
            <h4>{t.social}</h4>
            <div className="socials">
              <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><LinkedIn /></a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} Dutch Branders · {t.coc} {contact.kvk} · {t.vat} {contact.btw}
          </span>
          <nav aria-label={t.legalLabel}>
            <Link href={href("/privacy")}>{t.privacy}</Link>
            <Link href={href("/privacy#cookies")}>{t.cookies}</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
