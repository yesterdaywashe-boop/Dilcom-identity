/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { DlicomLogo } from "./DlicomLogo";
import { MessageSquare, ExternalLink, Globe, Heart, ShieldAlert } from "lucide-react";

interface FooterProps {
  onChangePage: (page: string) => void;
  customLogoUrl?: string | null;
}

export const Footer: React.FC<FooterProps> = ({
  onChangePage,
  customLogoUrl = null,
}) => {
  return (
    <footer className="relative border-t border-[rgba(255,255,255,0.08)] bg-[#080B12]/95 pt-16 pb-8 overflow-hidden">
      {/* Grid background on Footer for extra premium vibe */}
      <div className="absolute inset-0 grid-overlay opacity-30 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12">
          {/* Brand block */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onChangePage("home")}>
              <DlicomLogo size={32} />
              <span className="font-display font-bold tracking-wider text-white text-lg">
                DLICOM PASSPORT
              </span>
            </div>
            <p className="max-w-md text-sm text-[#94A3B8] leading-relaxed">
              Your Dlicom Passport represents your role, status, and journey within our expanding digital ecosystem. Fully compatible with verification standards, social layers, and dynamic credentials.
            </p>
          </div>

          {/* Quick Nav Lists */}
          <div className="space-y-4">
            <h4 className="font-display font-semibold tracking-wider text-[#FFFFFF] text-xs uppercase">
              Platform
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => onChangePage("home")}
                  className="text-[#94A3B8] hover:text-[#FFFFFF] transition-colors duration-200"
                >
                  Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => onChangePage("builder")}
                  className="text-[#94A3B8] hover:text-[#FFFFFF] transition-colors duration-200"
                >
                  Passport Builder
                </button>
              </li>
              <li>
                <button
                  onClick={() => onChangePage("directory")}
                  className="text-[#94A3B8] hover:text-[#FFFFFF] transition-colors duration-200"
                >
                  Registry Showcase
                </button>
              </li>
              <li>
                <button
                  onClick={() => onChangePage("admin")}
                  className="text-[#94A3B8] hover:text-[#FFFFFF] transition-colors duration-200"
                >
                  Console Panel
                </button>
              </li>
            </ul>
          </div>

          {/* Discord CTA Block */}
          <div className="space-y-4 rounded-xl border border-white/5 bg-[#101828]/50 p-5 backdrop-blur-sm">
            <h4 className="font-display font-semibold text-xs tracking-wider text-pink-500 uppercase flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-ping" />
              <span>Official Community</span>
            </h4>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              Join the official Dlicom server to converse with ambassadors, find partners, and coordinate with other members.
            </p>
            <a
              href="https://discord.gg/dlicom"
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex w-full items-center justify-center space-x-2 rounded-lg bg-[#5865F2] hover:bg-[#4752C4] px-4 py-2.5 text-xs font-semibold text-white transition-all duration-300 shadow-md"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Join Dlicom Community</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-60" />
            </a>
          </div>
        </div>

        {/* Separator */}
        <div className="w-full h-[1px] bg-white/5 my-6 fineline" />

        {/* Legal Signoff */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-[#64748B] space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-1">
            <span>© {new Date().getFullYear()} Dlicom Ecosystem. All rights reserved.</span>
          </div>
          <div className="flex items-center space-x-4">
            <a
              href="https://discord.gg/dlicom"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors duration-200 flex items-center space-x-1"
            >
              <span>Discord Support</span>
            </a>
            <span className="text-[#202D3D]">|</span>
            <div className="flex items-center space-x-1 text-cyan-500">
              <Globe className="w-3.5 h-3.5" />
              <span>Ecosystem Active</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
