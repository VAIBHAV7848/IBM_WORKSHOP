'use client';

import React, { useState, useMemo } from 'react';
import { DomainDataset, AcademicPaper, DomainKey } from '@/types/academic';
import { DomainSwitcher } from './DomainSwitcher';
import { PdfDropzone } from './PdfDropzone';
import { PaperCard } from './PaperCard';
import { Search, SlidersHorizontal, BookOpen, Layers } from 'lucide-react';

interface SourceLibraryPaneProps {
  dataset: DomainDataset;
  activeDomain: DomainKey;
  onSelectDomain: (domain: DomainKey) => void;
  selectedPaper: AcademicPaper | null;
  onSelectPaper: (paper: AcademicPaper | null) => void;
  onPaperParsed: (paper: AcademicPaper) => void;
}

export const SourceLibraryPane: React.FC<SourceLibraryPaneProps> = ({
  dataset,
  activeDomain,
  onSelectDomain,
  selectedPaper,
  onSelectPaper,
  onPaperParsed,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClusterFilter, setSelectedClusterFilter] = useState<string | null>(null);

  // Extract distinct clusters
  const clusters = useMemo(() => {
    return Array.from(new Set(dataset.papers.map((p) => p.cluster)));
  }, [dataset.papers]);

  // Filter papers
  const filteredPapers = useMemo(() => {
    return dataset.papers.filter((paper) => {
      const matchesSearch =
        paper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        paper.abstract.toLowerCase().includes(searchQuery.toLowerCase()) ||
        paper.authors.some((a) => a.toLowerCase().includes(searchQuery.toLowerCase())) ||
        paper.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCluster = selectedClusterFilter
        ? paper.cluster === selectedClusterFilter
        : true;

      return matchesSearch && matchesCluster;
    });
  }, [dataset.papers, searchQuery, selectedClusterFilter]);

  return (
    <div className="w-full h-full flex flex-col bg-obsidian-950 border-r border-slate-800/80 overflow-hidden">
      {/* Pane Header */}
      <div className="h-12 border-b border-slate-800/80 px-4 flex items-center justify-between bg-obsidian-900/60 shrink-0">
        <div className="flex items-center space-x-2 text-xs font-semibold text-slate-200 uppercase tracking-wider font-mono">
          <BookOpen className="w-3.5 h-3.5 text-ibm-cyan" />
          <span>Academic Corpus</span>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
          {filteredPapers.length} / {dataset.papers.length} Papers
        </span>
      </div>

      {/* Scrollable Upper Section: Switcher & Dropzone */}
      <div className="p-3.5 space-y-3.5 border-b border-slate-800/80 bg-obsidian-900/20 shrink-0">
        <DomainSwitcher
          activeDomain={activeDomain}
          onSelectDomain={onSelectDomain}
        />

        <PdfDropzone
          activeDomain={activeDomain}
          onPaperParsed={onPaperParsed}
        />

        {/* Live Search */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search papers, authors, tags..."
            className="w-full bg-obsidian-900 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-ibm-blue transition-colors font-mono"
          />
        </div>

        {/* Cluster Filter Pills */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 scrollbar-none text-[10px] font-mono">
          <button
            onClick={() => setSelectedClusterFilter(null)}
            className={`px-2 py-0.5 rounded-md whitespace-nowrap transition-colors ${
              selectedClusterFilter === null
                ? 'bg-slate-700 text-white font-semibold'
                : 'bg-slate-800/60 text-slate-400 hover:text-slate-200'
            }`}
          >
            All ({dataset.papers.length})
          </button>
          {clusters.map((cluster) => (
            <button
              key={cluster}
              onClick={() =>
                setSelectedClusterFilter(
                  selectedClusterFilter === cluster ? null : cluster
                )
              }
              className={`px-2 py-0.5 rounded-md whitespace-nowrap transition-colors ${
                selectedClusterFilter === cluster
                  ? 'bg-ibm-blue text-white font-semibold'
                  : 'bg-slate-800/60 text-slate-400 hover:text-slate-200'
              }`}
            >
              {cluster}
            </button>
          ))}
        </div>
      </div>

      {/* Paper List */}
      <div className="flex-1 overflow-y-auto p-3.5 space-y-2.5">
        {filteredPapers.length === 0 ? (
          <div className="text-center py-8 text-xs text-slate-500 font-mono">
            No papers found matching criteria.
          </div>
        ) : (
          filteredPapers.map((paper) => (
            <PaperCard
              key={paper.id}
              paper={paper}
              isSelected={selectedPaper?.id === paper.id}
              onSelect={() => onSelectPaper(paper)}
            />
          ))
        )}
      </div>
    </div>
  );
};
