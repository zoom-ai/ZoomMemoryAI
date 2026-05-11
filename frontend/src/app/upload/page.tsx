"use client";
import React, { useState } from "react";
import { UploadCloud } from "lucide-react";
import Image from "next/image";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file || !title) return alert("Please provide title and file");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);

    try {
      const res = await fetch("http://localhost:8000/api/memories/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        setUploadedUrl(data.file_url);
        alert("Upload successful!");
      } else {
        alert("Upload failed.");
      }
    } catch (err) {
      console.error(err);
      alert("Error uploading file");
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white/10 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-500" />
        
        <div className="flex items-center justify-center w-16 h-16 bg-white/5 text-indigo-400 rounded-full mb-6 mx-auto border border-white/10">
          <UploadCloud size={32} />
        </div>
        <h1 className="text-2xl font-bold text-center text-white mb-6">Archive Memory</h1>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Memory Title</label>
            <input 
              type="text" 
              className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-indigo-500 text-white placeholder-slate-500 transition-all"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Summer Vacation 2024"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">File</label>
            <input 
              type="file" 
              className="w-full text-slate-400 bg-white/5 border border-white/10 rounded-lg p-2 cursor-pointer focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-500/20 file:text-indigo-300 hover:file:bg-indigo-500/30 transition-all"
              onChange={handleFileChange}
            />
          </div>

          <button 
            onClick={handleUpload}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2.5 rounded-lg transition-colors mt-4 shadow-[0_0_15px_rgba(79,70,229,0.4)]"
          >
            Upload to Archive
          </button>
        </div>

        {uploadedUrl && (
          <div className="mt-8">
            <h3 className="text-sm font-semibold text-slate-300 mb-3">Uploaded Preview:</h3>
            <div className="relative w-full h-48 rounded-xl overflow-hidden border border-white/10 shadow-lg">
              <Image 
                src={`http://localhost:8000${uploadedUrl}`} 
                alt={title} 
                fill 
                className="object-cover"
                unoptimized={true}
              />
            </div>
            <p className="text-xs text-slate-500 mt-3 truncate">{`http://localhost:8000${uploadedUrl}`}</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
