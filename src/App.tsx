import { useState, useCallback } from 'react';
import { Group, Panel, Separator } from 'react-resizable-panels';
import { Editor } from './components/Editor';
import { Preview } from './components/Preview';
import { ConfigSidebar } from './components/ConfigSidebar';
import { SAMPLE_MARKDOWN } from './markdown/sample';
import { type ThemeConfig, DEFAULT_CONFIG } from './types/config';
import { Printer, FileText, Download } from 'lucide-react';
import { exportToPdf } from './utils/pdf-export';
import './index.css';

function App() {
  const [markdown, setMarkdown] = useState(SAMPLE_MARKDOWN);
  const [config, setConfig] = useState<ThemeConfig>(DEFAULT_CONFIG);
  const [customCSS, setCustomCSS] = useState('');
  const [isExporting, setIsExporting] = useState(false);

  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  const handleExport = useCallback(async () => {
    setIsExporting(true);
    // Give UI a moment to update
    setTimeout(async () => {
      await exportToPdf('#preview-container', config, 'markdown-styled.pdf');
      setIsExporting(false);
    }, 100);
  }, [config]);

  return (
    <div className="h-screen flex flex-col bg-[var(--app-bg)]">
      {/* Header */}
      <header className="no-print flex items-center justify-between px-6 py-4 border-b border-[var(--border-color)]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[var(--accent)] to-purple-600 flex items-center justify-center shadow-lg shadow-[var(--accent)]/20">
            <FileText size={18} className="text-white" />
          </div>
          <div>
            <h1 className="text-base font-semibold text-[var(--text-primary)]">Markdown PDF Styler</h1>
            <p className="text-[11px] text-[var(--text-muted)]">Create beautiful PDFs from markdown</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2.5 bg-[var(--card-bg)] text-[var(--text-primary)] border border-[var(--border-color)] rounded-xl hover:bg-[var(--card-hover)] transition-all text-sm font-medium"
          >
            <Printer size={16} />
            Print
          </button>
          <button
            onClick={handleExport}
            disabled={isExporting}
            className="flex items-center gap-2 px-5 py-2.5 bg-[var(--accent)] text-white rounded-xl hover:bg-[var(--accent-hover)] transition-all text-sm font-medium shadow-lg shadow-[var(--accent)]/25 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isExporting ? (
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Download size={16} />
            )}
            {isExporting ? 'Generating...' : 'Download PDF'}
          </button>
        </div>
      </header>

      {/* Main Layout: Editor + Preview | Sidebar */}
      <div className="flex-1 flex overflow-hidden">
        {/* Main Content Area - Editor & Preview */}
        <div className="flex-1 p-5">
          <div className="h-full bg-[var(--panel-bg)] rounded-2xl border border-[var(--border-color)] overflow-hidden shadow-xl shadow-black/20">
            <Group orientation="horizontal" className="h-full">
              {/* Editor */}
              <Panel defaultSize={50} minSize={30}>
                <div className="h-full flex flex-col">
                  <div className="px-5 py-3 border-b border-[var(--border-color)] flex items-center gap-2.5 bg-[var(--panel-bg)]">
                    <div className="w-2.5 h-2.5 rounded-full bg-[var(--accent)]" />
                    <span className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">Editor</span>
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <Editor value={markdown} onChange={setMarkdown} />
                  </div>
                </div>
              </Panel>

              <Separator className="no-print" />

              {/* Preview */}
              <Panel defaultSize={50} minSize={30}>
                <div className="h-full flex flex-col">
                  <div className="px-5 py-3 border-b border-[var(--border-color)] flex items-center gap-2.5 bg-[var(--panel-bg)]">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <span className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">Preview</span>
                  </div>
                  <div className="flex-1 overflow-auto">
                    <Preview 
                      markdown={markdown} 
                      config={config} 
                      customCSS={customCSS}
                    />
                  </div>
                </div>
              </Panel>
            </Group>
          </div>
        </div>

        {/* Right Sidebar - Settings */}
        <div className="no-print w-80 border-l border-[var(--border-color)] bg-[var(--panel-bg)] overflow-hidden flex flex-col">
          <ConfigSidebar
            config={config}
            onConfigChange={setConfig}
            customCSS={customCSS}
            onCustomCSSChange={setCustomCSS}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
