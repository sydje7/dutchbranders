import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Caveat, JetBrains_Mono, Playfair_Display, Poppins } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import { I18nProvider } from "@/components/I18n";
import { getDict, hasLocale, locales } from "@/lib/i18n";
import "../globals.css";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], variable: "--font-poppins" });
const caveat = Caveat({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-caveat" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono-jb" });
const playfair = Playfair_Display({ subsets: ["latin"], style: ["normal", "italic"], weight: ["400", "700"], variable: "--font-playfair" });

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
    <html lang={lang} className={`${poppins.variable} ${caveat.variable} ${mono.variable} ${playfair.variable}`}>
      <body>
        <I18nProvider lang={lang} dict={dict}>
          <Header />
          <main>{children}</main>
          <Footer />
          <ChatWidget />
        </I18nProvider>
      </body>
    </html>
  );
}
