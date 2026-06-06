/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";
import { Fingerprint, Award, Download, ChevronRight } from "lucide-react";

export const Features: React.FC = () => {
  const list = [
    {
      icon: Fingerprint,
      title: "Identity",
      description: "Represent your precise role, serial numbering, unique username coordinates, and custom biography standing across the entire digital ecosystem.",
      gradient: "from-blue-500/10 via-cyan-500/5 to-transparent",
      borderColor: "group-hover:border-blue-500/30",
      iconColor: "text-[#4A7DFF]",
      pillText: "Biometric Card Layer"
    },
    {
      icon: Award,
      title: "Recognition",
      description: "Showcase your official tiers, high-tier credentials, OG seniority, and roles custom-verified dynamically by system administrators.",
      gradient: "from-purple-500/10 via-pink-500/5 to-transparent",
      borderColor: "group-hover:border-purple-500/30",
      iconColor: "text-purple-400",
      pillText: "Reputation Layer"
    },
    {
      icon: Download,
      title: "Premium Export",
      description: "Download your physical identity passport as a high-definition PNG of premium credit card grade. Ready to share across social networks or embed.",
      gradient: "from-emerald-500/10 via-green-500/5 to-transparent",
      borderColor: "group-hover:border-emerald-500/30",
      iconColor: "text-emerald-400",
      pillText: "HD PNG Media"
    }
  ];

  return (
    <section className="relative py-24 bg-[#080B12]/80 overflow-hidden">
      {/* Background spot light details */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] rounded-full bg-blue-900/5 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 rounded-full border border-[#FF63C3]/20 bg-[#FF63C3]/5 px-3 py-1 text-xs text-[#FF63C3] font-medium tracking-wide mb-4"
          >
            <span>THE WHY</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span>VALUE CORE</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4"
          >
            Why Build a Dlicom Passport?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm sm:text-base text-[#94A3B8] leading-relaxed"
          >
            A high-fidelity container showcasing your ecosystem seniority, unique credential details, and official roles perfectly authorized at the standard administrative level.
          </motion.p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {list.map((feat, index) => {
            const IconComponent = feat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                whileHover={{ y: -6 }}
                className="group relative flex flex-col justify-between rounded-2xl border border-white/5 bg-[#101828]/40 p-8 hover:bg-[#161F2D]/60 transition-all duration-300 backdrop-blur-sm overflow-hidden"
              >
                {/* Spotlight gradient effect inside card */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                <div>
                  {/* Decorative badge and Icon */}
                  <div className="flex items-center justify-between mb-8">
                    <div className={`inline-flex items-center justify-center p-3 rounded-xl bg-slate-900/80 border border-white/5 shadow-inner ${feat.iconColor}`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="font-mono text-[10px] text-[#64748B] uppercase tracking-wider bg-white/5 px-2.5 py-1 rounded-md border border-white/5">
                      {feat.pillText}
                    </span>
                  </div>

                  {/* Main Header and Description */}
                  <h3 className="font-display font-bold tracking-tight text-white text-xl sm:text-2xl mb-3">
                    {feat.title}
                  </h3>
                  <p className="text-sm text-[#94A3B8] leading-relaxed">
                    {feat.description}
                  </p>
                </div>

                {/* Card Edge Light indicator */}
                <div className={`mt-8 w-full h-[1px] bg-gradient-to-r from-transparent via-[#4A7DFF]/20 to-transparent group-hover:via-[#4a7dff]/60 transition-all duration-500`} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
