export const SAMPLE_MARKDOWN = `# Welcome to Markdown PDF Styler

Create beautifully styled PDFs from your Markdown documents. This sample showcases all supported features.

## Typography & Text Formatting

This is a paragraph with **bold text**, *italic text*, and ***bold italic*** combined. You can also use ~~strikethrough~~ and \`inline code\` within your text.

Here's a [link to example.com](https://example.com) and an autolink: https://github.com

### Lists

#### Unordered List
- First item with some longer text that might wrap to the next line
- Second item
  - Nested item
  - Another nested item
    - Deeply nested
- Third item

#### Ordered List
1. First step
2. Second step
   1. Sub-step A
   2. Sub-step B
3. Third step

#### Task List
- [x] Completed task
- [ ] Pending task
- [ ] Another pending task

## Blockquotes

> "The best way to predict the future is to invent it."
> 
> — Alan Kay

Nested blockquotes:

> This is the first level of quoting.
>
> > This is a nested blockquote.
> >
> > > And this is even deeper.

## Code Blocks

Inline code: \`const greeting = "Hello, World!"\`

### JavaScript
\`\`\`javascript
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Generate first 10 Fibonacci numbers
const sequence = Array.from({ length: 10 }, (_, i) => fibonacci(i));
console.log(sequence); // [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
\`\`\`

### Python
\`\`\`python
class DataProcessor:
    def __init__(self, data: list[dict]):
        self.data = data
    
    def filter_by(self, key: str, value: any) -> list[dict]:
        return [item for item in self.data if item.get(key) == value]
    
    def transform(self, func: callable) -> 'DataProcessor':
        self.data = [func(item) for item in self.data]
        return self

# Usage
processor = DataProcessor([{"name": "Alice", "age": 30}])
\`\`\`

### Rust
\`\`\`rust
fn main() {
    let numbers: Vec<i32> = (1..=10).collect();
    let sum: i32 = numbers.iter().sum();
    println!("Sum of 1 to 10: {}", sum);
}
\`\`\`

## Tables

| Feature | Status | Notes |
|---------|--------|-------|
| Markdown Parsing | Done | Full GFM support |
| Syntax Highlighting | Done | Multiple languages |
| Math Equations | Done | KaTeX rendering |
| Diagrams | Done | Mermaid support |
| Custom Themes | Done | Dark & light modes |
| PDF Export | Done | Via browser print |

### Alignment

| Left Aligned | Center Aligned | Right Aligned |
|:-------------|:--------------:|--------------:|
| Content | Content | Content |
| More content | More content | More content |

## Mathematics

Inline math: The quadratic formula is $x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}$

Block math:

$$
\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}
$$

Maxwell's equations:

$$
\\begin{aligned}
\\nabla \\cdot \\mathbf{E} &= \\frac{\\rho}{\\varepsilon_0} \\\\
\\nabla \\cdot \\mathbf{B} &= 0 \\\\
\\nabla \\times \\mathbf{E} &= -\\frac{\\partial \\mathbf{B}}{\\partial t} \\\\
\\nabla \\times \\mathbf{B} &= \\mu_0 \\mathbf{J} + \\mu_0 \\varepsilon_0 \\frac{\\partial \\mathbf{E}}{\\partial t}
\\end{aligned}
$$

## Diagrams (Mermaid)

### Flowchart
\`\`\`mermaid
flowchart TD
    A[Start] --> B{Is it working?}
    B -->|Yes| C[Great!]
    B -->|No| D[Debug]
    D --> B
    C --> E[End]
\`\`\`

### Sequence Diagram
\`\`\`mermaid
sequenceDiagram
    participant User
    participant App
    participant API
    User->>App: Enter markdown
    App->>App: Render preview
    User->>App: Click Print
    App->>API: Generate PDF
    API-->>User: Download PDF
\`\`\`

### Class Diagram
\`\`\`mermaid
classDiagram
    class Document {
        +String title
        +String content
        +render()
        +export()
    }
    class Theme {
        +String name
        +Object colors
        +apply()
    }
    Document --> Theme
\`\`\`

## Callouts / Admonitions

> [!NOTE]
> This is a note callout. Use it for additional information.

> [!TIP]
> This is a tip callout. Share helpful suggestions here.

> [!IMPORTANT]
> This is an important callout. Don't miss this information!

> [!WARNING]
> This is a warning callout. Be careful about this.

> [!CAUTION]
> This is a caution callout. This might cause problems.

## Images

![Placeholder Image](https://via.placeholder.com/600x200/1a1b26/7aa2f7?text=Your+Image+Here)

## Horizontal Rules

Content above the rule.

---

Content below the rule.

***

Another section.

## Footnotes

Here's a sentence with a footnote[^1].

And another one[^2].

[^1]: This is the first footnote content.
[^2]: This is the second footnote with more detail.

## Definition Lists

Markdown
: A lightweight markup language for creating formatted text.

PDF
: Portable Document Format, a file format for documents.

---

*This sample document demonstrates all the features supported by Markdown PDF Styler. Customize the theme, adjust the typography, and export your perfectly styled PDF!*
`;
