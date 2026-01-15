import { useEffect, useState, useRef, useMemo } from 'react';
import { type ThemeConfig } from '../types/config';
import { renderMarkdown } from '../markdown/renderer';
import mermaid from 'mermaid';

interface PreviewProps {
  markdown: string;
  config: ThemeConfig;
  customCSS: string;
}

// Initialize mermaid
mermaid.initialize({
  startOnLoad: false,
  theme: 'dark',
  securityLevel: 'loose',
  fontFamily: 'inherit',
});

export function Preview({ markdown, config, customCSS }: PreviewProps) {
  const [html, setHtml] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const [mermaidKey, setMermaidKey] = useState(0);

  // Render markdown to HTML
  useEffect(() => {
    let cancelled = false;
    
    renderMarkdown(markdown).then((result) => {
      if (!cancelled) {
        setHtml(result);
        setMermaidKey((k) => k + 1);
      }
    });
    
    return () => {
      cancelled = true;
    };
  }, [markdown]);

  // Render mermaid diagrams
  useEffect(() => {
    if (!containerRef.current) return;
    
    const mermaidBlocks = containerRef.current.querySelectorAll('pre > code.language-mermaid');
    
    mermaidBlocks.forEach(async (block, index) => {
      const pre = block.parentElement;
      if (!pre) return;
      
      const code = block.textContent || '';
      const id = `mermaid-${mermaidKey}-${index}`;
      
      try {
        const { svg } = await mermaid.render(id, code);
        const wrapper = document.createElement('div');
        wrapper.className = 'mermaid-diagram';
        wrapper.innerHTML = svg;
        pre.replaceWith(wrapper);
      } catch (error) {
        console.error('Mermaid rendering error:', error);
        const errorDiv = document.createElement('div');
        errorDiv.className = 'mermaid-error';
        errorDiv.textContent = `Diagram error: ${error instanceof Error ? error.message : 'Unknown error'}`;
        pre.replaceWith(errorDiv);
      }
    });
  }, [html, mermaidKey]);

  // Generate dynamic CSS from config
  const dynamicCSS = useMemo(() => {
    const pageSizeMap = {
      a4: '210mm 297mm',
      letter: '8.5in 11in',
      legal: '8.5in 14in',
    };

    // These styles apply both on screen and in print
    return `
      .preview-content {
        font-family: ${config.fontFamily} !important;
        font-size: ${config.fontSize}px !important;
        line-height: ${config.lineHeight} !important;
        background-color: ${config.backgroundColor} !important;
        color: ${config.textColor} !important;
        padding: ${config.marginTop}mm ${config.marginRight}mm ${config.marginBottom}mm ${config.marginLeft}mm !important;
        min-height: 100%;
      }
      
      .preview-content h1, 
      .preview-content h2, 
      .preview-content h3, 
      .preview-content h4, 
      .preview-content h5, 
      .preview-content h6 {
        font-family: ${config.headingFontFamily} !important;
        margin-top: 1.5em;
        margin-bottom: 0.5em;
        font-weight: 600;
      }
      
      .preview-content h1 { font-size: ${config.h1Size}em !important; color: ${config.h1Color} !important; }
      .preview-content h2 { font-size: ${config.h2Size}em !important; color: ${config.h2Color} !important; }
      .preview-content h3 { font-size: ${config.h3Size}em !important; color: ${config.h3Color} !important; }
      .preview-content h4 { font-size: ${config.h4Size}em !important; color: ${config.h4Color} !important; }
      .preview-content h5 { font-size: ${config.h5Size}em !important; color: ${config.h5Color} !important; }
      .preview-content h6 { font-size: ${config.h6Size}em !important; color: ${config.h6Color} !important; }
      
      .preview-content a {
        color: ${config.linkColor} !important;
        text-decoration: underline;
        text-underline-offset: 2px;
      }
      
      .preview-content a:hover {
        opacity: 0.8;
      }
      
      .preview-content code {
        font-family: 'JetBrains Mono', 'Fira Code', Consolas, monospace !important;
        background-color: ${config.codeBackground} !important;
        color: ${config.codeColor} !important;
        padding: 0.2em 0.4em;
        border-radius: 4px;
        font-size: 0.9em;
      }
      
      .preview-content pre {
        background-color: ${config.codeBackground} !important;
        border-radius: 8px;
        padding: 1em;
        overflow-x: auto;
        margin: 1em 0;
      }
      
      .preview-content pre code {
        background: none !important;
        padding: 0;
        font-size: 0.875em;
        line-height: 1.6;
      }
      
      .preview-content blockquote {
        background-color: ${config.blockquoteBackground} !important;
        border-left: 4px solid ${config.blockquoteBorder} !important;
        margin: 1em 0;
        padding: 0.5em 1em;
        border-radius: 0 4px 4px 0;
      }
      
      .preview-content blockquote p {
        margin: 0.5em 0;
      }
      
      .preview-content table {
        width: 100%;
        border-collapse: collapse;
        margin: 1em 0;
      }
      
      .preview-content th,
      .preview-content td {
        border: 1px solid ${config.blockquoteBorder}40 !important;
        padding: 0.5em 1em;
        text-align: left;
      }
      
      .preview-content th {
        background-color: ${config.codeBackground} !important;
        font-weight: 600;
      }
      
      .preview-content tr:nth-child(even) {
        background-color: ${config.codeBackground}40 !important;
      }
      
      .preview-content ul,
      .preview-content ol {
        padding-left: 1.5em;
        margin: 0.5em 0;
      }
      
      .preview-content li {
        margin: 0.25em 0;
      }
      
      .preview-content li::marker {
        color: ${config.linkColor} !important;
      }
      
      .preview-content input[type="checkbox"] {
        margin-right: 0.5em;
        accent-color: ${config.linkColor} !important;
      }
      
      .preview-content hr {
        border: none;
        border-top: 1px solid ${config.blockquoteBorder}40 !important;
        margin: 2em 0;
      }
      
      .preview-content img {
        max-width: 100%;
        height: auto;
        border-radius: 8px;
        margin: 1em 0;
      }
      
      /* Callouts */
      .preview-content .callout {
        border-radius: 4px;
        padding: 1em;
        margin: 1em 0;
      }
      
      .preview-content .callout-note {
        background-color: #7aa2f720 !important;
        border-left-color: #7aa2f7 !important;
      }
      
      .preview-content .callout-tip {
        background-color: #9ece6a20 !important;
        border-left-color: #9ece6a !important;
      }
      
      .preview-content .callout-important {
        background-color: #bb9af720 !important;
        border-left-color: #bb9af7 !important;
      }
      
      .preview-content .callout-warning {
        background-color: #ff9e6420 !important;
        border-left-color: #ff9e64 !important;
      }
      
      .preview-content .callout-caution {
        background-color: #f7768e20 !important;
        border-left-color: #f7768e !important;
      }
      
      /* Mermaid */
      .preview-content .mermaid-diagram {
        background-color: ${config.codeBackground} !important;
        border-radius: 8px;
        padding: 1em;
        margin: 1em 0;
        text-align: center;
      }
      
      .preview-content .mermaid-diagram svg {
        max-width: 100%;
        height: auto;
      }
      
      .preview-content .mermaid-error {
        background-color: #f7768e20 !important;
        border: 1px solid #f7768e !important;
        color: #f7768e !important;
        padding: 1em;
        border-radius: 8px;
        margin: 1em 0;
        font-family: monospace;
        font-size: 0.9em;
      }
      
      /* KaTeX */
      .preview-content .katex-display {
        margin: 1em 0;
        overflow-x: auto;
        overflow-y: hidden;
      }
      
      /* Print styles */
      @media print {
        @page {
          size: ${pageSizeMap[config.pageSize]};
          margin: 0;
        }
        
        html, body {
          height: auto !important;
          overflow: visible !important;
        }
        
        .preview-content {
          position: relative !important;
          width: 100% !important;
          height: auto !important;
          overflow: visible !important;
          background-color: ${config.backgroundColor} !important;
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
          color-adjust: exact !important;
        }
        
        .preview-content * {
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
          color-adjust: exact !important;
        }
      }
      
      /* Custom CSS override */
      ${customCSS}
    `;
  }, [config, customCSS]);

  // Inject styles into document head for print
  useEffect(() => {
    const styleId = 'preview-print-styles';
    let styleEl = document.getElementById(styleId) as HTMLStyleElement | null;
    
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = styleId;
      document.head.appendChild(styleEl);
    }
    
    styleEl.textContent = dynamicCSS;
    
    return () => {
      // Don't remove on cleanup - keep for print
    };
  }, [dynamicCSS]);

  return (
    <div id="preview-container" className="preview-container h-full overflow-auto">
      <style>{dynamicCSS}</style>
      <div 
        ref={containerRef}
        className="preview-content min-h-full"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
