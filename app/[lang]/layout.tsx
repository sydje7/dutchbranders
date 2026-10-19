import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Poppins } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import RevealObserver from "@/components/RevealObserver";
import { I18nProvider } from "@/components/I18n";
import { getDict, hasLocale, locales } from "@/lib/i18n";
import "../globals.css";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], variable: "--font-poppins" });

export const generateStaticParams = () => locales.map((lang) => ({ lang }));

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const d = getDict(lang);
  return {
    title: { default: d.meta.title, template: "%s | Dutch Branders" },
    description: d.meta.description,
    icons: { icon: "/favicon.svg" },
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDict(lang);

  return (
    <html lang={lang} className={poppins.variable}>
      <body>
        <I18nProvider lang={lang} dict={dict}>
          <Header />
          <main>{children}</main>
          <Footer />
          <ChatWidget />
          <RevealObserver />
        </I18nProvider>
      </body>
    </html>
  );
}
