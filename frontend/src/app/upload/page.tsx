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
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-slate-100">
        <div className="flex items-center justify-center w-16 h-16 bg-blue-50 text-blue-600 rounded-full mb-6 mx-auto">
          <UploadCloud size={32} />
        </div>
        <h1 className="text-2xl font-bold text-center text-slate-800 mb-6">Archive Memory</h1>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Memory Title</label>
            <input 
              type="text" 
              className="w-full border border-slate-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Summer Vacation 2024"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">File</label>
            <input 
              type="file" 
              className="w-full text-slate-500 border border-slate-300 rounded-lg p-2 cursor-pointer focus:outline-none"
              onChange={handleFileChange}
            />
          </div>

          <button 
            onClick={handleUpload}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-colors mt-4"
          >
            Upload to Archive
          </button>
        </div>

        {uploadedUrl && (
          <div className="mt-8">
            <h3 className="text-sm font-semibold text-slate-700 mb-2">Uploaded Preview:</h3>
            <div className="relative w-full h-48 rounded-lg overflow-hidden border border-slate-200">
              <Image 
                src={`http://localhost:8000${uploadedUrl}`} 
                alt={title} 
                fill 
                className="object-cover"
                unoptimized={true}
              />
            </div>
            <p className="text-xs text-slate-500 mt-2 truncate">http://localhost:8000{uploadedUrl}</p>
          </div>
        )}
      </div>
    </div>
  );
}
