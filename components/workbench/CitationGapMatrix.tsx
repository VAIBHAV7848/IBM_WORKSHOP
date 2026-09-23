'use client';

import React from 'react';
import { CitationGap } from '@/types/academic';
import { Compass, Lightbulb, Target, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

interface CitationGapMatrixProps {
  gaps: CitationGap[];
  onFormulateHypothesis: (gap: CitationGap) => void;
}

export const CitationGapMatrix: React.FC<CitationGapMatrixProps> = ({
  gaps,
  onFormulateHypothesis,
}) => {
  const getFeasibilityColor = (feasibility: CitationGap['feasibility']) => {
    switch (feasibility) {
      case 'High':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'Medium':
        return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30';
      case 'Moonshot':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
    }
  };

  return (
    <div className="w-full h-full bg-obsidian-950 p-6 flex flex-col space-y-6 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-white flex items-center space-x-2">
            <Compass className="w-4 h-4 text-purple-400" />
            <span>Citation Gap & Research Opportunity Matrix</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Algorithmic white-space identification across citation topologies to forecast high-impact novel research directions.
          </p>
        </div>
        <div className="flex items-center space-x-2 bg-obsidian-900 border border-slate-800 px-3 py-1.5 rounded-xl text-xs font-mono text-slate-300">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Watsonx Gap Detector Active</span>
        </div>
      </div>

      {/* Gap Cards List */}
      <div className="space-y-4">
        {gaps.map((gap) => (
          <div
            key={gap.id}
            className="bg-obsidian-900/90 border border-slate-800/90 hover:border-slate-700/80 rounded-2xl p-6 transition-all shadow-xl hover:shadow-purple-500/5 relative overflow-hidden"
          >
            {/* Top Row: Intersections & Opportunity Score */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div className="space-y-1.5">
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 font-semibold">
                    Unexplored Intersection:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {gap.unexploredIntersection.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-purple-500/10 text-purple-300 border border-purple-500/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <h3 className="text-base font-bold text-white mt-1">{gap.title}</h3>
              </div>

              {/* Opportunity Score Indicator */}
              <div className="flex items-center space-x-4 shrink-0">
                <div className="text-right">
                  <span className="text-[10px] font-mono text-slate-400 block uppercase">Opportunity Index</span>
                  <div className="flex items-center space-x-1.5 justify-end">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span className="text-xl font-bold font-mono text-white">{gap.opportunityScore}</span>
                    <span className="text-xs text-slate-500 font-mono">/100</span>
                  </div>
                </div>
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-mono border ${getFeasibilityColor(
                    gap.feasibility
                  )}`}
                >
                  {gap.feasibility} Feasibility
                </span>
              </div>
            </div>

            {/* Middle Section: Rationale & Hypothesis */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
              {/* Gap Rationale */}
              <div className="bg-obsidian-850/60 border border-slate-800/60 rounded-xl p-4">
                <div className="flex items-center space-x-2 text-xs font-mono text-slate-400 mb-2">
                  <Target className="w-3.5 h-3.5 text-ibm-blue" />
                  <span className="font-semibold uppercase tracking-wider">Literature White Space Rationale</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{gap.rationale}</p>
              </div>

              {/* Suggested Hypothesis */}
              <div className="bg-obsidian-850/60 border border-slate-800/60 rounded-xl p-4">
                <div className="flex items-center space-x-2 text-xs font-mono text-purple-400 mb-2">
                  <Lightbulb className="w-3.5 h-3.5 text-purple-400" />
                  <span className="font-semibold uppercase tracking-wider">Predictive Research Hypothesis</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-mono">{gap.suggestedHypothesis}</p>
              </div>
            </div>

            {/* Bottom Row: Potential Impact & Action */}
            <div className="mt-4 pt-4 border-t border-slate-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="text-xs text-slate-400 flex items-center space-x-2">
                <span className="text-slate-500 font-mono uppercase text-[10px]">Estimated Impact:</span>
                <span className="text-slate-300 font-medium">{gap.potentialImpact}</span>
              </div>

              <button
                onClick={() => onFormulateHypothesis(gap)}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-purple-600/90 hover:bg-purple-600 active:scale-[0.98] text-white text-xs font-medium rounded-xl shadow-lg shadow-purple-600/20 transition-all self-start sm:self-auto shrink-0"
              >
                <span>Draft Paper Proposal with Granite</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
