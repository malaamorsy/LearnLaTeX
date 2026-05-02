import type { Level } from "../types";

export const world1Levels: Level[] = [
  {
    id: "1.1",
    worldId: 1,
    title: "The skeleton of every document",
    lesson: {
      title: "What is a LaTeX document?",
      body: `LaTeX is a document preparation system, not just a math renderer. Every LaTeX file has the same two-part skeleton:

**The preamble** — everything before \\begin{document}. This is where you declare the document class and load packages.

**The body** — everything between \\begin{document} and \\end{document}. This is your actual content.

Here is the absolute minimum document that compiles:

\`\`\`
\\documentclass{article}
\\begin{document}
Hello, world!
\\end{document}
\`\`\`

**\\documentclass{article}** tells LaTeX what kind of document this is. The most common classes are:
- \`article\` — papers, reports, homework
- \`report\` — longer documents with chapters
- \`book\` — books
- \`beamer\` — presentation slides

**\\begin{document}** and **\\end{document}** delimit the content. Anything outside them (except the preamble) is ignored.`,
      examples: [
        {
          code: `\\documentclass{article}\n\\begin{document}\nHello, world!\n\\end{document}`,
          caption: "The minimal document — document class, then body between begin/end.",
          renderMode: "document",
        },
      ],
      keyPoints: [
        "Every LaTeX file starts with `\\documentclass{...}`",
        "Content goes between `\\begin{document}` and `\\end{document}`",
        "Everything before `\\begin{document}` is the preamble",
        "The preamble is for settings, not content",
      ],
    },
    goalText: "Write the minimal LaTeX document that produces 'Hello, world!' — include the document class, the begin/end document, and the text.",
    targetLatex: `\\documentclass{article}\n\\begin{document}\nHello, world!\n\\end{document}`,
    renderMode: "document",
    validationMode: "pattern",
    requiredPatterns: [
      "\\\\documentclass\\{article\\}",
      "\\\\begin\\{document\\}",
      "Hello, world!",
      "\\\\end\\{document\\}",
    ],
    hints: [
      "Start with \\documentclass{article} on the first line",
      "Then \\begin{document}, your text, then \\end{document}",
      "Try:\n\\documentclass{article}\n\\begin{document}\nHello, world!\n\\end{document}",
    ],
    solutionLatex: `\\documentclass{article}\n\\begin{document}\nHello, world!\n\\end{document}`,
    tags: ["document-structure", "basics"],
    estimatedMinutes: 3,
    conceptExplanation: "Every LaTeX document has a documentclass and a document environment that wraps all content.",
    isBoss: false,
  },
  {
    id: "1.2",
    worldId: 1,
    title: "Loading packages",
    lesson: {
      title: "Packages — extending LaTeX",
      body: `LaTeX's power comes from packages. A package adds new commands and features. You load packages in the preamble with **\\usepackage{name}**.

Think of it like installing a library in programming — you declare it once at the top, then use its features anywhere in the document.

Some essential packages you'll use constantly:
- \`amsmath\` — better math environments (align, cases, etc.)
- \`amssymb\` — extra math symbols (ℝ, ℤ, ∴, etc.)
- \`geometry\` — control page margins
- \`graphicx\` — include images
- \`hyperref\` — clickable links and cross-references
- \`xcolor\` — text colors

Some packages accept options in square brackets:

\`\`\`
\\usepackage[a4paper, margin=2cm]{geometry}
\\usepackage[utf8]{inputenc}
\`\`\`

The standard preamble for a math paper looks like:

\`\`\`
\\documentclass{article}
\\usepackage{amsmath}
\\usepackage{amssymb}
\\usepackage{geometry}
\\begin{document}
...
\\end{document}
\`\`\``,
      examples: [
        {
          code: `\\documentclass{article}\n\\usepackage{amsmath}\n\\usepackage{amssymb}\n\\begin{document}\nWe know $\\mathbb{R}$ is uncountable.\n\\end{document}`,
          caption: "Packages load in the preamble; their features are available in the body.",
          renderMode: "document",
        },
      ],
      keyPoints: [
        "`\\usepackage{name}` goes in the preamble, before `\\begin{document}`",
        "Options go in square brackets: `\\usepackage[option]{name}`",
        "`amsmath` and `amssymb` are almost always needed for math",
        "Order matters: some packages must be loaded before others",
      ],
    },
    goalText: "Write a document preamble that loads three packages: amsmath, amssymb, and geometry. The body can contain any text.",
    targetLatex: `\\documentclass{article}\n\\usepackage{amsmath}\n\\usepackage{amssymb}\n\\usepackage{geometry}\n\\begin{document}\nSome content here.\n\\end{document}`,
    renderMode: "document",
    validationMode: "pattern",
    requiredPatterns: [
      "\\\\documentclass\\{article\\}",
      "\\\\usepackage\\{amsmath\\}",
      "\\\\usepackage\\{amssymb\\}",
      "\\\\usepackage\\{geometry\\}",
      "\\\\begin\\{document\\}",
      "\\\\end\\{document\\}",
    ],
    hints: [
      "Add \\usepackage{name} lines in the preamble, one per package",
      "The preamble is between \\documentclass and \\begin{document}",
      "Try:\n\\documentclass{article}\n\\usepackage{amsmath}\n\\usepackage{amssymb}\n\\usepackage{geometry}\n\\begin{document}\nContent\n\\end{document}",
    ],
    solutionLatex: `\\documentclass{article}\n\\usepackage{amsmath}\n\\usepackage{amssymb}\n\\usepackage{geometry}\n\\begin{document}\nContent here.\n\\end{document}`,
    tags: ["packages", "preamble"],
    estimatedMinutes: 3,
    conceptExplanation: "\\usepackage{} in the preamble loads extensions — amsmath and amssymb are essential for mathematics.",
    isBoss: false,
  },
  {
    id: "1.3",
    worldId: 1,
    title: "Title, author, and date",
    lesson: {
      title: "Creating a title page",
      body: `Professional documents have a title block. LaTeX generates this automatically from three commands in the preamble:

\`\`\`
\\title{My Paper Title}
\\author{Jane Smith}
\\date{\\today}
\`\`\`

Then in the body, call **\\maketitle** to actually render them. If you forget \\maketitle, the title won't appear.

**\\today** automatically inserts the current date. You can also write a date manually: \`\\date{April 2025}\`, or suppress it with \`\\date{}\`.

For multiple authors, separate with \`\\and\`:
\`\`\`
\\author{Alice \\and Bob \\and Carol}
\`\`\`

The article class renders the title, author, and date centered at the top of the first page.`,
      examples: [
        {
          code: `\\documentclass{article}\n\\title{Introduction to LaTeX}\n\\author{Jane Smith}\n\\date{\\today}\n\\begin{document}\n\\maketitle\nThis is the first paragraph.\n\\end{document}`,
          caption: "\\maketitle uses the \\title, \\author, \\date set in the preamble.",
          renderMode: "document",
        },
      ],
      keyPoints: [
        "`\\title{}`, `\\author{}`, `\\date{}` go in the **preamble**",
        "`\\maketitle` goes in the **body** — this renders the title block",
        "`\\today` inserts the current date automatically",
        "Without `\\maketitle`, the title commands have no effect",
      ],
    },
    goalText: "Write a complete document with a title 'My First Document', author 'Your Name', the current date (\\today), and call \\maketitle in the body. Add at least one sentence of content.",
    targetLatex: `\\documentclass{article}\n\\title{My First Document}\n\\author{Your Name}\n\\date{\\today}\n\\begin{document}\n\\maketitle\nThis is my first LaTeX document.\n\\end{document}`,
    renderMode: "document",
    validationMode: "pattern",
    requiredPatterns: [
      "\\\\documentclass\\{article\\}",
      "\\\\title\\{",
      "\\\\author\\{",
      "\\\\date\\{",
      "\\\\begin\\{document\\}",
      "\\\\maketitle",
      "\\\\end\\{document\\}",
    ],
    hints: [
      "\\title{}, \\author{}, \\date{} go BEFORE \\begin{document}",
      "\\maketitle goes AFTER \\begin{document} to render them",
      "Try:\n\\documentclass{article}\n\\title{My First Document}\n\\author{Your Name}\n\\date{\\today}\n\\begin{document}\n\\maketitle\nContent here.\n\\end{document}",
    ],
    solutionLatex: `\\documentclass{article}\n\\title{My First Document}\n\\author{Your Name}\n\\date{\\today}\n\\begin{document}\n\\maketitle\nThis is my first LaTeX document.\n\\end{document}`,
    tags: ["title", "document-structure"],
    estimatedMinutes: 4,
    conceptExplanation: "\\title, \\author, \\date set metadata in the preamble; \\maketitle renders the title block in the body.",
    isBoss: false,
  },
  {
    id: "1.4",
    worldId: 1,
    title: "Sections and headings",
    lesson: {
      title: "Organizing your document",
      body: `LaTeX auto-numbers sections. You just name them; LaTeX handles the numbering, spacing, and formatting.

The hierarchy for \`article\` class:

\`\`\`
\\section{Introduction}
\\subsection{Background}
\\subsubsection{Historical notes}
\\paragraph{A small note}
\`\`\`

For \`report\` and \`book\` classes, there's also \`\\chapter{}\` above sections.

**Add a star to suppress numbering:**
\`\`\`
\\section*{Unnumbered section}
\`\`\`

**Table of contents** — just one command:
\`\`\`
\\tableofcontents
\`\`\`
LaTeX generates it automatically. (It requires two compilation passes in a real compiler, but in our preview it's instant.)`,
      examples: [
        {
          code: `\\documentclass{article}\n\\begin{document}\n\\section{Introduction}\nThis section introduces the topic.\n\\subsection{Motivation}\nHere is why it matters.\n\\section{Methods}\nHere we describe our approach.\n\\end{document}`,
          caption: "Sections are auto-numbered and formatted by LaTeX.",
          renderMode: "document",
        },
      ],
      keyPoints: [
        "`\\section{}` > `\\subsection{}` > `\\subsubsection{}` > `\\paragraph{}`",
        "Add a `*` to suppress numbering: `\\section*{}`",
        "`\\tableofcontents` generates a TOC automatically",
        "Sections in `report`/`book` also have `\\chapter{}`",
      ],
    },
    goalText: "Write a document with a title, then two sections: 'Introduction' and 'Methods', each with a short paragraph.",
    targetLatex: `\\documentclass{article}\n\\title{My Report}\n\\author{Author}\n\\date{\\today}\n\\begin{document}\n\\maketitle\n\\section{Introduction}\nThis paper introduces the topic.\n\\section{Methods}\nWe used the following approach.\n\\end{document}`,
    renderMode: "document",
    validationMode: "pattern",
    requiredPatterns: [
      "\\\\documentclass",
      "\\\\begin\\{document\\}",
      "\\\\section\\{",
      "\\\\section\\{",
      "\\\\end\\{document\\}",
    ],
    hints: [
      "Use \\section{Name} to create a numbered section",
      "Write paragraphs as plain text between sections",
      "Try: \\section{Introduction} then text, then \\section{Methods} then text",
    ],
    solutionLatex: `\\documentclass{article}\n\\title{My Report}\n\\author{Author}\n\\date{\\today}\n\\begin{document}\n\\maketitle\n\\section{Introduction}\nThis paper introduces the topic.\n\\section{Methods}\nWe used the following approach.\n\\end{document}`,
    tags: ["sections", "document-structure"],
    estimatedMinutes: 4,
    conceptExplanation: "\\section, \\subsection, etc. create auto-numbered headings that define document structure.",
    isBoss: false,
  },
  {
    id: "1.5",
    worldId: 1,
    title: "Paragraphs and whitespace",
    lesson: {
      title: "How LaTeX handles text",
      body: `LaTeX ignores single newlines and extra spaces. Only a **blank line** starts a new paragraph. This is counterintuitive at first.

\`\`\`
This is the first paragraph.

This is the second paragraph — note the blank line above.
\`\`\`

Multiple spaces are treated as one space. Leading spaces on a line are ignored.

**Comments** start with \`%\`. Everything from \`%\` to the end of the line is ignored:

\`\`\`
This is visible text. % This is a comment — ignored by LaTeX
\`\`\`

**Forced line break** (use sparingly):
\`\`\`
Line one.\\\\
Line two.
\`\`\`

**Special characters** must be escaped:

| Character | LaTeX command |
|-----------|---------------|
| \`%\` | \`\\%\` |
| \`$\` | \`\\$\` |
| \`&\` | \`\\&\` |
| \`#\` | \`\\#\` |
| \`_\` | \`\\_\` |
| \`{\` | \`\\{\` |
| \`}\` | \`\\}\` |
| \`~\` | \`\\textasciitilde\` |
| \`^\` | \`\\textasciicircum\` |
| \`\\\` | \`\\textbackslash\` |`,
      examples: [
        {
          code: `\\documentclass{article}\n\\begin{document}\nThis is the first paragraph. Extra   spaces don't matter.\n\nThis is a new paragraph. The blank line above made it.\n\nThis has a forced\\\\line break.\n\\end{document}`,
          caption: "Blank lines = new paragraphs. Extra spaces collapse to one.",
          renderMode: "document",
        },
      ],
      keyPoints: [
        "A **blank line** starts a new paragraph — single newlines do not",
        "Extra spaces are collapsed to one space",
        "`%` starts a comment — everything after it on that line is ignored",
        "Special characters `% $ & # _ { }` must be escaped with a backslash",
      ],
    },
    goalText: "Write a document with two separate paragraphs (separated by a blank line), a comment (using %), and use at least one escaped special character (e.g. \\$100 or 50\\%).",
    targetLatex: `\\documentclass{article}\n\\begin{document}\nThis is the first paragraph with \\$100.\n\nThis is the second paragraph. % This is a comment\n\\end{document}`,
    renderMode: "document",
    validationMode: "pattern",
    requiredPatterns: [
      "\\\\documentclass",
      "\\\\begin\\{document\\}",
      "\\n\\n", // blank line between paragraphs
      "%", // comment
      "\\\\[%$&#_{}]", // at least one escaped special char
    ],
    hints: [
      "Put a blank line between your two paragraphs",
      "Add a % comment at the end of any line",
      "Escape a special character: write \\$ instead of $ for a dollar sign",
    ],
    solutionLatex: `\\documentclass{article}\n\\begin{document}\nThis is the first paragraph with \\$100.\n\nThis is the second paragraph. % This is a comment\n\\end{document}`,
    tags: ["paragraphs", "whitespace", "comments"],
    estimatedMinutes: 4,
    conceptExplanation: "Blank lines create new paragraphs; % starts a comment; special characters need backslash escaping.",
    isBoss: false,
  },
  {
    id: "1.6",
    worldId: 1,
    title: "Text formatting",
    lesson: {
      title: "Bold, italic, and other styles",
      body: `LaTeX has commands for all basic text formatting:

| Effect | Command | Example |
|--------|---------|---------|
| **Bold** | \`\\textbf{text}\` | \\textbf{important} |
| *Italic* | \`\\textit{text}\` | \\textit{emphasis} |
| Underline | \`\\underline{text}\` | \\underline{word} |
| \`Monospace\` | \`\\texttt{text}\` | \\texttt{code} |
| SMALL CAPS | \`\\textsc{text}\` | \\textsc{name} |
| Emphasis | \`\\emph{text}\` | \\emph{smart} |

**\\emph{}** is context-aware: inside italic text it becomes roman; outside it becomes italic. It's more semantic than \\textit.

**Font sizes** (smallest to largest):
\`\`\`
{\\tiny tiny} {\\scriptsize script} {\\footnotesize footnote}
{\\small small} {\\normalsize normal} {\\large large}
{\\Large Large} {\\LARGE LARGE} {\\huge huge} {\\Huge Huge}
\`\`\`

Note: size commands need \`{}\` braces to limit their scope.`,
      examples: [
        {
          code: `\\documentclass{article}\n\\begin{document}\nThis is \\textbf{bold}, this is \\textit{italic}, and this is \\texttt{monospace}.\n\n{\\large This text is larger} and this is normal again.\n\\end{document}`,
          caption: "Braces scope the effect — text outside them is unaffected.",
          renderMode: "document",
        },
      ],
      keyPoints: [
        "`\\textbf{}` bold, `\\textit{}` italic, `\\texttt{}` monospace, `\\underline{}` underline",
        "`\\emph{}` is the semantic choice — use it for emphasis in prose",
        "Font size commands like `\\large` affect everything until the closing `}`",
        "You can nest: `\\textbf{\\textit{bold italic}}`",
      ],
    },
    goalText: "Write a sentence that uses bold, italic, and monospace text — all three styles in one document.",
    targetLatex: `\\documentclass{article}\n\\begin{document}\nThis is \\textbf{bold}, \\textit{italic}, and \\texttt{monospace} text.\n\\end{document}`,
    renderMode: "document",
    validationMode: "pattern",
    requiredPatterns: [
      "\\\\documentclass",
      "\\\\begin\\{document\\}",
      "\\\\textbf\\{",
      "\\\\textit\\{",
      "\\\\texttt\\{",
    ],
    hints: [
      "\\textbf{word} for bold, \\textit{word} for italic, \\texttt{word} for monospace",
      "Put them inside a sentence with spaces between",
      "Try: This is \\textbf{bold}, \\textit{italic}, and \\texttt{monospace} text.",
    ],
    solutionLatex: `\\documentclass{article}\n\\begin{document}\nThis is \\textbf{bold}, \\textit{italic}, and \\texttt{monospace} text.\n\\end{document}`,
    tags: ["text-formatting", "basics"],
    estimatedMinutes: 3,
    conceptExplanation: "\\textbf{}, \\textit{}, \\texttt{} are the three basic text formatting commands.",
    isBoss: false,
  },
  {
    id: "1.7",
    worldId: 1,
    title: "Lists",
    lesson: {
      title: "Bullet lists and numbered lists",
      body: `Lists are environments — blocks that start with \\begin{name} and end with \\end{name}. Each item starts with \\item.

**Bullet list (unordered):**
\`\`\`
\\begin{itemize}
  \\item First item
  \\item Second item
  \\item Third item
\\end{itemize}
\`\`\`

**Numbered list (ordered):**
\`\`\`
\\begin{enumerate}
  \\item First
  \\item Second
  \\item Third
\\end{enumerate}
\`\`\`

**Description list:**
\`\`\`
\\begin{description}
  \\item[Term] Definition of the term.
  \\item[Another] Its definition.
\\end{description}
\`\`\`

**Nested lists** — just put one environment inside another:
\`\`\`
\\begin{itemize}
  \\item Outer item
  \\begin{itemize}
    \\item Nested item
  \\end{itemize}
\\end{itemize}
\`\`\`

LaTeX automatically handles indentation and bullet/number styles.`,
      examples: [
        {
          code: `\\documentclass{article}\n\\begin{document}\n\\begin{itemize}\n  \\item Apples\n  \\item Bananas\n  \\item Cherries\n\\end{itemize}\n\n\\begin{enumerate}\n  \\item First step\n  \\item Second step\n\\end{enumerate}\n\\end{document}`,
          caption: "itemize gives bullets; enumerate gives numbers.",
          renderMode: "document",
        },
      ],
      keyPoints: [
        "`\\begin{itemize}` for bullets, `\\begin{enumerate}` for numbers",
        "Each item starts with `\\item`",
        "Items can contain paragraphs, math, even nested lists",
        "`\\begin{description}` for term/definition pairs with `\\item[term]`",
      ],
    },
    goalText: "Write a document with an itemize list of at least 3 items AND an enumerate list of at least 2 items.",
    targetLatex: `\\documentclass{article}\n\\begin{document}\n\\begin{itemize}\n  \\item First\n  \\item Second\n  \\item Third\n\\end{itemize}\n\n\\begin{enumerate}\n  \\item Step one\n  \\item Step two\n\\end{enumerate}\n\\end{document}`,
    renderMode: "document",
    validationMode: "pattern",
    requiredPatterns: [
      "\\\\begin\\{itemize\\}",
      "\\\\end\\{itemize\\}",
      "\\\\begin\\{enumerate\\}",
      "\\\\end\\{enumerate\\}",
      "(\\\\item[^\\[\\n].*\\n){3,}", // at least 3 items total
    ],
    hints: [
      "\\begin{itemize} ... \\item ... \\end{itemize} for bullets",
      "\\begin{enumerate} ... \\item ... \\end{enumerate} for numbers",
      "Put \\item before each list entry",
    ],
    solutionLatex: `\\documentclass{article}\n\\begin{document}\n\\begin{itemize}\n  \\item First item\n  \\item Second item\n  \\item Third item\n\\end{itemize}\n\n\\begin{enumerate}\n  \\item Step one\n  \\item Step two\n\\end{enumerate}\n\\end{document}`,
    tags: ["lists", "environments"],
    estimatedMinutes: 4,
    conceptExplanation: "\\begin{itemize} and \\begin{enumerate} create bullet and numbered lists; \\item marks each entry.",
    isBoss: false,
  },
  {
    id: "1.8",
    worldId: 1,
    title: "Tables",
    lesson: {
      title: "The tabular environment",
      body: `Tables in LaTeX use the \`tabular\` environment. The column specification controls alignment:

\`\`\`
\\begin{tabular}{lcr}
  Left & Center & Right \\\\
  data & data   & data  \\\\
\\end{tabular}
\`\`\`

**Column specifiers:**
- \`l\` — left-aligned
- \`c\` — centered
- \`r\` — right-aligned
- \`|\` — vertical line between columns
- \`p{width}\` — paragraph column with fixed width

**Row separators:**
- \`\\\\\` — ends the row
- \`\\hline\` — draws a horizontal line

**A nice table with lines:**
\`\`\`
\\begin{tabular}{|l|c|r|}
  \\hline
  Name  & Score & Grade \\\\
  \\hline
  Alice & 95    & A     \\\\
  Bob   & 82    & B     \\\\
  \\hline
\\end{tabular}
\`\`\`

For publication-quality tables, the \`booktabs\` package provides \\toprule, \\midrule, \\bottomrule instead of \\hline.`,
      examples: [
        {
          code: `\\documentclass{article}\n\\begin{document}\n\\begin{tabular}{|l|c|r|}\n  \\hline\n  Name & Age & City \\\\\n  \\hline\n  Alice & 30 & Cairo \\\\\n  Bob & 25 & Paris \\\\\n  \\hline\n\\end{tabular}\n\\end{document}`,
          caption: "The column spec {|l|c|r|} gives vertical lines and left/center/right alignment.",
          renderMode: "document",
        },
      ],
      keyPoints: [
        "Column spec goes in braces after `\\begin{tabular}`: `{lcr}` or `{|l|c|r|}`",
        "Columns are separated with `&`, rows end with `\\\\`",
        "`\\hline` draws a horizontal line",
        "The `&` count must match the column spec",
      ],
    },
    goalText: "Create a tabular with at least 3 columns and 3 rows (including a header row), with \\hline before and after the header.",
    targetLatex: `\\documentclass{article}\n\\begin{document}\n\\begin{tabular}{|l|c|r|}\n  \\hline\n  Name & Score & Grade \\\\\n  \\hline\n  Alice & 95 & A \\\\\n  Bob & 82 & B \\\\\n  \\hline\n\\end{tabular}\n\\end{document}`,
    renderMode: "document",
    validationMode: "pattern",
    requiredPatterns: [
      "\\\\begin\\{tabular\\}",
      "\\\\hline",
      "&.*&", // at least 2 & per row = 3 columns
      "\\\\\\\\",
      "\\\\end\\{tabular\\}",
    ],
    hints: [
      "\\begin{tabular}{|l|c|r|} specifies 3 columns with lines between them",
      "Use & to separate columns and \\\\ to end each row",
      "Put \\hline after the header row and at start/end",
    ],
    solutionLatex: `\\documentclass{article}\n\\begin{document}\n\\begin{tabular}{|l|c|r|}\n  \\hline\n  Name & Score & Grade \\\\\n  \\hline\n  Alice & 95 & A \\\\\n  Bob & 82 & B \\\\\n  \\hline\n\\end{tabular}\n\\end{document}`,
    tags: ["tables", "environments"],
    estimatedMinutes: 5,
    conceptExplanation: "tabular takes a column spec, uses & to separate columns, \\\\ to end rows, and \\hline for horizontal rules.",
    isBoss: false,
  },
  {
    id: "1.9",
    worldId: 1,
    title: "Math mode",
    lesson: {
      title: "Entering math mode",
      body: `Math in LaTeX lives in its own mode. You must explicitly switch into it. There are two kinds:

**Inline math** — inside a sentence, using \`$...$\`:
\`\`\`
The formula $a^2 + b^2 = c^2$ appears inline.
\`\`\`

**Display math** — on its own line, centered, using \`\\[...\\]\`:
\`\`\`
The Pythagorean theorem:
\\[ a^2 + b^2 = c^2 \\]
\`\`\`

Or with the \`equation\` environment (adds a number):
\`\`\`
\\begin{equation}
  a^2 + b^2 = c^2
\\end{equation}
\`\`\`

Inside math mode, everything is interpreted as mathematics:
- Letters become italic variables: \`x\` → *x*
- Spaces are ignored (LaTeX spaces math itself)
- You use commands for symbols: \`\\alpha\`, \`\\frac{}{}\`, \`\\sqrt{}\`

**Key rule:** Never write math symbols outside \`$...$\` or \`\\[...\\]\`. Writing \`$x^2$\` is right; writing \`x^2\` gives literal "x^2" as text.`,
      examples: [
        {
          code: `\\documentclass{article}\n\\usepackage{amsmath}\n\\begin{document}\nLet $x$ be a real number. Then $x^2 \\geq 0$.\n\nThe quadratic formula is:\n\\[ x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a} \\]\n\\end{document}`,
          caption: "$...$ for inline math, \\[...\\] for display math.",
          renderMode: "document",
        },
      ],
      keyPoints: [
        "`$...$` for math inside a sentence (inline)",
        "`\\[...\\]` for math on its own line (display)",
        "`\\begin{equation}` gives display math with an auto-number",
        "Load `amsmath` for advanced math environments",
      ],
    },
    goalText: "Write a document with one inline math expression ($...$) and one display math expression (\\[...\\]).",
    targetLatex: `\\documentclass{article}\n\\usepackage{amsmath}\n\\begin{document}\nLet $x > 0$. The square root is:\n\\[ \\sqrt{x} \\]\n\\end{document}`,
    renderMode: "document",
    validationMode: "pattern",
    requiredPatterns: [
      "\\\\documentclass",
      "\\$[^$]+\\$", // inline math
      "\\\\\\[", // display math start
      "\\\\\\]", // display math end
    ],
    hints: [
      "Inline math goes between dollar signs: $x^2 + y^2$",
      "Display math goes between \\[ and \\]",
      "Try: The formula $x > 0$ gives \\[ \\sqrt{x} \\]",
    ],
    solutionLatex: `\\documentclass{article}\n\\usepackage{amsmath}\n\\begin{document}\nLet $x > 0$. The square root is:\n\\[ \\sqrt{x} \\]\n\\end{document}`,
    tags: ["math-mode", "basics"],
    estimatedMinutes: 4,
    conceptExplanation: "$ $ for inline math and \\[ \\] for display math — these are the two fundamental math modes in LaTeX.",
    isBoss: false,
  },
  {
    id: "1.B",
    worldId: 1,
    title: "BOSS: Complete article",
    lesson: {
      title: "Putting it all together",
      body: `You've learned all the structural pieces. Now combine them into a complete academic article.

A real LaTeX paper typically looks like this:

\`\`\`
\\documentclass{article}
\\usepackage{amsmath}
\\usepackage{amssymb}

\\title{The Title}
\\author{Author Name}
\\date{\\today}

\\begin{document}
\\maketitle

\\begin{abstract}
A brief summary of the paper.
\\end{abstract}

\\section{Introduction}
...

\\section{Methods}
...

\\section{Conclusion}
...

\\end{document}
\`\`\`

The \`abstract\` environment creates the traditional italic abstract block that appears on the first page.

This is the structure every reader of a LaTeX document expects to see. Get this right and you can write any paper.`,
      examples: [
        {
          code: `\\documentclass{article}\n\\usepackage{amsmath}\n\\title{A Sample Paper}\n\\author{Alice Smith}\n\\date{\\today}\n\\begin{document}\n\\maketitle\n\\begin{abstract}\nThis paper shows a complete LaTeX structure.\n\\end{abstract}\n\\section{Introduction}\nHere we introduce the topic.\n\\section{Conclusion}\nIn conclusion, LaTeX is powerful.\n\\end{document}`,
          caption: "A complete, publication-ready document structure.",
          renderMode: "document",
        },
      ],
      keyPoints: [
        "Real papers: documentclass → packages → title/author/date → body with maketitle → abstract → sections",
        "`\\begin{abstract}` goes right after `\\maketitle`",
        "Section order signals document organization to readers",
        "This skeleton works for homework, papers, and reports",
      ],
    },
    goalText: "Write a complete article with: documentclass, amsmath package, title/author/date, \\maketitle, an abstract environment, at least two sections, and content in each section.",
    targetLatex: `\\documentclass{article}\n\\usepackage{amsmath}\n\\title{My Paper}\n\\author{My Name}\n\\date{\\today}\n\\begin{document}\n\\maketitle\n\\begin{abstract}\nThis is the abstract.\n\\end{abstract}\n\\section{Introduction}\nContent here.\n\\section{Conclusion}\nConclusion here.\n\\end{document}`,
    renderMode: "document",
    validationMode: "pattern",
    requiredPatterns: [
      "\\\\documentclass",
      "\\\\usepackage\\{amsmath\\}",
      "\\\\title\\{",
      "\\\\author\\{",
      "\\\\date\\{",
      "\\\\maketitle",
      "\\\\begin\\{abstract\\}",
      "\\\\end\\{abstract\\}",
      "\\\\section\\{",
    ],
    hints: [
      "Build it piece by piece: documentclass, packages, title info, then the body",
      "\\begin{abstract}...\\end{abstract} goes right after \\maketitle",
      "Add at least two \\section{} headings with text after each",
    ],
    solutionLatex: `\\documentclass{article}\n\\usepackage{amsmath}\n\\title{My Paper}\n\\author{My Name}\n\\date{\\today}\n\\begin{document}\n\\maketitle\n\\begin{abstract}\nThis is the abstract.\n\\end{abstract}\n\\section{Introduction}\nContent here.\n\\section{Conclusion}\nConclusion here.\n\\end{document}`,
    tags: ["boss", "document-structure"],
    estimatedMinutes: 8,
    conceptExplanation: "A complete LaTeX article combines documentclass, packages, title metadata, abstract, and sections into one coherent file.",
    isBoss: true,
  },
];
