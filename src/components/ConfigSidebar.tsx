import { useState } from 'react';
import { type ThemeConfig, FONT_OPTIONS, PAGE_SIZES } from '../types/config';
import { THEME_PRESETS } from '../themes/presets';
import { CSSEditor } from './CSSEditor';
import { 
  Palette, Type, Layout, Code2, Wand2, 
  ChevronDown, Settings2
} from 'lucide-react';

interface ConfigSidebarProps {
  config: ThemeConfig;
  onConfigChange: (config: ThemeConfig) => void;
  customCSS: string;
  onCustomCSSChange: (css: string) => void;
}

type SectionId = 'theme' | 'typography' | 'colors' | 'page' | 'css';

export function ConfigSidebar({ config, onConfigChange, customCSS, onCustomCSSChange }: ConfigSidebarProps) {
  const [openSection, setOpenSection] = useState<SectionId | null>('theme');

  const toggleSection = (id: SectionId) => {
    setOpenSection(openSection === id ? null : id);
  };

  const updateConfig = <K extends keyof ThemeConfig>(key: K, value: ThemeConfig[K]) => {
    console.log('Updating config:', key, value); // Debug log
    onConfigChange({ ...config, [key]: value });
  };

  const applyPreset = (presetName: string) => {
    const preset = THEME_PRESETS.find(p => p.name === presetName);
    if (preset) {
      onConfigChange({ ...config, ...preset.config, preset: presetName });
    }
  };

  const currentPreset = THEME_PRESETS.find(p => p.name === config.preset);

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="px-5 py-4 border-b border-[var(--border-color)]">
        <div className="flex items-center gap-2.5">
          <Settings2 size={18} className="text-[var(--accent)]" />
          <span className="text-sm font-semibold text-[var(--text-primary)]">Settings</span>
        </div>
      </div>

      {/* Sections */}
      <div className="flex-1 overflow-y-auto">
        {/* Theme */}
        <Section
          icon={<Wand2 size={18} />}
          title="Theme"
          subtitle={currentPreset?.label || 'Custom'}
          isOpen={openSection === 'theme'}
          onToggle={() => toggleSection('theme')}
        >
          <div className="grid grid-cols-2 gap-2.5">
            {THEME_PRESETS.map((preset) => (
              <button
                key={preset.name}
                onClick={() => applyPreset(preset.name)}
                className={`p-2.5 rounded-xl text-left transition-all ${
                  config.preset === preset.name
                    ? 'ring-2 ring-[var(--accent)] bg-[var(--accent)]/10'
                    : 'bg-[var(--card-bg)] hover:bg-[var(--card-hover)]'
                }`}
              >
                <div 
                  className="h-8 rounded-lg mb-2 flex items-end overflow-hidden"
                  style={{ backgroundColor: preset.config.backgroundColor }}
                >
                  <div className="flex w-full h-1.5">
                    <div className="flex-1" style={{ backgroundColor: preset.config.h1Color }} />
                    <div className="flex-1" style={{ backgroundColor: preset.config.h2Color }} />
                    <div className="flex-1" style={{ backgroundColor: preset.config.h3Color }} />
                  </div>
                </div>
                <span className="text-xs font-medium text-[var(--text-secondary)]">{preset.label}</span>
              </button>
            ))}
          </div>
        </Section>

        {/* Typography */}
        <Section
          icon={<Type size={18} />}
          title="Typography"
          subtitle={`${config.fontSize}px • ${config.lineHeight.toFixed(1)}`}
          isOpen={openSection === 'typography'}
          onToggle={() => toggleSection('typography')}
        >
          <div className="space-y-5">
            <SelectField
              label="Body Font"
              value={config.fontFamily}
              options={FONT_OPTIONS}
              onChange={(v) => updateConfig('fontFamily', v)}
            />
            <SelectField
              label="Heading Font"
              value={config.headingFontFamily}
              options={FONT_OPTIONS}
              onChange={(v) => updateConfig('headingFontFamily', v)}
            />
            <SliderField
              label="Font Size"
              value={config.fontSize}
              min={12}
              max={24}
              step={1}
              unit="px"
              onChange={(v) => updateConfig('fontSize', v)}
            />
            <SliderField
              label="Line Height"
              value={config.lineHeight}
              min={1.2}
              max={2.4}
              step={0.1}
              onChange={(v) => updateConfig('lineHeight', v)}
            />
            <div className="pt-4 border-t border-[var(--border-color)]">
              <label className="text-xs text-[var(--text-muted)] mb-3 block font-medium">Heading Sizes (em)</label>
              <div className="grid grid-cols-6 gap-2">
                {(['h1Size', 'h2Size', 'h3Size', 'h4Size', 'h5Size', 'h6Size'] as const).map((key, i) => (
                  <MiniNumberField
                    key={key}
                    label={`H${i + 1}`}
                    value={config[key]}
                    onChange={(v) => updateConfig(key, v)}
                  />
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* Colors */}
        <Section
          icon={<Palette size={18} />}
          title="Colors"
          subtitle="Custom palette"
          isOpen={openSection === 'colors'}
          onToggle={() => toggleSection('colors')}
          preview={
            <div className="flex gap-1">
              <div className="w-4 h-4 rounded-md" style={{ backgroundColor: config.backgroundColor, border: '1px solid var(--border-color)' }} />
              <div className="w-4 h-4 rounded-md" style={{ backgroundColor: config.linkColor }} />
            </div>
          }
        >
          <div className="space-y-4">
            <ColorRow label="Background" value={config.backgroundColor} onChange={(v) => updateConfig('backgroundColor', v)} />
            <ColorRow label="Text" value={config.textColor} onChange={(v) => updateConfig('textColor', v)} />
            <ColorRow label="Links" value={config.linkColor} onChange={(v) => updateConfig('linkColor', v)} />
            <ColorRow label="Code BG" value={config.codeBackground} onChange={(v) => updateConfig('codeBackground', v)} />
            
            <div className="pt-4 border-t border-[var(--border-color)]">
              <label className="text-xs text-[var(--text-muted)] mb-3 block font-medium">Heading Colors</label>
              <div className="grid grid-cols-6 gap-2">
                {(['h1Color', 'h2Color', 'h3Color', 'h4Color', 'h5Color', 'h6Color'] as const).map((key, i) => (
                  <MiniColorField
                    key={key}
                    label={`H${i + 1}`}
                    value={config[key]}
                    onChange={(v) => updateConfig(key, v)}
                  />
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* Page Setup */}
        <Section
          icon={<Layout size={18} />}
          title="Page Setup"
          subtitle={config.pageSize.toUpperCase()}
          isOpen={openSection === 'page'}
          onToggle={() => toggleSection('page')}
        >
          <div className="space-y-5">
            <SelectField
              label="Page Size"
              value={config.pageSize}
              options={PAGE_SIZES}
              onChange={(v) => updateConfig('pageSize', v as ThemeConfig['pageSize'])}
            />
            <div>
              <label className="text-xs text-[var(--text-muted)] mb-3 block font-medium">Margins (mm)</label>
              <div className="grid grid-cols-2 gap-3">
                <MiniNumberField label="Top" value={config.marginTop} onChange={(v) => updateConfig('marginTop', v)} />
                <MiniNumberField label="Right" value={config.marginRight} onChange={(v) => updateConfig('marginRight', v)} />
                <MiniNumberField label="Bottom" value={config.marginBottom} onChange={(v) => updateConfig('marginBottom', v)} />
                <MiniNumberField label="Left" value={config.marginLeft} onChange={(v) => updateConfig('marginLeft', v)} />
              </div>
            </div>
          </div>
        </Section>

        {/* Custom CSS */}
        <Section
          icon={<Code2 size={18} />}
          title="Custom CSS"
          subtitle={customCSS ? 'Modified' : 'None'}
          isOpen={openSection === 'css'}
          onToggle={() => toggleSection('css')}
        >
          <CSSEditor value={customCSS} onChange={onCustomCSSChange} />
        </Section>
      </div>
    </div>
  );
}

// =============================================================================
// Components
// =============================================================================

function Section({
  icon,
  title,
  subtitle,
  isOpen,
  onToggle,
  children,
  preview,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  preview?: React.ReactNode;
}) {
  return (
    <div className="border-b border-[var(--border-color)]">
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-3 px-5 py-4 hover:bg-[var(--card-bg)] transition-colors"
      >
        <div className={`${isOpen ? 'text-[var(--accent)]' : 'text-[var(--text-muted)]'} transition-colors`}>
          {icon}
        </div>
        <div className="flex-1 text-left">
          <div className="text-sm font-medium text-[var(--text-primary)]">{title}</div>
          <div className="text-xs text-[var(--text-muted)]">{subtitle}</div>
        </div>
        {preview}
        <ChevronDown 
          size={16} 
          className={`text-[var(--text-muted)] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>
      {isOpen && (
        <div className="px-5 pb-5">
          {children}
        </div>
      )}
    </div>
  );
}

function SelectField({ 
  label, 
  value, 
  options, 
  onChange 
}: { 
  label: string; 
  value: string; 
  options: { label: string; value: string }[]; 
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="text-xs text-[var(--text-muted)] mb-2 block font-medium">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/50 focus:border-[var(--accent)]"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function SliderField({ 
  label, 
  value, 
  min, 
  max, 
  step, 
  unit,
  onChange 
}: { 
  label: string; 
  value: number; 
  min: number; 
  max: number; 
  step: number;
  unit?: string;
  onChange: (value: number) => void;
}) {
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <label className="text-xs text-[var(--text-muted)] font-medium">{label}</label>
        <span className="text-xs font-semibold text-[var(--accent)] bg-[var(--accent)]/10 px-2 py-0.5 rounded-md">
          {typeof value === 'number' ? (Number.isInteger(value) ? value : value.toFixed(1)) : value}{unit}
        </span>
      </div>
      <input
        type="range"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => {
          const newValue = parseFloat(e.target.value);
          console.log('Slider changed:', label, newValue); // Debug
          onChange(newValue);
        }}
        className="w-full"
      />
    </div>
  );
}

function MiniNumberField({ 
  label, 
  value, 
  onChange 
}: { 
  label: string; 
  value: number; 
  onChange: (value: number) => void;
}) {
  return (
    <div>
      <label className="text-[10px] text-[var(--text-muted)] mb-1.5 block text-center font-medium">{label}</label>
      <input
        type="number"
        value={value}
        step={0.1}
        onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
        className="w-full bg-[var(--card-bg)] border border-[var(--border-color)] rounded-lg px-2 py-2 text-xs text-center focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/50 focus:border-[var(--accent)]"
      />
    </div>
  );
}

function ColorRow({ 
  label, 
  value, 
  onChange 
}: { 
  label: string; 
  value: string; 
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex items-center gap-3 p-2.5 bg-[var(--card-bg)] rounded-xl">
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-9 h-9 rounded-lg cursor-pointer flex-shrink-0"
      />
      <div className="flex-1 min-w-0">
        <div className="text-xs text-[var(--text-muted)] font-medium mb-0.5">{label}</div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent text-xs font-mono text-[var(--text-secondary)] focus:outline-none"
        />
      </div>
    </div>
  );
}

function MiniColorField({ 
  label, 
  value, 
  onChange 
}: { 
  label: string; 
  value: string; 
  onChange: (value: string) => void;
}) {
  return (
    <div className="text-center">
      <label className="text-[10px] text-[var(--text-muted)] mb-1.5 block font-medium">{label}</label>
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-8 rounded-lg cursor-pointer"
      />
    </div>
  );
}
