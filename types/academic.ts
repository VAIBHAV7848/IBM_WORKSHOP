export type DomainKey = 'agentic-ai' | 'quantum-computing' | 'biomedical-ai';

export interface AcademicPaper {
  id: string;
  title: string;
  authors: string[];
  year: number;
  domain: DomainKey;
  venue: string;
  abstract: string;
  citationsCount: number;
  cluster: string;
  clusterColor: string; // Hex color for canvas rendering
  keyFindings: string[];
  methodology: string;
  citations: string[]; // Paper IDs this paper cites
  arxivUrl?: string;
  doi?: string;
  tags: string[];
}

export interface CitationLink {
  source: string; // Paper ID
  target: string; // Paper ID
  strength: number; // 1 to 5
  type: 'direct' | 'thematic' | 'methodological';
}

export interface ResearchTrend {
  id: string;
  topic: string;
  growthRate: number; // Percentage e.g. +312%
  trajectory: { year: number; papersCount: number }[];
  sentiment: 'accelerating' | 'emerging' | 'maturing' | 'saturated';
  description: string;
  keyCatalysts: string[];
}

export interface CitationGap {
  id: string;
  title: string;
  unexploredIntersection: string[];
  opportunityScore: number; // 0 - 100
  feasibility: 'High' | 'Medium' | 'Moonshot';
  rationale: string;
  suggestedHypothesis: string;
  potentialImpact: string;
}

export interface DomainDataset {
  key: DomainKey;
  label: string;
  subtitle: string;
  description: string;
  papers: AcademicPaper[];
  links: CitationLink[];
  trends: ResearchTrend[];
  gaps: CitationGap[];
}

export type AgentStepStatus = 'idle' | 'running' | 'completed' | 'failed';

export interface AgentStep {
  id: string;
  name: string;
  agentRole: string;
  status: AgentStepStatus;
  latencyMs?: number;
  details?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  citations?: string[]; // IDs of papers cited
  timestamp: string;
  model?: string;
}

export interface LiteratureReviewSection {
  title: string;
  content: string;
  citations: string[];
}

export interface LiteratureReview {
  id: string;
  domain: DomainKey;
  generatedAt: string;
  model: string;
  title: string;
  executiveSummary: string;
  sections: LiteratureReviewSection[];
  benchmarkTable: {
    system: string;
    benchmark: string;
    accuracy: string;
    latency: string;
    referenceId: string;
  }[];
  openChallenges: string[];
  futureDirections: string[];
}
