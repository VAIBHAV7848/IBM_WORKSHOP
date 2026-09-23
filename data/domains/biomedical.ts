import { DomainDataset } from '@/types/academic';

export const biomedicalDataset: DomainDataset = {
  key: 'biomedical-ai',
  label: 'Biomedical AI & Genomics',
  subtitle: 'Structural Biology, Clinical Transformers, and Single-Cell Genomics',
  description: 'Frontier literature on biomolecular structure prediction, clinical diagnostic foundation models, and therapeutic target identification.',
  papers: [
    {
      id: 'alphafold-3-biomolecular',
      title: 'Accurate Structure Prediction of Biomolecular Interactions with AlphaFold 3',
      authors: ['Josh Abramson', 'Jonas Adler', 'Jack Dunger', 'John Jumper', 'Demis Hassabis'],
      year: 2024,
      domain: 'biomedical-ai',
      venue: 'Nature 2024',
      abstract: 'AlphaFold 3 predicts 3D coordinates across proteins, nucleic acids, small molecules, ions, and chemical modifications using a unified diffusion-based architecture.',
      citationsCount: 1650,
      cluster: 'Structural Biology',
      clusterColor: '#009d9a',
      keyFindings: [
        '50% improvement in protein-ligand binding pose prediction compared to docking software',
        'Direct diffusion architecture replaces specialized structural modules',
        'Unlocks high-throughput in silico drug discovery'
      ],
      methodology: 'Pairformer representation paired with 3D coordinate diffusion conditioned on primary sequences.',
      citations: ['esm-metagenomic-structures'],
      tags: ['AlphaFold 3', 'Diffusion', 'Structural Biology', 'Drug Discovery']
    },
    {
      id: 'esm-metagenomic-structures',
      title: 'Evolutionary Scale Language Models for Metagenomic Protein Structures',
      authors: ['Zeming Lin', 'Halil Akin', 'Roshan Rao', 'Brian Hie', 'Alexander Rives'],
      year: 2023,
      domain: 'biomedical-ai',
      venue: 'Science 2023',
      abstract: 'ESM-2 language models learn evolutionary patterns directly from unaligned protein sequences, enabling ultra-fast atomic structure prediction across hundreds of millions of metagenomic proteins.',
      citationsCount: 2310,
      cluster: 'Protein Language Models',
      clusterColor: '#0f62fe',
      keyFindings: [
        '60x faster inference than MSA-dependent architectures',
        'Uncovers billions of years of structural evolution in dark proteome sequences',
        'Zero-shot mutation effect predictions match deep mutational scanning'
      ],
      methodology: '15B parameter masked language modeling trained on UniRef sequences with invariant coordinate heads.',
      citations: [],
      tags: ['ESM-2', 'Protein LM', 'Metagenomics', 'Zero-Shot']
    },
    {
      id: 'clinical-camembert-medqa',
      title: 'Med-PaLM 2 and Clinical Foundation Models for Healthcare Diagnostic QA',
      authors: ['Karan Singhal', 'Tao Tu', 'Juraj Gottweis', 'Vivek Natarajan'],
      year: 2023,
      domain: 'biomedical-ai',
      venue: 'Nature Medicine',
      abstract: 'We present expert-level medical question answering using clinical instruction tuning and reinforcement learning from human clinician feedback, surpassing 86.5% on USMLE-style questions.',
      citationsCount: 1780,
      cluster: 'Clinical NLP & Diagnostics',
      clusterColor: '#8a3ffc',
      keyFindings: [
        'Exceeds passing score on US medical licensing exams with physician-validated reasoning',
        'Identifies subtle contraindicated drug-drug interactions in multi-morbid patients',
        'Demonstrates importance of clinician-aligned alignment guardrails'
      ],
      methodology: 'Instruction-tuning on clinical datasets with clinician-evaluated consensus ranking.',
      citations: [],
      tags: ['Clinical NLP', 'Med-PaLM', 'Healthcare AI', 'Medical QA']
    }
  ],
  links: [
    { source: 'alphafold-3-biomolecular', target: 'esm-metagenomic-structures', strength: 5, type: 'direct' }
  ],
  trends: [
    {
      id: 'trend-diffusion-structural',
      topic: 'Diffusion-Based Biomolecular Modeling',
      growthRate: 310,
      trajectory: [
        { year: 2021, papersCount: 40 },
        { year: 2022, papersCount: 90 },
        { year: 2023, papersCount: 310 },
        { year: 2024, papersCount: 940 },
        { year: 2025, papersCount: 1980 },
        { year: 2026, papersCount: 3400 }
      ],
      sentiment: 'accelerating',
      description: 'Shift from MSA-dependent invariant transformers to generative full-complex 3D diffusion.',
      keyCatalysts: ['AlphaFold 3', 'RFdiffusion', 'Chroma']
    }
  ],
  gaps: [
    {
      id: 'gap-granite-clinical-rag',
      title: 'Real-Time Clinical Decision Support with Granite 3.0 & Verified Medical KG',
      unexploredIntersection: ['Granite 3.0 Enterprise Models', 'Clinical Trial RAG', 'Knowledge Graph Verification'],
      opportunityScore: 93,
      feasibility: 'High',
      rationale: 'Current medical LLMs hallucinate dosage recommendations. Fusing Granite 3.0 function calling with verified OpenTargets and FDA knowledge graphs produces verifiable audit trails for hospital EMRs.',
      suggestedHypothesis: 'Constraining Granite function-calling to strictly typed clinical ontology schemas eliminates drug interaction hallucination with 99.9% precision.',
      potentialImpact: 'Accelerates regulatory clearance for AI-assisted clinical trial matching and patient encounter summarization.'
    }
  ]
};
