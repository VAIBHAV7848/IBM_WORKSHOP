'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { AcademicPaper, CitationLink } from '@/types/academic';
import { useGraphPhysics, GraphNode } from './useGraphPhysics';
import { ZoomIn, ZoomOut, RotateCcw, Crosshair, Sparkles } from 'lucide-react';

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

  // Measure container dimensions
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

  // Transform screen coordinate to graph canvas space
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

    // Handle high DPI displays
    const dpr = window.devicePixelRatio || 1;
    canvas.width = dimensions.width * dpr;
    canvas.height = dimensions.height * dpr;
    canvas.style.width = `${dimensions.width}px`;
    canvas.style.height = `${dimensions.height}px`;

    const render = () => {
      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);

      // Apply Pan & Zoom Transform
      ctx.save();
      ctx.translate(transform.x, transform.y);
      ctx.scale(transform.scale, transform.scale);

      const nodes = nodesRef.current;
      const hoveredNode = nodes.find((n) => n.id === hoveredNodeId);
      const selectedNode = nodes.find((n) => n.id === selectedPaperId);

      // Find connected neighbors of hovered or selected node
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
          ctx.strokeStyle = 'rgba(56, 189, 248, 0.85)'; // glowing cyan
          ctx.lineWidth = 2.5 + strength * 0.5;
          ctx.shadowColor = 'rgba(56, 189, 248, 0.6)';
          ctx.shadowBlur = 10;
        } else if (hoveredNodeId && !connectedIds.has(sourceNode.id) && !connectedIds.has(targetNode.id)) {
          ctx.strokeStyle = 'rgba(30, 41, 59, 0.2)'; // dimmed
          ctx.lineWidth = 1;
          ctx.shadowBlur = 0;
        } else {
          ctx.strokeStyle = 'rgba(71, 85, 105, 0.4)';
          ctx.lineWidth = 1 + strength * 0.4;
          ctx.shadowBlur = 0;
        }

        ctx.stroke();
        ctx.shadowBlur = 0;

        // Draw directional citation arrow
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
        ctx.fillStyle = isHoverConnected ? '#38bdf8' : 'rgba(100, 116, 139, 0.6)';
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

        // Halo / Pulsing Glow on selected / hovered
        if (isSelected || isHovered) {
          ctx.beginPath();
          ctx.arc(0, 0, node.radius + 10, 0, Math.PI * 2);
          ctx.fillStyle = isSelected
            ? 'rgba(15, 98, 254, 0.25)' // IBM blue halo
            : 'rgba(56, 189, 248, 0.2)';
          ctx.fill();

          ctx.beginPath();
          ctx.arc(0, 0, node.radius + 5, 0, Math.PI * 2);
          ctx.strokeStyle = isSelected ? '#0f62fe' : '#38bdf8';
          ctx.lineWidth = 2;
          ctx.shadowColor = isSelected ? '#0f62fe' : '#38bdf8';
          ctx.shadowBlur = 12;
          ctx.stroke();
        }

        // Main Node Circle
        ctx.beginPath();
        ctx.arc(0, 0, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = isDimmed ? 'rgba(30, 41, 59, 0.6)' : node.clusterColor;
        ctx.shadowColor = node.clusterColor;
        ctx.shadowBlur = isDimmed ? 0 : 8;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Inner border
        ctx.strokeStyle = isSelected ? '#ffffff' : 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = isSelected ? 2.5 : 1.5;
        ctx.stroke();

        // Center dot
        ctx.beginPath();
        ctx.arc(0, 0, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();

        // Node Label (Title & Year)
        ctx.font = isSelected ? '600 12px sans-serif' : '500 11px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';

        // Title truncation
        const titleText = node.title.length > 24 ? node.title.slice(0, 22) + '…' : node.title;
        ctx.fillStyle = isDimmed ? 'rgba(148, 163, 184, 0.4)' : '#f8fafc';
        ctx.fillText(titleText, 0, node.radius + 6);

        // Subtext: Year & Citations
        ctx.font = '10px ui-monospace, monospace';
        ctx.fillStyle = isDimmed ? 'rgba(100, 116, 139, 0.3)' : 'rgba(148, 163, 184, 0.85)';
        ctx.fillText(`${node.year} · ${node.citationsCount} cites`, 0, node.radius + 20);

        ctx.restore();
      });

      ctx.restore(); // end pan & zoom
      ctx.restore(); // end dpr scale

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [dimensions, transform, activeLinks, hoveredNodeId, selectedPaperId, highlightedTag, links]);

  // Mouse / Touch Event Handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const screenX = e.clientX - rect.left;
    const screenY = e.clientY - rect.top;
    const graphPos = screenToGraph(screenX, screenY);

    // Check if clicked a node
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

    // If dragging a node
    if (draggedNodeIdRef.current) {
      updateNodePosition(draggedNodeIdRef.current, graphPos.x, graphPos.y, true);
      return;
    }

    // If panning canvas
    if (isPanning) {
      setTransform((prev) => ({
        ...prev,
        x: e.clientX - panStartRef.current.x,
        y: e.clientY - panStartRef.current.y,
      }));
      return;
    }

    // Hover detection
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
    setTransform((prev) => {
      const newScale = Math.max(0.4, Math.min(2.8, prev.scale * zoomFactor));
      return {
        ...prev,
        scale: newScale,
      };
    });
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
      className="relative w-full h-full bg-obsidian-950 overflow-hidden select-none"
    >
      {/* Dynamic Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      {/* Floating Canvas */}
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        className={`w-full h-full block ${isPanning ? 'cursor-grabbing' : 'cursor-grab'}`}
      />

      {/* HUD Info Header */}
      <div className="absolute top-3 left-4 pointer-events-none flex items-center space-x-3 text-xs">
        <div className="bg-obsidian-900/90 border border-slate-800/80 backdrop-blur-md px-3 py-1.5 rounded-lg flex items-center space-x-2 text-slate-300">
          <Sparkles className="w-3.5 h-3.5 text-ibm-cyan animate-pulse" />
          <span>
            <strong className="text-white font-mono">{papers.length}</strong> Papers
          </span>
          <span className="text-slate-600">|</span>
          <span>
            <strong className="text-white font-mono">{links.length}</strong> Citation Links
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-emerald-400 font-mono">60 FPS Physics</span>
        </div>
      </div>

      {/* Floating Canvas Controls */}
      <div className="absolute bottom-4 right-4 flex items-center space-x-1.5 bg-obsidian-900/90 border border-slate-800/80 backdrop-blur-md p-1.5 rounded-xl shadow-2xl">
        <button
          onClick={() => handleZoom(1.15)}
          title="Zoom In"
          className="p-2 text-slate-400 hover:text-white hover:bg-slate-800/60 rounded-lg transition-colors"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={() => handleZoom(0.85)}
          title="Zoom Out"
          className="p-2 text-slate-400 hover:text-white hover:bg-slate-800/60 rounded-lg transition-colors"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <div className="w-[1px] h-4 bg-slate-800" />
        <button
          onClick={handleResetView}
          title="Reset Center"
          className="p-2 text-slate-400 hover:text-white hover:bg-slate-800/60 rounded-lg transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Cluster Legend */}
      <div className="absolute bottom-4 left-4 bg-obsidian-900/80 border border-slate-800/80 backdrop-blur-md p-2.5 rounded-xl text-xs flex flex-col space-y-1.5 max-w-[280px]">
        <div className="text-[10px] uppercase font-mono tracking-wider text-slate-400 font-semibold">
          Topic Clusters
        </div>
        <div className="flex flex-wrap gap-2">
          {Array.from(new Set(papers.map((p) => p.cluster))).map((clusterName) => {
            const paper = papers.find((p) => p.cluster === clusterName);
            return (
              <div key={clusterName} className="flex items-center space-x-1.5">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: paper?.clusterColor || '#38bdf8' }}
                />
                <span className="text-[11px] text-slate-300 truncate max-w-[140px]">
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
