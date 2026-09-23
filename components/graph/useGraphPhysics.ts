'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { AcademicPaper, CitationLink } from '@/types/academic';

export interface GraphNode extends AcademicPaper {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  isDragging?: boolean;
}

export interface GraphLink {
  sourceNode: GraphNode;
  targetNode: GraphNode;
  strength: number;
  type: string;
}

export function useGraphPhysics(papers: AcademicPaper[], links: CitationLink[], width: number, height: number) {
  const [nodes, setNodes] = useState<GraphNode[]>([]);
  const [activeLinks, setActiveLinks] = useState<GraphLink[]>([]);
  const animFrameRef = useRef<number | null>(null);
  const nodesRef = useRef<GraphNode[]>([]);

  // Initialize or re-layout nodes when papers change or dimensions change
  useEffect(() => {
    if (papers.length === 0 || width <= 0 || height <= 0) return;

    const centerX = width / 2;
    const centerY = height / 2;

    // Distribute nodes in a golden ratio spiral initially
    const initialNodes: GraphNode[] = papers.map((paper, i) => {
      const angle = i * 2.39996; // Golden angle in radians
      const radiusOffset = 40 + Math.sqrt(i + 1) * 65;
      const x = centerX + Math.cos(angle) * radiusOffset;
      const y = centerY + Math.sin(angle) * radiusOffset;
      
      // Radius scaled with log of citations
      const baseRadius = 16;
      const citationBonus = Math.min(18, Math.log10(Math.max(10, paper.citationsCount)) * 4.5);

      return {
        ...paper,
        x,
        y,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        radius: baseRadius + citationBonus,
      };
    });

    nodesRef.current = initialNodes;
    setNodes(initialNodes);
  }, [papers, width, height]);

  // Update links whenever nodes update
  useEffect(() => {
    const nodeMap = new Map<string, GraphNode>();
    nodesRef.current.forEach((n) => nodeMap.set(n.id, n));

    const resolvedLinks: GraphLink[] = [];
    links.forEach((l) => {
      const sourceNode = nodeMap.get(l.source);
      const targetNode = nodeMap.get(l.target);
      if (sourceNode && targetNode) {
        resolvedLinks.push({
          sourceNode,
          targetNode,
          strength: l.strength,
          type: l.type,
        });
      }
    });

    setActiveLinks(resolvedLinks);
  }, [links, nodes]);

  // Physics simulation step
  const tick = useCallback(() => {
    const currentNodes = nodesRef.current;
    if (currentNodes.length === 0 || width <= 0 || height <= 0) return;

    const centerX = width / 2;
    const centerY = height / 2;
    const nodeMap = new Map<string, GraphNode>();
    currentNodes.forEach((n) => nodeMap.set(n.id, n));

    // 1. Repulsion (Coulomb force)
    for (let i = 0; i < currentNodes.length; i++) {
      for (let j = i + 1; j < currentNodes.length; j++) {
        const n1 = currentNodes[i];
        const n2 = currentNodes[j];
        const dx = n2.x - n1.x;
        const dy = n2.y - n1.y;
        const distSq = dx * dx + dy * dy + 100; // avoid div by 0
        const dist = Math.sqrt(distSq);

        const repulsionForce = 4800 / distSq;
        const fx = (dx / dist) * repulsionForce;
        const fy = (dy / dist) * repulsionForce;

        if (!n1.isDragging) {
          n1.vx -= fx;
          n1.vy -= fy;
        }
        if (!n2.isDragging) {
          n2.vx += fx;
          n2.vy += fy;
        }
      }
    }

    // 2. Attraction along edges (Hooke's spring force)
    links.forEach((link) => {
      const n1 = nodeMap.get(link.source);
      const n2 = nodeMap.get(link.target);
      if (!n1 || !n2) return;

      const dx = n2.x - n1.x;
      const dy = n2.y - n1.y;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;
      const targetDist = 130 + (6 - link.strength) * 15;
      const displacement = dist - targetDist;
      const springForce = displacement * 0.025;

      const fx = (dx / dist) * springForce;
      const fy = (dy / dist) * springForce;

      if (!n1.isDragging) {
        n1.vx += fx;
        n1.vy += fy;
      }
      if (!n2.isDragging) {
        n2.vx -= fx;
        n2.vy -= fy;
      }
    });

    // 3. Center gravity & velocity integration
    const damping = 0.88;
    currentNodes.forEach((node) => {
      if (!node.isDragging) {
        // Gravity towards center
        const toCenterX = centerX - node.x;
        const toCenterY = centerY - node.y;
        node.vx += toCenterX * 0.003;
        node.vy += toCenterY * 0.003;

        // Apply velocity with damping
        node.vx *= damping;
        node.vy *= damping;

        // Cap maximum velocity for stability
        const speed = Math.sqrt(node.vx * node.vx + node.vy * node.vy);
        if (speed > 12) {
          node.vx = (node.vx / speed) * 12;
          node.vy = (node.vy / speed) * 12;
        }

        node.x += node.vx;
        node.y += node.vy;

        // Soft viewport bounds
        const padding = node.radius + 20;
        if (node.x < padding) node.x = padding;
        if (node.x > width - padding) node.x = width - padding;
        if (node.y < padding) node.y = padding;
        if (node.y > height - padding) node.y = height - padding;
      }
    });
  }, [links, width, height]);

  // Main animation loop
  useEffect(() => {
    let isRunning = true;

    const loop = () => {
      if (!isRunning) return;
      tick();
      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);

    return () => {
      isRunning = false;
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [tick]);

  const updateNodePosition = useCallback((id: string, x: number, y: number, isDragging: boolean) => {
    const node = nodesRef.current.find((n) => n.id === id);
    if (node) {
      node.x = x;
      node.y = y;
      node.vx = 0;
      node.vy = 0;
      node.isDragging = isDragging;
    }
  }, []);

  return {
    nodesRef,
    activeLinks,
    updateNodePosition,
  };
}
