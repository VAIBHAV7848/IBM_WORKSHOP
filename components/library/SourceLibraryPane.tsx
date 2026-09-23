'use client';

import React, { useState, useMemo } from 'react';
import { DomainDataset, AcademicPaper, DomainKey } from '@/types/academic';
import { DomainSwitcher } from './DomainSwitcher';
import { PdfDropzone } from './PdfDropzone';
import { PaperCard } from './PaperCard';
import { Search, BookOpen } from 'lucide-react';

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
    <div className="w-full h-full flex flex-col bg-claude-bg border-r border-claude-border overflow-hidden">
      {/* Pane Header */}
      <div className="h-12 border-b border-claude-border px-4 flex items-center justify-between bg-white shrink-0">
        <div className="flex items-center space-x-2 text-xs font-bold text-claude-text uppercase tracking-wider font-mono">
          <BookOpen className="w-3.5 h-3.5 text-claude-terracotta" />
          <span>Academic Corpus</span>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-claude-subtle text-claude-muted font-medium border border-claude-border">
          {filteredPapers.length} / {dataset.papers.length} Papers
        </span>
      </div>

      {/* Scrollable Upper Section */}
      <div className="p-3.5 space-y-3.5 border-b border-claude-border bg-white shrink-0">
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
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-claude-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search papers, authors, tags..."
            className="w-full bg-claude-subtle/60 border border-claude-border rounded-xl pl-9 pr-3 py-1.5 text-xs text-claude-text placeholder-claude-muted focus:outline-none focus:border-claude-terracotta focus:bg-white transition-colors font-mono"
          />
        </div>

        {/* Cluster Filter Pills */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 scrollbar-none text-[10px] font-mono">
          <button
            onClick={() => setSelectedClusterFilter(null)}
            className={`px-2.5 py-1 rounded-lg whitespace-nowrap transition-all font-medium ${
              selectedClusterFilter === null
                ? 'bg-claude-text text-white shadow-sm'
                : 'bg-claude-subtle text-claude-muted hover:text-claude-text hover:bg-claude-border'
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
              className={`px-2.5 py-1 rounded-lg whitespace-nowrap transition-all font-medium ${
                selectedClusterFilter === cluster
                  ? 'bg-claude-terracotta text-white shadow-claudeOrange'
                  : 'bg-claude-subtle text-claude-muted hover:text-claude-text hover:bg-claude-border'
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
          <div className="text-center py-8 text-xs text-claude-muted font-mono">
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
