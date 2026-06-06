/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { UserPassport, DlicomRole, ROLE_CONFIGS } from "../types";
import { PassportCardComponent } from "./PassportCardComponent";
import { Search, Sparkles, X, ArrowUpRight, FolderGit } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface LiveShowcaseProps {
  passports: UserPassport[];
  customLogoUrl?: string | null;
}

export const LiveShowcase: React.FC<LiveShowcaseProps> = ({
  passports,
  customLogoUrl = null,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState<string>("All");
  const [inspectUser, setInspectUser] = useState<UserPassport | null>(null);

  const filtered = passports.filter((u) => {
    const matchesSearch =
      u.discordUsername.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (u.xUsername && u.xUsername.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (u.status && u.status.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesRole = selectedRole === "All" || u.role === selectedRole;

    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-10 py-10">
      
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center space-x-1 border border-cyan-500/20 bg-cyan-500/5 text-cyan-400 px-3.5 py-1 rounded-full text-xs font-mono tracking-widest uppercase">
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          <span>Ecosystem Directory</span>
        </div>
        <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
          The Official Member Registry
        </h2>
        <p className="text-sm text-[#94A3B8]">
          Explore the roles, verified reputations, and custom visual passport credentials of members forming the backbone of Dlicom.
        </p>
      </div>

      {/* Control Filters Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between rounded-xl border border-white/5 bg-[#101828]/60 p-4 backdrop-blur-sm shadow-lg">
        
        {/* Search */}
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search credentials or tags..."
            className="w-full rounded-lg border border-white/10 bg-[#080B12] pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-[#4A7DFF]"
          />
        </div>

        {/* Roles Filter Capsules */}
        <div className="flex flex-wrap gap-2 justify-center">
          <button
            onClick={() => setSelectedRole("All")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              selectedRole === "All"
                ? "bg-white text-[#080B12] font-semibold"
                : "bg-white/5 text-[#94A3B8] hover:text-white"
            }`}
          >
            All Roles
          </button>
          {Object.values(DlicomRole).map((role) => {
            const config = ROLE_CONFIGS[role];
            const isSelected = selectedRole === role;
            return (
              <button
                key={role}
                onClick={() => setSelectedRole(role)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  isSelected
                    ? "bg-[#161F2D] border border-white/10 text-white"
                    : "text-[#64748B] hover:text-white bg-white/0"
                }`}
                style={isSelected ? { borderColor: `${config.color}50` } : {}}
              >
                <span className="inline-block w-2.5 h-2.5 rounded-full mr-2" style={{ backgroundColor: config.color }} />
                {role}
              </button>
            );
          })}
        </div>
      </div>

      {/* Registry Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 rounded-2xl border border-white/5 bg-[#101828]/20">
          <FolderGit className="w-12 h-12 text-[#64748B] mx-auto mb-3 opacity-60" />
          <p className="text-[#94A3B8] font-sans text-sm">No identity records found matching filter criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((u, index) => {
            const config = ROLE_CONFIGS[u.role];
            return (
              <motion.div
                key={u.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                onClick={() => setInspectUser(u)}
                className="group relative flex flex-col justify-between rounded-2xl border border-white/5 bg-[#101828]/50 hover:bg-[#161F2D]/80 p-5 cursor-pointer hover:border-white/10 transition-all duration-300 backdrop-blur-sm overflow-hidden"
              >
                {/* Micro Color indicator line top */}
                <div className="absolute top-0 inset-x-0 h-[2px]" style={{ backgroundColor: config.color }} />

                <div className="space-y-4">
                  {/* Top: Avatar and Role */}
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="absolute inset-0 rounded-full blur-[4px]" style={{ backgroundColor: config.color }} />
                      <img src={u.profilePicture} alt={u.discordUsername} className="relative w-12 h-12 rounded-full object-cover border border-white/10" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-white text-sm group-hover:text-blue-400 transition-colors">
                        {u.discordUsername}
                      </h4>
                      <span className="font-mono text-[9px] text-[#64748B] block">@{u.xUsername || "no_x"}</span>
                    </div>
                  </div>

                  {/* Body Info */}
                  <div className="py-2 space-y-1.5 border-t border-b border-white/5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#64748B] font-mono text-[10px]">Ecosystem Role:</span>
                      <span className="font-bold font-mono text-[10px]" style={{ color: config.color }}>{u.role}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#64748B] font-mono text-[10px]">Registered rep:</span>
                      <span className="font-bold text-white text-[10px]">👑 {u.reputation} REP</span>
                    </div>
                  </div>

                  {u.bio && (
                    <p className="text-xs text-[#94A3B8] leading-tight line-clamp-2 italic pr-4">
                      "{u.bio}"
                    </p>
                  )}
                </div>

                {/* Footer status & entry button */}
                <div className="mt-5 flex items-center justify-between pt-3 border-t border-white/5 font-mono text-[9px] text-[#64748B]">
                  <span>SN: {u.id}</span>
                  <span className="text-blue-400 group-hover:underline flex items-center space-x-1">
                    <span>Inspect Passport</span>
                    <ArrowUpRight className="w-3" />
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Inspect Detail Modal (AnimatePresence Overlay) */}
      <AnimatePresence>
        {inspectUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#080B12]/95 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-xl rounded-3xl border border-white/10 bg-[#0c111e] shadow-2xl p-6 sm:p-10 z-50"
            >
              {/* Close Button */}
              <button
                onClick={() => setInspectUser(null)}
                className="absolute top-6 right-6 p-2 rounded-full border border-white/10 bg-slate-900/60 text-[#94A3B8] hover:text-white hover:bg-slate-800 transition"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col items-center justify-center space-y-6 pt-4 text-center">
                <div className="inline-flex items-center space-x-1.5 rounded-full border border-blue-500/20 bg-blue-500/5 px-3.5 py-1.5 shadow-xl">
                  <span className="w-2 h-2 rounded-full bg-[#4ADE80] animate-pulse" />
                  <span className="font-mono text-[10px] tracking-widest text-[#94A3B8] uppercase">
                    Ecosystem Verified Passport
                  </span>
                </div>
                
                <h3 className="font-display font-extrabold text-[#E2E8F0] text-xl sm:text-2xl tracking-tight leading-tight">
                  {inspectUser.discordUsername}'s Card
                </h3>

                <p className="text-xs text-[#94A3B8] max-w-sm">
                  This card displays the verified role tiers and real-time credentials of the member. Download the card or share the identity metadata coordinate.
                </p>

                <div className="w-full">
                  <PassportCardComponent passport={inspectUser} customLogoUrl={customLogoUrl} />
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LiveShowcase;
