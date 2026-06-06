/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState } from "react";
import { toPng } from "html-to-image";
import { motion } from "motion/react";
import { ROLE_CONFIGS, UserPassport } from "../types";
import { DlicomLogo } from "./DlicomLogo";
import { Download, Share2, Sparkles, Check, Twitter, ShieldCheck, Palette } from "lucide-react";
import qrCodeImage from "./qr-code.png";

export type CardTheme = "obsidian" | "cyberpunk" | "minimalist";

export const THEME_STYLES: Record<CardTheme, {
  name: string;
  cardClass: string;
  avatarBorder: string;
  chipClass: string;
  repClass: string;
  logoClass: string;
  glowStyle: (color: string) => React.CSSProperties;
  borderGlowStyle: (color: string) => React.CSSProperties;
  badgeStyle: (color: string, bg: string, border: string) => React.CSSProperties;
  descClass: string;
  dateClass: string;
}> = {
  obsidian: {
    name: "Obsidian Core",
    cardClass: "bg-gradient-to-br from-[#0c0d10] via-[#050608] to-[#010103] border-[#1e2330] shadow-[0_24px_50px_rgba(0,0,0,0.95)] hover:border-blue-500/30 text-white",
    avatarBorder: "border border-white/10 rounded-2xl bg-[#080B12] p-1 shadow-md",
    chipClass: "border-amber-500/20 bg-gradient-to-tr from-amber-500/5 via-yellow-400/10 to-amber-300/20 opacity-80",
    repClass: "",
    logoClass: "text-[#4A7DFF] opacity-[0.05] group-hover:opacity-[0.06] transition-all duration-700",
    glowStyle: (color) => ({
      backgroundImage: `radial-gradient(circle at var(--x, 100px) var(--y, 100px), ${color}15 0%, transparent 70%)`
    }),
    borderGlowStyle: (color) => ({
      background: "none",
      border: `1.5px solid ${color}33`,
      boxShadow: `0 0 20px ${color}10`
    }),
    badgeStyle: (color, bg, border) => ({
      color: color,
      backgroundColor: bg,
      borderColor: border,
    }),
    descClass: "text-slate-400 text-[11px]",
    dateClass: "text-slate-300",
  },
  cyberpunk: {
    name: "Cyber Neon",
    cardClass: "bg-gradient-to-br from-[#080216] via-[#030009] to-[#010003] border-pink-500/30 shadow-[0_24px_50px_rgba(255,0,85,0.2)] text-white hover:border-pink-500/50",
    avatarBorder: "border-2 border-pink-500/40 rounded-2xl p-1 bg-[#04010b] shadow-md",
    chipClass: "border-[#00f0ff]/30 bg-gradient-to-tr from-[#00f0ff]/10 to-[#ff0055]/20 opacity-90",
    repClass: "",
    logoClass: "text-[#ff0055] opacity-[0.05] group-hover:opacity-[0.07] saturate-150 transition-all duration-700",
    glowStyle: () => ({
      backgroundImage: "radial-gradient(circle at var(--x, 100px) var(--y, 100px), rgba(255, 0, 85, 0.12) 0%, rgba(0, 240, 255, 0.12) 50%, transparent 100%)",
    }),
    borderGlowStyle: () => ({
      background: "linear-gradient(135deg, rgba(255, 0, 85, 0.2) 0%, transparent 50%, rgba(0, 241, 255, 0.2) 100%)",
      border: "1.5px solid rgba(255, 0, 85, 0.5)",
    }),
    badgeStyle: () => ({
      color: "#00f0ff",
      backgroundColor: "rgba(0, 240, 255, 0.1)",
      borderColor: "rgba(0, 240, 255, 0.3)",
      textShadow: "0 0 5px rgba(0, 240, 255, 0.5)"
    }),
    descClass: "text-[#00f0ff]/70 font-mono text-[11px]",
    dateClass: "text-pink-400 font-mono",
  },
  minimalist: {
    name: "Minimalist",
    cardClass: "bg-[#040405] border-[#1d1d23] shadow-none hover:shadow-xl hover:border-white/10 text-white",
    avatarBorder: "border border-neutral-800 rounded-2xl p-1 bg-[#000]",
    chipClass: "border-neutral-800 bg-neutral-950/60 opacity-30",
    repClass: "",
    logoClass: "text-neutral-500 opacity-[0.03] group-hover:opacity-[0.045] grayscale transition-all duration-700",
    glowStyle: () => ({}),
    borderGlowStyle: () => ({
      background: "none",
      border: "1.5px solid rgba(255, 255, 255, 0.05)"
    }),
    badgeStyle: () => ({
      color: "#FFFFFF",
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      borderColor: "rgba(255, 255, 255, 0.15)",
    }),
    descClass: "text-neutral-500 text-[11px]",
    dateClass: "text-neutral-400",
  }
};

interface PassportCardProps {
  passport: UserPassport;
  customLogoUrl?: string | null;
}

export const PassportCardComponent: React.FC<PassportCardProps> = ({
  passport,
  customLogoUrl = null,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [magneticX, setMagneticX] = useState(0);
  const [magneticY, setMagneticY] = useState(0);
  const [theme, setTheme] = useState<CardTheme>("obsidian");
  const [qrLoadError, setQrLoadError] = useState(false);

  const roleConfig = ROLE_CONFIGS[passport.role] || ROLE_CONFIGS["Verified"];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const normalizedX = (x - centerX) / centerX;
    const normalizedY = (y - centerY) / centerY;

    setRotateX(-normalizedY * 8); // subtle elegant tilt
    setRotateY(normalizedX * 8);

    setMagneticX(normalizedX * 5); // subtle magnetic drift
    setMagneticY(normalizedY * 5);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
    setMagneticX(0);
    setMagneticY(0);
  };

  const calculateTotalDays = (dateStr: string): number => {
    try {
      const now = new Date("2026-06-06T11:48:13Z");
      let parsedDate = Date.parse(dateStr);
      
      if (isNaN(parsedDate)) {
        const parts = dateStr.trim().split(/\s+/);
        if (parts.length === 2) {
          parsedDate = Date.parse(`1 ${parts[0]} ${parts[1]}`);
        } else if (parts.length === 3) {
          parsedDate = Date.parse(`${parts[0]} ${parts[1]} ${parts[2]}`);
        }
      }
      
      if (isNaN(parsedDate)) {
        return 412;
      }
      
      const diffTime = Math.max(0, now.getTime() - parsedDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays || 412;
    } catch (e) {
      return 412;
    }
  };

  const capturePassport = async () => {
    if (!cardRef.current) return;
    setIsExporting(true);
    await new Promise((resolve) => setTimeout(resolve, 300));

    try {
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        quality: 1.0,
        pixelRatio: 3,
        backgroundColor: "#080B12",
        style: {
          transform: "scale(1)",
          transformOrigin: "top left",
          borderRadius: "16px",
          overflow: "hidden",
        },
      });

      const link = document.createElement("a");
      link.download = `DLICOM-PASSPORT-${passport.discordUsername || "member"}.png`;
      link.href = dataUrl;
      link.click();

      setExportSuccess(true);
      setTimeout(() => setExportSuccess(false), 3000);
    } catch (error) {
      console.error("Export failure:", error);
    } finally {
      setIsExporting(false);
    }
  };

  const currentTheme = THEME_STYLES[theme];

  return (
    <div className="flex flex-col items-center w-full">
      {/* Theme selection Segmented Control */}
      <div className="flex items-center justify-between bg-[#0e131f]/75 border border-white/5 p-1 rounded-2xl mb-4 max-w-[560px] w-full shadow-inner backdrop-blur-sm">
        <span className="text-[11px] text-[#94A3B8] font-bold pl-3 flex items-center space-x-1.5 font-mono uppercase tracking-wider">
          <Palette className="w-3.5 h-3.5 text-cyan-400" />
          <span>Card Skin</span>
        </span>
        <div className="flex space-x-1">
          {(["obsidian", "cyberpunk", "minimalist"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTheme(t)}
              className={`text-[11px] px-3 py-1 rounded-xl font-bold font-mono transition-all duration-300 capitalize ${
                theme === t
                  ? "bg-white/10 text-white border border-white/10 shadow-lg"
                  : "text-[#64748B] hover:text-[#B8BCC7]"
              }`}
            >
              {THEME_STYLES[t].name}
            </button>
          ))}
        </div>
      </div>

      {/* 3D Motion Perspective Card Wrapper */}
      <div className="w-full flex justify-center perspective-1000 my-6">
        <motion.div
          id="passport-target-capture"
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
          style={{
            "--x": `${mousePos.x}px`,
            "--y": `${mousePos.y}px`,
            ...currentTheme.glowStyle(roleConfig.color)
          } as React.CSSProperties}
          animate={{
            rotateX: rotateX,
            rotateY: rotateY,
            x: magneticX,
            y: magneticY,
            scale: isHovered ? 1.02 : 1,
          }}
          transition={{
            type: "spring",
            stiffness: 220,
            damping: 24,
            mass: 0.6,
          }}
          className={`relative max-w-[560px] w-full min-h-[300px] aspect-[1.58/1] rounded-2xl p-5 md:p-6 lg:p-7 select-none transition-all duration-300 group overflow-hidden border flex flex-col justify-between ${currentTheme.cardClass}`}
        >
          {/* Card Border Glow dynamic matching role/theme color */}
          <div 
            className="absolute -inset-px rounded-2xl opacity-25 group-hover:opacity-45 transition-opacity duration-300 pointer-events-none"
            style={currentTheme.borderGlowStyle(roleConfig.color)}
          />

          {/* Dynamic Light Card Spotlight Track */}
          {theme !== "minimalist" && (
            <div className="absolute inset-0 card-spotlight opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          )}

          {/* Subtle Outer Glowing Edge Highlight */}
          <div 
            className="absolute inset-[1.5px] rounded-[14px] pointer-events-none transition-all duration-300 pointer-events-none"
            style={{
              border: "1.5px solid rgba(255, 255, 255, 0.03)",
              boxShadow: `inset 0 0 12px ${roleConfig.color}15`,
            }}
          />

          {/* Blueprint Inner Border - Hair-thin dotted line */}
          <div 
            className="absolute inset-[10px] rounded-[10px] pointer-events-none transition-all duration-300 border border-dashed pointer-events-none"
            style={{
              borderColor: `${roleConfig.color}18`,
            }}
          />

          {/* Premium Tech-Inspired Frame Details & Corner Brackets */}
          {/* Top Left Bracket */}
          <div className="absolute top-3.5 left-3.5 w-3 h-3 pointer-events-none flex flex-col justify-between">
            <div className="flex select-none">
              <div className="w-1.5 h-[1.5px]" style={{ backgroundColor: `${roleConfig.color}80` }} />
            </div>
            <div className="w-[1.5px] h-1.5 -mt-[1.5px]" style={{ backgroundColor: `${roleConfig.color}80` }} />
          </div>

          {/* Top Right Bracket */}
          <div className="absolute top-3.5 right-3.5 w-3 h-3 pointer-events-none flex flex-col justify-between items-end">
            <div className="flex select-none">
              <div className="w-1.5 h-[1.5px]" style={{ backgroundColor: `${roleConfig.color}80` }} />
            </div>
            <div className="w-[1.5px] h-1.5 -mt-[1.5px]" style={{ backgroundColor: `${roleConfig.color}80` }} />
          </div>

          {/* Bottom Left Bracket */}
          <div className="absolute bottom-3.5 left-3.5 w-3 h-3 pointer-events-none flex flex-col justify-end">
            <div className="w-[1.5px] h-1.5 mb-[1.5px]" style={{ backgroundColor: `${roleConfig.color}80` }} />
            <div className="flex select-none">
              <div className="w-1.5 h-[1.5px]" style={{ backgroundColor: `${roleConfig.color}80` }} />
            </div>
          </div>

          {/* Bottom Right Bracket */}
          <div className="absolute bottom-3.5 right-3.5 w-3 h-3 pointer-events-none flex flex-col justify-end items-end">
            <div className="w-[1.5px] h-1.5 mb-[1.5px]" style={{ backgroundColor: `${roleConfig.color}80` }} />
            <div className="flex select-none">
              <div className="w-1.5 h-[1.5px]" style={{ backgroundColor: `${roleConfig.color}80` }} />
            </div>
          </div>

          {/* Luxury Tick Markers & Geometric Line Ornaments */}
          <div className="absolute left-1/2 top-3 -translate-x-1/2 flex items-center space-x-1 pointer-events-none opacity-40">
            <div className="w-[3px] h-[3px] rounded-full" style={{ backgroundColor: roleConfig.color }} />
            <div className="w-4 h-[1px]" style={{ backgroundColor: `${roleConfig.color}40` }} />
            <div className="w-[3px] h-[3px] rounded-full" style={{ backgroundColor: roleConfig.color }} />
          </div>
          <div className="absolute left-1/2 bottom-3 -translate-x-1/2 flex items-center space-x-1 pointer-events-none opacity-40">
            <div className="w-[3px] h-[3px] rounded-full" style={{ backgroundColor: roleConfig.color }} />
            <div className="w-4 h-[1px]" style={{ backgroundColor: `${roleConfig.color}40` }} />
            <div className="w-[3px] h-[3px] rounded-full" style={{ backgroundColor: roleConfig.color }} />
          </div>

          {/* Large Low Opacity Dlicom 3D Mascot Watermark Logo: Placed in center, 9% opacity, transitioning on hover */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.09] group-hover:opacity-[0.14] transition-all duration-500 z-0">
            <img 
              src="/card-background-mascot.png" 
              alt="Dlicom Mascot Card Watermark" 
              className="w-[280px] h-[280px] object-contain pointer-events-none"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Top header - Brand Label & Card Chip */}
          <div className="relative flex items-center justify-between mb-2 z-10">
            <div className="flex items-center space-x-2">
              {customLogoUrl ? (
                <img src={customLogoUrl} alt="DLICOM Logo" className="h-[20px] object-contain" />
              ) : (
                <DlicomLogo size={20} className={theme === "cyberpunk" ? "text-cyan-400" : "text-[#4A7DFF]"} />
              )}
              <span className={`font-sans font-black text-[11px] tracking-[0.25em] h-fit leading-none ${theme === "cyberpunk" ? "text-cyan-400 drop-shadow-[0_0_5px_rgba(6,182,212,0.5)]" : "text-white/95"}`}>
                DLICOM PASSPORT
              </span>
            </div>

            {/* Smart Card Chip */}
            <div className={`relative w-11 h-8 rounded-md border flex flex-col justify-around p-1 shadow-inner overflow-hidden ${currentTheme.chipClass}`}>
              <div className="w-full h-[1px] bg-amber-500/20" />
              <div className="grid grid-cols-3 gap-0.5 w-full">
                <div className="h-4 border-r border-[#080B12]/80 bg-gradient-to-r from-amber-300/40 to-transparent" />
                <div className="h-4 border-r border-[#080B12]/80 bg-gradient-to-r from-amber-300/40 to-transparent" />
                <div className="h-4" />
              </div>
              <div className="w-full h-[1px] bg-amber-500/20" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-amber-500/30 rounded-sm" />
            </div>
          </div>

          {/* Card core contents - Compact horizontal layout */}
          <div className="relative grid grid-cols-12 gap-4 items-center flex-grow py-3 z-10 w-full mb-1">
            {/* Left: Large Profile Image (4 cols) */}
            <div className="col-span-4 flex justify-start relative">
              <div className="relative">
                {theme !== "minimalist" && (
                  <div 
                    className="absolute -inset-0.5 rounded-2xl blur-[14px] animate-pulse pointer-events-none opacity-45"
                    style={{ backgroundColor: theme === "cyberpunk" ? "#ff0055" : "#4A7DFF" }}
                  />
                )}
                
                <div 
                  className={`relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl p-0.5 bg-[#0a0f1a] transition-transform duration-300 group-hover/avatar:scale-102 flex items-center justify-center border ${currentTheme.avatarBorder}`}
                  style={theme !== "minimalist" ? { borderColor: theme === "cyberpunk" ? "#ffa1dd" : `${roleConfig.color}40` } : {}}
                >
                  <img
                    src={passport.profilePicture || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"}
                    alt={passport.discordUsername}
                    className="w-full h-full rounded-xl object-cover select-none pointer-events-none"
                    onError={(e) => {
                      e.currentTarget.src = `https://api.dicebear.com/7.x/pixel-art/svg?seed=${passport.discordUsername || 'dlicom'}`;
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Center: Details (5 cols) */}
            <div className="col-span-5 flex flex-col justify-center space-y-2.5 text-left pl-1">
              {/* Role Badge & Verified Indicator */}
              <div className="flex flex-wrap items-center gap-1.5 leading-none">
                <span 
                  className="inline-flex text-[9px] font-bold tracking-widest uppercase border px-2 py-0.5 rounded transition-all duration-300"
                  style={currentTheme.badgeStyle(roleConfig.color, roleConfig.bgOpacity, roleConfig.borderColor)}
                >
                  {passport.role}
                </span>
                
                <span className="inline-flex items-center space-x-1 font-mono text-[9px] uppercase tracking-wider text-[#4ade80] font-bold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verified</span>
                </span>
              </div>

              {/* Username & Twitter */}
              <div className="space-y-0.5">
                <h3 className="font-sans font-black text-lg sm:text-xl lg:text-2xl text-white truncate leading-tight tracking-tight uppercase">
                  {passport.discordUsername || "unnamed.io"}
                </h3>
                {passport.xUsername && (
                  <div className="flex items-center space-x-1 text-[#94A3B8] hover:text-[#B8BCC7] transition-all">
                    <Twitter className="w-3 h-3 text-sky-400 fill-sky-400" />
                    <span className="font-mono text-[10px] sm:text-xs">
                      @{passport.xUsername}
                    </span>
                  </div>
                )}
              </div>

              {/* Compact Membership stats */}
              <div className="pt-2 border-t border-white/5 grid grid-cols-2 gap-3 font-mono text-[9px]">
                <div>
                  <span className="block text-[7px] text-slate-500 uppercase tracking-widest leading-none mb-1 font-semibold">Member Since</span>
                  <span className={`font-bold transition-colors duration-300 block leading-tight ${theme === "cyberpunk" ? "text-pink-400" : "text-white/90"}`}>
                    {passport.joinedDate || "June 2026"}
                  </span>
                </div>
                <div>
                  <span className="block text-[7px] text-slate-500 uppercase tracking-widest leading-none mb-1 font-semibold">Active Days</span>
                  <span className={`font-bold transition-colors duration-300 block leading-tight ${theme === "cyberpunk" ? "text-cyan-400" : "text-sky-400"}`}>
                    {calculateTotalDays(passport.joinedDate)} Days
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Uploaded QR Code Image (3 cols) */}
            <div className="col-span-3 flex flex-col items-center justify-center">
              <div className="relative p-1 rounded-xl bg-white border border-white/10 shadow-[-5px_5px_20px_rgba(0,0,0,0.5)] transition-transform hover:scale-105 overflow-hidden flex items-center justify-center">
                {!qrLoadError ? (
                  <img
                    src={qrCodeImage}
                    alt="Credential QR"
                    onError={() => setQrLoadError(true)}
                    className="w-16 h-16 sm:w-[84px] sm:h-[84px] object-contain rounded-lg"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-16 h-16 sm:w-[84px] sm:h-[84px] text-slate-900 p-1 flex items-center justify-center">
                    <svg className="w-full h-full text-current" viewBox="0 0 100 100">
                      <rect x="5" y="5" width="26" height="26" fill="currentColor" rx="2" />
                      <rect x="11" y="11" width="14" height="14" fill="#0B0C0E" rx="1" />
                      <rect x="14" y="14" width="8" height="8" fill="currentColor" />

                      <rect x="69" y="5" width="26" height="26" fill="currentColor" rx="2" />
                      <rect x="75" y="11" width="14" height="14" fill="#0B0C0E" rx="1" />
                      <rect x="78" y="14" width="8" height="8" fill="currentColor" />

                      <rect x="5" y="69" width="26" height="26" fill="currentColor" rx="2" />
                      <rect x="11" y="75" width="14" height="14" fill="#0B0C0E" rx="1" />
                      <rect x="14" y="78" width="8" height="8" fill="currentColor" />

                      <rect x="42" y="42" width="16" height="16" fill="currentColor" rx="2" className="opacity-80" />

                      <rect x="36" y="10" width="6" height="6" fill="currentColor" />
                      <rect x="48" y="5" width="12" height="6" fill="currentColor" />
                      <rect x="36" y="22" width="18" height="6" fill="currentColor" />
                      
                      <rect x="10" y="36" width="6" height="6" fill="currentColor" />
                      <rect x="5" y="48" width="6" height="12" fill="currentColor" />
                      <rect x="22" y="36" width="6" height="18" fill="currentColor" />

                      <rect x="69" y="36" width="12" height="6" fill="currentColor" />
                      <rect x="87" y="42" width="8" height="8" fill="currentColor" />
                      <rect x="81" y="56" width="12" height="6" fill="currentColor" />

                      <rect x="36" y="69" width="6" height="12" fill="currentColor" />
                      <rect x="48" y="81" width="12" height="6" fill="currentColor" />
                      <rect x="42" y="69" width="18" height="6" fill="currentColor" />

                      <rect x="69" y="69" width="26" height="6" fill="currentColor" />
                      <rect x="81" y="81" width="12" height="12" fill="currentColor" />
                      <rect x="69" y="87" width="6" height="6" fill="currentColor" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Dlicom Social Follow connection block */}
              <div className="flex flex-col items-center mt-2 text-center leading-normal">
                <span className="text-[7px] font-extrabold uppercase tracking-widest text-[#B8BCC7]/60 leading-none">Follow Dlicom</span>
                <a 
                  href="https://x.com/DlicomApp" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="font-mono text-[9px] font-bold text-sky-400 hover:text-sky-300 mt-[3px] flex items-center space-x-0.5"
                >
                  <Twitter className="w-2 h-2 text-sky-400 fill-sky-400" />
                  <span>@DlicomApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom layout minimal fine bar */}
          <div className="relative mt-auto pt-2 border-t border-white/[0.04] flex items-center justify-between font-mono text-[8px] sm:text-[9px] text-slate-500 tracking-wider">
            <span>OFFICIAL ECOSYSTEM RESIDENT</span>
            <span className="font-extrabold text-[#4A7DFF]">DLICOM SOCIALFI</span>
          </div>
        </motion.div>
      </div>

      {/* Control Actions Panel */}
      <div className="flex flex-wrap gap-4 mt-4 w-full justify-center max-w-[560px]">
        <button
          onClick={capturePassport}
          disabled={isExporting}
          className={`flex-1 min-w-[150px] inline-flex items-center justify-center space-x-2 bg-white hover:bg-slate-100 text-[#080B12] px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 shadow-xl ${
            isExporting ? "opacity-50 cursor-wait" : ""
          }`}
        >
          {isExporting ? (
            <>
              <div className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
              <span>Rendering PNG...</span>
            </>
          ) : exportSuccess ? (
            <>
              <Check className="w-4 h-4 text-emerald-600" />
              <span className="text-emerald-700">Passport Exported!</span>
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              <span>Download Passport as PNG</span>
            </>
          )}
        </button>

        <button
          onClick={() => {
            const shareText = `Behold my official @dlicom Passport. Role: ${passport.role}, ID: ${passport.id}! Create your premium identity card.`;
            navigator.clipboard.writeText(`${window.location.href}\n\n${shareText}`);
            alert("Passport system link saved to clipboard!");
          }}
          className="inline-flex items-center justify-center space-x-2 bg-[#161F2D]/80 hover:bg-[#202D40] border border-white/10 px-5 py-3 rounded-xl font-medium text-sm text-[#B8BCC7] hover:text-white transition-all duration-300"
        >
          <Share2 className="w-4 h-4" />
          <span>Share Metadata</span>
        </button>
      </div>
    </div>
  );
};

export default PassportCardComponent;
