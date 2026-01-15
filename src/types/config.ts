export interface ThemeConfig {
  // Theme preset
  preset: string;
  
  // Typography
  fontFamily: string;
  fontSize: number;
  lineHeight: number;
  
  // Heading styles
  headingFontFamily: string;
  h1Size: number;
  h2Size: number;
  h3Size: number;
  h4Size: number;
  h5Size: number;
  h6Size: number;
  
  // Colors
  backgroundColor: string;
  textColor: string;
  headingColor: string;
  linkColor: string;
  codeBackground: string;
  codeColor: string;
  blockquoteBackground: string;
  blockquoteBorder: string;
  
  // Heading colors (optional per-heading)
  h1Color: string;
  h2Color: string;
  h3Color: string;
  h4Color: string;
  h5Color: string;
  h6Color: string;
  
  // Page setup
  pageSize: 'a4' | 'letter' | 'legal';
  marginTop: number;
  marginRight: number;
  marginBottom: number;
  marginLeft: number;
  
  // Code block
  codeTheme: 'github-dark' | 'monokai' | 'dracula' | 'one-dark' | 'nord';
}

export const DEFAULT_CONFIG: ThemeConfig = {
  preset: 'tokyo-night',
  
  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
  fontSize: 16,
  lineHeight: 1.7,
  
  headingFontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
  h1Size: 2.5,
  h2Size: 2,
  h3Size: 1.5,
  h4Size: 1.25,
  h5Size: 1.1,
  h6Size: 1,
  
  backgroundColor: '#1a1b26',
  textColor: '#a9b1d6',
  headingColor: '#c0caf5',
  linkColor: '#7aa2f7',
  codeBackground: '#24283b',
  codeColor: '#a9b1d6',
  blockquoteBackground: '#1f2335',
  blockquoteBorder: '#7aa2f7',
  
  h1Color: '#ff9e64',
  h2Color: '#9ece6a',
  h3Color: '#7aa2f7',
  h4Color: '#bb9af7',
  h5Color: '#f7768e',
  h6Color: '#7dcfff',
  
  pageSize: 'a4',
  marginTop: 20,
  marginRight: 20,
  marginBottom: 20,
  marginLeft: 20,
  
  codeTheme: 'one-dark',
};

export const FONT_OPTIONS = [
  { label: 'Inter', value: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif' },
  { label: 'System UI', value: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' },
  { label: 'Georgia', value: 'Georgia, "Times New Roman", serif' },
  { label: 'Merriweather', value: 'Merriweather, Georgia, serif' },
  { label: 'Roboto', value: 'Roboto, "Helvetica Neue", Arial, sans-serif' },
  { label: 'Fira Sans', value: '"Fira Sans", -apple-system, sans-serif' },
  { label: 'Source Serif', value: '"Source Serif Pro", Georgia, serif' },
  { label: 'IBM Plex Sans', value: '"IBM Plex Sans", sans-serif' },
  { label: 'JetBrains Mono', value: '"JetBrains Mono", monospace' },
];

export const PAGE_SIZES = [
  { label: 'A4', value: 'a4' },
  { label: 'US Letter', value: 'letter' },
  { label: 'US Legal', value: 'legal' },
];

export const CODE_THEMES = [
  { label: 'One Dark', value: 'one-dark' },
  { label: 'GitHub Dark', value: 'github-dark' },
  { label: 'Monokai', value: 'monokai' },
  { label: 'Dracula', value: 'dracula' },
  { label: 'Nord', value: 'nord' },
];
