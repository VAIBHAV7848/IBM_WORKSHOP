import { DomainDataset } from '@/types/academic';

export const quantumDataset: DomainDataset = {
  key: 'quantum-computing',
  label: 'Quantum Computing & QML',
  subtitle: 'NISQ Optimization, Quantum Neural Networks, and Error Mitigation',
  description: 'Academic literature analyzing quantum circuit compilation, variational quantum algorithms, and hybrid classical-quantum machine learning.',
  papers: [
    {
      id: 'ibm-heron-processor',
      title: 'Evidence for the Utility of Quantum Computing Before Fault Tolerance with IBM Heron',
      authors: ['IBM Quantum Team', 'Y. Kim', 'A. Eddins'],
      year: 2024,
      domain: 'quantum-computing',
      venue: 'Nature & IBM Quantum Report',
      abstract: 'We report experimental quantum simulations exceeding classical brute-force exact calculation limits using 133-qubit Heron processors equipped with tunable couplers and Zero-Noise Extrapolation error mitigation.',
      citationsCount: 680,
      cluster: 'Quantum Hardware & Architecture',
      clusterColor: '#0f62fe',
      keyFindings: [
        '5x error reduction over previous Eagle processors via tunable couplers',
        'Validates utility-scale quantum calculations on 100+ qubit systems',
        'Enables practical hybrid algorithms paired with classical HPC clusters'
      ],
      methodology: 'Pulse-level calibration and tensor network verification against heavy-hex layout architectures.',
      citations: ['vqe-molecular-ground-state', 'zero-noise-extrapolation'],
      tags: ['IBM Quantum', 'Heron', 'Quantum Utility', 'Superconducting Qubits']
    },
    {
      id: 'vqe-molecular-ground-state',
      title: 'Variational Quantum Eigensolver for Electronic Structure Calculation',
      authors: ['Alberto Peruzzo', 'Jarrod McClean', 'Peter Shadbolt', 'Alán Aspuru-Guzik', 'Jeremy L. O’Brien'],
      year: 2022,
      domain: 'quantum-computing',
      venue: 'Nature Communications',
      abstract: 'A hybrid quantum-classical algorithm designed to find the lowest eigenvalue of a molecular Hamiltonian using shallow parameterized quantum circuits.',
      citationsCount: 3120,
      cluster: 'Variational Algorithms',
      clusterColor: '#8a3ffc',
      keyFindings: [
        'Resilient to coherent noise due to classical optimization in the outer loop',
        'Demonstrates quantum advantage pathway for chemical catalyst discovery',
        'Standard benchmark for all NISQ molecular simulations'
      ],
      methodology: 'Unitary Coupled Cluster (UCC) ansatz optimization using Nelder-Mead and SPSA classical optimizers.',
      citations: [],
      tags: ['VQE', 'Molecular Simulation', 'Hybrid Quantum-Classical']
    },
    {
      id: 'zero-noise-extrapolation',
      title: 'Zero-Noise Extrapolation for Error-Mitigated Quantum Computation',
      authors: ['Kristan Temme', 'Sergey Bravyi', 'Jay M. Gambetta'],
      year: 2023,
      domain: 'quantum-computing',
      venue: 'Physical Review Letters',
      abstract: 'We introduce an error mitigation technique that artificially amplifies circuit noise at calibrated scale factors and extrapolates expectation values to the theoretical zero-noise limit without physical qubit overhead.',
      citationsCount: 1450,
      cluster: 'Quantum Error Mitigation',
      clusterColor: '#009d9a',
      keyFindings: [
        'Enables high-fidelity expectation value calculation without quantum error correction codes',
        'Polynomial scaling overhead compared to exponential fault-tolerance costs',
        'Fundamental prerequisite for IBM Heron 100+ qubit utility calculations'
      ],
      methodology: 'Pulse stretching and unitary folding noise amplification with polynomial Richardson extrapolation.',
      citations: [],
      tags: ['Error Mitigation', 'ZNE', 'NISQ', 'Noise Scaling']
    },
    {
      id: 'barren-plateaus-qnn',
      title: 'Barren Plateaus in Quantum Neural Network Training Landscapes',
      authors: ['Jarrod R. McClean', 'Sergio Boixo', 'Vadim N. Smelyanskiy', 'Ryan Babbush', 'Hartmut Neven'],
      year: 2023,
      domain: 'quantum-computing',
      venue: 'Nature Communications',
      abstract: 'We prove that random parameterized quantum circuits exhibit exponentially vanishing gradients with respect to system size, presenting a fundamental bottleneck for Quantum Neural Networks.',
      citationsCount: 1890,
      cluster: 'Quantum Machine Learning',
      clusterColor: '#fa4d56',
      keyFindings: [
        'Gradients vanish exponentially $O(2^{-n})$ with increasing qubit count $n$',
        'Requires localized cost functions and symmetry-preserving ansatz designs to train',
        'Shapes all modern QML architecture proposals'
      ],
      methodology: 'Haar measure integration over 2-design unitary groups and analytic variance calculation.',
      citations: ['vqe-molecular-ground-state'],
      tags: ['QML', 'Barren Plateaus', 'Gradients', 'Ansatz Design']
    }
  ],
  links: [
    { source: 'ibm-heron-processor', target: 'vqe-molecular-ground-state', strength: 4, type: 'thematic' },
    { source: 'ibm-heron-processor', target: 'zero-noise-extrapolation', strength: 5, type: 'direct' },
    { source: 'barren-plateaus-qnn', target: 'vqe-molecular-ground-state', strength: 4, type: 'methodological' }
  ],
  trends: [
    {
      id: 'trend-quantum-utility',
      topic: 'Quantum Utility & Hardware Mitigation',
      growthRate: 260,
      trajectory: [
        { year: 2021, papersCount: 50 },
        { year: 2022, papersCount: 110 },
        { year: 2023, papersCount: 290 },
        { year: 2024, papersCount: 820 },
        { year: 2025, papersCount: 1650 },
        { year: 2026, papersCount: 2800 }
      ],
      sentiment: 'accelerating',
      description: 'Progress from theoretical toy models to utility-scale 100+ qubit calculations with Zero-Noise Extrapolation.',
      keyCatalysts: ['IBM Heron', 'Dynamical Decoupling', 'Tensor-Network Classical Verifiers']
    },
    {
      id: 'trend-qml-ansatz',
      topic: 'Geometric & Equivariant QML Ansätze',
      growthRate: 195,
      trajectory: [
        { year: 2021, papersCount: 35 },
        { year: 2022, papersCount: 85 },
        { year: 2023, papersCount: 210 },
        { year: 2024, papersCount: 540 },
        { year: 2025, papersCount: 980 },
        { year: 2026, papersCount: 1720 }
      ],
      sentiment: 'emerging',
      description: 'Designing Barren-Plateau-free circuits utilizing Lie algebra symmetries and geometric priors.',
      keyCatalysts: ['Geometric Quantum ML', 'Hamiltonian Equivariance', 'Local Cost Functions']
    }
  ],
  gaps: [
    {
      id: 'gap-quantum-llm-fine-tuning',
      title: 'Parameterized Quantum Circuits for Compact LLM LoRA Fine-Tuning',
      unexploredIntersection: ['IBM Heron Quantum Circuits', 'LoRA Low-Rank Adaptation', 'Barren Plateau Mitigation'],
      opportunityScore: 89,
      feasibility: 'Medium',
      rationale: 'While classical LoRA reduces fine-tuning parameters, quantum states naturally encode high-dimensional orthogonal subspace projections that remain unexplored for LLM adapter weights.',
      suggestedHypothesis: 'Encoding LoRA rank-4 update matrices in a 16-qubit Heron circuit provides higher parameter compression with equal language task retention.',
      potentialImpact: 'Establishes the first practical quantum-enhanced fine-tuning pipeline for enterprise foundation models.'
    }
  ]
};
