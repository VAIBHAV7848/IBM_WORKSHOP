import { DomainDataset, DomainKey } from '@/types/academic';
import { agenticAiDataset } from './agentic-ai';
import { quantumDataset } from './quantum';
import { biomedicalDataset } from './biomedical';

export const ALL_DOMAINS: Record<DomainKey, DomainDataset> = {
  'agentic-ai': agenticAiDataset,
  'quantum-computing': quantumDataset,
  'biomedical-ai': biomedicalDataset,
};

export const DOMAIN_OPTIONS: { key: DomainKey; label: string; badge: string }[] = [
  { key: 'agentic-ai', label: 'Agentic AI & Granite', badge: 'Featured' },
  { key: 'quantum-computing', label: 'Quantum Computing', badge: 'Hardware Utility' },
  { key: 'biomedical-ai', label: 'Biomedical AI', badge: 'Life Sciences' },
];

export function getDomainData(key: DomainKey): DomainDataset {
  return ALL_DOMAINS[key] || agenticAiDataset;
}
