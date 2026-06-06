/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from "react";
import { DlicomRole, UserPassport } from "../types";
import { Upload, Sparkles } from "lucide-react";

interface PassportBuilderProps {
  passport: UserPassport;
  onUpdate: (updated: UserPassport) => void;
}

export const PassportBuilder: React.FC<PassportBuilderProps> = ({
  passport,
  onUpdate,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onUpdate({
      ...passport,
      [name]: value,
    });
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onUpdate({
      ...passport,
      role: e.target.value as DlicomRole,
    });
  };

  // Drag and Drop File Handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const processFile = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        onUpdate({
          ...passport,
          profilePicture: reader.result,
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  return (
    <div className="space-y-8">
      {/* Configuration Form Card */}
      <div className="rounded-2xl border border-white/5 bg-[#101828]/60 p-6 sm:p-8 backdrop-blur-sm shadow-xl">
        <h3 className="font-display font-bold text-xl text-white mb-6 flex items-center space-x-2">
          <Sparkles className="w-5 h-5 text-[#4DCEFF]" />
          <span>Passport Particulars</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Identity Fields */}
          <div className="space-y-4">
            <div>
              <label className="block font-mono text-[10px] text-[#94A3B8] uppercase tracking-wider mb-2">
                Discord Username
              </label>
              <input
                type="text"
                name="discordUsername"
                value={passport.discordUsername}
                onChange={handleChange}
                placeholder="ammar.eth"
                className="w-full rounded-xl border border-white/10 bg-[#080B12] px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-[#4A7DFF] transition-all"
              />
            </div>

            <div>
              <label className="block font-mono text-[10px] text-[#94A3B8] uppercase tracking-wider mb-2">
                X (Twitter) Username
              </label>
              <input
                type="text"
                name="xUsername"
                value={passport.xUsername}
                onChange={handleChange}
                placeholder="ammarxyz"
                className="w-full rounded-xl border border-white/10 bg-[#080B12] px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-[#4A7DFF] transition-all"
              />
            </div>

            <div>
              <label className="block font-mono text-[10px] text-[#94A3B8] uppercase tracking-wider mb-2">
                Ecosystem Status Label
              </label>
              <input
                type="text"
                name="status"
                value={passport.status}
                onChange={handleChange}
                placeholder="Verified Ambassador"
                className="w-full rounded-xl border border-white/10 bg-[#080B12] px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-[#4A7DFF] transition-all"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-mono text-[10px] text-[#94A3B8] uppercase tracking-wider mb-2">
                  Role Tier
                </label>
                <select
                  name="role"
                  value={passport.role}
                  onChange={handleRoleChange}
                  className="w-full rounded-xl border border-white/10 bg-[#080B12] px-4 py-3 text-sm text-white focus:outline-none focus:border-[#4A7DFF] transition-all"
                >
                  {Object.values(DlicomRole).map((role) => (
                    <option key={role} value={role} className="bg-[#101828] text-white">
                      {role}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-mono text-[10px] text-[#94A3B8] uppercase tracking-wider mb-2">
                  Joined Date
                </label>
                <input
                  type="text"
                  name="joinedDate"
                  value={passport.joinedDate}
                  onChange={handleChange}
                  placeholder="May 2026"
                  className="w-full rounded-xl border border-white/10 bg-[#080B12] px-4 py-3 text-sm text-white focus:outline-none focus:border-[#4A7DFF] transition-all"
                />
              </div>
            </div>
          </div>

          {/* Picture and Bio Area */}
          <div className="space-y-4">
            <div>
              <label className="block font-mono text-[10px] text-[#94A3B8] uppercase tracking-wider mb-2">
                Identity Profile Graphics
              </label>
              
              {/* Drag and Drop Box */}
              <div
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`relative group h-[126px] rounded-xl border-2 border-dashed flex flex-col items-center justify-center p-4 cursor-pointer transition-all duration-300 ${
                  dragActive 
                    ? "border-blue-500 bg-blue-500/5 shadow-inner" 
                    : "border-white/10 bg-[#080B12] hover:border-white/20 hover:bg-white/5"
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />

                <Upload className="w-5 h-5 text-[#94A3B8] group-hover:text-white mb-2 transition-colors" />
                <span className="text-xs text-white font-medium">
                  Drag and drop avatar image here
                </span>
                <span className="text-[10px] text-[#64748B] mt-1">
                  or click to select file manually (Retina resolution optimized)
                </span>
              </div>
            </div>

            <div>
              <label className="block font-mono text-[10px] text-[#94A3B8] uppercase tracking-wider mb-2">
                Passport Short Bio
              </label>
              <textarea
                name="bio"
                value={passport.bio}
                onChange={handleChange}
                rows={3}
                placeholder="Passionate builder in the Dlicom Ecosystem, generating elite dApps."
                className="w-full rounded-xl border border-white/10 bg-[#080B12] px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-[#4A7DFF] transition-all resize-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PassportBuilder;
