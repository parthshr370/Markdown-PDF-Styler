import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkRehype from 'remark-rehype';
import rehypeKatex from 'rehype-katex';
import rehypeHighlight from 'rehype-highlight';
import rehypeStringify from 'rehype-stringify';
import rehypeRaw from 'rehype-raw';

// Transform callouts/admonitions
function remarkCallouts() {
  return (tree: any) => {
    const visit = (node: any) => {
      if (node.type === 'blockquote' && node.children?.[0]?.type === 'paragraph') {
        const firstChild = node.children[0];
        if (firstChild.children?.[0]?.type === 'text') {
          const text = firstChild.children[0].value;
          const calloutMatch = text.match(/^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*/i);
          
          if (calloutMatch) {
            const type = calloutMatch[1].toLowerCase();
            // Remove the callout marker from text
            firstChild.children[0].value = text.replace(calloutMatch[0], '');
            
            // Add data attributes for styling
            node.data = node.data || {};
            node.data.hProperties = node.data.hProperties || {};
            node.data.hProperties.className = `callout callout-${type}`;
            node.data.hProperties['data-callout'] = type;
          }
        }
      }
      
      if (node.children) {
        node.children.forEach(visit);
      }
    };
    
    visit(tree);
  };
}

export async function renderMarkdown(content: string): Promise<string> {
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkMath)
    .use(remarkCallouts)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeKatex)
    .use(rehypeHighlight, { 
      detect: true,
      ignoreMissing: true 
    })
    .use(rehypeStringify)
    .process(content);
  
  return String(result);
}
