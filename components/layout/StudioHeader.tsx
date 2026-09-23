'use client';

import React from 'react';
import { DomainKey } from '@/types/academic';
import { DOMAIN_OPTIONS } from '@/data/domains';
import { Settings, Zap, Cpu } from 'lucide-react';

interface StudioHeaderProps {
  activeDomain: DomainKey;
  onSelectDomain: (domain: DomainKey) => void;
  onOpenSettings: () => void;
  totalPapers: number;
}

export const StudioHeader: React.FC<StudioHeaderProps> = ({
  activeDomain,
  onSelectDomain,
  onOpenSettings,
  totalPapers,
}) => {
  return (
    <header className="h-14 border-b border-slate-800/90 bg-obsidian-900/90 backdrop-blur-md px-4 flex items-center justify-between z-20 shrink-0">
      {/* Brand & Title */}
      <div className="flex items-center space-x-3">
        {/* IBM Hex Logo Badge */}
        <div className="flex items-center space-x-2 bg-obsidian-950 border border-slate-800 px-2.5 py-1 rounded-xl">
          <div className="w-5 h-5 rounded-lg bg-ibm-blue flex items-center justify-center font-bold text-[10px] text-white tracking-tighter">
            IBM
          </div>
          <span className="text-xs font-mono font-bold text-white tracking-wide">
            watsonx<span className="text-ibm-cyan">.ai</span>
          </span>
        </div>

        <div className="h-4 w-[1px] bg-slate-800 hidden sm:block" />

        <div className="flex items-center space-x-2">
          <h1 className="text-xs font-semibold text-white tracking-tight flex items-center space-x-1.5">
            <span>LangFlow Research Agent</span>
          </h1>
          <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono bg-purple-500/10 text-purple-300 border border-purple-500/20">
            Problem Statement No. 7
          </span>
        </div>
      </div>

      {/* Center: Domain Quick Switcher Tabs */}
      <div className="hidden lg:flex items-center space-x-1 bg-obsidian-950/80 p-1 rounded-xl border border-slate-800/80">
        {DOMAIN_OPTIONS.map((opt) => {
          const isSelected = opt.key === activeDomain;
          return (
            <button
              key={opt.key}
              onClick={() => onSelectDomain(opt.key)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                isSelected
                  ? 'bg-ibm-blue text-white shadow-md shadow-ibm-blue/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>

      {/* Right Controls */}
      <div className="flex items-center space-x-2.5">
        <div className="hidden sm:flex items-center space-x-1.5 bg-obsidian-950 border border-emerald-500/30 px-2.5 py-1 rounded-lg text-[11px] font-mono text-emerald-300">
          <Zap className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          <span>Groq LPU Active (500 T/s)</span>
        </div>

        <button
          onClick={onOpenSettings}
          className="flex items-center space-x-1.5 px-3 py-1.5 bg-obsidian-950 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-mono transition-all"
        >
          <Settings className="w-3.5 h-3.5 text-ibm-cyan" />
          <span className="hidden sm:inline">Settings</span>
        </button>
      </div>
    </header>
  );
};
