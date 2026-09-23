# IBM watsonx.ai LangFlow Research Agent Studio

> **Problem Statement No. 7: Research Agent**  
> An autonomous, high-throughput academic research companion featuring a 60fps 2D spring-force citation graph, predictive research velocity trajectories, algorithmic citation gap detection, and real-time multi-agent literature review synthesis powered by IBM Granite and Groq LPUs.

---

## 🌟 Overview & Architecture

Modern academic research requires sifting through thousands of fragmented papers, preprints, and conference proceedings. The **LangFlow Research Agent Studio** automates this lifecycle by translating static academic literature into an interactive, multi-agent intelligence workspace:

1. **Multimodal Academic Ingestion**: Ingests PDF research papers, conference preprints, and user notes via AST extraction, automatically resolving references and constructing citation graph nodes.
2. **2D Spring-Force Citation Canvas**: Custom HTML5 Canvas physics engine executing at 60fps with Coulomb repulsion, Hooke's spring attraction, and cluster coloring.
3. **Emerging Velocity & Trend Radar**: Models 5-year historical trajectories (2021–2026) across key paradigms, identifying surging versus saturated research topics.
4. **Citation Gap & Opportunity Matrix**: Algorithms detect white spaces across citation topologies, formulating high-impact research hypotheses and feasibility scores.
5. **Multi-Agent Literature Synthesis**: Orchestrates a 4-agent pipeline (`AST Ingestion` → `Citation Graph` → `Gap Detector` → `RAG Reasoner`) providing grounded conversational dialogue and 1-click peer-review-ready literature reviews.

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│                             IBM watsonx.ai LangFlow Research Studio                              │
├─────────────────────────┬────────────────────────────────────────────┬───────────────────────────┤
│    SOURCE INGESTION     │           VISUAL WORKBENCH                 │   MULTI-AGENT SYNTHESIS   │
│                         │                                            │                           │
│ • Domain Presets:       │ ┌────────────────────────────────────────┐ │ 🤖 Agent Pipeline:        │
│   - Agentic AI & Granite│ │ 2D Spring-Force Citation Graph (60FPS) │ │   [AST] [Topology]        │
│   - Quantum Computing   │ │  - Interactive Draggable Nodes         │ │   [Gaps] [RAG Reasoner]   │
│   - Biomedical AI       │ │  - Directional Citation Links          │ ───────────────────────── │
│ • Multimodal Dropzone   │ │  - Thematic Halo Glow Shaders          │ 💬 Grounded RAG Chat:     │
│   (PDF / Text Ingestion)│ └────────────────────────────────────────┘ │  - Sub-second LPU speed   │
│ • Real-Time Filters     │ • Emerging Trends Velocity (2021-2026)   │  - Interactive Citations  │
│   (Authors, Year, Cites)│ • Citation Gap Opportunity Matrix        │ ───────────────────────── │
│                         │ • Paper Inspection Slide-over Drawer     │ 📝 Automated Review:      │
│                         │                                          │  - Comparative Benchmarks │
│                         │                                          │  - Export Markdown/BibTeX │
└─────────────────────────┴────────────────────────────────────────────┴───────────────────────────┘
```

---

## 🚀 Key Features

* **Sub-Second Live AI Inference**: Integrated with Groq LPU endpoints (`qwen/qwen3.8-27b` & `openai/gpt-oss-120b`) delivering 500+ tokens/sec live generation with automatic offline fallback.
* **Pre-Loaded Multi-Domain Corpora**:
  * **Agentic AI & Granite**: Granite 3.0, Self-RAG, ReAct, Toolformer, LangFlow DAGs, Granite Guardian.
  * **Quantum Computing & QML**: IBM Heron Utility, VQE, Zero-Noise Extrapolation (ZNE), Barren Plateaus.
  * **Biomedical AI & Genomics**: AlphaFold 3, ESM-2 Protein LMs, Clinical MedQA.
* **Interactive 2D Citation Engine**: Client-side canvas physics supporting pan, zoom, smooth drag-and-pin, and connected neighbor path tracing.
* **Structured Literature Review Generator**: Generates formatted Executive Summaries, comparative benchmark matrices, open failure modes, and predicted research directions.
* **Academic Export Suite**: 1-click export to formatted Markdown (`.md`), BibTeX references (`.bib`), or clean printable document layout.

---

## 🛠️ Tech Stack

* **Framework**: Next.js 15+ (App Router), React 19, TypeScript
* **Styling**: Tailwind CSS, Obsidian Dark Theme (`#04070d`, `#070c18`, `#0f62fe` IBM Blue)
* **Icons**: `lucide-react`
* **Graph Physics Engine**: Custom 2D HTML5 Canvas Spring-Force Engine
* **AI & Inference**: IBM Granite 3.0 & Groq LPU API (`app/api/chat`, `app/api/synthesize`)
* **Verification Suite**: Headless Chrome End-to-End Automation (`puppeteer-core`)

---

## 📦 Getting Started

### Prerequisites
* Node.js v18.0.0 or higher
* npm v9.0.0 or higher

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/VAIBHAV7848/IBM_WORKSHOP.git
   cd IBM_WORKSHOP
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
   Add your Groq API key:
   ```env
   GROQ_API_KEY=your_groq_api_key_here
   FAST_GROQ_MODEL=qwen/qwen3.8-27b
   GROQ_MODEL=openai/gpt-oss-120b
   ```
   *(Note: The studio includes full offline fallback mode with pre-indexed corpora if an API key is not supplied).*

4. **Start the development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

5. **Build for Production**:
   ```bash
   npm run build
   npm run start
   ```

---

## 🧪 Automated Verification

Run the end-to-end browser test suite verifying all 12 user interaction flows:
```bash
node scripts/verify-ui.mjs
```

---

## 📄 License
This project is open-source under the MIT License.
