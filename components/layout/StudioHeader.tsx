'use client';

import React from 'react';
import { DomainKey } from '@/types/academic';
import { DOMAIN_OPTIONS } from '@/data/domains';
import { Settings, Zap, Sparkles } from 'lucide-react';

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
    <header className="h-14 border-b border-claude-border bg-white px-5 flex items-center justify-between z-20 shrink-0 shadow-sm">
      {/* Brand & Title */}
      <div className="flex items-center space-x-3.5">
        {/* Claude Terracotta Icon */}
        <div className="flex items-center space-x-2.5">
          <div className="w-7 h-7 rounded-xl bg-claude-terracotta flex items-center justify-center font-bold text-white shadow-claudeOrange">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-claude-text tracking-tight flex items-center space-x-1.5">
              <span>Research Agent Studio</span>
            </h1>
            <p className="text-[10px] font-mono text-claude-muted leading-none hidden sm:block">
              Problem Statement No. 7 · Claude Edition
            </p>
          </div>
        </div>
      </div>

      {/* Center: Domain Quick Switcher Tabs */}
      <div className="hidden lg:flex items-center space-x-1 bg-claude-subtle p-1 rounded-xl border border-claude-border">
        {DOMAIN_OPTIONS.map((opt) => {
          const isSelected = opt.key === activeDomain;
          return (
            <button
              key={opt.key}
              onClick={() => onSelectDomain(opt.key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                isSelected
                  ? 'bg-claude-terracotta text-white shadow-claudeOrange font-semibold'
                  : 'text-claude-muted hover:text-claude-text hover:bg-white/80'
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>

      {/* Right Controls */}
      <div className="flex items-center space-x-2.5">
        <div className="flex items-center space-x-1.5 bg-claude-orangeLight border border-claude-orangeBorder px-2.5 py-1 rounded-lg text-[11px] font-mono text-claude-orange font-medium">
          <Zap className="w-3.5 h-3.5 animate-pulse text-claude-orange" />
          <span>Groq LPU Active (500 T/s)</span>
        </div>

        <button
          onClick={onOpenSettings}
          className="flex items-center space-x-1.5 px-3 py-1.5 bg-claude-subtle hover:bg-claude-mutedBg border border-claude-border text-claude-textSecondary hover:text-claude-text rounded-xl text-xs font-mono transition-all"
        >
          <Settings className="w-3.5 h-3.5 text-claude-terracotta" />
          <span className="hidden sm:inline">Settings</span>
        </button>
      </div>
    </header>
  );
};
