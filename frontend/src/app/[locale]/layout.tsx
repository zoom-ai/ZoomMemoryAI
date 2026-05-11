import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { Link } from "@/i18n/routing";
import { Sparkles } from "lucide-react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  // Await the params object before accessing properties.
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Navigation" });
  return {
    title: "ZoomMemoryAI - Your Digital Sanctuary",
    description: "Archive and curate your precious memories with AI.",
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  // Await the params object before accessing properties.
  const { locale } = await params;
  const messages = await getMessages({ locale });

  return (
    <html lang={locale} className="dark">
      <body className={`${inter.variable} antialiased min-h-screen flex flex-col`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {/* Navigation Bar */}
          <header className="fixed top-0 w-full z-50 glass border-b border-white/5">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
              <Link href="/" className="flex items-center gap-2 group">
                <div className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400 group-hover:bg-indigo-500/30 transition-colors">
                  <Sparkles size={20} />
                </div>
                <span className="font-semibold text-lg tracking-tight text-white">ZoomMemory<span className="text-indigo-400">AI</span></span>
              </Link>
              <nav className="flex items-center gap-6 text-sm font-medium">
                {/* Text needs translation inside client components, or we can fetch it via getTranslations here since it's server component */}
                <NavLinks locale={locale} />
                <LanguageSwitcher />
              </nav>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 pt-16 relative">
            {/* Ambient Background Glow */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/20 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-sky-600/20 blur-[120px] pointer-events-none" />
            
            <div className="relative z-10">
              {children}
            </div>
          </main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

// Extract NavLinks to use useTranslations if needed, or pass it from Server Component
async function NavLinks({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "Navigation" });
  return (
    <>
      <Link href="/gallery" className="text-slate-300 hover:text-white transition-colors">{t("gallery")}</Link>
      <Link href="/upload" className="text-slate-300 hover:text-white transition-colors">{t("archive")}</Link>
      <Link href="/upload" className="px-4 py-2 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-[0_0_15px_rgba(79,70,229,0.3)]">
        {t("newMemory")}
      </Link>
    </>
  );
}
