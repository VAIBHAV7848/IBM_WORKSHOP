# Research Agent Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build an ultra-responsive, highly visual 3-pane Research Agent Studio with an interactive 60fps 2D citation graph, emerging trend trajectories, citation gap detection, and an agentic literature review generator powered by IBM watsonx / Granite integration patterns.

**Architecture:** Full-stack Next.js (App Router) application with a client-side spring-force canvas graph engine for zero-overhead 60fps physics, a modular multi-agent orchestration pipeline, and pre-indexed multi-domain research corpora with instant offline readiness and optional live watsonx API integration.

**Tech Stack:** Next.js 15+, React 19, TypeScript, Tailwind CSS, Lucide-React, HTML5 Canvas 2D Physics Engine.

**Spec:** [docs/superpowers/specs/2026-09-23-research-agent-design.md](file:///home/nethunter/IBM/project/docs/superpowers/specs/2026-09-23-research-agent-design.md)

## Global Constraints
- Node.js v22.22.0+, npm 10.9.4+
- Dark mode first: Obsidian background (`#070a12`, `#0b1120`, `#111827`), crisp border accents (`#1e293b`), glowing neon highlights (cyan, indigo, emerald, amber)
- Responsive 3-pane layout with collapsible sidebars
- Zero external database required for initial launch; pre-loaded with rich academic papers and citation links across 3 domains
- Build command must cleanly pass: `npm run build`

---

### Task 1: Project Scaffolding & Configuration
**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `tailwind.config.ts`, `postcss.config.mjs`, `app/layout.tsx`, `app/globals.css`, `app/page.tsx`
- Test: Build verification with `npm run build`

**Interfaces:**
- Produces: Running Next.js development server with Tailwind CSS and Lucide icons configured.

- [ ] **Step 1: Initialize Next.js project with Tailwind and Lucide**
- [ ] **Step 2: Configure `globals.css` with dark theme variables and custom scrollbar styling**
- [ ] **Step 3: Verify build passes with `npm run build`**
- [ ] **Step 4: Commit scaffolding**

---

### Task 2: Core Academic Data Models & Domain Corpora
**Files:**
- Create: `types/academic.ts`, `data/domains/agentic-ai.ts`, `data/domains/quantum.ts`, `data/domains/biomedical.ts`, `data/domains/index.ts`
- Test: Unit verification that all domains export papers, citation links, trends, and gap opportunities.

**Interfaces:**
- Produces: `AcademicPaper`, `CitationLink`, `ResearchTrend`, `CitationGap`, `DomainDataset`, `getDomainData(domainKey)`

- [ ] **Step 1: Define TypeScript schemas in `types/academic.ts`**
- [ ] **Step 2: Implement rich academic papers and citation links for Agentic AI (Granite 3.0, Self-RAG, Tool-Use, Langflow)**
- [ ] **Step 3: Implement Quantum Computing & Biomedical AI corpora**
- [ ] **Step 4: Implement domain accessor `getDomainData()` with unified type safety**
- [ ] **Step 5: Verify types and commit data layer**

---

### Task 3: 2D Spring-Force Citation Graph Engine
**Files:**
- Create: `components/graph/CitationCanvas.tsx`, `components/graph/useGraphPhysics.ts`, `components/graph/GraphControls.tsx`, `components/graph/PaperDetailDrawer.tsx`
- Test: Verify canvas rendering, zoom/pan transforms, and node drag interactions without frame drops.

**Interfaces:**
- Consumes: `AcademicPaper[]`, `CitationLink[]` from Task 2.
- Produces: Interactive `<CitationCanvas />` component with spring physics, node halos, citation arrows, and inspect callback on node select.

- [ ] **Step 1: Implement vector math and spring-force physics engine in `useGraphPhysics.ts`**
- [ ] **Step 2: Implement HTML5 Canvas renderer with glow shaders, cluster colors, and directional links**
- [ ] **Step 3: Implement mouse drag, click selection, wheel zoom, and pan controls**
- [ ] **Step 4: Implement `<PaperDetailDrawer />` showing paper abstract, methodology, metrics, and citations**
- [ ] **Step 5: Verify canvas 60fps performance and commit**

---

### Task 4: Trend Velocity & Citation Gap Visualizations
**Files:**
- Create: `components/workbench/VisualWorkbench.tsx`, `components/workbench/TrendVelocityView.tsx`, `components/workbench/CitationGapMatrix.tsx`
- Test: Test tab switching and dynamic chart calculations.

**Interfaces:**
- Consumes: `DomainDataset`, active view tab state.
- Produces: `<VisualWorkbench />` encapsulating Graph View, Trend Velocity, and Citation Gaps.

- [ ] **Step 1: Implement `<TrendVelocityView />` with historical trajectories (2020-2026), velocity badges, and growth indicators**
- [ ] **Step 2: Implement `<CitationGapMatrix />` highlighting unexplored research intersections with hypothesis cards**
- [ ] **Step 3: Assemble `<VisualWorkbench />` with animated tab headers and HUD status overlays**
- [ ] **Step 4: Verify rendering and commit**

---

### Task 5: Left Pane - Multimodal Source Ingestion & Library
**Files:**
- Create: `components/library/SourceLibraryPane.tsx`, `components/library/PaperCard.tsx`, `components/library/PdfDropzone.tsx`, `components/library/DomainSwitcher.tsx`
- Test: Test paper search, filter by year/cluster, and mock PDF drag-and-drop parsing.

**Interfaces:**
- Consumes: `DomainDataset`, selected paper ID, active domain key.
- Produces: `<SourceLibraryPane />` with live search, filters, domain switcher, and PDF dropzone.

- [ ] **Step 1: Implement `<DomainSwitcher />` with icons and active counters**
- [ ] **Step 2: Implement `<PdfDropzone />` with simulated PDF parsing and claim extraction**
- [ ] **Step 3: Implement `<PaperCard />` list with real-time query filtering and year slider**
- [ ] **Step 4: Integrate into `<SourceLibraryPane />` and commit**

---

### Task 6: Right Pane - Multi-Agent Synthesis Workbench
**Files:**
- Create: `components/synthesis/SynthesisPane.tsx`, `components/synthesis/AgentPipelineTracker.tsx`, `components/synthesis/GraniteChatConsole.tsx`, `components/synthesis/LiteratureReviewView.tsx`, `components/synthesis/ExportModal.tsx`
- Test: Test review generation, chat RAG citations, and markdown/BibTeX export.

**Interfaces:**
- Consumes: Current paper library, selected paper, active domain.
- Produces: `<SynthesisPane />` with live agent steps, RAG chat, automated review generator, and export modal.

- [ ] **Step 1: Implement `<AgentPipelineTracker />` showing the 4 sequential agents with animated status pills**
- [ ] **Step 2: Implement `<GraniteChatConsole />` with contextual RAG queries and clickable source references**
- [ ] **Step 3: Implement `<LiteratureReviewView />` generating formatted executive summary, taxonomy table, and open gaps**
- [ ] **Step 4: Implement `<ExportModal />` supporting Markdown download, BibTeX copy, and print styling**
- [ ] **Step 5: Integrate into `<SynthesisPane />` and commit**

---

### Task 7: Watsonx / Granite Model Config Modal & App Shell
**Files:**
- Create: `components/layout/StudioHeader.tsx`, `components/modals/WatsonxConfigModal.tsx`, `app/page.tsx`
- Test: Verify modal state, mock/live API key persistence in `localStorage`, and header actions.

**Interfaces:**
- Produces: Complete unified research studio shell tying all 3 panes together.

- [ ] **Step 1: Implement `<StudioHeader />` with brand logo, domain shortcuts, and configuration triggers**
- [ ] **Step 2: Implement `<WatsonxConfigModal />` for IBM Granite model selection, API key configuration, and prompt inspection**
- [ ] **Step 3: Wire full state management in `app/page.tsx`**
- [ ] **Step 4: Verify build and commit**

---

### Task 8: End-to-End Verification & Polish
**Files:**
- Modify: Performance tuning, CSS micro-interactions, responsive styling
- Test: `npm run build`, linting, interaction testing

- [ ] **Step 1: Run production build `npm run build`**
- [ ] **Step 2: Verify zero console errors, smooth canvas interactions, and full feature workflow**
- [ ] **Step 3: Final commit and summary**
