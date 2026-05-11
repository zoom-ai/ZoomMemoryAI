"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Calendar } from "lucide-react";
import { useTranslations } from "next-intl";

interface Memory {
  id: number;
  title: string;
  file_type: string;
  file_url: string;
  created_at: string;
}

export default function GalleryPage() {
  const t = useTranslations("Gallery");
  const [memories, setMemories] = useState<Memory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/api/memories")
      .then(res => res.json())
      .then(data => {
        setMemories(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <h1 className="text-3xl font-bold mb-2">{t("title")}</h1>
        <p className="text-slate-400">{t("description")}</p>
      </motion.div>

      {loading ? (
        <div className="text-center text-slate-400 py-20">Loading memories...</div>
      ) : memories.length === 0 ? (
        <div className="text-center text-slate-400 py-20">No memories found. Archive your first memory!</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[250px]">
          {memories.map((memory, i) => {
            const spans = ["col-span-1 row-span-1", "col-span-1 md:col-span-2 row-span-2", "col-span-1 md:col-span-2 row-span-1", "col-span-1 row-span-2"];
            const span = spans[i % spans.length];
            const dateStr = new Date(memory.created_at).toLocaleDateString();

            return (
            <motion.div
              key={memory.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: (i % 10) * 0.1 }}
              className={`group relative rounded-2xl overflow-hidden glass border border-white/10 hover:border-white/20 transition-all ${span}`}
            >
              {memory.file_type.includes("image") ? (
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(http://localhost:8000${memory.file_url})` }}
                />
              ) : memory.file_type.includes("video") ? (
                <video 
                  src={`http://localhost:8000${memory.file_url}`} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  autoPlay muted loop playsInline
                />
              ) : (
                <div className="absolute inset-0 bg-slate-800 flex items-center justify-center text-slate-400 font-medium">Document</div>
              )}
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 p-6 w-full translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-xl font-semibold text-white mb-2">{memory.title}</h3>
                <div className="flex items-center gap-4 text-xs text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                  <div className="flex items-center gap-1">
                    <Calendar size={12} />
                    <span>{dateStr}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )})}
        </div>
      )}
    </div>
  );
}
