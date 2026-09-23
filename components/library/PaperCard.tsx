'use client';

import React from 'react';
import { AcademicPaper } from '@/types/academic';
import { BookOpen, Quote, ChevronRight } from 'lucide-react';

interface PaperCardProps {
  paper: AcademicPaper;
  isSelected: boolean;
  onSelect: () => void;
}

export const PaperCard: React.FC<PaperCardProps> = ({
  paper,
  isSelected,
  onSelect,
}) => {
  return (
    <div
      onClick={onSelect}
      className={`p-3 rounded-xl border text-left cursor-pointer transition-all duration-150 group relative ${
        isSelected
          ? 'bg-obsidian-850 border-ibm-blue shadow-md shadow-ibm-blue/15'
          : 'bg-obsidian-900/70 border-slate-800/80 hover:bg-obsidian-900 hover:border-slate-700'
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center space-x-1.5 shrink-0">
          <span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: paper.clusterColor }}
          />
          <span className="text-[10px] font-mono text-slate-400 uppercase truncate max-w-[120px]">
            {paper.cluster}
          </span>
        </div>
        <span className="text-[10px] font-mono font-medium text-ibm-cyan bg-ibm-cyan/10 px-1.5 py-0.2 rounded border border-ibm-cyan/20">
          {paper.year}
        </span>
      </div>

      <h4 className="text-xs font-semibold text-slate-100 group-hover:text-white mt-1.5 leading-snug line-clamp-2">
        {paper.title}
      </h4>

      <p className="text-[11px] text-slate-400 mt-1 truncate">
        {paper.authors.join(', ')}
      </p>

      <div className="mt-2.5 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] font-mono text-slate-400">
        <span className="flex items-center space-x-1">
          <Quote className="w-3 h-3 text-slate-500" />
          <span>{paper.citationsCount.toLocaleString()} citations</span>
        </span>
        <span className="flex items-center text-slate-500 group-hover:text-ibm-cyan transition-colors">
          <span>Inspect</span>
          <ChevronRight className="w-3 h-3 ml-0.5" />
        </span>
      </div>
    </div>
  );
};
