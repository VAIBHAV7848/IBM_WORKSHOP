# Research Agent (Problem Statement No. 7) Design Document

**Reference:** [Problem Statement No. 7: Research Agent](file:///home/nethunter/IBM/project/7%20Problem%20statement%20on%20Langflow%202026-2027.pdf#page=7)  
**Date:** 2026-09-23  
**Status:** Approved  
**Author:** Antigravity Engineering  

---

## 1. Executive Summary & Goal
Build an ultra-responsive, highly visual **Research Agent Studio** powered by an agentic pipeline and IBM watsonx / Granite integration principles. The studio enables researchers, students, and professionals to ingest multimodal inputs (PDFs, queries, pre-loaded literature databases), explore interactive 2D citation and knowledge graphs at 60fps, analyze emerging research velocity trends, discover citation gaps, and generate comprehensive, publication-ready literature reviews with full source citations.

---

## 2. Core Architecture & Tech Stack

### 2.1 Tech Stack
* **Framework**: Next.js 15+ (App Router), React 19, TypeScript
* **Styling**: Tailwind CSS, CSS Custom Properties for obsidian dark mode styling (`#070a12`, `#0d1322`, `#141d33`, glowing accents `#38bdf8`, `#818cf8`, `#10b981`, `#f59e0b`)
* **Icons**: `lucide-react`
* **Graph Engine**: Custom HTML5 Canvas 2D Spring-Force Simulation Engine (zero DOM bloat, 60fps physics, zoom, pan, node dragging, halo glow shaders)
* **Analytics & Charts**: SVG & Canvas trend trajectories, topic velocity indicators, citation gap radar matrices
* **Agent & RAG Layer**: Client/Server Agentic Pipeline with 4 discrete agents:
  1. `AcademicIngestionAgent`: Ingests and parses academic documents, extracts metadata (title, authors, year, abstract, key claims, references).
  2. `CitationGraphAgent`: Constructs bipartite/thematic citation networks and topic clusters.
  3. `TrendAndGapAgent`: Calculates research momentum (2020–2026) and detects citation white spaces/unexplored intersections.
  4. `LiteratureSynthesisAgent`: Executes Granite-prompted RAG synthesis, produces structured literature reviews, and manages citations.
* **Integrations**: Direct support for live arXiv API queries, local PDF upload, and optional IBM watsonx.ai Granite 3.0 API keys with instantaneous zero-config fallback.

---

## 3. UI/UX Layout Specification (3-Pane Studio)

```
┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│  Top Bar: 🧬 Langflow Research Agent | Presets: [Agentic AI] [Quantum Computing] [Biomedical AI]       │
│  [+ Upload PDF] [Live arXiv Search] [⚙ Model / watsonx Config] [Export Review]                         │
├─────────────────────────┬───────────────────────────────────────────┬──────────────────────────────────┤
│ PANE 1: SOURCE LIBRARY  │ PANE 2: UNIFIED VISUAL WORKBENCH          │ PANE 3: MULTI-AGENT SYNTHESIS    │
│ (Left ~22% width)       │ (Center ~50% width)                       │ (Right ~28% width)               │
│                         │                                           │                                  │
│ • Domain Preset Selector│ [Tab: Citation Graph] [Trends] [Gaps]     │ • Multi-Agent Pipeline Status    │
│ • Search & Filter Input │ ┌───────────────────────────────────────┐ │   [Ingestion] [Graph] [Gap] [Syn]│
│ • Paper Card Library:   │ │  Force-Directed 2D Canvas Physics     │ • Granite 3.0 RAG Chat Assistant │
│   - Paper Title         │ │  - Interactive Nodes (Colored Clusters│ • 1-Click "Generate Review"       │
│   - Authors & Year      │ │  - Directional Citation Links         │ • Formatted Literature Review:   │
│   - Citations & Badge   │ │  - Dynamic Spring Physics Simulation  │   - Executive Summary            │
│   - Ingestion Status    │ │  - Zoom (+/-), Reset, Node Drag       │   - Taxonomy Comparison Table    │
│ • Drag & Drop Dropzone: │ └───────────────────────────────────────┘ │   - Open Research Challenges     │
│   - Upload PDF          │ Selected Paper Inspector Drawer:          │ • Citation Export:               │
│   - Claim Preview       │ Title, Abstract, Extracted Metrics, DOI   │   - Markdown, BibTeX, PDF Print  │
└─────────────────────────┴───────────────────────────────────────────┴──────────────────────────────────┘
```

### 3.1 Left Pane: Multimodal Academic Library
* **Presets Switcher**:
  1. *Agentic AI & Large Language Models* (Granite 3.0, Tool-Use, Self-RAG, Multi-Agent Orchestration, Reflection).
  2. *Quantum Computing & QML* (Quantum Neural Networks, VQE, Error Mitigation, NISQ Algorithms).
  3. *Biomedical & Genomics AI* (AlphaFold, Clinical NLP, Single-Cell Omics, Drug Target Discovery).
* **Live Search**: Real-time filtering and live query support for arXiv preprints.
* **Dropzone**: Drag-and-drop PDF reader with synthetic semantic parsing (extracts abstract, claims, and citation links).
* **Paper List**: Displays citation counts, author list, publication year, and cluster badge.

### 3.2 Center Pane: Unified Visual Workbench (3 Tabs)
* **Tab 1: Force-Directed Knowledge & Citation Graph**:
  * Physics simulation with velocity damping, repulsive Coulomb forces, and attractive spring forces.
  * Interactive canvas with pan, zoom, smooth drag-and-pin, and hover glow effects.
  * Node clusters color-coded by sub-topic (e.g. Model Architecture, Alignment, Retrieval, Evaluation).
  * Clicking any node opens an inspection HUD with paper abstract, key findings, and adjacent citations.
* **Tab 2: Emerging Trends & Velocity Radar**:
  * Multi-year trajectory chart (2020–2026) demonstrating publication velocity and sentiment curves.
  * Trend velocity scorecards (e.g., "Granite Reasoning: +312% YoY", "Dense Prompting: -42%").
* **Tab 3: Citation Gap & Research Opportunities Matrix**:
  * Identifies unexplored white spaces between clusters.
  * Predicts 3 high-impact research hypotheses for future papers/grants with rationale and confidence scores.

### 3.3 Right Pane: Multi-Agent Synthesis Workbench
* **Pipeline Stepper**: Displays live execution state of the 4 agents with latency counters and step payloads.
* **Granite RAG Console**: Interactive conversational interface that answers research inquiries using in-library paper chunks, highlighting clickable citation chips `[Ref 1]`.
* **Structured Literature Review Generator**: Generates formatted research sections:
  1. Executive Summary & Research Landscape
  2. Thematic Taxonomy & Methodology Comparison
  3. Benchmark Matrix (Datasets, Models, Accuracy, Latency)
  4. Identified Research Gaps & Proposed Future Directions
* **Export Actions**: Export to `.md` (Markdown), `.bib` (BibTeX citations), or initiate browser Print/PDF layout.

---

## 4. Data Models

```typescript
export interface AcademicPaper {
  id: string;
  title: string;
  authors: string[];
  year: number;
  domain: 'agentic-ai' | 'quantum-computing' | 'biomedical-ai';
  abstract: string;
  citationsCount: number;
  cluster: string;
  clusterColor: string;
  keyFindings: string[];
  methodology: string;
  citations: string[]; // IDs of referenced papers
  arxivUrl?: string;
}

export interface CitationLink {
  source: string;
  target: string;
  strength: number;
}

export interface ResearchTrend {
  topic: string;
  growthRate: number; // percentage
  trajectory: { year: number; papersCount: number }[];
  sentiment: 'accelerating' | 'maturing' | 'emerging' | 'saturated';
  description: string;
}

export interface CitationGap {
  id: string;
  unexploredIntersection: string[];
  title: string;
  opportunityScore: number; // 0 - 100
  rationale: string;
  suggestedHypothesis: string;
}
```

---

## 5. Verification & Performance Budget
* **Frame Rate**: Constant 60fps on canvas physics simulation during pan, zoom, and node dragging.
* **Zero Dependencies Outside Standard Ecosystem**: Clean Next.js 15, React 19, TypeScript, Tailwind CSS, Lucide icons.
* **Responsiveness**: Fluid layout across 1080p, 1440p, 4K monitors with collapsible sidebars for smaller screens.
* **Zero-Setup Demo**: Completely usable with rich, real-world academic data out of the box; fully ready for live watsonx API keys.
