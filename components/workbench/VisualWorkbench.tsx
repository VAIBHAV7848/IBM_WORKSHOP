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
    <div className="w-full h-full flex flex-col bg-obsidian-950 border-r border-slate-800/80 relative overflow-hidden">
      {/* Tab Navigation Header */}
      <div className="h-12 border-b border-slate-800/80 px-4 flex items-center justify-between bg-obsidian-900/60 backdrop-blur-md z-10 shrink-0">
        <div className="flex items-center space-x-1.5 bg-obsidian-950/80 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('graph')}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'graph'
                ? 'bg-ibm-blue text-white shadow-md shadow-ibm-blue/25'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>2D Citation Graph</span>
            <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-white/20 text-white font-mono">
              {dataset.papers.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('trends')}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'trends'
                ? 'bg-ibm-cyan text-white shadow-md shadow-ibm-cyan/25'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Emerging Trends</span>
            <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-white/20 text-white font-mono">
              {dataset.trends.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('gaps')}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'gaps'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/25'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Citation Gaps</span>
            <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-white/20 text-white font-mono">
              {dataset.gaps.length}
            </span>
          </button>
        </div>

        {/* Domain Label Indicator */}
        <div className="hidden lg:flex items-center space-x-2 text-xs font-mono text-slate-400">
          <Layers className="w-3.5 h-3.5 text-ibm-blue" />
          <span>Active Corpus:</span>
          <span className="text-slate-200 font-semibold">{dataset.label}</span>
        </div>
      </div>

      {/* Main Tab Content */}
      <div className="flex-1 relative overflow-hidden">
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
