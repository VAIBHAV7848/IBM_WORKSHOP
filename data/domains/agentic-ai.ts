import { DomainDataset } from '@/types/academic';

export const agenticAiDataset: DomainDataset = {
  key: 'agentic-ai',
  label: 'Agentic AI & Granite LLMs',
  subtitle: 'Autonomous Reasoning, RAG Pipelines, and Multi-Agent Orchestration',
  description: 'Frontier research on autonomous agents, self-reflective RAG, tool use, and IBM Granite enterprise foundation architectures.',
  papers: [
    {
      id: 'granite-3-tech-report',
      title: 'Granite 3.0 Language Models: Architecture, Training & Enterprise Safety',
      authors: ['IBM Research Team', 'Granite Core Group'],
      year: 2024,
      domain: 'agentic-ai',
      venue: 'IBM Whitepaper & arXiv:2410.12345',
      abstract: 'We present Granite 3.0, a family of 2B and 8B parameter models specifically pre-trained and instruction-tuned for enterprise tasks, function calling, agentic tool invocation, and low-latency reasoning. Granite 3.0 demonstrates state-of-the-art throughput and safety on enterprise benchmarks while minimizing compute footprint.',
      citationsCount: 428,
      cluster: 'Enterprise Foundation Models',
      clusterColor: '#0f62fe', // IBM Blue
      keyFindings: [
        'Outperforms Llama 3.1 8B on enterprise tool-use and structured JSON extraction by 14.2%',
        'Trained on 12T tokens with strict IP screening and enterprise safety alignment',
        'Native support for multi-step Langflow and Agentic Lab tool loops'
      ],
      methodology: 'Curated 12T token multi-lingual pretraining followed by multi-stage DPO and function-calling synthetic bootstrap.',
      citations: ['react-reasoning-acting', 'chain-of-thought-reasoning', 'toolformer-tools'],
      tags: ['IBM Granite', 'Enterprise AI', 'Tool Calling', 'Foundation Models']
    },
    {
      id: 'react-reasoning-acting',
      title: 'ReAct: Synergizing Reasoning and Acting in Language Models',
      authors: ['Shunyu Yao', 'Jeffrey Zhao', 'Dian Yu', 'Nan Du', 'Izhak Shafran', 'Karthik Narasimhan'],
      year: 2023,
      domain: 'agentic-ai',
      venue: 'ICLR 2023',
      abstract: 'We explore using LLMs to generate both reasoning traces and task-specific actions in an interleaved manner. Reasoning traces help the model induce, track, and update action plans as well as handle exceptions, while actions allow it to interface with external knowledge bases or environments.',
      citationsCount: 2840,
      cluster: 'Reasoning & Planning',
      clusterColor: '#8a3ffc', // Purple
      keyFindings: [
        'Interleaving thought and observation reduces hallucination rates in multi-hop QA by 27%',
        'Significantly improves human interpretability and auditability of agent decisions',
        'Serves as the foundational baseline for modern Langflow agent node chains'
      ],
      methodology: 'Prompt-based iterative Thought-Action-Observation loops across HotpotQA and ALFWorld environments.',
      citations: ['chain-of-thought-reasoning'],
      tags: ['ReAct', 'Agentic Loops', 'Prompting', 'Planning']
    },
    {
      id: 'self-rag-reflection',
      title: 'Self-RAG: Learning to Retrieve, Generate, and Critique through Self-Reflection',
      authors: ['Akari Asai', 'Zeqiu Wu', 'Yizhong Wang', 'Avirup Sil', 'Hannaneh Hajishirzi'],
      year: 2024,
      domain: 'agentic-ai',
      venue: 'ICLR 2024 (Oral)',
      abstract: 'Self-RAG is a framework that trains a single arbitrary language model to selectively retrieve information, generate answers, and generate reflection tokens that critique whether retrieval is needed and evaluate generation factuality.',
      citationsCount: 1120,
      cluster: 'Adaptive RAG',
      clusterColor: '#009d9a', // Teal
      keyFindings: [
        'Dynamic retrieval thresholding avoids unnecessary retrieval calls, cutting latency by 45%',
        'Reflection tokens ([Retrieve], [IsRel], [IsSup]) ensure verifiable factual ground truth',
        'Consistently outperforms conventional dense retrieval RAG across open-domain QA'
      ],
      methodology: 'Critic model distillation and supervised fine-tuning with reflection tokens on retrieval-grounded tasks.',
      citations: ['react-reasoning-acting', 'toolformer-tools'],
      tags: ['RAG', 'Self-Reflection', 'Factuality', 'Adaptive Retrieval']
    },
    {
      id: 'toolformer-tools',
      title: 'Toolformer: Language Models Can Teach Themselves to Use Tools',
      authors: ['Timo Schick', 'Jane Dwivedi-Yu', 'Roberto Dessì', 'Roberta Raileanu', 'Thomas Scialom'],
      year: 2023,
      domain: 'agentic-ai',
      venue: 'NeurIPS 2023',
      abstract: 'We introduce Toolformer, a model trained to decide which APIs to call, when to call them, what arguments to pass, and how to best incorporate the results into future token prediction. The training is performed in a self-supervised fashion.',
      citationsCount: 1980,
      cluster: 'Tool Augmentation',
      clusterColor: '#1192e8', // Cyan
      keyFindings: [
        'Enables language models to call external calculators, Q&A systems, and search engines seamlessly',
        'Zero-shot performance improves across arithmetic, date comprehension, and translation',
        'Provides theoretical framework for modern agent tool-calling APIs'
      ],
      methodology: 'Self-supervised API call annotation via loss filtering and in-context execution verification.',
      citations: ['chain-of-thought-reasoning'],
      tags: ['Tool Use', 'API Calling', 'Self-Supervised', 'External Tools']
    },
    {
      id: 'chain-of-thought-reasoning',
      title: 'Chain-of-Thought Prompting Elicits Reasoning in Large Language Models',
      authors: ['Jason Wei', 'Xuezhi Wang', 'Dale Schuurmans', 'Maarten Bosma', 'Ed Chi', 'Quoc Le', 'Denny Zhou'],
      year: 2022,
      domain: 'agentic-ai',
      venue: 'NeurIPS 2022',
      abstract: 'We explore how generating a chain of thought—a series of intermediate reasoning steps—significantly improves the ability of large language models to perform complex reasoning.',
      citationsCount: 7850,
      cluster: 'Reasoning & Planning',
      clusterColor: '#8a3ffc',
      keyFindings: [
        'Emergent capability in models >50B parameters on multi-step math and symbolic tasks',
        'Requires no finetuning; purely prompt-driven cognitive decomposition',
        'Core pillar for all downstream multi-agent breakdown architectures'
      ],
      methodology: 'Few-shot demonstration prompt engineering across GSM8K, SVAMP, and commonsense reasoning benchmarks.',
      citations: [],
      tags: ['Chain of Thought', 'Emergent Reasoning', 'Foundational']
    },
    {
      id: 'langflow-orchestration',
      title: 'Langflow: Visual Workflow Synthesis for Declarative Multi-Agent Systems',
      authors: ['Gabriel de Oliveira', 'Rodrigo Nader', 'Langflow Engineering Consortium'],
      year: 2024,
      domain: 'agentic-ai',
      venue: 'arXiv:2404.09876',
      abstract: 'Langflow establishes a visual, graph-based programming environment for composing generative AI components, autonomous agents, vector databases, and prompt memory. We analyze its graph execution engine, dynamic schema generation, and integration with enterprise LLM runtimes including IBM watsonx.',
      citationsCount: 310,
      cluster: 'Agent Frameworks & Tools',
      clusterColor: '#fa4d56', // Red/Coral
      keyFindings: [
        'Reduces multi-agent prototype development time from days to minutes through visual DAG routing',
        'Stateful node execution preserves intermediate memory buffers across asynchronous agent calls',
        'Seamless integration with watsonx.ai Granite 3.0 inference endpoints'
      ],
      methodology: 'Directed Acyclic Graph (DAG) topological sorting with asynchronous reactive streaming execution.',
      citations: ['react-reasoning-acting', 'toolformer-tools', 'self-rag-reflection'],
      tags: ['Langflow', 'Visual Programming', 'Multi-Agent', 'Orchestration']
    },
    {
      id: 'reflexion-verbal-rl',
      title: 'Reflexion: Language Agents with Verbal Reinforcement Learning',
      authors: ['Noah Shinn', 'Federico Cassano', 'Edward Berman', 'Ashwin Gopinath', 'Karthik Narasimhan', 'Shunyu Yao'],
      year: 2023,
      domain: 'agentic-ai',
      venue: 'NeurIPS 2023',
      abstract: 'Reflexion converts scalar environmental feedback into natural language self-reflective evaluations, which are recorded in an episodic memory buffer to induce better decision-making in subsequent trials.',
      citationsCount: 1490,
      cluster: 'Adaptive RAG',
      clusterColor: '#009d9a',
      keyFindings: [
        'Achieves 91% pass@1 on HumanEval through self-reflection without parameter updates',
        'Episodic memory buffers allow agents to learn from execution errors across sessions',
        'Complementary to RAG for long-horizon task execution'
      ],
      methodology: 'Actor-Evaluator-Self-Reflection tri-agent architecture tested on AlfWorld and HumanEval.',
      citations: ['react-reasoning-acting'],
      tags: ['Reflexion', 'Verbal RL', 'Self-Correction', 'Agent Memory']
    },
    {
      id: 'granite-guardian-safety',
      title: 'Granite Guardian: Real-Time Risk & Jailbreak Mitigation in Agentic Workflows',
      authors: ['IBM Research AI Ethics & Safety Lab'],
      year: 2024,
      domain: 'agentic-ai',
      venue: 'IBM Research Preprint',
      abstract: 'Agentic workflows that interact with external APIs present novel attack surfaces such as indirect prompt injection and hallucinated API arguments. Granite Guardian provides an enterprise guardrail model for real-time monitoring and threat containment.',
      citationsCount: 185,
      cluster: 'Enterprise Foundation Models',
      clusterColor: '#0f62fe',
      keyFindings: [
        'Detects indirect prompt injection in retrieval contexts with 98.4% precision',
        'Sub-15ms classification overhead enables synchronous inline gating',
        'Protects multi-agent communication pipelines from adversarial message tampering'
      ],
      methodology: 'Contrastive alignment on adversarial synthetic attack vectors targeting RAG and tool calls.',
      citations: ['granite-3-tech-report', 'self-rag-reflection'],
      tags: ['AI Safety', 'Guardrails', 'Granite', 'Enterprise Security']
    }
  ],
  links: [
    { source: 'granite-3-tech-report', target: 'react-reasoning-acting', strength: 4, type: 'methodological' },
    { source: 'granite-3-tech-report', target: 'toolformer-tools', strength: 5, type: 'direct' },
    { source: 'granite-3-tech-report', target: 'chain-of-thought-reasoning', strength: 3, type: 'thematic' },
    { source: 'react-reasoning-acting', target: 'chain-of-thought-reasoning', strength: 5, type: 'direct' },
    { source: 'self-rag-reflection', target: 'react-reasoning-acting', strength: 4, type: 'thematic' },
    { source: 'self-rag-reflection', target: 'toolformer-tools', strength: 3, type: 'methodological' },
    { source: 'toolformer-tools', target: 'chain-of-thought-reasoning', strength: 4, type: 'direct' },
    { source: 'langflow-orchestration', target: 'react-reasoning-acting', strength: 5, type: 'direct' },
    { source: 'langflow-orchestration', target: 'toolformer-tools', strength: 4, type: 'thematic' },
    { source: 'langflow-orchestration', target: 'self-rag-reflection', strength: 4, type: 'methodological' },
    { source: 'reflexion-verbal-rl', target: 'react-reasoning-acting', strength: 5, type: 'direct' },
    { source: 'granite-guardian-safety', target: 'granite-3-tech-report', strength: 5, type: 'direct' },
    { source: 'granite-guardian-safety', target: 'self-rag-reflection', strength: 3, type: 'thematic' }
  ],
  trends: [
    {
      id: 'trend-agentic-tooling',
      topic: 'Agentic Function Calling & Tool Routing',
      growthRate: 342,
      trajectory: [
        { year: 2021, papersCount: 45 },
        { year: 2022, papersCount: 130 },
        { year: 2023, papersCount: 520 },
        { year: 2024, papersCount: 1480 },
        { year: 2025, papersCount: 3200 },
        { year: 2026, papersCount: 5400 }
      ],
      sentiment: 'accelerating',
      description: 'Shift from single-turn chat completion toward autonomous models executing deterministic multi-step tool graphs.',
      keyCatalysts: ['Toolformer', 'Granite 3.0 Tool Calling', 'OpenAI Function Calling', 'Langflow Visual DAGs']
    },
    {
      id: 'trend-self-reflective-rag',
      topic: 'Self-Reflective & Adaptive RAG',
      growthRate: 218,
      trajectory: [
        { year: 2021, papersCount: 80 },
        { year: 2022, papersCount: 210 },
        { year: 2023, papersCount: 680 },
        { year: 2024, papersCount: 1950 },
        { year: 2025, papersCount: 3800 },
        { year: 2026, papersCount: 5900 }
      ],
      sentiment: 'accelerating',
      description: 'Transition from naive top-k vector retrieval to dynamic verification tokens and self-critique loops.',
      keyCatalysts: ['Self-RAG', 'Corrective RAG (CRAG)', 'Graph RAG', 'Hybrid Dense-Sparse Ingestion']
    },
    {
      id: 'trend-enterprise-guardrails',
      topic: 'Agent Guardrails & Adversarial Immunity',
      growthRate: 185,
      trajectory: [
        { year: 2021, papersCount: 30 },
        { year: 2022, papersCount: 95 },
        { year: 2023, papersCount: 310 },
        { year: 2024, papersCount: 890 },
        { year: 2025, papersCount: 1840 },
        { year: 2026, papersCount: 3100 }
      ],
      sentiment: 'maturing',
      description: 'Hardening multi-agent message fabrics against indirect prompt injections and data leaks.',
      keyCatalysts: ['Granite Guardian', 'Llama Guard', 'NeMo Guardrails', 'Constitutional AI']
    },
    {
      id: 'trend-static-prompting',
      topic: 'Static Single-Prompt Engineering',
      growthRate: -38,
      trajectory: [
        { year: 2021, papersCount: 320 },
        { year: 2022, papersCount: 850 },
        { year: 2023, papersCount: 1100 },
        { year: 2024, papersCount: 780 },
        { year: 2025, papersCount: 460 },
        { year: 2026, papersCount: 290 }
      ],
      sentiment: 'saturated',
      description: 'Manual prompt crafting is being replaced by automatic DSPy teleprompters and dynamic agentic decomposition.',
      keyCatalysts: ['DSPy Optimization', 'Reinforcement Learning with Verifiable Rewards', 'System-Level Orchestration']
    }
  ],
  gaps: [
    {
      id: 'gap-on-device-rag',
      title: 'Sub-50ms On-Device Granite 3.0 Adaptive RAG',
      unexploredIntersection: ['Granite 3.0 2B', 'Self-RAG Reflection Tokens', 'Quantized Vector Search'],
      opportunityScore: 94,
      feasibility: 'High',
      rationale: 'While Self-RAG excels on cloud clusters and Granite 3.0 has a compact 2B variant, literature lacks studies optimizing reflection token generation on edge NPU hardware without latency penalties.',
      suggestedHypothesis: 'Fusing 4-bit INT4 quantized Granite 2B with localized HNSW vector indices reduces reflection critique latency to <35ms on consumer devices with zero loss in factuality.',
      potentialImpact: 'Enables privacy-preserving, enterprise-grade offline research agents on laptops and air-gapped workstations.'
    },
    {
      id: 'gap-multi-agent-verification',
      title: 'Formal Verification of Multi-Agent Communication Loops',
      unexploredIntersection: ['Langflow DAG Workflows', 'Reflexion Verbal RL', 'Formal Protocol Verification'],
      opportunityScore: 88,
      feasibility: 'Medium',
      rationale: 'Existing multi-agent frameworks suffer from infinite conversational loops and goal drift. Current literature relies on empirical heuristics rather than formal state machine guarantees.',
      suggestedHypothesis: 'Encoding Langflow inter-agent message contracts as temporal logic state invariants guarantees termination and bounding error propagation within N-step horizon.',
      potentialImpact: 'Provides mission-critical reliability certifications required by defense, aerospace, and banking institutions.'
    },
    {
      id: 'gap-multimodal-scientific-rag',
      title: 'Bimodal Knowledge Graphs Fusing Math Formulations & Text Papers',
      unexploredIntersection: ['Self-RAG', 'LaTeX AST Parsers', 'Citation Topology Graph'],
      opportunityScore: 91,
      feasibility: 'High',
      rationale: 'Current academic RAG systems treat equations and diagrams as plain text or OCR artifacts, ignoring semantic algebraic equivalence between cited papers.',
      suggestedHypothesis: 'Constructing dual graph embeddings linking paper claims to symbolic equation syntax trees increases cross-paper mathematical reasoning accuracy by >35%.',
      potentialImpact: 'Accelerates automated literature discovery in theoretical physics, cryptography, and quantitative finance.'
    }
  ]
};
