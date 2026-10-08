import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import LeadForm from "@/components/LeadForm";
import WorkGrid from "@/components/WorkGrid";
import Rich from "@/components/Rich";
import { CtaBand, ReviewLine, ReviewsSection } from "@/components/Sections";
import { getDict, hasLocale, localePath } from "@/lib/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]/werk">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = getDict(lang).workPage;
  return { title: t.metaTitle, description: t.metaDescription };
}

export default async function Werk({ params }: PageProps<"/[lang]/werk">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const d = getDict(lang);
  const t = d.workPage;

  return (
    <>
      <section>
        <div className="container werk-hero">
          <div>
            <ReviewLine dict={d} />
            <h1 className="h1">
              <Rich text={t.title} />
            </h1>
            <p className="lead">{t.lead}</p>
            <div className="btn-row">
              <Link href={localePath(lang, "/contact")} className="btn btn-navy btn-sm">
                {d.common.freeAnalysis}
              </Link>
              <a href="#reviews" className="btn btn-outline btn-sm">
                {t.readReviews}
              </a>
            </div>
          </div>
          <LeadForm dark />
        </div>
      </section>

      <div className="white-area">
        <section style={{ padding: "60px 0 30px" }}>
          <div className="container">
            <WorkGrid />
          </div>
        </section>
        <ReviewsSection dict={d} lang={lang} />
      </div>

      <CtaBand dict={d} lang={lang} />
    </>
  );
}
