'use client';

import React, { useState, useEffect } from 'react';
import { X, Key, Cpu, ShieldCheck, Check, Sparkles, Terminal } from 'lucide-react';

interface WatsonxConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WatsonxConfigModal: React.FC<WatsonxConfigModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [apiKey, setApiKey] = useState('');
  const [projectId, setProjectId] = useState('');
  const [selectedModel, setSelectedModel] = useState('ibm/granite-3-8b-instruct');
  const [activeTab, setActiveTab] = useState<'config' | 'prompt'>('config');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const storedKey = localStorage.getItem('watsonx_api_key') || '';
    const storedProject = localStorage.getItem('watsonx_project_id') || '';
    const storedModel = localStorage.getItem('watsonx_model') || 'ibm/granite-3-8b-instruct';
    setApiKey(storedKey);
    setProjectId(storedProject);
    setSelectedModel(storedModel);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('watsonx_api_key', apiKey);
    localStorage.setItem('watsonx_project_id', projectId);
    localStorage.setItem('watsonx_model', selectedModel);
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 800);
  };

  const samplePromptTemplate = `SYSTEM: You are the IBM Watsonx Research Agent, an authoritative academic literature synthesis companion.
CONTEXT:
The user has provided an academic corpus of papers, citation graphs, and empirical metrics.
Answer all queries citing specific authors, publication years, and methodologies.

USER QUERY:
{user_query}

RETRIEVED KNOWLEDGE CHUNKS:
{retrieved_paper_abstracts}

INSTRUCTIONS:
1. Synthesize comparative trade-offs between cited works.
2. Highlight empirical metrics (pass@1, latency, parameter efficiency).
3. Identify citation gaps and unexplored intersections.`;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-obsidian-900 border border-slate-800 rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl flex flex-col animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Cpu className="w-4 h-4 text-ibm-blue" />
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-200">
              IBM watsonx.ai & Granite Model Settings
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="px-4 pt-3 flex space-x-2 border-b border-slate-800 bg-obsidian-950/40">
          <button
            onClick={() => setActiveTab('config')}
            className={`px-3 py-1.5 text-xs font-mono border-b-2 transition-all ${
              activeTab === 'config'
                ? 'border-ibm-blue text-white font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Model & Credentials
          </button>
          <button
            onClick={() => setActiveTab('prompt')}
            className={`px-3 py-1.5 text-xs font-mono border-b-2 transition-all ${
              activeTab === 'prompt'
                ? 'border-ibm-blue text-white font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Langflow Prompt Template
          </button>
        </div>

        {activeTab === 'config' ? (
          <form onSubmit={handleSave} className="p-5 space-y-4 text-xs">
            {/* Model Selector */}
            <div className="space-y-1.5">
              <label className="font-mono text-slate-300 font-semibold block">
                IBM Granite Foundation Model
              </label>
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="w-full bg-obsidian-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200 focus:outline-none focus:border-ibm-blue font-mono"
              >
                <option value="ibm/granite-3-8b-instruct">
                  ibm/granite-3-8b-instruct (Recommended · High Reasoning & Tool Use)
                </option>
                <option value="ibm/granite-3-2b-instruct">
                  ibm/granite-3-2b-instruct (Ultra-Low Latency · Edge NPU)
                </option>
                <option value="ibm/granite-guardian-3-8b">
                  ibm/granite-guardian-3-8b (Enterprise Safety & Guardrail Model)
                </option>
              </select>
            </div>

            {/* API Key */}
            <div className="space-y-1.5">
              <label className="font-mono text-slate-300 font-semibold block flex items-center justify-between">
                <span>IBM Cloud / watsonx API Key</span>
                <span className="text-[10px] text-slate-500 font-normal">Optional for Demo Mode</span>
              </label>
              <div className="relative">
                <Key className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Enter IBM Cloud API Key..."
                  className="w-full bg-obsidian-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-ibm-blue font-mono"
                />
              </div>
            </div>

            {/* Project ID */}
            <div className="space-y-1.5">
              <label className="font-mono text-slate-300 font-semibold block">
                watsonx Project ID
              </label>
              <input
                type="text"
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
                placeholder="e.g. 5a1b2c3d-4e5f-6a7b-8c9d-0e1f2a3b4c5d"
                className="w-full bg-obsidian-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-ibm-blue font-mono"
              />
            </div>

            {/* Fallback Notice */}
            <div className="p-3 bg-obsidian-950/80 border border-slate-800 rounded-xl text-[11px] text-slate-400 space-y-1">
              <div className="flex items-center space-x-1.5 text-ibm-cyan font-mono font-medium">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Zero-Config Offline Fallback Enabled</span>
              </div>
              <p className="leading-relaxed">
                If no API key is specified, the application uses realistic pre-indexed Granite 3.0 academic responses and vector grounding for smooth presentation and offline judging.
              </p>
            </div>

            {/* Save Button */}
            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="flex items-center space-x-2 px-4 py-2 bg-ibm-blue hover:bg-blue-600 text-white rounded-xl font-mono text-xs transition-colors shadow-md shadow-ibm-blue/20"
              >
                {saved ? <Check className="w-3.5 h-3.5 text-white" /> : <Sparkles className="w-3.5 h-3.5" />}
                <span>{saved ? 'Saved Successfully' : 'Save Configuration'}</span>
              </button>
            </div>
          </form>
        ) : (
          <div className="p-5 space-y-3">
            <div className="flex items-center space-x-2 text-xs font-mono text-slate-400">
              <Terminal className="w-3.5 h-3.5 text-ibm-blue" />
              <span>Declarative Langflow Node Prompt Template</span>
            </div>
            <pre className="p-3 bg-obsidian-950 border border-slate-800 rounded-xl text-[11px] font-mono text-slate-300 whitespace-pre-wrap leading-relaxed max-h-80 overflow-y-auto">
              {samplePromptTemplate}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};
