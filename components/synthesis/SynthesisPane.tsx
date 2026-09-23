'use client';

import React, { useState } from 'react';
import {
  DomainDataset,
  AgentStep,
  ChatMessage,
  LiteratureReview,
  AcademicPaper,
} from '@/types/academic';
import { AgentPipelineTracker } from './AgentPipelineTracker';
import { GraniteChatConsole } from './GraniteChatConsole';
import { LiteratureReviewView } from './LiteratureReviewView';
import { ExportModal } from './ExportModal';
import { MessageSquare, BookOpen, Sparkles } from 'lucide-react';

interface SynthesisPaneProps {
  dataset: DomainDataset;
  steps: AgentStep[];
  messages: ChatMessage[];
  onSendMessage: (query: string) => void;
  isGeneratingChat: boolean;
  review: LiteratureReview | null;
  isGeneratingReview: boolean;
  onGenerateReview: () => void;
  onSelectCitation: (paperId: string) => void;
}

export const SynthesisPane: React.FC<SynthesisPaneProps> = ({
  dataset,
  steps,
  messages,
  onSendMessage,
  isGeneratingChat,
  review,
  isGeneratingReview,
  onGenerateReview,
  onSelectCitation,
}) => {
  const [activeTab, setActiveTab] = useState<'chat' | 'review'>('chat');
  const [isExportOpen, setIsExportOpen] = useState(false);

  return (
    <div className="w-full h-full flex flex-col bg-white overflow-hidden">
      {/* 1. Multi-Agent Pipeline Status */}
      <AgentPipelineTracker steps={steps} />

      {/* 2. Sub-Tab Switcher */}
      <div className="h-10 border-b border-claude-border px-3 flex items-center justify-between bg-claude-subtle/60 shrink-0">
        <div className="flex space-x-1">
          <button
            onClick={() => setActiveTab('chat')}
            className={`flex items-center space-x-1.5 px-3 py-1 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'chat'
                ? 'bg-white text-claude-text font-semibold shadow-xs border border-claude-border'
                : 'text-claude-muted hover:text-claude-text hover:bg-white/60'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5 text-claude-terracotta" />
            <span>Granite RAG Chat</span>
          </button>

          <button
            onClick={() => setActiveTab('review')}
            className={`flex items-center space-x-1.5 px-3 py-1 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'review'
                ? 'bg-white text-claude-text font-semibold shadow-xs border border-claude-border'
                : 'text-claude-muted hover:text-claude-text hover:bg-white/60'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-claude-orange" />
            <span>Literature Review</span>
            {review && (
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            )}
          </button>
        </div>

        <span className="text-[10px] font-mono text-claude-muted hidden sm:inline">
          RAG Corpus: {dataset.papers.length} Papers
        </span>
      </div>

      {/* 3. Tab Content */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {activeTab === 'chat' ? (
          <GraniteChatConsole
            dataset={dataset}
            messages={messages}
            onSendMessage={onSendMessage}
            isGenerating={isGeneratingChat}
            onSelectCitation={onSelectCitation}
          />
        ) : (
          <LiteratureReviewView
            review={review}
            isGenerating={isGeneratingReview}
            onGenerateReview={onGenerateReview}
            onOpenExport={() => setIsExportOpen(true)}
            onSelectCitation={onSelectCitation}
            papers={dataset.papers}
          />
        )}
      </div>

      {/* Export Modal */}
      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        papers={dataset.papers}
        review={review}
      />
    </div>
  );
};
