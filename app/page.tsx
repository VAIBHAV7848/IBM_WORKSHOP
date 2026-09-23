'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  DomainKey,
  DomainDataset,
  AcademicPaper,
  AgentStep,
  ChatMessage,
  LiteratureReview,
  CitationGap,
} from '@/types/academic';
import { getDomainData } from '@/data/domains';
import { StudioHeader } from '@/components/layout/StudioHeader';
import { SourceLibraryPane } from '@/components/library/SourceLibraryPane';
import { VisualWorkbench } from '@/components/workbench/VisualWorkbench';
import { SynthesisPane } from '@/components/synthesis/SynthesisPane';
import { WatsonxConfigModal } from '@/components/modals/WatsonxConfigModal';

export default function ResearchStudioPage() {
  const [activeDomain, setActiveDomain] = useState<DomainKey>('agentic-ai');
  const [dataset, setDataset] = useState<DomainDataset>(() => getDomainData('agentic-ai'));
  const [selectedPaper, setSelectedPaper] = useState<AcademicPaper | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Agent Pipeline Status
  const [steps, setSteps] = useState<AgentStep[]>([
    { id: '1', name: 'AST Parser', agentRole: 'Academic Ingestion', status: 'completed', latencyMs: 142 },
    { id: '2', name: 'Topology', agentRole: 'Citation Graph', status: 'completed', latencyMs: 98 },
    { id: '3', name: 'Gap Detector', agentRole: 'Trend & Discovery', status: 'completed', latencyMs: 185 },
    { id: '4', name: 'RAG Reasoner', agentRole: 'Literature Synthesis', status: 'idle', latencyMs: 0 },
  ]);

  // Chat Console Messages
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isGeneratingChat, setIsGeneratingChat] = useState(false);

  // Literature Review State
  const [review, setReview] = useState<LiteratureReview | null>(null);
  const [isGeneratingReview, setIsGeneratingReview] = useState(false);

  // Initialize or Switch Domain
  useEffect(() => {
    const freshData = getDomainData(activeDomain);
    setDataset(freshData);
    setSelectedPaper(null);
    setReview(null);

    // Initial Welcome Message
    setMessages([
      {
        id: 'msg-welcome',
        role: 'assistant',
        content: `Welcome to the **Langflow Research Agent**. The **${freshData.label}** corpus is fully loaded into the citation graph with **${freshData.papers.length} peer-reviewed papers** and **${freshData.trends.length} emerging research trajectories**.\n\nYou can query literature across the graph, click nodes to inspect methodology, upload new PDFs, or trigger a full multi-agent literature review.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        model: 'ibm/granite-3-8b-instruct',
      },
    ]);

    // Animate pipeline status refresh
    setSteps([
      { id: '1', name: 'AST Parser', agentRole: 'Academic Ingestion', status: 'completed', latencyMs: 120 },
      { id: '2', name: 'Topology', agentRole: 'Citation Graph', status: 'completed', latencyMs: 85 },
      { id: '3', name: 'Gap Detector', agentRole: 'Trend & Discovery', status: 'completed', latencyMs: 160 },
      { id: '4', name: 'RAG Reasoner', agentRole: 'Literature Synthesis', status: 'idle', latencyMs: 0 },
    ]);
  }, [activeDomain]);

  // Handle PDF Ingestion - Adds paper dynamically into active dataset and graph!
  const handlePaperParsed = useCallback((newPaper: AcademicPaper) => {
    setDataset((prev) => {
      // Create automatic synthetic links to 2 related papers in the domain
      const existingIds = prev.papers.map((p) => p.id);
      const newLinks = [...prev.links];

      if (existingIds.length >= 2) {
        newLinks.push({
          source: newPaper.id,
          target: existingIds[0],
          strength: 4,
          type: 'thematic',
        });
        newLinks.push({
          source: newPaper.id,
          target: existingIds[1],
          strength: 3,
          type: 'direct',
        });
        newPaper.citations = [existingIds[0], existingIds[1]];
      }

      return {
        ...prev,
        papers: [newPaper, ...prev.papers],
        links: newLinks,
      };
    });

    setSelectedPaper(newPaper);

    // Announce in chat
    setMessages((prev) => [
      ...prev,
      {
        id: `msg-${Date.now()}`,
        role: 'assistant',
        content: `📄 **Multimodal Ingestion Completed**: Ingested and indexed **"${newPaper.title}"** into the citation graph. Extracted claims and constructed 2 citation edges with the active cluster.`,
        citations: [newPaper.id],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        model: 'ibm/granite-3-8b-instruct',
      },
    ]);
  }, []);

  // Handle Chat Query
  const handleSendMessage = useCallback(
    (query: string) => {
      const userMsg: ChatMessage = {
        id: `user-${Date.now()}`,
        role: 'user',
        content: query,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, userMsg]);
      setIsGeneratingChat(true);

      // Animate RAG reasoner step
      setSteps((prev) =>
        prev.map((s) => (s.id === '4' ? { ...s, status: 'running' } : s))
      );

      setTimeout(() => {
        // Construct intelligent grounded response
        const matchingPapers = dataset.papers.slice(0, 3);
        const citeIds = matchingPapers.map((p) => p.id);

        let responseContent = `Based on multi-source RAG retrieval across the **${dataset.label}** corpus:\n\n`;

        if (query.toLowerCase().includes('compare') || query.toLowerCase().includes('react')) {
          responseContent += `• **Architecture & Performance**: Compared to baseline ReAct architectures, **Granite 3.0** incorporates native function calling and enterprise safety guardrails trained on 12T tokens. This reduces token overhead by ~35% while maintaining strict schema validity.\n• **Factuality & Critique**: Techniques like **Self-RAG** introduce dynamic reflection tokens that prevent gratuitous retrieval when parametric memory is sufficient, cutting latency by 45%.\n• **Visual Orchestration**: As detailed in **Langflow**, visual stateful DAG routing enables rapid iteration over multi-agent handoffs without brittle procedural code.`;
        } else if (query.toLowerCase().includes('gap') || query.toLowerCase().includes('trend')) {
          responseContent += `• **Emerging Frontier**: The highest velocity growth is occurring in **Autonomous Tool Calling (+342% YoY)**, while naive single-prompt engineering is declining.\n• **High-Impact Citation White Space**: The primary citation gap identified in the corpus is **"${dataset.gaps[0]?.title || 'On-Device Edge RAG'}"** (Opportunity Score: ${dataset.gaps[0]?.opportunityScore || 94}/100).\n• **Recommended Hypothesis**: ${dataset.gaps[0]?.suggestedHypothesis || 'Fusing quantized models with local vector indexes eliminates latency bottlenecks.'}`;
        } else {
          responseContent += `• **Core Synthesis**: The active literature highlights the convergence of foundation model scale with verifiable agentic execution.\n• **Key Empirical Finding**: ${matchingPapers[0]?.keyFindings[0] || 'State-of-the-art results across standard reasoning benchmarks.'}\n• **Methodological Pattern**: Most current frameworks combine dynamic reflection loops with structured multi-agent coordination.`;
        }

        const assistantMsg: ChatMessage = {
          id: `asst-${Date.now()}`,
          role: 'assistant',
          content: responseContent,
          citations: citeIds,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          model: 'ibm/granite-3-8b-instruct',
        };

        setMessages((prev) => [...prev, assistantMsg]);
        setIsGeneratingChat(false);

        setSteps((prev) =>
          prev.map((s) => (s.id === '4' ? { ...s, status: 'completed', latencyMs: 245 } : s))
        );
      }, 1100);
    },
    [dataset]
  );

  // Handle Full Literature Review Generation
  const handleGenerateReview = useCallback(() => {
    setIsGeneratingReview(true);

    // Sequence through agent steps
    setSteps((prev) =>
      prev.map((s) => ({ ...s, status: 'running', latencyMs: undefined }))
    );

    setTimeout(() => {
      const generatedReview: LiteratureReview = {
        id: `review-${Date.now()}`,
        domain: activeDomain,
        generatedAt: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
        model: 'ibm/granite-3-8b-instruct',
        title: `Comprehensive Literature Review: Frontier Architectures in ${dataset.label}`,
        executiveSummary: `This survey provides a systematic synthesis of ${dataset.papers.length} landmark publications defining modern ${dataset.label}. We evaluate structural progression from monolithic prompting baselines toward adaptive, self-reflective multi-agent topologies. Across examined benchmarks, modular agentic decomposition demonstrates substantial empirical improvements in multi-hop accuracy, verifiable reasoning traces, and computational efficiency.`,
        benchmarkTable: dataset.papers.slice(0, 4).map((p, idx) => ({
          system: p.title.split(':')[0],
          benchmark: idx % 2 === 0 ? 'Enterprise AgentBench / ToolQA' : 'HumanEval / HotpotQA',
          accuracy: `${(84.2 + idx * 3.8).toFixed(1)}%`,
          latency: `${180 + idx * 45}ms`,
          referenceId: p.id,
        })),
        sections: [
          {
            title: '1. Foundational Taxonomies & Paradigms',
            content: `The literature establishes a clear dichotomy between static parametric reasoning and dynamic environment grounding. Classical architectures relied heavily on few-shot in-context demonstrations, whereas contemporary frameworks implement active feedback loops, structured tool-use schemas, and episodic memory persistence.`,
            citations: dataset.papers.slice(0, 2).map((p) => p.id),
          },
          {
            title: '2. Comparative Methodological Analysis',
            content: `A central theme across analyzed works is the trade-off between inference compute and factual precision. While unconstrained recursive agent loops improve complex problem solving, they introduce non-deterministic latency and potential infinite execution cycles. Modern systems counteract this using calibrated reflection tokens and explicit temporal bounds.`,
            citations: dataset.papers.slice(2, 4).map((p) => p.id),
          },
        ],
        openChallenges: [
          'Vulnerability of multi-agent message buses to indirect prompt injection and adversarial context poisoning.',
          'Absence of unified evaluation benchmarks measuring long-horizon trajectory robustness beyond 10-step plans.',
          'High memory and token footprint during recursive self-reflection on complex multi-hop retrieval.',
        ],
        futureDirections: dataset.gaps.map((g) => `${g.title}: ${g.suggestedHypothesis}`),
      };

      setReview(generatedReview);
      setIsGeneratingReview(false);

      setSteps([
        { id: '1', name: 'AST Parser', agentRole: 'Academic Ingestion', status: 'completed', latencyMs: 140 },
        { id: '2', name: 'Topology', agentRole: 'Citation Graph', status: 'completed', latencyMs: 95 },
        { id: '3', name: 'Gap Detector', agentRole: 'Trend & Discovery', status: 'completed', latencyMs: 175 },
        { id: '4', name: 'RAG Reasoner', agentRole: 'Literature Synthesis', status: 'completed', latencyMs: 310 },
      ]);
    }, 1500);
  }, [activeDomain, dataset]);

  // Handle clicking a citation chip
  const handleSelectCitation = useCallback(
    (paperId: string) => {
      const found = dataset.papers.find((p) => p.id === paperId);
      if (found) {
        setSelectedPaper(found);
      }
    },
    [dataset]
  );

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-obsidian-950 text-slate-100 font-sans">
      {/* 1. Global Header */}
      <StudioHeader
        activeDomain={activeDomain}
        onSelectDomain={setActiveDomain}
        onOpenSettings={() => setIsSettingsOpen(true)}
        totalPapers={dataset.papers.length}
      />

      {/* 2. Main 3-Pane Responsive Layout */}
      <main className="flex-1 flex overflow-hidden">
        {/* PANE 1: Left Academic Corpus Library (~22% width, min 280px) */}
        <aside className="w-80 min-w-[280px] max-w-[340px] h-full shrink-0 hidden md:block">
          <SourceLibraryPane
            dataset={dataset}
            activeDomain={activeDomain}
            onSelectDomain={setActiveDomain}
            selectedPaper={selectedPaper}
            onSelectPaper={setSelectedPaper}
            onPaperParsed={handlePaperParsed}
          />
        </aside>

        {/* PANE 2: Center Visual Workbench (Flex 1, flexible canvas) */}
        <section className="flex-1 h-full min-w-[400px] overflow-hidden">
          <VisualWorkbench
            dataset={dataset}
            selectedPaper={selectedPaper}
            onSelectPaper={setSelectedPaper}
            onAskAgentAboutPaper={(paper) => {
              handleSendMessage(`Provide a comprehensive analysis of "${paper.title}". What is its core methodology, benchmark result, and relation to other papers in this corpus?`);
            }}
            onFormulateHypothesis={(gap) => {
              handleSendMessage(`Formulate a detailed academic research proposal addressing the citation gap: "${gap.title}". Include methodology, dataset requirements, and expected impact.`);
            }}
          />
        </section>

        {/* PANE 3: Right Multi-Agent Synthesis Workbench (~30% width, min 360px) */}
        <aside className="w-[420px] min-w-[360px] max-w-[480px] h-full shrink-0 border-l border-slate-800/80 hidden lg:block">
          <SynthesisPane
            dataset={dataset}
            steps={steps}
            messages={messages}
            onSendMessage={handleSendMessage}
            isGeneratingChat={isGeneratingChat}
            review={review}
            isGeneratingReview={isGeneratingReview}
            onGenerateReview={handleGenerateReview}
            onSelectCitation={handleSelectCitation}
          />
        </aside>
      </main>

      {/* Watsonx Settings Modal */}
      <WatsonxConfigModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </div>
  );
}
