'use client';

import React from 'react';
import { AgentStep } from '@/types/academic';
import { CheckCircle2, Loader2, CircleDot, Activity } from 'lucide-react';

interface AgentPipelineTrackerProps {
  steps: AgentStep[];
}

export const AgentPipelineTracker: React.FC<AgentPipelineTrackerProps> = ({ steps }) => {
  return (
    <div className="bg-white border-b border-claude-border p-3.5 space-y-2 shrink-0">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-[10px] font-mono uppercase tracking-wider text-claude-muted font-semibold">
          <Activity className="w-3.5 h-3.5 text-claude-terracotta" />
          <span>Watsonx Multi-Agent Pipeline</span>
        </div>
        <span className="text-[10px] font-mono text-claude-orange bg-orange-50 px-2 py-0.5 rounded-full border border-orange-200 font-medium">
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
              statusIcon = <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />;
              statusStyle = 'border-emerald-200 bg-emerald-50/70 text-claude-text';
              break;
            case 'running':
              statusIcon = <Loader2 className="w-3 h-3 text-claude-terracotta animate-spin shrink-0" />;
              statusStyle = 'border-claude-terracotta/40 bg-orange-50/60 text-claude-text shadow-xs ring-1 ring-claude-terracotta/20';
              break;
            case 'idle':
            default:
              statusIcon = <CircleDot className="w-3 h-3 text-stone-400 shrink-0" />;
              statusStyle = 'border-claude-border bg-claude-subtle/50 text-claude-muted';
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
                  <span className="text-[8px] font-mono text-claude-muted">
                    {step.latencyMs}ms
                  </span>
                ) : null}
              </div>
              <div className="mt-1 truncate">
                <span className="text-[10px] font-medium block leading-tight truncate text-claude-text">
                  {step.name}
                </span>
                <span className="text-[8px] font-mono text-claude-muted block truncate">
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
