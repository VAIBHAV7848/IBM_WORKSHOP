'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, AcademicPaper, DomainDataset } from '@/types/academic';
import { Send, Sparkles, Bot, User, BookOpen, Terminal, CornerDownLeft } from 'lucide-react';

interface GraniteChatConsoleProps {
  dataset: DomainDataset;
  messages: ChatMessage[];
  onSendMessage: (query: string) => void;
  isGenerating: boolean;
  onSelectCitation: (paperId: string) => void;
}

export const GraniteChatConsole: React.FC<GraniteChatConsoleProps> = ({
  dataset,
  messages,
  onSendMessage,
  isGenerating,
  onSelectCitation,
}) => {
  const [inputQuery, setInputQuery] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isGenerating]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputQuery.trim() || isGenerating) return;
    onSendMessage(inputQuery.trim());
    setInputQuery('');
  };

  const samplePrompts = [
    'Compare Granite 3.0 tool-calling against baseline ReAct workflows',
    'Synthesize key failure modes in multi-agent communication loops',
    'Which papers address reflection tokens for hallucination mitigation?',
  ];

  return (
    <div className="flex-1 flex flex-col h-full bg-claude-bg overflow-hidden">
      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => {
          const isUser = msg.role === 'user';

          return (
            <div
              key={msg.id}
              className={`flex items-start space-x-2.5 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}
            >
              {/* Avatar */}
              <div
                className={`p-1.5 rounded-xl shrink-0 ${
                  isUser
                    ? 'bg-claude-terracotta text-white shadow-xs'
                    : 'bg-white text-claude-terracotta border border-claude-border shadow-xs'
                }`}
              >
                {isUser ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
              </div>

              {/* Message Bubble */}
              <div
                className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                  isUser
                    ? 'bg-claude-terracotta text-white shadow-sm'
                    : 'bg-white border border-claude-border text-claude-text shadow-sm'
                }`}
              >
                {!isUser && (
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-claude-border/80 text-[10px] font-mono text-claude-muted">
                    <span className="flex items-center space-x-1 text-claude-terracotta font-medium">
                      <Sparkles className="w-3 h-3" />
                      <span>IBM Granite 3.0 Instruct</span>
                    </span>
                    <span>{msg.timestamp}</span>
                  </div>
                )}

                <div className="whitespace-pre-line space-y-2">{msg.content}</div>

                {/* Citations Chips */}
                {msg.citations && msg.citations.length > 0 && (
                  <div className="mt-3 pt-2.5 border-t border-claude-border/80 space-y-1.5">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-claude-muted block font-semibold">
                      Cited Literature:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {msg.citations.map((citeId) => {
                        const paper = dataset.papers.find((p) => p.id === citeId);
                        const label = paper ? `${paper.title.slice(0, 24)}…` : citeId;

                        return (
                          <button
                            key={citeId}
                            onClick={() => onSelectCitation(citeId)}
                            className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-lg bg-claude-subtle border border-claude-border text-claude-text hover:bg-orange-50 hover:border-claude-terracotta/40 hover:text-claude-terracotta transition-all text-[10px] font-mono"
                          >
                            <BookOpen className="w-2.5 h-2.5" />
                            <span>{label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {isGenerating && (
          <div className="flex items-start space-x-2.5">
            <div className="p-1.5 rounded-xl bg-white text-claude-terracotta border border-claude-border shrink-0 shadow-xs">
              <Bot className="w-3.5 h-3.5 animate-pulse" />
            </div>
            <div className="bg-white border border-claude-border rounded-2xl p-3.5 text-xs text-claude-muted flex items-center space-x-2 font-mono shadow-sm">
              <span className="w-2 h-2 rounded-full bg-claude-terracotta animate-ping" />
              <span>Granite 3.0 generating RAG synthesis...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Queries */}
      {messages.length <= 2 && (
        <div className="px-4 py-2 bg-claude-subtle/50 border-t border-claude-border flex flex-col space-y-1.5 shrink-0">
          <span className="text-[9px] font-mono uppercase tracking-wider text-claude-muted font-semibold">
            Suggested Research Questions
          </span>
          <div className="flex flex-wrap gap-1.5">
            {samplePrompts.map((prompt) => (
              <button
                key={prompt}
                onClick={() => onSendMessage(prompt)}
                className="text-left px-2.5 py-1 bg-white border border-claude-border hover:border-claude-terracotta/40 hover:text-claude-terracotta rounded-lg text-[10px] text-claude-text transition-colors shadow-2xs"
              >
                › {prompt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Box */}
      <form
        onSubmit={handleSubmit}
        className="p-3 border-t border-claude-border bg-white flex items-center space-x-2 shrink-0"
      >
        <div className="relative flex-1">
          <Terminal className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder="Ask Granite across the active research corpus..."
            className="w-full bg-claude-subtle/70 border border-claude-border rounded-xl pl-9 pr-3 py-2 text-xs text-claude-text placeholder-claude-muted focus:outline-none focus:border-claude-terracotta focus:bg-white font-mono transition-colors"
          />
        </div>
        <button
          type="submit"
          disabled={!inputQuery.trim() || isGenerating}
          className="p-2 bg-claude-terracotta hover:bg-claude-terracotta-hover disabled:opacity-50 text-white rounded-xl transition-all shadow-sm shadow-claude-terracotta/20"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};
