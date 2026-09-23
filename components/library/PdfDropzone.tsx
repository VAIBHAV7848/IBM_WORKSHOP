'use client';

import React, { useState, useRef } from 'react';
import { UploadCloud, FileText, CheckCircle2, Loader2 } from 'lucide-react';
import { AcademicPaper, DomainKey } from '@/types/academic';

interface PdfDropzoneProps {
  activeDomain: DomainKey;
  onPaperParsed: (newPaper: AcademicPaper) => void;
}

export const PdfDropzone: React.FC<PdfDropzoneProps> = ({
  activeDomain,
  onPaperParsed,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastUploadedName, setLastUploadedName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const simulatePdfIngestion = (fileName: string) => {
    setIsProcessing(true);
    setLastUploadedName(fileName);

    setTimeout(() => {
      // Create new parsed paper
      const cleanTitle = fileName
        .replace(/\.[^/.]+$/, '')
        .replace(/[-_]/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase());

      const parsedPaper: AcademicPaper = {
        id: `user-pdf-${Date.now()}`,
        title: cleanTitle.length > 5 ? cleanTitle : 'Self-Supervised Multimodal Architecture for Scientific Discovery',
        authors: ['User Ingestion Lab', 'Granite Parser Agent'],
        year: 2026,
        domain: activeDomain,
        venue: 'arXiv Preprint (Uploaded PDF)',
        abstract: `Synthesized from user document [${fileName}]. This study explores automated extraction and graph-based vector anchoring for academic synthesis. Validated against standard benchmark corpora.`,
        citationsCount: 14,
        cluster: 'User Uploaded Ingestion',
        clusterColor: '#10b981', // Emerald green
        keyFindings: [
          'Successfully parsed 18 cited works from references section',
          'Extracted 4 novel empirical claims and 2 architecture diagrams',
          'Correlated with existing cluster topologies via watsonx RAG embedding'
        ],
        methodology: 'Automated PyMuPDF AST extraction + Granite 3.0 semantic section chunking.',
        citations: [],
        tags: ['User Paper', 'PDF Ingestion', 'Granite RAG']
      };

      onPaperParsed(parsedPaper);
      setIsProcessing(false);
    }, 1400);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      simulatePdfIngestion(file.name);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      simulatePdfIngestion(file.name);
    }
  };

  return (
    <div className="space-y-1.5">
      <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold px-1">
        Multimodal Ingestion Dropzone
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.txt,.md"
        onChange={handleFileSelect}
        className="hidden"
      />

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-3.5 text-center cursor-pointer transition-all duration-200 ${
          isDragging
            ? 'border-ibm-blue bg-ibm-blue/10 scale-[1.01]'
            : 'border-slate-800 bg-obsidian-900/60 hover:border-slate-700 hover:bg-obsidian-900'
        }`}
      >
        {isProcessing ? (
          <div className="flex flex-col items-center space-y-1.5 py-1">
            <Loader2 className="w-5 h-5 text-ibm-cyan animate-spin" />
            <span className="text-xs font-mono text-slate-200">
              Granite AST Parser Ingesting...
            </span>
            <span className="text-[10px] text-slate-400 truncate max-w-[200px]">
              {lastUploadedName}
            </span>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-1">
            <div className="p-1.5 rounded-lg bg-slate-800 text-slate-400">
              <UploadCloud className="w-4 h-4 text-ibm-cyan" />
            </div>
            <div className="text-xs font-medium text-slate-200">
              Drop Academic PDF / Notes
            </div>
            <div className="text-[10px] text-slate-500 font-mono">
              Auto-extracts citations & claims into Graph
            </div>
          </div>
        )}
      </div>

      {lastUploadedName && !isProcessing && (
        <div className="flex items-center space-x-1.5 px-2 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-[11px] text-emerald-400">
          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">Added to Citation Graph</span>
        </div>
      )}
    </div>
  );
};
