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
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4 bg-obsidian-950">
        <div className="p-3 rounded-2xl bg-obsidian-900 border border-slate-800 text-ibm-blue shadow-xl">
          <BookOpen className="w-8 h-8" />
        </div>
        <div className="max-w-md space-y-1">
          <h3 className="text-sm font-semibold text-white">
            Automated Literature Review Synthesis
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Trigger the 4-agent Langflow pipeline to aggregate all {papers.length} papers in the active corpus, construct taxonomy classifications, build benchmark comparison tables, and forecast future research directions.
          </p>
        </div>

        <button
          onClick={onGenerateReview}
          disabled={isGenerating}
          className="flex items-center space-x-2 px-5 py-2.5 bg-ibm-blue hover:bg-blue-600 active:scale-[0.98] text-white text-xs font-medium rounded-xl shadow-lg shadow-ibm-blue/25 transition-all disabled:opacity-50"
        >
          <Sparkles className="w-4 h-4" />
          <span>{isGenerating ? 'Synthesizing with Granite Agent...' : 'Generate Comprehensive Literature Review'}</span>
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-5 space-y-6 bg-obsidian-950 text-xs text-slate-300 leading-relaxed">
      {/* Action Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="space-y-0.5">
          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 font-semibold">
            Peer-Review Ready Synthesis
          </span>
          <span className="text-[10px] font-mono text-slate-500 block">
            Generated: {review.generatedAt} · Model: {review.model}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={onOpenExport}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-obsidian-900 border border-slate-800 hover:border-slate-700 text-slate-200 rounded-lg transition-all text-xs font-mono"
          >
            <Download className="w-3.5 h-3.5 text-ibm-cyan" />
            <span>Export</span>
          </button>
          <button
            onClick={() => window.print()}
            className="p-1.5 bg-obsidian-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white rounded-lg transition-all"
            title="Print Document"
          >
            <Printer className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Review Title */}
      <h2 className="text-base font-bold text-white leading-snug">
        {review.title}
      </h2>

      {/* Executive Summary */}
      <div className="bg-obsidian-900/90 border border-slate-800/90 rounded-2xl p-4 space-y-2">
        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-ibm-cyan flex items-center space-x-1.5">
          <FileCheck className="w-3.5 h-3.5" />
          <span>Executive Summary & Research Landscape</span>
        </h3>
        <p className="leading-relaxed text-slate-200">
          {review.executiveSummary}
        </p>
      </div>

      {/* Benchmark Matrix Table */}
      <div className="space-y-2">
        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-1.5">
          <Layers className="w-3.5 h-3.5 text-purple-400" />
          <span>Cross-Paper Comparative Benchmark Matrix</span>
        </h3>
        <div className="overflow-x-auto rounded-xl border border-slate-800 bg-obsidian-900/60">
          <table className="w-full text-left font-mono text-[11px]">
            <thead className="bg-obsidian-850 border-b border-slate-800 text-slate-400">
              <tr>
                <th className="p-2.5 font-semibold">System / Architecture</th>
                <th className="p-2.5 font-semibold">Benchmark Suite</th>
                <th className="p-2.5 font-semibold">Accuracy / Score</th>
                <th className="p-2.5 font-semibold">Inference Latency</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-200">
              {review.benchmarkTable.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-2.5 font-medium text-white">{row.system}</td>
                  <td className="p-2.5 text-slate-400">{row.benchmark}</td>
                  <td className="p-2.5 text-emerald-400 font-bold">{row.accuracy}</td>
                  <td className="p-2.5 text-slate-300">{row.latency}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Structured Sections */}
      {review.sections.map((section, idx) => (
        <div key={idx} className="space-y-2">
          <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-300">
            {section.title}
          </h3>
          <p className="leading-relaxed bg-obsidian-900/40 p-3.5 rounded-xl border border-slate-800/50">
            {section.content}
          </p>

          {/* Inline Citations */}
          {section.citations.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {section.citations.map((citeId) => (
                <button
                  key={citeId}
                  onClick={() => onSelectCitation(citeId)}
                  className="px-2 py-0.5 rounded-md bg-obsidian-850 border border-ibm-blue/40 text-[10px] font-mono text-ibm-cyan hover:bg-ibm-blue hover:text-white transition-colors"
                >
                  [{citeId}]
                </button>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* Open Challenges */}
      <div className="space-y-2 pt-2 border-t border-slate-800/80">
        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center space-x-1.5">
          <AlertCircle className="w-3.5 h-3.5" />
          <span>Open Challenges & Failure Modes</span>
        </h3>
        <ul className="space-y-1.5">
          {review.openChallenges.map((challenge, i) => (
            <li
              key={i}
              className="p-2.5 bg-obsidian-900/60 rounded-xl border border-slate-800/80 text-slate-300 leading-snug flex items-start space-x-2"
            >
              <span className="text-amber-400 font-mono font-bold">›</span>
              <span>{challenge}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Future Directions */}
      <div className="space-y-2 pt-2 border-t border-slate-800/80">
        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 flex items-center space-x-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Predicted Frontier Research Directions</span>
        </h3>
        <ul className="space-y-1.5">
          {review.futureDirections.map((dir, i) => (
            <li
              key={i}
              className="p-2.5 bg-obsidian-900/60 rounded-xl border border-slate-800/80 text-slate-300 leading-snug flex items-start space-x-2"
            >
              <span className="text-emerald-400 font-mono font-bold">★</span>
              <span>{dir}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
