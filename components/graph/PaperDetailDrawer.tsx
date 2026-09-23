'use client';

import React from 'react';
import { AcademicPaper } from '@/types/academic';
import { X, ExternalLink, BookOpen, Quote, Cpu, Tag, CheckCircle2 } from 'lucide-react';

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
    <div className="absolute top-0 right-0 w-[420px] h-full bg-obsidian-900/95 border-l border-slate-800/90 backdrop-blur-xl shadow-2xl z-30 flex flex-col transition-all duration-300 animate-in slide-in-from-right">
      {/* Header */}
      <div className="p-4 border-b border-slate-800/80 flex items-start justify-between">
        <div className="flex items-center space-x-2">
          <span
            className="w-3 h-3 rounded-full shrink-0"
            style={{ backgroundColor: paper.clusterColor }}
          />
          <span className="text-xs font-mono font-medium text-slate-400 uppercase tracking-wider">
            {paper.cluster}
          </span>
        </div>
        <button
          onClick={onClose}
          className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Content Scrollable */}
      <div className="flex-1 overflow-y-auto p-5 space-y-5 text-sm">
        {/* Title */}
        <div>
          <h2 className="text-base font-semibold text-white leading-snug">
            {paper.title}
          </h2>
          <p className="text-xs text-slate-400 mt-1.5 font-mono">
            {paper.authors.join(', ')} · <span className="text-ibm-cyan font-bold">{paper.year}</span>
          </p>
          <p className="text-xs text-slate-500 mt-0.5">{paper.venue}</p>
        </div>

        {/* Action Button: Ask Granite RAG */}
        <button
          onClick={() => onAskAgentAboutPaper(paper)}
          className="w-full flex items-center justify-center space-x-2 py-2.5 px-4 bg-ibm-blue hover:bg-blue-600 active:scale-[0.99] text-white font-medium text-xs rounded-xl shadow-lg shadow-ibm-blue/20 transition-all"
        >
          <Cpu className="w-3.5 h-3.5" />
          <span>Synthesize with IBM Granite Agent</span>
        </button>

        {/* Stats Row */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-obsidian-850 border border-slate-800/80 rounded-xl p-3">
            <span className="text-[11px] text-slate-400 font-mono block">Citations</span>
            <span className="text-lg font-bold font-mono text-white mt-0.5 block">
              {paper.citationsCount.toLocaleString()}
            </span>
          </div>
          <div className="bg-obsidian-850 border border-slate-800/80 rounded-xl p-3">
            <span className="text-[11px] text-slate-400 font-mono block">References</span>
            <span className="text-lg font-bold font-mono text-emerald-400 mt-0.5 block">
              {paper.citations.length} In-Graph
            </span>
          </div>
        </div>

        {/* Abstract */}
        <div className="space-y-1.5">
          <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 flex items-center space-x-1.5">
            <BookOpen className="w-3.5 h-3.5 text-ibm-blue" />
            <span>Abstract</span>
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed bg-obsidian-850/50 p-3 rounded-xl border border-slate-800/50">
            {paper.abstract}
          </p>
        </div>

        {/* Key Findings */}
        <div className="space-y-2">
          <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 flex items-center space-x-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Key Research Findings</span>
          </h3>
          <ul className="space-y-1.5">
            {paper.keyFindings.map((finding, idx) => (
              <li
                key={idx}
                className="text-xs text-slate-300 flex items-start space-x-2 bg-obsidian-850/30 p-2 rounded-lg border border-slate-800/40"
              >
                <span className="text-emerald-400 font-mono font-bold">›</span>
                <span className="leading-snug">{finding}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Methodology */}
        <div className="space-y-1.5">
          <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 flex items-center space-x-1.5">
            <Quote className="w-3.5 h-3.5 text-purple-400" />
            <span>Methodology & Setup</span>
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed bg-obsidian-850/30 p-2.5 rounded-lg border border-slate-800/40 font-mono">
            {paper.methodology}
          </p>
        </div>

        {/* Tags */}
        <div className="space-y-2 pt-2 border-t border-slate-800/60">
          <div className="flex flex-wrap gap-1.5">
            {paper.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-slate-800/80 text-slate-300 border border-slate-700/50"
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
