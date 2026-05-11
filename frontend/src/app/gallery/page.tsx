"use client";
import React from "react";
import { motion } from "framer-motion";
import { MapPin, Calendar } from "lucide-react";

// Mock data for the gallery
const mockMemories = [
  { id: 1, title: "Nebula Dreams", type: "image", url: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&q=80", date: "2024-05-10", location: "Milky Way", span: "col-span-1 md:col-span-2 row-span-2" },
  { id: 2, title: "Ocean Breeze", type: "image", url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80", date: "2023-08-15", location: "Hawaii", span: "col-span-1 row-span-1" },
  { id: 3, title: "Forest Walk", type: "image", url: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80", date: "2023-10-02", location: "Kyoto", span: "col-span-1 row-span-1" },
  { id: 4, title: "City Lights", type: "image", url: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80", date: "2024-01-01", location: "Seoul", span: "col-span-1 md:col-span-2 row-span-1" },
  { id: 5, title: "Mountain Peak", type: "image", url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80", date: "2022-12-25", location: "Alps", span: "col-span-1 row-span-2" },
];

export default function GalleryPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <h1 className="text-3xl font-bold mb-2">Memory Exhibition</h1>
        <p className="text-slate-400">Curated collections of your digital life.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[250px]">
        {mockMemories.map((memory, i) => (
          <motion.div
            key={memory.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className={`group relative rounded-2xl overflow-hidden glass border border-white/10 hover:border-white/20 transition-all ${memory.span}`}
          >
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: `url(${memory.url})` }}
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
            
            {/* Content */}
            <div className="absolute bottom-0 left-0 p-6 w-full translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              <h3 className="text-xl font-semibold text-white mb-2">{memory.title}</h3>
              <div className="flex items-center gap-4 text-xs text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                <div className="flex items-center gap-1">
                  <Calendar size={12} />
                  <span>{memory.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin size={12} />
                  <span>{memory.location}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
