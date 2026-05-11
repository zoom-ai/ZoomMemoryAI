"use client";
import React from "react";
import { motion } from "framer-motion";
import { Link } from "@/i18n/routing";
import { ArrowRight, Star } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("Landing");

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center max-w-3xl"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs text-indigo-300 font-medium mb-8 border border-indigo-500/30">
          <Star size={14} className="fill-indigo-400" />
          <span>{t("beta")}</span>
        </div>
        
        <h1 
          className="text-5xl md:text-7xl font-bold tracking-tight mb-6"
          dangerouslySetInnerHTML={{ __html: t.raw("title") }}
        />
        
        <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          {t("description")}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            href="/gallery" 
            className="flex items-center gap-2 px-8 py-3.5 rounded-full bg-white text-slate-900 font-semibold hover:bg-slate-200 transition-colors"
          >
            {t("enterGallery")}
          </Link>
          <Link 
            href="/upload" 
            className="flex items-center gap-2 px-8 py-3.5 rounded-full glass hover:bg-white/10 text-white font-medium transition-colors"
          >
            {t("startArchiving")} <ArrowRight size={18} />
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
