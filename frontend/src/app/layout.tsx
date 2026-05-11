import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Sparkles } from "lucide-react";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ZoomMemoryAI - Your Digital Sanctuary",
  description: "Archive and curate your precious memories with AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} antialiased min-h-screen flex flex-col`}>
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
              <Link href="/gallery" className="text-slate-300 hover:text-white transition-colors">Gallery</Link>
              <Link href="/upload" className="text-slate-300 hover:text-white transition-colors">Archive</Link>
              <Link href="/upload" className="px-4 py-2 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-[0_0_15px_rgba(79,70,229,0.3)]">
                New Memory
              </Link>
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
      </body>
    </html>
  );
}
