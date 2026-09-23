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
      <div className="text-[10px] font-mono uppercase tracking-wider text-claude-muted font-semibold px-1">
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
              className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-all ${
                isSelected
                  ? 'bg-claude-terracotta text-white shadow-claudeOrange'
                  : 'bg-white text-claude-text hover:bg-claude-subtle border border-claude-border'
              }`}
            >
              <div className="flex items-center space-x-2.5 min-w-0">
                <div
                  className={`p-1.5 rounded-lg ${
                    isSelected
                      ? 'bg-white/20 text-white'
                      : 'bg-claude-subtle text-claude-terracotta'
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
                className={`text-[9px] font-mono px-2 py-0.5 rounded-full uppercase shrink-0 font-medium ${
                  isSelected
                    ? 'bg-white/25 text-white'
                    : 'bg-claude-orangeLight text-claude-terracotta border border-claude-orangeBorder'
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
