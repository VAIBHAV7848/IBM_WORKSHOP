'use client';

import React from 'react';
import { AcademicPaper } from '@/types/academic';
import { X, BookOpen, Quote, Cpu, CheckCircle2 } from 'lucide-react';

interface PaperDetailDrawerProps {
  paper: AcademicPaper | null;
  onClose: () => void;
  onAskAgentAboutPaper: (paper: AcademicPaper) => void;
}

export const PaperDetailDrawer: React.FC<PaperDetailDrawerProps> = ({
  paper,
  onClose,
  onAskAgentAboutPaper,
}) => {
  if (!paper) return null;

  return (
    <div className="absolute top-0 right-0 w-[420px] h-full bg-white/98 border-l border-claude-border shadow-claudeLg z-30 flex flex-col transition-all duration-300 animate-in slide-in-from-right">
      {/* Header */}
      <div className="p-4 border-b border-claude-border flex items-start justify-between bg-claude-bg/60">
        <div className="flex items-center space-x-2">
          <span
            className="w-3 h-3 rounded-full shrink-0 shadow-sm"
            style={{ backgroundColor: paper.clusterColor }}
          />
          <span className="text-xs font-mono font-bold text-claude-muted uppercase tracking-wider">
            {paper.cluster}
          </span>
        </div>
        <button
          onClick={onClose}
          className="p-1 text-claude-muted hover:text-claude-text hover:bg-claude-subtle rounded-lg transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Content Scrollable */}
      <div className="flex-1 overflow-y-auto p-5 space-y-5 text-sm">
        {/* Title */}
        <div>
          <h2 className="text-base font-bold text-claude-text leading-snug">
            {paper.title}
          </h2>
          <p className="text-xs text-claude-muted mt-1.5 font-mono">
            {paper.authors.join(', ')} · <span className="text-claude-terracotta font-bold">{paper.year}</span>
          </p>
          <p className="text-xs text-claude-muted mt-0.5">{paper.venue}</p>
        </div>

        {/* Action Button */}
        <button
          onClick={() => onAskAgentAboutPaper(paper)}
          className="w-full flex items-center justify-center space-x-2 py-2.5 px-4 bg-claude-terracotta hover:bg-claude-terracottaHover active:scale-[0.99] text-white font-semibold text-xs rounded-xl shadow-claudeOrange transition-all"
        >
          <Cpu className="w-3.5 h-3.5" />
          <span>Synthesize with Research Agent</span>
        </button>

        {/* Stats Row */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-claude-subtle/80 border border-claude-border rounded-xl p-3">
            <span className="text-[11px] text-claude-muted font-mono block">Citations</span>
            <span className="text-lg font-bold font-mono text-claude-text mt-0.5 block">
              {paper.citationsCount.toLocaleString()}
            </span>
          </div>
          <div className="bg-claude-subtle/80 border border-claude-border rounded-xl p-3">
            <span className="text-[11px] text-claude-muted font-mono block">References</span>
            <span className="text-lg font-bold font-mono text-claude-terracotta mt-0.5 block">
              {paper.citations.length} In-Graph
            </span>
          </div>
        </div>

        {/* Abstract */}
        <div className="space-y-1.5">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-claude-muted flex items-center space-x-1.5">
            <BookOpen className="w-3.5 h-3.5 text-claude-terracotta" />
            <span>Abstract</span>
          </h3>
          <p className="text-xs text-claude-textSecondary leading-relaxed bg-claude-subtle/50 p-3.5 rounded-xl border border-claude-border">
            {paper.abstract}
          </p>
        </div>

        {/* Key Findings */}
        <div className="space-y-2">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-claude-muted flex items-center space-x-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Key Research Findings</span>
          </h3>
          <ul className="space-y-1.5">
            {paper.keyFindings.map((finding, idx) => (
              <li
                key={idx}
                className="text-xs text-claude-text flex items-start space-x-2 bg-claude-subtle/40 p-2.5 rounded-lg border border-claude-border"
              >
                <span className="text-claude-terracotta font-mono font-bold">›</span>
                <span className="leading-snug">{finding}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Methodology */}
        <div className="space-y-1.5">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-claude-muted flex items-center space-x-1.5">
            <Quote className="w-3.5 h-3.5 text-amber-600" />
            <span>Methodology & Setup</span>
          </h3>
          <p className="text-xs text-claude-textSecondary leading-relaxed bg-claude-subtle/40 p-3 rounded-lg border border-claude-border font-mono">
            {paper.methodology}
          </p>
        </div>

        {/* Tags */}
        <div className="space-y-2 pt-2 border-t border-claude-border">
          <div className="flex flex-wrap gap-1.5">
            {paper.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-md text-[10px] font-mono bg-claude-subtle text-claude-textSecondary border border-claude-border"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
