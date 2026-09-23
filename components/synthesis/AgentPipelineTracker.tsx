'use client';

import React from 'react';
import { AgentStep } from '@/types/academic';
import { CheckCircle2, Loader2, CircleDot, Activity } from 'lucide-react';

interface AgentPipelineTrackerProps {
  steps: AgentStep[];
}

export const AgentPipelineTracker: React.FC<AgentPipelineTrackerProps> = ({ steps }) => {
  return (
    <div className="bg-obsidian-900/80 border-b border-slate-800/80 p-3.5 space-y-2 shrink-0">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
          <Activity className="w-3.5 h-3.5 text-ibm-blue" />
          <span>Watsonx Multi-Agent Pipeline</span>
        </div>
        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
          Granite 3.0 Instruct
        </span>
      </div>

      {/* Steps Row */}
      <div className="grid grid-cols-4 gap-1.5">
        {steps.map((step) => {
          let statusIcon;
          let statusStyle;

          switch (step.status) {
            case 'completed':
              statusIcon = <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />;
              statusStyle = 'border-emerald-500/30 bg-emerald-500/5 text-slate-200';
              break;
            case 'running':
              statusIcon = <Loader2 className="w-3 h-3 text-ibm-cyan animate-spin shrink-0" />;
              statusStyle = 'border-ibm-cyan/40 bg-ibm-cyan/10 text-white shadow-sm shadow-ibm-cyan/20';
              break;
            case 'idle':
            default:
              statusIcon = <CircleDot className="w-3 h-3 text-slate-600 shrink-0" />;
              statusStyle = 'border-slate-800 bg-obsidian-950/60 text-slate-400';
              break;
          }

          return (
            <div
              key={step.id}
              className={`p-1.5 rounded-lg border flex flex-col justify-between transition-all ${statusStyle}`}
            >
              <div className="flex items-center justify-between">
                {statusIcon}
                {step.latencyMs ? (
                  <span className="text-[8px] font-mono text-slate-400">
                    {step.latencyMs}ms
                  </span>
                ) : null}
              </div>
              <div className="mt-1 truncate">
                <span className="text-[10px] font-medium block leading-tight truncate">
                  {step.name}
                </span>
                <span className="text-[8px] font-mono text-slate-500 block truncate">
                  {step.agentRole}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
