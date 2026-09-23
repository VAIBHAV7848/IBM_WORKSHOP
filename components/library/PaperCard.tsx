'use client';

import React from 'react';
import { AcademicPaper } from '@/types/academic';
import { Quote, ChevronRight } from 'lucide-react';

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
      className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all duration-150 group relative ${
        isSelected
          ? 'bg-claude-orangeLight/60 border-claude-terracotta shadow-sm ring-1 ring-claude-terracotta/50'
          : 'bg-white border-claude-border hover:border-claude-borderDark hover:shadow-claude'
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center space-x-1.5 shrink-0">
          <span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: paper.clusterColor }}
          />
          <span className="text-[10px] font-mono text-claude-muted uppercase truncate max-w-[130px] font-medium">
            {paper.cluster}
          </span>
        </div>
        <span className="text-[10px] font-mono font-bold text-claude-terracotta bg-claude-orangeLight px-1.5 py-0.2 rounded border border-claude-orangeBorder">
          {paper.year}
        </span>
      </div>

      <h4 className="text-xs font-semibold text-claude-text group-hover:text-claude-terracotta mt-1.5 leading-snug line-clamp-2">
        {paper.title}
      </h4>

      <p className="text-[11px] text-claude-muted mt-1 truncate">
        {paper.authors.join(', ')}
      </p>

      <div className="mt-2.5 pt-2 border-t border-claude-border/70 flex items-center justify-between text-[10px] font-mono text-claude-muted">
        <span className="flex items-center space-x-1">
          <Quote className="w-3 h-3 text-claude-muted" />
          <span>{paper.citationsCount.toLocaleString()} citations</span>
        </span>
        <span className="flex items-center text-claude-muted group-hover:text-claude-terracotta font-medium transition-colors">
          <span>Inspect</span>
          <ChevronRight className="w-3 h-3 ml-0.5" />
        </span>
      </div>
    </div>
  );
};
