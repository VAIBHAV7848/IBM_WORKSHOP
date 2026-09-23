'use client';

import React from 'react';
import { DomainKey } from '@/types/academic';
import { DOMAIN_OPTIONS } from '@/data/domains';
import { Bot, Atom, Dna } from 'lucide-react';

interface DomainSwitcherProps {
  activeDomain: DomainKey;
  onSelectDomain: (domain: DomainKey) => void;
}

export const DomainSwitcher: React.FC<DomainSwitcherProps> = ({
  activeDomain,
  onSelectDomain,
}) => {
  const getDomainIcon = (key: DomainKey) => {
    switch (key) {
      case 'agentic-ai':
        return Bot;
      case 'quantum-computing':
        return Atom;
      case 'biomedical-ai':
        return Dna;
    }
  };

  return (
    <div className="space-y-1.5">
      <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold px-1">
        Corpus Domain Presets
      </div>
      <div className="grid grid-cols-1 gap-1.5">
        {DOMAIN_OPTIONS.map((opt) => {
          const isSelected = opt.key === activeDomain;
          const Icon = getDomainIcon(opt.key);

          return (
            <button
              key={opt.key}
              onClick={() => onSelectDomain(opt.key)}
              className={`w-full flex items-center justify-between p-2 rounded-xl text-left transition-all ${
                isSelected
                  ? 'bg-ibm-blue text-white shadow-md shadow-ibm-blue/20'
                  : 'bg-obsidian-900/80 text-slate-300 hover:bg-slate-800/60 border border-slate-800/80'
              }`}
            >
              <div className="flex items-center space-x-2.5 min-w-0">
                <div
                  className={`p-1.5 rounded-lg ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <div className="truncate">
                  <div className="text-xs font-semibold leading-tight truncate">
                    {opt.label}
                  </div>
                </div>
              </div>
              <span
                className={`text-[9px] font-mono px-1.5 py-0.5 rounded-full uppercase shrink-0 ${
                  isSelected
                    ? 'bg-white/25 text-white'
                    : 'bg-slate-800 text-slate-400'
                }`}
              >
                {opt.badge}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
