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
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Medium':
        return 'bg-orange-50 text-claude-orange border-orange-200';
      case 'Moonshot':
        return 'bg-amber-50 text-amber-700 border-amber-200';
    }
  };

  return (
    <div className="w-full h-full bg-claude-bg p-6 flex flex-col space-y-6 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-claude-text flex items-center space-x-2">
            <Compass className="w-4 h-4 text-claude-terracotta" />
            <span>Citation Gap & Research Opportunity Matrix</span>
          </h2>
          <p className="text-xs text-claude-muted mt-0.5">
            Algorithmic white-space identification across citation topologies to forecast high-impact novel research directions.
          </p>
        </div>
        <div className="flex items-center space-x-2 bg-white border border-claude-border px-3 py-1.5 rounded-xl text-xs font-mono text-claude-text shadow-xs">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Watsonx Gap Detector Active</span>
        </div>
      </div>

      {/* Gap Cards List */}
      <div className="space-y-4">
        {gaps.map((gap) => (
          <div
            key={gap.id}
            className="bg-white border border-claude-border hover:border-claude-terracotta/40 rounded-2xl p-6 transition-all shadow-claude relative overflow-hidden"
          >
            {/* Top Row: Intersections & Opportunity Score */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-claude-border">
              <div className="space-y-1.5">
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-claude-muted font-semibold">
                    Unexplored Intersection:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {gap.unexploredIntersection.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-claude-subtle text-claude-text border border-claude-border"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <h3 className="text-base font-bold text-claude-text mt-1">{gap.title}</h3>
              </div>

              {/* Opportunity Score Indicator */}
              <div className="flex items-center space-x-4 shrink-0">
                <div className="text-right">
                  <span className="text-[10px] font-mono text-claude-muted block uppercase">Opportunity Index</span>
                  <div className="flex items-center space-x-1.5 justify-end">
                    <Sparkles className="w-3.5 h-3.5 text-claude-terracotta" />
                    <span className="text-xl font-bold font-mono text-claude-text">{gap.opportunityScore}</span>
                    <span className="text-xs text-claude-muted font-mono">/100</span>
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
              <div className="bg-claude-subtle/80 border border-claude-border rounded-xl p-4">
                <div className="flex items-center space-x-2 text-xs font-mono text-claude-muted mb-2">
                  <Target className="w-3.5 h-3.5 text-claude-terracotta" />
                  <span className="font-semibold uppercase tracking-wider">Literature White Space Rationale</span>
                </div>
                <p className="text-xs text-claude-text leading-relaxed">{gap.rationale}</p>
              </div>

              {/* Suggested Hypothesis */}
              <div className="bg-orange-50/50 border border-orange-200/80 rounded-xl p-4">
                <div className="flex items-center space-x-2 text-xs font-mono text-claude-orange mb-2">
                  <Lightbulb className="w-3.5 h-3.5 text-claude-orange" />
                  <span className="font-semibold uppercase tracking-wider">Predictive Research Hypothesis</span>
                </div>
                <p className="text-xs text-claude-text leading-relaxed font-mono">{gap.suggestedHypothesis}</p>
              </div>
            </div>

            {/* Bottom Row: Potential Impact & Action */}
            <div className="mt-4 pt-4 border-t border-claude-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="text-xs text-claude-muted flex items-center space-x-2">
                <span className="text-stone-400 font-mono uppercase text-[10px]">Estimated Impact:</span>
                <span className="text-claude-text font-medium">{gap.potentialImpact}</span>
              </div>

              <button
                onClick={() => onFormulateHypothesis(gap)}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-claude-terracotta hover:bg-claude-terracotta-hover active:scale-[0.98] text-white text-xs font-medium rounded-xl shadow-sm shadow-claude-terracotta/20 transition-all self-start sm:self-auto shrink-0"
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
