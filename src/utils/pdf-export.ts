// @ts-ignore
import html2pdf from 'html2pdf.js';
import { type ThemeConfig } from '../types/config';

export const exportToPdf = async (elementId: string, config: ThemeConfig, filename = 'document.pdf') => {
  const element = document.querySelector(elementId);
  if (!element) return;

  // Clone the element to avoid modifying the visible preview
  const clone = element.cloneNode(true) as HTMLElement;
  
  // Create a hidden container for the clone to ensure layout is calculated correctly
  const container = document.createElement('div');
  container.style.position = 'absolute';
  container.style.top = '-9999px';
  container.style.left = '0';
  // Set width to standard A4 pixel width (approx 800px) or slightly larger for better text ratio
  // Increasing this makes the font look smaller relative to the page
  const contentWidth = 1000; 
  container.style.width = `${contentWidth}px`;
  document.body.appendChild(container);
  container.appendChild(clone);
  
  // Apply styling to the clone for the capture
  clone.style.width = '100%';
  clone.style.height = 'auto';
  clone.style.minHeight = '100%'; // Ensure background fills at least one page
  clone.style.margin = '0';
  clone.style.padding = '0';
  clone.style.backgroundColor = config.backgroundColor;
  clone.style.color = config.textColor;
  
  // Force styles on children
  const allElements = clone.querySelectorAll('*');
  allElements.forEach((el) => {
    if (el instanceof HTMLElement) {
      const computed = getComputedStyle(el);
      el.style.color = computed.color;
      el.style.borderColor = computed.borderColor;
      
      // Handle background colors for code blocks etc
      const bg = computed.backgroundColor;
      if (bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') {
        el.style.backgroundColor = bg;
      }
      
      // Ensure box-sizing is correct
      el.style.boxSizing = 'border-box';

      // Enforce no-break rules directly on styles for export
      if (['PRE', 'BLOCKQUOTE', 'TABLE', 'IMG', 'FIGURE'].includes(el.tagName)) {
        el.style.pageBreakInside = 'avoid';
        el.style.breakInside = 'avoid';
        el.style.display = 'block'; // Ensure block level for breaks to work
        el.style.position = 'relative';
      }
      
      // Keep headings with their following content
      if (/^H[1-6]$/.test(el.tagName)) {
        el.style.pageBreakAfter = 'avoid';
        el.style.breakAfter = 'avoid';
      }
    }
  });

  // Calculate margins in mm for jsPDF
  const margin = [
    config.marginTop, 
    config.marginRight, 
    config.marginBottom, 
    config.marginLeft
  ];

  const opt = {
    margin: margin,
    filename: filename,
    image: { type: 'jpeg', quality: 0.98 },
    enableLinks: true,
    // Improved pagebreak settings
    pagebreak: { 
      mode: ['avoid-all', 'css', 'legacy'],
      before: '.page-break-before',
      after: '.page-break-after',
      avoid: ['pre', 'blockquote', 'table', 'img', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']
    },
    html2canvas: { 
      scale: 2, 
      useCORS: true, 
      letterRendering: true,
      backgroundColor: config.backgroundColor,
      windowWidth: contentWidth,
      width: contentWidth,
      scrollY: 0
    },
    jsPDF: { 
      unit: 'mm', 
      format: config.pageSize, 
      orientation: 'portrait' 
    }
  } as any;

  try {
    await html2pdf().set(opt).from(clone).save();
  } catch (error) {
    console.error('PDF export failed:', error);
  } finally {
    // Clean up
    document.body.removeChild(container);
  }
};
