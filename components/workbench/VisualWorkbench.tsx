'use client';

import React, { useState } from 'react';
import { DomainDataset, AcademicPaper, CitationGap } from '@/types/academic';
import { CitationCanvas } from '@/components/graph/CitationCanvas';
import { PaperDetailDrawer } from '@/components/graph/PaperDetailDrawer';
import { TrendVelocityView } from './TrendVelocityView';
import { CitationGapMatrix } from './CitationGapMatrix';
import { Share2, TrendingUp, Compass, Layers } from 'lucide-react';

interface VisualWorkbenchProps {
  dataset: DomainDataset;
  selectedPaper: AcademicPaper | null;
  onSelectPaper: (paper: AcademicPaper | null) => void;
  onAskAgentAboutPaper: (paper: AcademicPaper) => void;
  onFormulateHypothesis: (gap: CitationGap) => void;
}

export type WorkbenchTab = 'graph' | 'trends' | 'gaps';

export const VisualWorkbench: React.FC<VisualWorkbenchProps> = ({
  dataset,
  selectedPaper,
  onSelectPaper,
  onAskAgentAboutPaper,
  onFormulateHypothesis,
}) => {
  const [activeTab, setActiveTab] = useState<WorkbenchTab>('graph');

  return (
    <div className="w-full h-full flex flex-col bg-claude-bg border-r border-claude-border relative overflow-hidden">
      {/* Tab Navigation Header */}
      <div className="h-12 border-b border-claude-border px-4 flex items-center justify-between bg-white z-10 shrink-0">
        <div className="flex items-center space-x-1.5 bg-claude-subtle p-1 rounded-xl border border-claude-border">
          <button
            onClick={() => setActiveTab('graph')}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'graph'
                ? 'bg-claude-terracotta text-white shadow-claudeOrange font-semibold'
                : 'text-claude-muted hover:text-claude-text hover:bg-white/80'
            }`}
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>2D Citation Graph</span>
            <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-white/25 text-white font-mono font-bold">
              {dataset.papers.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('trends')}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'trends'
                ? 'bg-claude-terracotta text-white shadow-claudeOrange font-semibold'
                : 'text-claude-muted hover:text-claude-text hover:bg-white/80'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Emerging Trends</span>
            <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-white/25 text-white font-mono font-bold">
              {dataset.trends.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('gaps')}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'gaps'
                ? 'bg-claude-terracotta text-white shadow-claudeOrange font-semibold'
                : 'text-claude-muted hover:text-claude-text hover:bg-white/80'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Citation Gaps</span>
            <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-white/25 text-white font-mono font-bold">
              {dataset.gaps.length}
            </span>
          </button>
        </div>

        {/* Domain Label Indicator */}
        <div className="hidden lg:flex items-center space-x-2 text-xs font-mono text-claude-muted font-medium">
          <Layers className="w-3.5 h-3.5 text-claude-terracotta" />
          <span>Active Corpus:</span>
          <span className="text-claude-text font-bold">{dataset.label}</span>
        </div>
      </div>

      {/* Main Tab Content */}
      <div className="flex-1 relative overflow-hidden bg-claude-bg">
        {activeTab === 'graph' && (
          <>
            <CitationCanvas
              papers={dataset.papers}
              links={dataset.links}
              selectedPaperId={selectedPaper?.id || null}
              onSelectPaper={onSelectPaper}
            />
            <PaperDetailDrawer
              paper={selectedPaper}
              onClose={() => onSelectPaper(null)}
              onAskAgentAboutPaper={onAskAgentAboutPaper}
            />
          </>
        )}

        {activeTab === 'trends' && (
          <TrendVelocityView trends={dataset.trends} />
        )}

        {activeTab === 'gaps' && (
          <CitationGapMatrix
            gaps={dataset.gaps}
            onFormulateHypothesis={onFormulateHypothesis}
          />
        )}
      </div>
    </div>
  );
};
