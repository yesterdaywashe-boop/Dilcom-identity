/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { DlicomLogo } from "./DlicomLogo";
import { Shield, Sparkles, Sliders, Users, ExternalLink } from "lucide-react";

interface NavbarProps {
  currentPage: string;
  onChangePage: (page: string) => void;
  customLogoUrl?: string | null;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onChangePage,
  customLogoUrl = null,
}) => {
  const navItems = [
    { id: "home", label: "Home", icon: Sparkles },
    { id: "builder", label: "Passport Builder", icon: Sliders },
    { id: "directory", label: "Registry", icon: Users },
    { id: "admin", label: "Core Console", icon: Shield },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-[rgba(255,255,255,0.08)] bg-[#080B12]/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo Brand Title */}
          <div
            onClick={() => onChangePage("home")}
            className="flex flex-shrink-0 cursor-pointer items-center group"
          >
            <span className="font-display font-bold tracking-wider text-white text-lg sm:text-xl relative overflow-hidden">
              DLICOM <span className="text-[#4A7DFF] font-medium text-xs tracking-widest uppercase ml-1.5 align-middle border border-blue-500/30 px-1.5 py-0.5 rounded-md bg-blue-500/5">PASSPORT</span>
            </span>
          </div>

          {/* Nav Items (Desktop) */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onChangePage(item.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "text-white bg-[#161F2D] border border-white/10 shadow-[0_4px_12px_rgba(0,0,0,0.4)]"
                      : "text-[#94A3B8] hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Action Call to Action */}
          <div className="flex items-center space-x-3">
            <a
              href="https://discord.gg/dlicom"
              target="_blank"
              rel="noreferrer"
              className="flex items-center space-x-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-[#4A7DFF] hover:from-blue-500 hover:to-blue-600 px-4 py-2 text-xs sm:text-sm font-medium text-white transition-all duration-300 shadow-[0_4px_12px_rgba(74,125,255,0.25)] hover:shadow-[0_4px_20px_rgba(74,125,255,0.4)] hover:-translate-y-0.5"
            >
              <span>Join Community</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Mobile Navigation Rail (Bottom on small devices, or standard top line) */}
        <div className="md:hidden flex items-center justify-around py-2 border-t border-white/5 -mx-4 px-4 bg-[#0a0f1a]">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onChangePage(item.id)}
                className={`flex flex-col items-center space-y-0.5 px-2.5 py-1.5 rounded-lg text-[10px] sm:text-xs font-medium transition-all duration-200 ${
                  isActive
                    ? "text-white bg-[#101828]/90 border border-white/5"
                    : "text-[#64748B] hover:text-white"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label.split(" ")[0]}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
