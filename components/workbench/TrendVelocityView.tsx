'use client';

import React, { useState } from 'react';
import { ResearchTrend } from '@/types/academic';
import { TrendingUp, ArrowUpRight, ArrowDownRight, Zap, Calendar, Sparkles } from 'lucide-react';

interface TrendVelocityViewProps {
  trends: ResearchTrend[];
  onSelectTopic?: (topic: string) => void;
}

export const TrendVelocityView: React.FC<TrendVelocityViewProps> = ({ trends }) => {
  const [selectedTrendId, setSelectedTrendId] = useState<string>(trends[0]?.id || '');
  const activeTrend = trends.find((t) => t.id === selectedTrendId) || trends[0];

  const getSentimentBadge = (sentiment: ResearchTrend['sentiment']) => {
    switch (sentiment) {
      case 'accelerating':
        return {
          label: 'Accelerating',
          bg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
          icon: ArrowUpRight,
        };
      case 'emerging':
        return {
          label: 'Emerging',
          bg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
          icon: Zap,
        };
      case 'maturing':
        return {
          label: 'Maturing',
          bg: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
          icon: Sparkles,
        };
      case 'saturated':
        return {
          label: 'Declining / Saturated',
          bg: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
          icon: ArrowDownRight,
        };
    }
  };

  return (
    <div className="w-full h-full bg-obsidian-950 p-6 flex flex-col space-y-6 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-white flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-ibm-cyan" />
            <span>Emerging Research Velocity & Trajectories</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Predictive modeling of academic publication momentum, sentiment shifts, and domain adoption (2021–2026).
          </p>
        </div>
        <div className="flex items-center space-x-2 bg-obsidian-900 border border-slate-800 px-3 py-1.5 rounded-xl text-xs font-mono text-slate-300">
          <Calendar className="w-3.5 h-3.5 text-ibm-blue" />
          <span>Horizon: 2021 — 2026</span>
        </div>
      </div>

      {/* Trend Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {trends.map((trend) => {
          const isSelected = trend.id === selectedTrendId;
          const badge = getSentimentBadge(trend.sentiment);
          const Icon = badge.icon;
          const isPositive = trend.growthRate > 0;

          return (
            <div
              key={trend.id}
              onClick={() => setSelectedTrendId(trend.id)}
              className={`cursor-pointer rounded-2xl p-4 border transition-all duration-200 relative overflow-hidden ${
                isSelected
                  ? 'bg-obsidian-900 border-ibm-blue shadow-lg shadow-ibm-blue/10 scale-[1.02]'
                  : 'bg-obsidian-900/60 border-slate-800/80 hover:border-slate-700 hover:bg-obsidian-900'
              }`}
            >
              <div className="flex items-start justify-between">
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-mono border flex items-center space-x-1 ${badge.bg}`}
                >
                  <Icon className="w-3 h-3" />
                  <span>{badge.label}</span>
                </span>
                <span
                  className={`text-sm font-bold font-mono ${
                    isPositive ? 'text-emerald-400' : 'text-amber-400'
                  }`}
                >
                  {isPositive ? `+${trend.growthRate}%` : `${trend.growthRate}%`}
                </span>
              </div>

              <h3 className="text-sm font-semibold text-white mt-3 leading-snug line-clamp-2">
                {trend.topic}
              </h3>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                {trend.description}
              </p>

              {/* Sparkline Preview */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-end justify-between h-10 gap-1">
                {trend.trajectory.map((point) => {
                  const maxPapers = Math.max(...trend.trajectory.map((p) => p.papersCount), 1);
                  const heightPercent = Math.max(15, (point.papersCount / maxPapers) * 100);
                  return (
                    <div
                      key={point.year}
                      title={`${point.year}: ${point.papersCount} papers`}
                      className="flex-1 flex flex-col items-center gap-1 group relative"
                    >
                      <div
                        className={`w-full rounded-t transition-all ${
                          isSelected ? 'bg-ibm-cyan' : 'bg-slate-700 group-hover:bg-slate-500'
                        }`}
                        style={{ height: `${heightPercent}%` }}
                      />
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-between text-[9px] font-mono text-slate-500 mt-1">
                <span>'21</span>
                <span>'26</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed Selected Trend Breakdown */}
      {activeTrend && (
        <div className="bg-obsidian-900 border border-slate-800/90 rounded-2xl p-6 flex flex-col space-y-5">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-ibm-cyan font-semibold">
                In-Depth Trajectory Analysis
              </span>
              <h3 className="text-lg font-bold text-white mt-0.5">{activeTrend.topic}</h3>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400 font-mono">5-Year Growth Delta</span>
              <div className="text-xl font-bold font-mono text-emerald-400">
                +{activeTrend.growthRate}%
              </div>
            </div>
          </div>

          {/* SVG High-Res Area Trajectory Chart */}
          <div className="w-full bg-obsidian-950/80 rounded-xl p-4 border border-slate-800/60 relative">
            <div className="text-xs font-mono text-slate-400 mb-2 flex items-center justify-between">
              <span>Publication Volume Trajectory (Indexed Papers / Year)</span>
              <span className="text-ibm-cyan font-mono">Agentic Trend Model</span>
            </div>

            <div className="h-44 w-full flex items-end justify-between gap-4 px-2 pt-4">
              {activeTrend.trajectory.map((point) => {
                const maxVal = Math.max(...activeTrend.trajectory.map((p) => p.papersCount));
                const barHeight = Math.max(20, (point.papersCount / maxVal) * 120);

                return (
                  <div key={point.year} className="flex-1 flex flex-col items-center space-y-2">
                    <span className="text-xs font-mono text-slate-300 font-semibold">
                      {point.papersCount.toLocaleString()}
                    </span>
                    <div className="w-full bg-slate-800/50 rounded-xl p-1 h-32 flex items-end justify-center">
                      <div
                        className="w-full bg-gradient-to-t from-ibm-blue to-ibm-cyan rounded-lg shadow-lg shadow-ibm-blue/20 transition-all duration-500"
                        style={{ height: `${barHeight}px` }}
                      />
                    </div>
                    <span className="text-xs font-mono text-slate-400 font-medium">
                      {point.year}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Catalysts */}
          <div>
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Primary Academic Catalysts & Milestone Papers
            </h4>
            <div className="flex flex-wrap gap-2">
              {activeTrend.keyCatalysts.map((catalyst) => (
                <span
                  key={catalyst}
                  className="px-3 py-1 bg-obsidian-850 border border-slate-700/80 rounded-xl text-xs font-mono text-slate-200"
                >
                  ★ {catalyst}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
