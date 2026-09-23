'use client';

import React from 'react';
import { LiteratureReview, AcademicPaper } from '@/types/academic';
import { BookOpen, FileCheck, Layers, AlertCircle, Sparkles, Download, Printer } from 'lucide-react';

interface LiteratureReviewViewProps {
  review: LiteratureReview | null;
  isGenerating: boolean;
  onGenerateReview: () => void;
  onOpenExport: () => void;
  onSelectCitation: (paperId: string) => void;
  papers: AcademicPaper[];
}

export const LiteratureReviewView: React.FC<LiteratureReviewViewProps> = ({
  review,
  isGenerating,
  onGenerateReview,
  onOpenExport,
  onSelectCitation,
  papers,
}) => {
  if (!review) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4 bg-claude-bg">
        <div className="p-3 rounded-2xl bg-white border border-claude-border text-claude-terracotta shadow-claude">
          <BookOpen className="w-8 h-8" />
        </div>
        <div className="max-w-md space-y-1">
          <h3 className="text-sm font-semibold text-claude-text">
            Automated Literature Review Synthesis
          </h3>
          <p className="text-xs text-claude-muted leading-relaxed">
            Trigger the 4-agent Langflow pipeline to aggregate all {papers.length} papers in the active corpus, construct taxonomy classifications, build benchmark comparison tables, and forecast future research directions.
          </p>
        </div>

        <button
          onClick={onGenerateReview}
          disabled={isGenerating}
          className="flex items-center space-x-2 px-5 py-2.5 bg-claude-terracotta hover:bg-claude-terracotta-hover active:scale-[0.98] text-white text-xs font-medium rounded-xl shadow-sm shadow-claude-terracotta/20 transition-all disabled:opacity-50"
        >
          <Sparkles className="w-4 h-4" />
          <span>{isGenerating ? 'Synthesizing with Granite Agent...' : 'Generate Comprehensive Literature Review'}</span>
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-5 space-y-6 bg-claude-bg text-xs text-claude-text leading-relaxed">
      {/* Action Header */}
      <div className="flex items-center justify-between pb-3 border-b border-claude-border">
        <div className="space-y-0.5">
          <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 font-semibold">
            Peer-Review Ready Synthesis
          </span>
          <span className="text-[10px] font-mono text-claude-muted block">
            Generated: {review.generatedAt} · Model: {review.model}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={onOpenExport}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-white border border-claude-border hover:border-claude-terracotta/40 text-claude-text rounded-lg transition-all text-xs font-mono shadow-xs"
          >
            <Download className="w-3.5 h-3.5 text-claude-terracotta" />
            <span>Export</span>
          </button>
          <button
            onClick={() => window.print()}
            className="p-1.5 bg-white border border-claude-border hover:border-claude-terracotta/40 text-claude-muted hover:text-claude-text rounded-lg transition-all shadow-xs"
            title="Print Document"
          >
            <Printer className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Review Title */}
      <h2 className="text-base font-bold text-claude-text leading-snug">
        {review.title}
      </h2>

      {/* Executive Summary */}
      <div className="bg-white border border-claude-border rounded-2xl p-4 space-y-2 shadow-claude">
        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-claude-terracotta flex items-center space-x-1.5">
          <FileCheck className="w-3.5 h-3.5" />
          <span>Executive Summary & Research Landscape</span>
        </h3>
        <p className="leading-relaxed text-claude-text">
          {review.executiveSummary}
        </p>
      </div>

      {/* Benchmark Matrix Table */}
      <div className="space-y-2">
        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-claude-muted flex items-center space-x-1.5">
          <Layers className="w-3.5 h-3.5 text-claude-terracotta" />
          <span>Cross-Paper Comparative Benchmark Matrix</span>
        </h3>
        <div className="overflow-x-auto rounded-xl border border-claude-border bg-white shadow-xs">
          <table className="w-full text-left font-mono text-[11px]">
            <thead className="bg-claude-subtle/80 border-b border-claude-border text-claude-muted">
              <tr>
                <th className="p-2.5 font-semibold">System / Architecture</th>
                <th className="p-2.5 font-semibold">Benchmark Suite</th>
                <th className="p-2.5 font-semibold">Accuracy / Score</th>
                <th className="p-2.5 font-semibold">Inference Latency</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-claude-border/80 text-claude-text">
              {review.benchmarkTable.map((row, idx) => (
                <tr key={idx} className="hover:bg-orange-50/30 transition-colors">
                  <td className="p-2.5 font-medium text-claude-text">{row.system}</td>
                  <td className="p-2.5 text-claude-muted">{row.benchmark}</td>
                  <td className="p-2.5 text-emerald-600 font-bold">{row.accuracy}</td>
                  <td className="p-2.5 text-claude-text">{row.latency}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Structured Sections */}
      {review.sections.map((section, idx) => (
        <div key={idx} className="space-y-2">
          <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-claude-text">
            {section.title}
          </h3>
          <p className="leading-relaxed bg-white p-3.5 rounded-xl border border-claude-border shadow-xs">
            {section.content}
          </p>

          {/* Inline Citations */}
          {section.citations.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {section.citations.map((citeId) => (
                <button
                  key={citeId}
                  onClick={() => onSelectCitation(citeId)}
                  className="px-2 py-0.5 rounded-md bg-claude-subtle border border-claude-border text-[10px] font-mono text-claude-text hover:border-claude-terracotta/40 hover:text-claude-terracotta transition-colors shadow-2xs"
                >
                  [{citeId}]
                </button>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* Open Challenges */}
      <div className="space-y-2 pt-2 border-t border-claude-border">
        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-700 flex items-center space-x-1.5">
          <AlertCircle className="w-3.5 h-3.5" />
          <span>Open Challenges & Failure Modes</span>
        </h3>
        <ul className="space-y-1.5">
          {review.openChallenges.map((challenge, i) => (
            <li
              key={i}
              className="p-2.5 bg-amber-50/50 rounded-xl border border-amber-200/80 text-claude-text leading-snug flex items-start space-x-2"
            >
              <span className="text-amber-600 font-mono font-bold">›</span>
              <span>{challenge}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Future Directions */}
      <div className="space-y-2 pt-2 border-t border-claude-border">
        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-claude-terracotta flex items-center space-x-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Predicted Frontier Research Directions</span>
        </h3>
        <ul className="space-y-1.5">
          {review.futureDirections.map((dir, i) => (
            <li
              key={i}
              className="p-2.5 bg-orange-50/40 rounded-xl border border-orange-200/70 text-claude-text leading-snug flex items-start space-x-2"
            >
              <span className="text-claude-terracotta font-mono font-bold">★</span>
              <span>{dir}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
