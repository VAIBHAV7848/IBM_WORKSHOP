'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { AcademicPaper, CitationLink } from '@/types/academic';
import { useGraphPhysics, GraphNode } from './useGraphPhysics';
import { ZoomIn, ZoomOut, RotateCcw, Sparkles } from 'lucide-react';

interface CitationCanvasProps {
  papers: AcademicPaper[];
  links: CitationLink[];
  selectedPaperId: string | null;
  onSelectPaper: (paper: AcademicPaper | null) => void;
  highlightedTag?: string | null;
}

export const CitationCanvas: React.FC<CitationCanvasProps> = ({
  papers,
  links,
  selectedPaperId,
  onSelectPaper,
  highlightedTag,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [transform, setTransform] = useState({ x: 0, y: 0, scale: 1 });
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [isPanning, setIsPanning] = useState(false);
  const panStartRef = useRef({ x: 0, y: 0 });
  const draggedNodeIdRef = useRef<string | null>(null);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { clientWidth, clientHeight } = containerRef.current;
        setDimensions({
          width: clientWidth || 800,
          height: clientHeight || 600,
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const { nodesRef, activeLinks, updateNodePosition } = useGraphPhysics(
    papers,
    links,
    dimensions.width,
    dimensions.height
  );

  const screenToGraph = useCallback(
    (screenX: number, screenY: number) => {
      return {
        x: (screenX - transform.x) / transform.scale,
        y: (screenY - transform.y) / transform.scale,
      };
    },
    [transform]
  );

  // Main Render Loop on HTML5 Canvas
  useEffect(() => {
    let animId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = dimensions.width * dpr;
    canvas.height = dimensions.height * dpr;
    canvas.style.width = `${dimensions.width}px`;
    canvas.style.height = `${dimensions.height}px`;

    const render = () => {
      ctx.save();
      ctx.scale(dpr, dpr);
      
      // Warm Cream Canvas Background
      ctx.fillStyle = '#FAF9F5';
      ctx.fillRect(0, 0, dimensions.width, dimensions.height);

      // Apply Pan & Zoom Transform
      ctx.save();
      ctx.translate(transform.x, transform.y);
      ctx.scale(transform.scale, transform.scale);

      const nodes = nodesRef.current;

      // Find connected neighbors of hovered node
      const connectedIds = new Set<string>();
      if (hoveredNodeId) {
        connectedIds.add(hoveredNodeId);
        links.forEach((l) => {
          if (l.source === hoveredNodeId) connectedIds.add(l.target);
          if (l.target === hoveredNodeId) connectedIds.add(l.source);
        });
      }

      // 1. Draw Links
      activeLinks.forEach((link) => {
        const { sourceNode, targetNode, strength } = link;
        const isHoverConnected =
          hoveredNodeId &&
          (sourceNode.id === hoveredNodeId || targetNode.id === hoveredNodeId);
        const isSelectedConnected =
          selectedPaperId &&
          (sourceNode.id === selectedPaperId || targetNode.id === selectedPaperId);

        ctx.beginPath();
        ctx.moveTo(sourceNode.x, sourceNode.y);
        ctx.lineTo(targetNode.x, targetNode.y);

        if (isHoverConnected || isSelectedConnected) {
          ctx.strokeStyle = '#D96543'; // Claude Terracotta
          ctx.lineWidth = 2.5 + strength * 0.5;
          ctx.shadowColor = 'rgba(217, 101, 67, 0.4)';
          ctx.shadowBlur = 8;
        } else if (hoveredNodeId && !connectedIds.has(sourceNode.id) && !connectedIds.has(targetNode.id)) {
          ctx.strokeStyle = 'rgba(216, 208, 195, 0.3)';
          ctx.lineWidth = 1;
          ctx.shadowBlur = 0;
        } else {
          ctx.strokeStyle = 'rgba(195, 185, 172, 0.7)';
          ctx.lineWidth = 1 + strength * 0.4;
          ctx.shadowBlur = 0;
        }

        ctx.stroke();
        ctx.shadowBlur = 0;

        // Arrowhead
        const dx = targetNode.x - sourceNode.x;
        const dy = targetNode.y - sourceNode.y;
        const angle = Math.atan2(dy, dx);
        const arrowDist = targetNode.radius + 6;
        const arrowX = targetNode.x - Math.cos(angle) * arrowDist;
        const arrowY = targetNode.y - Math.sin(angle) * arrowDist;

        ctx.save();
        ctx.translate(arrowX, arrowY);
        ctx.rotate(angle);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(-7, -4);
        ctx.lineTo(-7, 4);
        ctx.closePath();
        ctx.fillStyle = isHoverConnected ? '#D96543' : 'rgba(160, 150, 138, 0.8)';
        ctx.fill();
        ctx.restore();
      });

      // 2. Draw Nodes
      nodes.forEach((node) => {
        const isSelected = node.id === selectedPaperId;
        const isHovered = node.id === hoveredNodeId;
        const isConnected = connectedIds.has(node.id);
        const matchesTag = highlightedTag ? node.tags.includes(highlightedTag) : true;
        const isDimmed = (hoveredNodeId && !isConnected) || (!matchesTag && highlightedTag);

        ctx.save();
        ctx.translate(node.x, node.y);

        // Halo / Glow on selected or hovered
        if (isSelected || isHovered) {
          ctx.beginPath();
          ctx.arc(0, 0, node.radius + 10, 0, Math.PI * 2);
          ctx.fillStyle = isSelected
            ? 'rgba(217, 101, 67, 0.22)' // Terracotta glow
            : 'rgba(234, 88, 12, 0.15)';
          ctx.fill();

          ctx.beginPath();
          ctx.arc(0, 0, node.radius + 5, 0, Math.PI * 2);
          ctx.strokeStyle = isSelected ? '#D96543' : '#EA580C';
          ctx.lineWidth = 2.5;
          ctx.shadowColor = '#D96543';
          ctx.shadowBlur = 10;
          ctx.stroke();
        }

        // Main Node Circle
        ctx.beginPath();
        ctx.arc(0, 0, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = isDimmed ? 'rgba(220, 214, 204, 0.5)' : node.clusterColor;
        ctx.shadowColor = 'rgba(31, 30, 29, 0.15)';
        ctx.shadowBlur = isDimmed ? 0 : 6;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Border around node
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = isSelected ? 3 : 2;
        ctx.stroke();

        // Center dot
        ctx.beginPath();
        ctx.arc(0, 0, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();

        // Node Title Label
        ctx.font = isSelected ? '600 12px sans-serif' : '500 11px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';

        const titleText = node.title.length > 24 ? node.title.slice(0, 22) + '…' : node.title;
        ctx.fillStyle = isDimmed ? 'rgba(150, 140, 130, 0.5)' : '#1F1E1D';
        ctx.fillText(titleText, 0, node.radius + 6);

        // Subtext: Year & Citations
        ctx.font = '10px ui-monospace, monospace';
        ctx.fillStyle = isDimmed ? 'rgba(180, 170, 160, 0.4)' : '#68645E';
        ctx.fillText(`${node.year} · ${node.citationsCount} cites`, 0, node.radius + 20);

        ctx.restore();
      });

      ctx.restore();
      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [dimensions, transform, activeLinks, hoveredNodeId, selectedPaperId, highlightedTag, links]);

  // Event Handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const screenX = e.clientX - rect.left;
    const screenY = e.clientY - rect.top;
    const graphPos = screenToGraph(screenX, screenY);

    const clickedNode = nodesRef.current.find((node) => {
      const dx = node.x - graphPos.x;
      const dy = node.y - graphPos.y;
      return Math.sqrt(dx * dx + dy * dy) <= node.radius + 4;
    });

    if (clickedNode) {
      draggedNodeIdRef.current = clickedNode.id;
      updateNodePosition(clickedNode.id, clickedNode.x, clickedNode.y, true);
      onSelectPaper(clickedNode);
    } else {
      setIsPanning(true);
      panStartRef.current = { x: e.clientX - transform.x, y: e.clientY - transform.y };
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const screenX = e.clientX - rect.left;
    const screenY = e.clientY - rect.top;
    const graphPos = screenToGraph(screenX, screenY);

    if (draggedNodeIdRef.current) {
      updateNodePosition(draggedNodeIdRef.current, graphPos.x, graphPos.y, true);
      return;
    }

    if (isPanning) {
      setTransform((prev) => ({
        ...prev,
        x: e.clientX - panStartRef.current.x,
        y: e.clientY - panStartRef.current.y,
      }));
      return;
    }

    const hovered = nodesRef.current.find((node) => {
      const dx = node.x - graphPos.x;
      const dy = node.y - graphPos.y;
      return Math.sqrt(dx * dx + dy * dy) <= node.radius + 6;
    });

    setHoveredNodeId(hovered ? hovered.id : null);
  };

  const handleMouseUp = () => {
    if (draggedNodeIdRef.current) {
      const node = nodesRef.current.find((n) => n.id === draggedNodeIdRef.current);
      if (node) {
        updateNodePosition(node.id, node.x, node.y, false);
      }
      draggedNodeIdRef.current = null;
    }
    setIsPanning(false);
  };

  const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const zoomFactor = e.deltaY > 0 ? 0.92 : 1.08;
    setTransform((prev) => ({
      ...prev,
      scale: Math.max(0.4, Math.min(2.8, prev.scale * zoomFactor)),
    }));
  };

  const handleResetView = () => {
    setTransform({ x: 0, y: 0, scale: 1 });
  };

  const handleZoom = (factor: number) => {
    setTransform((prev) => ({
      ...prev,
      scale: Math.max(0.4, Math.min(2.8, prev.scale * factor)),
    }));
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full bg-claude-bg overflow-hidden select-none"
    >
      <div className="absolute inset-0 bg-claude-dots opacity-70 pointer-events-none" />

      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        className={`w-full h-full block ${isPanning ? 'cursor-grabbing' : 'cursor-grab'}`}
      />

      {/* Top HUD Info Header */}
      <div className="absolute top-3 left-4 pointer-events-none flex items-center space-x-3 text-xs">
        <div className="bg-white/95 border border-claude-border shadow-claude backdrop-blur-md px-3 py-1.5 rounded-xl flex items-center space-x-2 text-claude-text font-mono">
          <Sparkles className="w-3.5 h-3.5 text-claude-terracotta" />
          <span>
            <strong className="text-claude-text font-bold">{papers.length}</strong> Papers
          </span>
          <span className="text-claude-border">|</span>
          <span>
            <strong className="text-claude-text font-bold">{links.length}</strong> Citations
          </span>
          <span className="text-claude-border">|</span>
          <span className="text-emerald-700 font-medium">60 FPS Physics</span>
        </div>
      </div>

      {/* Floating Canvas Controls */}
      <div className="absolute bottom-4 right-4 flex items-center space-x-1.5 bg-white/95 border border-claude-border shadow-claude backdrop-blur-md p-1.5 rounded-xl">
        <button
          onClick={() => handleZoom(1.15)}
          title="Zoom In"
          className="p-2 text-claude-muted hover:text-claude-text hover:bg-claude-subtle rounded-lg transition-colors"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={() => handleZoom(0.85)}
          title="Zoom Out"
          className="p-2 text-claude-muted hover:text-claude-text hover:bg-claude-subtle rounded-lg transition-colors"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <div className="w-[1px] h-4 bg-claude-border" />
        <button
          onClick={handleResetView}
          title="Reset Center"
          className="p-2 text-claude-muted hover:text-claude-text hover:bg-claude-subtle rounded-lg transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Cluster Legend */}
      <div className="absolute bottom-4 left-4 bg-white/95 border border-claude-border shadow-claude backdrop-blur-md p-2.5 rounded-xl text-xs flex flex-col space-y-1.5 max-w-[280px]">
        <div className="text-[10px] uppercase font-mono tracking-wider text-claude-muted font-bold">
          Topic Clusters
        </div>
        <div className="flex flex-wrap gap-2">
          {Array.from(new Set(papers.map((p) => p.cluster))).map((clusterName) => {
            const paper = papers.find((p) => p.cluster === clusterName);
            return (
              <div key={clusterName} className="flex items-center space-x-1.5">
                <span
                  className="w-2.5 h-2.5 rounded-full shadow-sm"
                  style={{ backgroundColor: paper?.clusterColor || '#D96543' }}
                />
                <span className="text-[11px] text-claude-textSecondary truncate max-w-[140px] font-medium">
                  {clusterName}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
