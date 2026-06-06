/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from "react";
import { motion } from "motion/react";
import { Upload, Trash2, Image as ImageIcon, Sparkles, RefreshCw, Check } from "lucide-react";

interface MascotProps {
  customMascotUrl?: string | null;
  onUpdateMascot?: (url: string | null) => void;
  size?: number;
}

export const DlicomMascot: React.FC<MascotProps> = ({
  customMascotUrl = null,
  onUpdateMascot,
  size = 360,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fallback default mascot generated to match the user's gorgeous design
  const defaultMascot = "/public/default-mascot.png";
  const activeMascot = customMascotUrl || defaultMascot;

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Invalid file type: Please upload an image file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        if (onUpdateMascot) {
          onUpdateMascot(result);
        } else {
          // Fallback direct storage sync if props are empty
          localStorage.setItem("dlicom_temp_mascot_fallback", result);
          window.dispatchEvent(new Event("storage"));
        }
        setIsSuccess(true);
        setTimeout(() => setIsSuccess(false), 2000);
      }
    };
    reader.readAsDataURL(file);
  };

  const onChangeFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  const triggerFilePicker = () => {
    fileInputRef.current?.click();
  };

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Reset to official default Mascot?")) {
      if (onUpdateMascot) {
        onUpdateMascot(null);
      } else {
        localStorage.removeItem("dlicom_temp_mascot_fallback");
        window.dispatchEvent(new Event("storage"));
      }
    }
  };

  return (
    <div 
      className="relative flex flex-col items-center justify-center p-1 select-none" 
      style={{ width: "100%", maxWidth: size }}
    >
      {/* Hidden system file selector */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={onChangeFileInput}
        accept="image/*"
        className="hidden"
      />

      {/* Decorative Blueprint layout borders around the panel */}
      <div className="absolute -inset-4 bg-[#4A7DFF]/5 blur-[80px] rounded-full pointer-events-none" />

      {/* Main Container Card: Matte Fintech dark border style */}
      <div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={`relative w-full aspect-square rounded-[28px] border bg-[#060913]/90 backdrop-blur-md overflow-hidden flex flex-col items-center justify-between p-6 transition-all duration-300 group
          ${isDragging 
            ? "border-blue-500 shadow-[0_0_25px_rgba(74,125,255,0.25)] scale-[1.02]" 
            : "border-white/10 hover:border-[#4A7DFF]/40 shadow-[0_24px_60px_rgba(0,0,0,0.85)]"
          }
        `}
      >
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 grid-overlay opacity-15 pointer-events-none" />

        {/* Premium Geometric Blueprint Accents */}
        {/* Top-left corners */}
        <div className="absolute top-4 left-4 w-3.5 h-3.5 border-t border-l border-white/20 rounded-tl-md pointer-events-none" />
        {/* Top-right corners */}
        <div className="absolute top-4 right-4 w-3.5 h-3.5 border-t border-r border-white/20 rounded-tr-md pointer-events-none" />
        {/* Bottom-left corners */}
        <div className="absolute bottom-4 left-4 w-3.5 h-3.5 border-b border-l border-white/20 rounded-bl-md pointer-events-none" />
        {/* Bottom-right corners */}
        <div className="absolute bottom-4 right-4 w-3.5 h-3.5 border-b border-r border-white/20 rounded-br-md pointer-events-none" />

        {/* Top Header Controls: Minimal layout bar */}
        <div className="relative w-full flex items-center justify-between z-10 font-mono text-[9px] text-[#64748B] tracking-wider border-b border-white/[0.05] pb-2.5">
          <div className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            <span className="uppercase text-white/70 font-bold">MASCOT PROTOCOL</span>
          </div>
          <div className="flex items-center space-x-1">
            {customMascotUrl ? (
              <span className="text-[#34D399] font-semibold flex items-center space-x-1 bg-[#34D399]/10 px-1.5 py-0.5 rounded border border-[#34D399]/20">
                <Check className="w-3 h-3" />
                <span>ACTIVE CUSTOM</span>
              </span>
            ) : (
              <span className="bg-white/5 text-slate-400 px-1.5 py-0.5 rounded font-medium">OFFICIAL STANDARDS</span>
            )}
          </div>
        </div>

        {/* Main interactive showcase focus area */}
        <div className="relative flex-grow flex items-center justify-center w-full min-h-0 py-4 my-2 group/mascot select-none">
          {/* Circular soft backdrop glow aligned to theme highlight */}
          <div className="absolute w-44 h-44 rounded-full bg-blue-500/5 blur-3xl pointer-events-none transition-all group-hover:scale-110" />

          {/* Clean crisp image, with no floating or spinning animation */}
          <img
            src={activeMascot}
            alt="Dlicom Resident Mascot"
            className="max-w-[72%] max-h-[82%] object-contain drop-shadow-[0_12px_28px_rgba(0,0,0,0.65)] rounded-2xl transition-transform duration-300 group-hover/mascot:scale-103"
            referrerPolicy="no-referrer"
            onError={(e) => {
              e.currentTarget.src = defaultMascot;
            }}
          />

          {/* Minimal Hover Overlay Actions */}
          <div className="absolute inset-0 bg-[#060913]/30 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center space-x-3.5 rounded-2xl">
            <button
              onClick={triggerFilePicker}
              className="inline-flex items-center space-x-1.5 bg-blue-500 hover:bg-blue-600 active:scale-95 text-white px-3.5 py-2 rounded-xl text-xs font-semibold shadow-lg transition-transform duration-200"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload New</span>
            </button>
            
            {customMascotUrl && (
              <button
                onClick={handleReset}
                className="inline-flex items-center justify-center bg-white/10 hover:bg-red-500/10 hover:border-red-500/30 border border-white/10 active:scale-95 text-slate-300 hover:text-red-400 p-2.5 rounded-xl text-xs shadow-lg transition-colors duration-200"
                title="Reset to default mascot"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Bottom Bar: Action/drop summary label */}
        <div className="relative w-full z-10 mt-auto">
          {isSuccess ? (
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-full flex items-center justify-center space-x-2 border border-emerald-500/20 bg-emerald-500/5 text-[#34D399] py-3 rounded-xl font-mono text-[10px] tracking-wide"
            >
              <Check className="w-4 h-4" />
              <span className="uppercase font-bold">Mascot Synchronized Successfully</span>
            </motion.div>
          ) : (
            <button
              onClick={triggerFilePicker}
              className="w-full flex items-center justify-center space-x-2 border border-white/5 bg-[#101625]/50 hover:bg-[#161F33] hover:border-white/10 text-white/80 hover:text-white py-3 rounded-xl transition font-mono text-[10px] tracking-wider"
            >
              <Upload className="w-3.5 h-3.5 text-blue-400" />
              <span>DRAG ASSET HERE OR CLICK TO UPLOAD</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DlicomMascot;
