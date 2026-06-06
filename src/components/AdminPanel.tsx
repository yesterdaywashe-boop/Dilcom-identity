/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState } from "react";
import { DlicomRole, UserPassport, ROLE_CONFIGS } from "../types";
import { DlicomLogo } from "./DlicomLogo";
import { Upload, RefreshCw, Trash2, Edit2, ShieldAlert, CheckCircle, Database, Award, Users, FileText } from "lucide-react";

interface AdminPanelProps {
  passports: UserPassport[];
  assets: { logoUrl: string | null; mascotUrl: string | null };
  onUpdateAssets: (newAssets: { logoUrl: string | null; mascotUrl: string | null }) => void;
  onDeletePassport: (id: string) => void;
  onUpdateUserRole: (id: string, newRole: DlicomRole) => void;
  onUpdateUserRep: (id: string, newRep: number) => void;
  onAddRegistryMock: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  passports,
  assets,
  onUpdateAssets,
  onDeletePassport,
  onUpdateUserRole,
  onUpdateUserRep,
  onAddRegistryMock,
}) => {
  const logoInputRef = useRef<HTMLInputElement>(null);
  const mascotInputRef = useRef<HTMLInputElement>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const displaySuccess = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  const handleAssetUpload = (e: React.ChangeEvent<HTMLInputElement>, type: "logo" | "mascot") => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          onUpdateAssets({
            ...assets,
            [type === "logo" ? "logoUrl" : "mascotUrl"]: reader.result,
          });
          displaySuccess(`Successfully uploaded custom official ${type === "logo" ? "Logo" : "Mascot"} asset!`);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetAssets = () => {
    onUpdateAssets({ logoUrl: null, mascotUrl: null });
    displaySuccess("System brand assets reset to factory official vector defaults!");
  };

  return (
    <div className="space-y-10 py-10">
      {/* Top Banner Alert */}
      {successMsg && (
        <div className="fixed top-20 right-4 z-50 flex items-center space-x-2 rounded-xl bg-emerald-500 border border-emerald-400 p-4 text-white shadow-2xl animate-bounce">
          <CheckCircle className="w-5 h-5 flex-shrink-0" />
          <span className="font-sans text-sm font-semibold">{successMsg}</span>
        </div>
      )}

      {/* Admin Title Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-white/5 pb-8 space-y-4 md:space-y-0">
        <div>
          <h2 className="font-display text-2xl lg:text-3xl font-extrabold tracking-tight text-white flex items-center space-x-3">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
            <span>Core Admin Console</span>
          </h2>
          <p className="text-sm text-[#94A3B8]">
            Manage asset pipelines, authorize community tiers, and control registry rosters globally.
          </p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={handleResetAssets}
            className="inline-flex items-center space-x-1.5 rounded-lg border border-red-500/20 bg-red-500/5 hover:bg-red-500/15 px-3.5 py-2 text-xs font-semibold text-red-400 transition"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Factory Reset Brands</span>
          </button>
          
          <button
            onClick={() => {
              onAddRegistryMock();
              displaySuccess("Spawned additional highly-contributing team profile!");
            }}
            className="inline-flex items-center space-x-1.5 rounded-lg border border-blue-500/20 bg-blue-500/10 hover:bg-blue-500/25 px-3.5 py-2 text-xs font-semibold text-white transition"
          >
            <Users className="w-3.5 h-3.5 text-blue-400" />
            <span>Generate Mock Member</span>
          </button>
        </div>
      </div>

      {/* Grid: Assets Upload Board vs Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Assets control panel (5 cols) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="rounded-2xl border border-white/5 bg-[#101828]/60 p-6 backdrop-blur-sm shadow-xl space-y-6">
            <h3 className="font-display font-bold text-lg text-white flex items-center space-x-2">
              <Database className="w-5 h-5 text-purple-400" />
              <span>Asset Management Pipeline</span>
            </h3>

            {/* Official Logo File Target */}
            <div className="space-y-3">
              <span className="block font-mono text-[10px] text-[#94A3B8] uppercase tracking-wider">
                Authorized Platform Logo
              </span>
              <div className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-[#080B12]">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded border border-blue-500/20 bg-blue-500/5 flex items-center justify-center">
                    <DlicomLogo size={24} />
                  </div>
                  <div>
                    <span className="text-white text-xs font-semibold block">Official Logo</span>
                    <span className="text-[10px] text-emerald-400 font-mono">
                      Locked Vector Asset S-Core
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-[#64748B] uppercase tracking-widest bg-white/5 px-2.5 py-1 rounded-md border border-white/5">
                  Static Core
                </span>
              </div>
            </div>

            {/* Official Mascot File Target */}
            <div className="space-y-3">
              <span className="block font-mono text-[10px] text-[#94A3B8] uppercase tracking-wider">
                Authorized Platform Mascot
              </span>
              <div className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-[#080B12]">
                <div className="flex items-center space-x-3">
                  {assets.mascotUrl ? (
                    <img src={assets.mascotUrl} alt="Custom Mascot Upload" className="h-10 w-10 object-contain rounded border border-white/5 bg-slate-900" />
                  ) : (
                    <div className="h-10 w-10 rounded border border-purple-500/20 bg-purple-500/5 flex items-center justify-center font-bold text-purple-400 text-xs">
                      Sentinel
                    </div>
                  )}
                  <div>
                    <span className="text-white text-xs font-semibold block">Mascot Source</span>
                    <span className="text-[10px] text-[#64748B] font-mono">
                      {assets.mascotUrl ? "User Overruled Asset" : "Holographic Sentinel default"}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => mascotInputRef.current?.click()}
                  className="inline-flex items-center space-x-1.5 rounded-lg bg-[#161F2D] hover:bg-[#202D40] px-3 py-1.5 text-xs text-[#B8BCC7] hover:text-white transition"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload File</span>
                </button>
                <input ref={mascotInputRef} type="file" accept="image/*" onChange={(e) => handleAssetUpload(e, "mascot")} className="hidden" />
              </div>
            </div>
          </div>
        </div>

        {/* Console System stats (7 cols) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="rounded-2xl border border-white/5 bg-[#101828]/60 p-6 backdrop-blur-sm shadow-xl">
            <h3 className="font-display font-bold text-lg text-white mb-6 flex items-center space-x-2">
              <ShieldAlert className="w-5 h-5 text-red-400" />
              <span>Platform Safety Telemetry</span>
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#080B12] rounded-xl border border-white/5 p-4">
                <span className="block font-mono text-[9px] text-[#64748B] uppercase tracking-wider">Registered Identity Keys</span>
                <span className="text-3xl font-display font-bold text-white block mt-1">{passports.length}</span>
                <span className="text-[10px] font-mono text-emerald-500 block mt-1">● 100% Secure Cryptography</span>
              </div>

              <div className="bg-[#080B12] rounded-xl border border-white/5 p-4">
                <span className="block font-mono text-[9px] text-[#64748B] uppercase tracking-wider">Average Member Rep</span>
                <span className="text-3xl font-display font-bold text-white block mt-1">
                  {passports.length > 0 ? Math.round(passports.reduce((sum, u) => sum + u.reputation, 0) / passports.length) : 0}
                </span>
                <span className="text-[10px] font-mono text-cyan-500 block mt-1">● Reputation Weighted average</span>
              </div>
            </div>

            <p className="mt-5 text-xs text-[#64748B] leading-relaxed">
              *All profile modifications are handled local-first in memory with safe-sync state layers. High fidelity integration supports fully authenticated Firestore reads.
            </p>
          </div>
        </div>
      </div>

      {/* User Profiles Management Roster Table */}
      <div className="rounded-2xl border border-white/5 bg-[#101828]/60 overflow-hidden shadow-xl">
        <div className="p-6 border-b border-white/5">
          <h3 className="font-display font-bold text-lg text-white flex items-center space-x-2">
            <Users className="w-5 h-5 text-cyan-400" />
            <span>Manage Passport Registry ({passports.length})</span>
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-[#94A3B8]">
            <thead className="bg-[#080B12]/80 border-b border-white/5 font-mono text-[10px] text-[#64748B] uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Identity Member</th>
                <th className="px-4 py-4">Role Designation</th>
                <th className="px-4 py-4">Seniority Info</th>
                <th className="px-4 py-4">Reputation Value</th>
                <th className="px-6 py-4 text-right">Administrative Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {passports.map((u) => {
                const config = ROLE_CONFIGS[u.role] || ROLE_CONFIGS["Verified"];
                return (
                  <tr key={u.id} className="hover:bg-white/5 transition duration-200">
                    <td className="px-6 py-4 flex items-center space-x-3">
                      <img src={u.profilePicture} alt={u.discordUsername} className="w-9 h-9 rounded-full object-cover border border-white/10" />
                      <div>
                        <span className="font-semibold text-white block leading-tight">{u.discordUsername}</span>
                        <span className="text-xs text-[#64748B] block font-mono">{u.id}</span>
                      </div>
                    </td>

                    <td className="px-4 py-4">
                      {/* Interactive Role Picker */}
                      <select
                        value={u.role}
                        onChange={(e) => onUpdateUserRole(u.id, e.target.value as DlicomRole)}
                        className="rounded-lg border border-white/10 bg-[#080B12] px-2.5 py-1.5 text-xs text-white"
                        style={{ color: config.color }}
                      >
                        {Object.values(DlicomRole).map((r) => (
                          <option key={r} value={r} className="bg-[#101828]">
                            {r}
                          </option>
                        ))}
                      </select>
                    </td>

                    <td className="px-4 py-4 text-xs">
                      <span className="block font-semibold text-white">{u.joinedDate}</span>
                      <span className="text-[#64748B] block text-[10px]">{u.status}</span>
                    </td>

                    <td className="px-4 py-4">
                      <div className="flex items-center space-x-2">
                        <Award className="w-4 h-4 text-amber-500" />
                        <input
                          type="number"
                          value={u.reputation}
                          onChange={(e) => onUpdateUserRep(u.id, parseInt(e.target.value) || 0)}
                          className="w-16 rounded border border-white/10 bg-[#080B12] px-1.5 py-0.5 text-xs text-white font-mono text-center font-semibold"
                        />
                      </div>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => {
                          onDeletePassport(u.id);
                          displaySuccess(`Rostered off ${u.discordUsername} safely.`);
                        }}
                        className="text-[#64748B] hover:text-red-400 p-2 rounded-lg hover:bg-red-500/5 transition-colors"
                        title="Delete from roster"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
