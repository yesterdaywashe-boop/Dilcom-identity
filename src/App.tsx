/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { DlicomRole, UserPassport, SystemAssets } from "./types";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Features } from "./components/Features";
import { PassportCardComponent } from "./components/PassportCardComponent";
import { PassportBuilder } from "./components/PassportBuilder";
import { LiveShowcase } from "./components/LiveShowcase";
import { AdminPanel } from "./components/AdminPanel";
import { Sparkles, ArrowRight, Eye, ShieldCheck, Mail, HelpCircle, Users } from "lucide-react";

// Preset Ecosystem VIP Passports
const INITIAL_PASSPORTS: UserPassport[] = [
  {
    id: "DL-1001-Z",
    discordUsername: "zen.artisan",
    xUsername: "zen_artisan",
    role: DlicomRole.TEAM,
    joinedDate: "May 2025",
    status: "Lead Frontend Architect",
    bio: "Engineering sleek high-performance user interfaces for the next generation of Dlicom decentralization layers.",
    profilePicture: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80",
    reputation: 1540
  },
  {
    id: "DL-2401-G",
    discordUsername: "novacrypto",
    xUsername: "nova_writes",
    role: DlicomRole.MODERATOR,
    joinedDate: "Feb 2026",
    status: "Global Moderator & Guide",
    bio: "Keeping Dlicom spaces coordinates hospitable, secure, and helpful. Always active across regions.",
    profilePicture: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
    reputation: 1120
  },
  {
    id: "DL-7402-A",
    discordUsername: "ammar.eth",
    xUsername: "ammarxyz",
    role: DlicomRole.AMBASSADOR,
    joinedDate: "May 2026",
    status: "Verified Ambassador",
    bio: "Bridging tech stack architectures and global developers. Spreading the gospel of Dlicom everywhere.",
    profilePicture: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    reputation: 924
  },
  {
    id: "DL-5523-S",
    discordUsername: "sol_king",
    xUsername: "sol_alpha",
    role: DlicomRole.OG,
    joinedDate: "Nov 2025",
    status: "Senior Contributor",
    bio: "Joined during general testnet bootstrap in 2025. Running node instances and testing beta clients.",
    profilePicture: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
    reputation: 850
  },
  {
    id: "DL-9045-X",
    discordUsername: "d_coder",
    xUsername: "dc_source",
    role: DlicomRole.DCODED,
    joinedDate: "Apr 2026",
    status: "Core Solvers Division",
    bio: "Focusing on smart contract telemetry and system security auditing. Code is law.",
    profilePicture: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
    reputation: 990
  }
];

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>("home");

  // Global Sync Brand Assets
  const [assets, setAssets] = useState<SystemAssets>(() => {
    const cached = localStorage.getItem("dlicom_system_assets");
    return cached ? JSON.parse(cached) : { logoUrl: null, mascotUrl: null };
  });

  // Master passports registry database
  const [passports, setPassports] = useState<UserPassport[]>(() => {
    const cached = localStorage.getItem("dlicom_passports_v1");
    return cached ? JSON.parse(cached) : INITIAL_PASSPORTS;
  });

  // Logged-in editable active user passport template
  const [activePassport, setActivePassport] = useState<UserPassport>(() => {
    const cached = localStorage.getItem("dlicom_active_passport_v1");
    if (cached) {
      return JSON.parse(cached);
    }
    return {
      id: "DL-4920-X8",
      discordUsername: "ammar.eth",
      xUsername: "ammarxyz",
      role: DlicomRole.AMBASSADOR,
      joinedDate: "May 2026",
      status: "Verified Member",
      bio: "Showcase your role, status, and identity across the Dlicom ecosystem.",
      profilePicture: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
      reputation: 750
    };
  });

  // Sync state changes with localStorage
  useEffect(() => {
    localStorage.setItem("dlicom_system_assets", JSON.stringify(assets));
  }, [assets]);

  useEffect(() => {
    localStorage.setItem("dlicom_passports_v1", JSON.stringify(passports));
  }, [passports]);

  useEffect(() => {
    localStorage.setItem("dlicom_active_passport_v1", JSON.stringify(activePassport));
  }, [activePassport]);

  // Administration Controls actions
  const handleDeletePassport = (id: string) => {
    setPassports((prev) => prev.filter((p) => p.id !== id));
  };

  const handleUpdateUserRole = (id: string, newRole: DlicomRole) => {
    setPassports((prev) =>
      prev.map((p) => (p.id === id ? { ...p, role: newRole } : p))
    );
  };

  const handleUpdateUserRep = (id: string, newRep: number) => {
    setPassports((prev) =>
      prev.map((p) => (p.id === id ? { ...p, reputation: newRep } : p))
    );
  };

  const handleAddRegistryMock = () => {
    const mockId = "DL-" + Math.floor(1000 + Math.random() * 9000) + "-M";
    const usernames = ["alpha_scribe", "hologram_core", "genesis_dev", "spectral_flux", "d_seeker"];
    const randomName = usernames[Math.floor(Math.random() * usernames.length)] + Math.floor(Math.random() * 99);
    
    const newMock: UserPassport = {
      id: mockId,
      discordUsername: randomName,
      xUsername: `${randomName}_xyz`,
      role: DlicomRole.DLIEVER,
      joinedDate: "June 2026",
      status: "Community Supporter",
      bio: "Fascinated by high performance distributed nodes and automated identity modules.",
      profilePicture: `https://api.dicebear.com/7.x/pixel-art/svg?seed=${randomName}`,
      reputation: Math.floor(200 + Math.random() * 800)
    };

    setPassports((prev) => [...prev, newMock]);
  };

  // Sync active edit profile back into registry database roster if they click a button
  const handleRegisterToRegistry = () => {
    // Check if user is already in list
    const index = passports.findIndex((p) => p.id === activePassport.id);
    if (index !== -1) {
      setPassports((prev) =>
        prev.map((p) => (p.id === activePassport.id ? activePassport : p))
      );
    } else {
      setPassports((prev) => [...prev, activePassport]);
    }
    alert("Passport registered globally! Check the community Registry to see your live credentials card!");
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-between bg-[#080B12] text-white selection:bg-[#4A7DFF]/30 select-none overflow-hidden">
      
      {/* Immersive radial spots behind standard layout */}
      <div className="absolute top-0 inset-0 -z-10 ambient-glow-1 pointer-events-none" />
      <div className="absolute top-0 inset-0 -z-10 ambient-glow-2 pointer-events-none" />
      <div className="absolute top-0 inset-0 -z-10 ambient-glow-3 pointer-events-none" />
      <div className="absolute top-0 inset-0 -z-10 grid-overlay opacity-[0.25] pointer-events-none" />

      {/* Corporate Header */}
      <Navbar
        currentPage={currentPage}
        onChangePage={setCurrentPage}
        customLogoUrl={assets.logoUrl}
      />

      {/* Main Container Views Router */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <AnimatePresence mode="wait">
          
          {/* Landing / Welcome Hub View (Tab 'home') */}
          {currentPage === "home" && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="space-y-20 pb-20"
            >
              
              {/* SECTION 1: Massive Start Hero section */}
              <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-10 sm:pt-16 pb-6">
                
                {/* Hero left text block (7 cols) */}
                <div className="lg:col-span-7 space-y-8 flex flex-col text-left">
                  
                  {/* Glowing small micro label */}
                  <div className="inline-flex max-w-fit items-center space-x-2.5 rounded-full border border-white/5 bg-[#101828]/80 px-4 py-2 shadow-xl backdrop-blur-sm">
                    <span className="w-2 h-2 rounded-full bg-[#4ADE80] animate-pulse" />
                    <span className="font-mono text-[10px] tracking-widest text-[#94A3B8] uppercase">
                      Official Dlicom Identity Layer
                    </span>
                  </div>

                  <div className="space-y-4">
                    <h1 className="font-display font-extrabold text-white text-4xl sm:text-5xl lg:text-7xl leading-none tracking-tight">
                      Build Your <br />
                      <span className="bg-gradient-to-r from-[#4A7DFF] via-cyan-400 to-purple-500 bg-clip-text text-transparent">
                        Dlicom Passport
                      </span>
                    </h1>
                    <p className="text-sm sm:text-lg text-[#94A3B8] font-normal leading-relaxed max-w-xl">
                      Showcase your role, status, and identity across the Dlicom ecosystem. Fully interactive, downloadable, and synchronized.
                    </p>
                  </div>

                  {/* Call to actions interactive controllers */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={() => setCurrentPage("builder")}
                      className="inline-flex items-center justify-center space-x-2 rounded-xl bg-white hover:bg-slate-100 text-[#080B12] px-7 py-4 font-semibold text-sm transition shadow-lg hover:shadow-[0_8px_25px_rgba(255,255,255,0.15)] active:scale-98"
                    >
                      <span>Create Passport</span>
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </button>

                    <button
                      onClick={() => setCurrentPage("directory")}
                      className="inline-flex items-center justify-center space-x-2 rounded-xl border border-white/10 bg-[#101828]/50 hover:bg-[#161F2D] px-6 py-4 font-medium text-sm text-white transition hover:border-[#4A7DFF]/40 active:scale-98"
                    >
                      <Eye className="w-4 h-4" />
                      <span>View Demo Roster</span>
                    </button>
                  </div>
                </div>

                {/* Hero right presentation block: Centered Welcome Brand Text Card (5 cols) */}
                <div className="lg:col-span-5 flex items-center justify-center relative">
                  {/* Glowing circular backdrop focus spotlight */}
                  <div className="absolute inset-0 bg-[#4A7DFF]/10 blur-[100px] rounded-full pointer-events-none" />
                  
                  <div className="relative w-full aspect-square rounded-[28px] border border-white/10 bg-[#060913]/90 backdrop-blur-md overflow-hidden flex flex-col items-center justify-center p-8 text-center shadow-[0_24px_60px_rgba(0,0,0,0.85)] hover:border-[#4A7DFF]/40 transition-all duration-300">
                    {/* Subtle grid pattern overlay */}
                    <div className="absolute inset-0 grid-overlay opacity-15 pointer-events-none" />

                    {/* Premium Geometric Blueprint Accents */}
                    <div className="absolute top-4 left-4 w-3.5 h-3.5 border-t border-l border-white/20 rounded-tl-md pointer-events-none" />
                    <div className="absolute top-4 right-4 w-3.5 h-3.5 border-t border-r border-white/20 rounded-tr-md pointer-events-none" />
                    <div className="absolute bottom-4 left-4 w-3.5 h-3.5 border-b border-l border-white/20 rounded-bl-md pointer-events-none" />
                    <div className="absolute bottom-4 right-4 w-3.5 h-3.5 border-b border-r border-white/20 rounded-br-md pointer-events-none" />

                    <div className="relative space-y-4 max-w-sm z-10 selection:bg-[#4A7DFF]/30">
                      {/* Premium Accent Badge */}
                      <div className="mx-auto inline-flex items-center space-x-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 px-3.5 py-1 text-[10px] sm:text-xs font-mono font-semibold text-[#4A7DFF] uppercase tracking-wider">
                        <span>Corporate Hub</span>
                      </div>

                      <h2 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-transparent bg-gradient-to-r from-slate-100 via-white to-slate-200 bg-clip-text leading-tight tracking-tight">
                        Welcome to <span className="text-[#4A7DFF]">Dlicom SocialFi</span>
                      </h2>

                      {/* Design line accent */}
                      <div className="mx-auto w-16 h-[2px] bg-gradient-to-r from-transparent via-[#4A7DFF]/40 to-transparent my-1" />

                      <p className="font-sans text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
                        Build your identity, showcase contributions, and connect with the community.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 2: Why Dlicom Feature block */}
              <Features />

              {/* SECTION 3: Live interactive preview rendering card */}
              <div className="relative py-16 rounded-3xl border border-white/5 bg-[#101828]/40 backdrop-blur-sm p-6 sm:p-12 overflow-hidden shadow-2xl">
                {/* Visual grid backdrop overlay */}
                <div className="absolute inset-0 grid-overlay opacity-20 pointer-events-none" />
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
                  <div className="lg:col-span-6 space-y-5 text-left">
                    <div className="inline-flex items-center space-x-1 border border-pink-500/20 bg-pink-500/5 text-[#FF63C3] px-3 py-1 rounded-full text-xs font-mono tracking-wider">
                      <span>DEEP WORKSPACE SIMULATION</span>
                    </div>
                    <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
                      Experience Real-Time Dynamic Updates
                    </h3>
                    <p className="text-sm text-[#94A3B8] leading-relaxed">
                      Toggle fields inside our builder and watch changes materialize instantly on your cryptographic American Express style card layout. Keep your bio and identity credentials fully synchronized.
                    </p>
                    <button
                      onClick={() => setCurrentPage("builder")}
                      className="inline-flex items-center space-x-2 text-sm font-semibold text-[#4A7DFF] hover:text-white transition group"
                    >
                      <span>Engage Configurator console</span>
                      <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>

                  <div className="lg:col-span-6">
                    <PassportCardComponent passport={activePassport} customLogoUrl={assets.logoUrl} />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Builder Panel / Configuration Suite (Tab 'builder') */}
          {currentPage === "builder" && (
            <motion.div
              key="builder"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="py-6 space-y-10 text-left"
            >
              
              {/* Header */}
              <div className="border-b border-white/5 pb-6">
                <h2 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-white flex items-center space-x-3.5">
                  <span className="p-2 rounded-xl bg-[#4A7DFF]/15 border border-[#4A7DFF]/30 inline-flex">
                    <Sparkles className="w-5 h-5 text-blue-400" />
                  </span>
                  <span>Ecosystem Passport Configurator</span>
                </h2>
                <p className="text-sm text-[#94A3B8] mt-2">
                  Configure Discord tags, role metadata tiers, and upload your profile graphics. Real-time updates occur instantly.
                </p>
              </div>

              {/* Action layout grid split: builder left vs preview card sticky right */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left Columns: Inputs + attach contributions (7 cols) */}
                <div className="lg:col-span-7">
                  <PassportBuilder passport={activePassport} onUpdate={setActivePassport} />
                </div>

                {/* Right Columns: Sticky live preview & export capability (5 cols) */}
                <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-5">
                  <div className="rounded-2xl border border-white/5 bg-[#101828]/60 p-5 backdrop-blur-sm shadow-xl">
                    <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4">
                      <span className="font-display font-bold text-sm text-white flex items-center space-x-1.5">
                        <Eye className="w-4 h-4 text-cyan-400" />
                        <span>Dynamic Preview</span>
                      </span>
                      <span className="font-mono text-[9px] text-[#64748B]">WYSIWYG REAL-TIME</span>
                    </div>
                    
                    <PassportCardComponent passport={activePassport} customLogoUrl={assets.logoUrl} />

                    <div className="mt-5 w-full h-[1px] bg-white/5" />
                    
                    {/* Synchronize custom card user directly to public Registry Showcase */}
                    <button
                      onClick={handleRegisterToRegistry}
                      className="mt-4 w-full inline-flex items-center justify-center space-x-2 rounded-xl border border-blue-500/30 bg-blue-500/5 hover:bg-blue-500/10 hover:border-blue-500/40 px-5 py-3 text-xs font-semibold text-white transition duration-200"
                    >
                      <ShieldCheck className="w-4 h-4 text-[#4DCEFF]" />
                      <span>Register Passport to Public Registry</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* registry showcase tab view (Tab 'directory') */}
          {currentPage === "directory" && (
            <motion.div
              key="directory"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              <LiveShowcase passports={passports} customLogoUrl={assets.logoUrl} />
            </motion.div>
          )}

          {/* Admin panel suite (Tab 'admin') */}
          {currentPage === "admin" && (
            <motion.div
              key="admin"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              <AdminPanel
                passports={passports}
                assets={assets}
                onUpdateAssets={setAssets}
                onDeletePassport={handleDeletePassport}
                onUpdateUserRole={handleUpdateUserRole}
                onUpdateUserRep={handleUpdateUserRep}
                onAddRegistryMock={handleAddRegistryMock}
              />
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* Corporate Footprint signoff block */}
      <Footer onChangePage={setCurrentPage} customLogoUrl={assets.logoUrl} />
    </div>
  );
}
