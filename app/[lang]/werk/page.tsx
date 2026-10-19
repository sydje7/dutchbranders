import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import LeadForm from "@/components/LeadForm";
import PageHero from "@/components/PageHero";
import WorkGrid from "@/components/WorkGrid";
import { ReviewsSection } from "@/components/Sections";
import { ArrowRight } from "@/components/Icons";
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
      <PageHero label={t.metaTitle} title={t.title} lead={t.lead} aside={<LeadForm />}>
        <div className="btn-row">
          <Link href={localePath(lang, "/contact")} className="btn btn-orange">
            {d.common.freeAnalysis} <ArrowRight />
          </Link>
          <a href="#reviews" className="btn btn-outline-light">
            {t.readReviews}
          </a>
        </div>
      </PageHero>

      <ReviewsSection dict={d} lang={lang} light />

      <section className="hy-work">
        <div className="container">
          <WorkGrid />
        </div>
      </section>
    </>
  );
}
