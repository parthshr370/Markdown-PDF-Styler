import CodeMirror from '@uiw/react-codemirror';
import { css } from '@codemirror/lang-css';
import { oneDark } from '@codemirror/theme-one-dark';

interface CSSEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const placeholder = `/* Custom styles */
.preview-content h1 {
  text-shadow: 0 0 20px currentColor;
}
`;

export function CSSEditor({ value, onChange }: CSSEditorProps) {
  return (
    <div className="space-y-2">
      <p className="text-[10px] text-[var(--text-muted)]">
        Use <code className="text-[var(--accent)]">.preview-content</code> selector
      </p>
      <div className="h-36 rounded-lg overflow-hidden border border-[var(--border-color)]">
        <CodeMirror
          value={value}
          height="100%"
          theme={oneDark}
          extensions={[css()]}
          onChange={(val) => onChange(val)}
          placeholder={placeholder}
          basicSetup={{
            lineNumbers: false,
            highlightActiveLineGutter: false,
            highlightActiveLine: true,
            foldGutter: false,
            autocompletion: true,
          }}
          style={{ height: '100%', fontSize: '11px' }}
        />
      </div>
    </div>
  );
}
