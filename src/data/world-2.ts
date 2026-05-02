import type { Level } from "../types";

export const world2Levels: Level[] = [
  {
    id: "2.1",
    worldId: 2,
    title: "Inline vs display math",
    lesson: {
      title: "Two worlds of math in LaTeX",
      body: `LaTeX has two fundamental math modes and knowing which to use is critical.

**Inline math** flows inside a sentence. Use \`$...$\` (or \`\\(...\\)\`):
\`\`\`
The area is $A = \\pi r^2$ square metres.
\`\`\`

**Display math** stands alone on a centred line. Use \`\\[...\\]\`:
\`\`\`
The area formula is:
\\[ A = \\pi r^2 \\]
\`\`\`

**The equation environment** adds automatic numbering:
\`\`\`
\\begin{equation}
  A = \\pi r^2
\\end{equation}
\`\`\`

Use \`equation*\` (requires \`amsmath\`) to get display size without a number.

**Visual difference:** operators like $\\sum$ and $\\int$ appear smaller in inline mode and larger in display mode. LaTeX does this automatically to fit the line height.

**Important:** never type math symbols (Greek letters, fractions, etc.) outside math mode — LaTeX treats them as text and produces garbage.`,
      examples: [
        {
          code: `\\documentclass{article}\n\\usepackage{amsmath}\n\\begin{document}\nEinstein showed that $E = mc^2$.\n\nThe quadratic formula gives:\n\\[\n  x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}\n\\]\n\\end{document}`,
          caption: "Inline math stays on the line; display math gets its own centred line.",
          renderMode: "document",
        },
      ],
      keyPoints: [
        "`$...$` for inline math — stays within the text flow",
        "`\\[...\\]` for display math — centred on its own line, no number",
        "`\\begin{equation}` for numbered display math",
        "`\\begin{equation*}` for unnumbered display (needs `amsmath`)",
      ],
    },
    goalText: "Write a document that explains a formula. Use inline math ($...$) for the variable names in the text, and display math (\\[...\\]) for the full formula.",
    targetLatex: `\\documentclass{article}\n\\usepackage{amsmath}\n\\begin{document}\nLet $a$, $b$, and $c$ be real numbers. The roots are:\n\\[\n  x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}\n\\]\n\\end{document}`,
    renderMode: "document",
    validationMode: "pattern",
    requiredPatterns: [
      "\\\\documentclass",
      "\\\\usepackage\\{amsmath\\}",
      "\\$[^$]+\\$",
      "\\\\\\[",
      "\\\\\\]",
    ],
    hints: [
      "Load \\usepackage{amsmath} in the preamble",
      "Use $x$ for inline variables in your sentence",
      "Use \\[ ... \\] for the main formula on its own line",
    ],
    solutionLatex: `\\documentclass{article}\n\\usepackage{amsmath}\n\\begin{document}\nLet $a$, $b$, $c$ be real. Then:\n\\[ x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a} \\]\n\\end{document}`,
    tags: ["math-mode", "amsmath"],
    estimatedMinutes: 4,
    conceptExplanation: "$...$ for inline math; \\[...\\] for display math — the two fundamental modes.",
    isBoss: false,
  },

  {
    id: "2.2",
    worldId: 2,
    title: "The align environment",
    lesson: {
      title: "Aligning multi-line equations",
      body: `When you have multiple equations in a derivation, you want them to line up at the equals sign. That's what \`align\` is for (from the \`amsmath\` package).

\`\`\`
\\begin{align}
  (x+1)^2 &= x^2 + 2x + 1 \\\\
           &= x(x+2) + 1
\\end{align}
\`\`\`

**How it works:**
- \`&\` is the alignment point — put it just before the sign you want to align at
- \`\\\\\` ends each line (like a table row)
- Each line gets its own equation number

**No numbers with \`align*\`:**
\`\`\`
\\begin{align*}
  f(x) &= x^2 + 3x \\\\
       &= x(x+3)
\\end{align*}
\`\`\`

**Suppress one line's number with \`\\nonumber\`:**
\`\`\`
\\begin{align}
  a &= b \\nonumber \\\\
  c &= d
\\end{align}
\`\`\`

You can have multiple alignment columns by using \`&&\`. Each \`&\` pair is one alignment group.`,
      examples: [
        {
          code: `\\documentclass{article}\n\\usepackage{amsmath}\n\\begin{document}\n\\begin{align*}\n  (a+b)^2 &= a^2 + 2ab + b^2 \\\\\n           &= a^2 + b^2 + 2ab\n\\end{align*}\n\\end{document}`,
          caption: "& marks the alignment column; \\\\ separates lines. align* suppresses numbering.",
          renderMode: "document",
        },
      ],
      keyPoints: [
        "`align` and `align*` come from the `amsmath` package",
        "Place `&` just before the symbol you want to align at (usually `=`)",
        "`\\\\` ends each equation line",
        "`align*` = no numbers; `align` = numbered; `\\nonumber` suppresses one line",
      ],
    },
    goalText: "Show a multi-step derivation using align*. Align all lines at the equals sign. Include at least 3 lines.",
    targetLatex: `\\documentclass{article}\n\\usepackage{amsmath}\n\\begin{document}\n\\begin{align*}\n  (x+2)^2 &= x^2 + 4x + 4 \\\\\n           &= x^2 + 4(x+1) \\\\\n           &= x(x+4) + 4\n\\end{align*}\n\\end{document}`,
    renderMode: "document",
    validationMode: "pattern",
    requiredPatterns: [
      "\\\\begin\\{align\\*?\\}",
      "&.*=",
      "\\\\\\\\",
      "\\\\end\\{align\\*?\\}",
    ],
    hints: [
      "Use \\begin{align*} ... \\end{align*} (the * means no numbering)",
      "Put & before the = on each line",
      "End each line with \\\\",
    ],
    solutionLatex: `\\documentclass{article}\n\\usepackage{amsmath}\n\\begin{document}\n\\begin{align*}\n  f(x) &= x^2 + 2x + 1 \\\\\n       &= (x+1)^2 \\\\\n       &= (x+1)(x+1)\n\\end{align*}\n\\end{document}`,
    tags: ["amsmath", "align", "multi-line"],
    estimatedMinutes: 5,
    conceptExplanation: "align* from amsmath lets you write multi-line derivations that align at & — the foundation of typeset proofs.",
    isBoss: false,
  },

  {
    id: "2.3",
    worldId: 2,
    title: "Cases — piecewise functions",
    lesson: {
      title: "Defining piecewise functions",
      body: `The \`cases\` environment (from \`amsmath\`) is designed exactly for piecewise definitions — functions defined differently on different domains.

\`\`\`
f(x) = \\begin{cases}
  x   & \\text{if } x \\geq 0 \\\\
  -x  & \\text{if } x < 0
\\end{cases}
\`\`\`

This must be used **inside math mode** (inside \`$...$\`, \`\\[...\\]\`, or an \`equation\` environment).

**Structure:**
- \`&\` separates the formula from the condition
- \`\\\\\` separates cases
- Use \`\\text{}\` for English words inside math mode

**Larger example:**
\`\`\`
\\[ T(n) = \\begin{cases}
  1              & \\text{if } n = 0 \\\\
  T(n-1) + n     & \\text{if } n > 0
\\end{cases} \\]
\`\`\``,
      examples: [
        {
          code: `\\documentclass{article}\n\\usepackage{amsmath}\n\\begin{document}\n\\[\n  |x| = \\begin{cases}\n    x  & \\text{if } x \\geq 0 \\\\\n    -x & \\text{if } x < 0\n  \\end{cases}\n\\]\\end{document}`,
          caption: "cases must be inside math mode. & separates formula from condition.",
          renderMode: "document",
        },
      ],
      keyPoints: [
        "`cases` must be **inside** math mode (`\\[...\\]` or `equation`)",
        "`&` separates the left side from the condition",
        "`\\text{if}` wraps English words so they appear upright",
        "`\\\\` separates each case",
      ],
    },
    goalText: "Define a piecewise function using \\begin{cases} inside display math. Include at least two cases with conditions using \\text{}.",
    targetLatex: `\\documentclass{article}\n\\usepackage{amsmath}\n\\begin{document}\n\\[\n  f(x) = \\begin{cases}\n    x^2    & \\text{if } x > 0 \\\\\n    0      & \\text{if } x = 0 \\\\\n    -x^2   & \\text{if } x < 0\n  \\end{cases}\n\\]\n\\end{document}`,
    renderMode: "document",
    validationMode: "pattern",
    requiredPatterns: [
      "\\\\begin\\{cases\\}",
      "\\\\text\\{",
      "&",
      "\\\\\\\\",
      "\\\\end\\{cases\\}",
    ],
    hints: [
      "Put \\begin{cases} inside \\[ ... \\]",
      "Each case: formula & \\text{condition} \\\\",
      "Try: f(x) = \\begin{cases} x & \\text{if } x \\geq 0 \\\\ -x & \\text{if } x < 0 \\end{cases}",
    ],
    solutionLatex: `\\documentclass{article}\n\\usepackage{amsmath}\n\\begin{document}\n\\[\n  f(x) = \\begin{cases}\n    x  & \\text{if } x \\geq 0 \\\\\n    -x & \\text{if } x < 0\n  \\end{cases}\n\\]\n\\end{document}`,
    tags: ["amsmath", "cases", "piecewise"],
    estimatedMinutes: 4,
    conceptExplanation: "The cases environment creates piecewise function notation inside math mode.",
    isBoss: false,
  },

  {
    id: "2.4",
    worldId: 2,
    title: "Matrices",
    lesson: {
      title: "Matrices in LaTeX",
      body: `Matrices use matrix environments from \`amsmath\`. All variants use the same syntax — they differ only in the bracket style:

| Environment | Brackets |
|-------------|----------|
| \`pmatrix\` | ( ) round |
| \`bmatrix\` | [ ] square |
| \`vmatrix\` | \\| \\| vertical bars (determinant) |
| \`Vmatrix\` | \\|\\| \\|\\| double bars (norm) |
| \`Bmatrix\` | { } braces |
| \`matrix\`  | (none) |

**Syntax** — same for all:
\`\`\`
\\begin{pmatrix}
  a_{11} & a_{12} \\\\
  a_{21} & a_{22}
\\end{pmatrix}
\`\`\`

- \`&\` separates columns
- \`\\\\\` ends each row
- All matrix environments must be **inside math mode**

**Large matrices** use dots:
\`\`\`
\\begin{pmatrix}
  a_{11} & \\cdots & a_{1n} \\\\
  \\vdots & \\ddots & \\vdots \\\\
  a_{m1} & \\cdots & a_{mn}
\\end{pmatrix}
\`\`\``,
      examples: [
        {
          code: `\\documentclass{article}\n\\usepackage{amsmath}\n\\begin{document}\nThe identity matrix:\n\\[\n  I = \\begin{pmatrix} 1 & 0 \\\\ 0 & 1 \\end{pmatrix}\n\\]\nThe determinant: $\\det(A) = \\begin{vmatrix} a & b \\\\ c & d \\end{vmatrix} = ad - bc$\n\\end{document}`,
          caption: "pmatrix gives ( ) brackets; vmatrix gives | | for determinants.",
          renderMode: "document",
        },
      ],
      keyPoints: [
        "All matrix environments need `\\usepackage{amsmath}`",
        "They must be inside math mode",
        "`&` separates columns, `\\\\` ends rows",
        "Use `\\cdots`, `\\vdots`, `\\ddots` for patterns in large matrices",
      ],
    },
    goalText: "Write a document that shows a 2×2 matrix (using pmatrix) in display math, and a determinant (using vmatrix) inline.",
    targetLatex: `\\documentclass{article}\n\\usepackage{amsmath}\n\\begin{document}\nThe matrix:\n\\[\n  A = \\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\end{pmatrix}\n\\]\nIts determinant is $\\begin{vmatrix} 1 & 2 \\\\ 3 & 4 \\end{vmatrix} = -2$.\n\\end{document}`,
    renderMode: "document",
    validationMode: "pattern",
    requiredPatterns: [
      "\\\\begin\\{pmatrix\\}",
      "\\\\end\\{pmatrix\\}",
      "\\\\begin\\{vmatrix\\}",
      "\\\\end\\{vmatrix\\}",
    ],
    hints: [
      "\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix} for ( ) brackets",
      "\\begin{vmatrix} a & b \\\\ c & d \\end{vmatrix} for | | bars",
      "Both must be inside $...$ or \\[...\\]",
    ],
    solutionLatex: `\\documentclass{article}\n\\usepackage{amsmath}\n\\begin{document}\nMatrix $A = \\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}$ and $\\det(A) = \\begin{vmatrix} a & b \\\\ c & d \\end{vmatrix}$.\n\\end{document}`,
    tags: ["matrices", "amsmath"],
    estimatedMinutes: 5,
    conceptExplanation: "pmatrix, bmatrix, vmatrix are amsmath environments — same syntax, different bracket styles.",
    isBoss: false,
  },

  {
    id: "2.5",
    worldId: 2,
    title: "Theorem environments",
    lesson: {
      title: "Theorems, proofs, and definitions",
      body: `Academic math writing needs theorem, lemma, definition, and proof environments. The \`amsthm\` package provides them.

**Step 1 — declare in the preamble:**
\`\`\`
\\usepackage{amsthm}
\\newtheorem{theorem}{Theorem}
\\newtheorem{lemma}{Lemma}
\\newtheorem{definition}{Definition}
\`\`\`

**Step 2 — use in the body:**
\`\`\`
\\begin{theorem}
  Every integer $> 1$ is either prime or a product of primes.
\\end{theorem}

\\begin{proof}
  By strong induction on $n$... \\qquad \\qquad \\square
\\end{proof}
\`\`\`

The \`proof\` environment automatically adds a QED box (□ or ∎) at the end.

**Named theorems** use an optional argument:
\`\`\`
\\begin{theorem}[Pythagoras]
  $a^2 + b^2 = c^2$
\\end{theorem}
\`\`\`

**Sharing counters** — make lemma and theorem share a counter:
\`\`\`
\\newtheorem{lemma}[theorem]{Lemma}
\`\`\``,
      examples: [
        {
          code: `\\documentclass{article}\n\\usepackage{amsmath}\n\\usepackage{amsthm}\n\\newtheorem{theorem}{Theorem}\n\\newtheorem{definition}{Definition}\n\\begin{document}\n\\begin{definition}\n  A prime number is an integer $p > 1$ with no divisors other than $1$ and $p$.\n\\end{definition}\n\\begin{theorem}[Euclid]\n  There are infinitely many primes.\n\\end{theorem}\n\\begin{proof}\n  Suppose there are finitely many: $p_1, \\ldots, p_n$. Consider $N = p_1 \\cdots p_n + 1$. This is not divisible by any $p_i$, contradiction.\n\\end{proof}\n\\end{document}`,
          caption: "amsthm auto-numbers theorems; proof adds a QED box automatically.",
          renderMode: "document",
        },
      ],
      keyPoints: [
        "`\\usepackage{amsthm}` provides theorem-like environments",
        "`\\newtheorem{name}{Label}` declares a new theorem type in the preamble",
        "The `proof` environment is built-in — no declaration needed",
        "Optional `[Name]` adds a parenthetical: `\\begin{theorem}[Pythagoras]`",
      ],
    },
    goalText: "Write a document that declares a theorem environment, states one theorem (with a name in brackets), and provides a proof using the proof environment.",
    targetLatex: `\\documentclass{article}\n\\usepackage{amsmath}\n\\usepackage{amsthm}\n\\newtheorem{theorem}{Theorem}\n\\begin{document}\n\\begin{theorem}[Pythagoras]\n  For a right triangle, $a^2 + b^2 = c^2$.\n\\end{theorem}\n\\begin{proof}\n  By the properties of similar triangles.\n\\end{proof}\n\\end{document}`,
    renderMode: "document",
    validationMode: "pattern",
    requiredPatterns: [
      "\\\\usepackage\\{amsthm\\}",
      "\\\\newtheorem\\{",
      "\\\\begin\\{theorem\\}",
      "\\\\end\\{theorem\\}",
      "\\\\begin\\{proof\\}",
      "\\\\end\\{proof\\}",
    ],
    hints: [
      "Declare \\newtheorem{theorem}{Theorem} in the preamble (after \\usepackage{amsthm})",
      "Use \\begin{theorem}[Name] for a named theorem",
      "\\begin{proof}...\\end{proof} adds the QED symbol automatically",
    ],
    solutionLatex: `\\documentclass{article}\n\\usepackage{amsmath}\n\\usepackage{amsthm}\n\\newtheorem{theorem}{Theorem}\n\\begin{document}\n\\begin{theorem}[Pythagoras]\n  $a^2 + b^2 = c^2$.\n\\end{theorem}\n\\begin{proof}\n  By similar triangles.\n\\end{proof}\n\\end{document}`,
    tags: ["amsthm", "theorem", "proof"],
    estimatedMinutes: 6,
    conceptExplanation: "amsthm provides theorem-like environments; \\newtheorem declares them; proof adds a QED box.",
    isBoss: false,
  },

  {
    id: "2.6",
    worldId: 2,
    title: "Cross-references",
    lesson: {
      title: "Labels and references",
      body: `LaTeX's cross-referencing system lets you refer to equation numbers, section numbers, figure numbers — anything that has a number — by name rather than by value. If numbers change, references update automatically.

**Step 1 — label the thing:**
\`\`\`
\\begin{equation}
  E = mc^2  \\label{eq:einstein}
\\end{equation}
\`\`\`

**Step 2 — refer to it:**
\`\`\`
As shown in equation~(\\ref{eq:einstein}), ...
\`\`\`

The \`~\` is a non-breaking space — it prevents a line break between "equation" and "(1)".

**\\label** works on:
- \`\\section{...}\\label{sec:intro}\` → referred to by \\ref{sec:intro}
- \`\\begin{figure}...\\label{fig:graph}\` → \\ref{fig:graph}
- \`\\begin{table}...\\label{tab:data}\` → \\ref{tab:data}

**\\pageref** gives the page number instead of the label number.

In the sandbox preview, references show [label-name] since we don't actually compile LaTeX. In a real compiler, they resolve to the actual numbers.`,
      examples: [
        {
          code: `\\documentclass{article}\n\\usepackage{amsmath}\n\\begin{document}\nThe Pythagorean theorem is given in equation~\\ref{eq:pyth}.\n\\begin{equation}\n  a^2 + b^2 = c^2 \\label{eq:pyth}\n\\end{equation}\nNote that equation~\\ref{eq:pyth} holds for all right triangles.\n\\end{document}`,
          caption: "\\label marks the equation; \\ref refers back to it by name.",
          renderMode: "document",
        },
      ],
      keyPoints: [
        "`\\label{key}` marks something for future reference",
        "`\\ref{key}` produces the number of the labelled item",
        "Use descriptive key names: `eq:einstein`, `sec:intro`, `fig:graph`",
        "`~` before `\\ref` prevents ugly line breaks",
      ],
    },
    goalText: "Write a document with a numbered equation (using \\begin{equation}), a \\label on it, and a sentence in the text that refers back to it with \\ref.",
    targetLatex: `\\documentclass{article}\n\\usepackage{amsmath}\n\\begin{document}\nEquation~\\ref{eq:myeq} shows the formula.\n\\begin{equation}\n  x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a} \\label{eq:myeq}\n\\end{equation}\nThis is equation~\\ref{eq:myeq}.\n\\end{document}`,
    renderMode: "document",
    validationMode: "pattern",
    requiredPatterns: [
      "\\\\begin\\{equation\\}",
      "\\\\label\\{",
      "\\\\ref\\{",
      "\\\\end\\{equation\\}",
    ],
    hints: [
      "Add \\label{eq:name} inside the equation environment",
      "Use \\ref{eq:name} in your text to cite it",
      "Use ~ before \\ref to prevent line breaks: equation~\\ref{eq:name}",
    ],
    solutionLatex: `\\documentclass{article}\n\\usepackage{amsmath}\n\\begin{document}\nSee equation~\\ref{eq:quadratic}.\n\\begin{equation}\n  x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a} \\label{eq:quadratic}\n\\end{equation}\n\\end{document}`,
    tags: ["cross-references", "label", "ref"],
    estimatedMinutes: 5,
    conceptExplanation: "\\label{key} marks any numbered item; \\ref{key} inserts its number — both update automatically when the document changes.",
    isBoss: false,
  },

  {
    id: "2.7",
    worldId: 2,
    title: "Custom commands",
    lesson: {
      title: "Defining your own commands",
      body: `One of LaTeX's most powerful features: you can define your own commands to save typing and make your source more readable.

**Basic definition:**
\`\`\`
\\newcommand{\\R}{\\mathbb{R}}
\`\`\`
Now you can write \`\\R\` instead of \`\\mathbb{R}\` everywhere.

**Command with arguments:**
\`\`\`
\\newcommand{\\pd}[2]{\\frac{\\partial #1}{\\partial #2}}
\`\`\`
The \`[2]\` says "takes 2 arguments". \`#1\` and \`#2\` are substituted:
- \`\\pd{f}{x}\` → $\\frac{\\partial f}{\\partial x}$

**Optional argument with default:**
\`\`\`
\\newcommand{\\norm}[2][2]{\\|#2\\|_{#1}}
\`\`\`
\`\\norm{v}\` → $\\|v\\|_2$ (default), \`\\norm[\\infty]{v}\` → $\\|v\\|_\\infty$

**Why bother?**
- If the notation changes, you change it in one place
- Source becomes \`\\pd{f}{x}\` instead of \`\\frac{\\partial f}{\\partial x}\` every time
- Makes your intent explicit

Put \`\\newcommand\` in the preamble so it's available throughout the document.`,
      examples: [
        {
          code: `\\documentclass{article}\n\\usepackage{amsmath,amssymb}\n\\newcommand{\\R}{\\mathbb{R}}\n\\newcommand{\\norm}[1]{\\|#1\\|}\n\\newcommand{\\pd}[2]{\\frac{\\partial #1}{\\partial #2}}\n\\begin{document}\nLet $f:\\R \\to \\R$. The gradient satisfies $\\norm{\\nabla f} \\leq M$.\n\nThe partial derivative is $\\pd{f}{x}$.\n\\end{document}`,
          caption: "\\newcommand makes your source cleaner and the notation easy to change later.",
          renderMode: "document",
        },
      ],
      keyPoints: [
        "`\\newcommand{\\name}{definition}` — no arguments",
        "`\\newcommand{\\name}[n]{body}` — `n` arguments, used as `#1`, `#2`, …",
        "Put `\\newcommand` in the **preamble**",
        "`\\renewcommand` redefines an existing command",
      ],
    },
    goalText: "Define at least two custom commands in the preamble (e.g. \\R for \\mathbb{R} and \\pd for partial derivatives), then use both of them in the document body.",
    targetLatex: `\\documentclass{article}\n\\usepackage{amsmath,amssymb}\n\\newcommand{\\R}{\\mathbb{R}}\n\\newcommand{\\pd}[2]{\\frac{\\partial #1}{\\partial #2}}\n\\begin{document}\nLet $f:\\R \\to \\R$. The partial derivative is $\\pd{f}{x}$.\n\\end{document}`,
    renderMode: "document",
    validationMode: "pattern",
    requiredPatterns: [
      "\\\\newcommand\\{",
      "\\\\newcommand\\{.*\\}\\{.*\\}",
      "\\\\newcommand\\{.*\\}\\[",
    ],
    hints: [
      "Define \\newcommand{\\R}{\\mathbb{R}} in the preamble",
      "Define \\newcommand{\\pd}[2]{\\frac{\\partial #1}{\\partial #2}} for two arguments",
      "Use them in the body: $f:\\R\\to\\R$ and $\\pd{f}{x}$",
    ],
    solutionLatex: `\\documentclass{article}\n\\usepackage{amsmath,amssymb}\n\\newcommand{\\R}{\\mathbb{R}}\n\\newcommand{\\pd}[2]{\\frac{\\partial #1}{\\partial #2}}\n\\begin{document}\nLet $f:\\R \\to \\R$. Then $\\pd{f}{x}$ is the partial derivative.\n\\end{document}`,
    tags: ["newcommand", "custom-commands"],
    estimatedMinutes: 6,
    conceptExplanation: "\\newcommand defines reusable shortcuts — the key to maintainable LaTeX.",
    isBoss: false,
  },

  {
    id: "2.8",
    worldId: 2,
    title: "Figures and captions",
    lesson: {
      title: "Including images and figures",
      body: `Figures in LaTeX use the \`figure\` environment plus \`\\includegraphics\` from the \`graphicx\` package.

\`\`\`
\\usepackage{graphicx}

\\begin{figure}[h]
  \\centering
  \\includegraphics[width=0.6\\textwidth]{filename}
  \\caption{A descriptive caption.}
  \\label{fig:myfig}
\\end{figure}
\`\`\`

**Placement options** \`[htbp]\`:
- \`h\` — here (where the code is)
- \`t\` — top of the page
- \`b\` — bottom of the page
- \`p\` — on a separate floats page
- \`!h\` — force here (override LaTeX's judgment)

**Sizing:**
- \`width=0.6\\textwidth\` — 60% of text width
- \`height=5cm\` — fixed height
- \`scale=0.5\` — scale factor

**\\centering** centres the figure. Put it inside the \`figure\` environment.

**\\caption** creates the "Figure 1: ..." text. **\\label** (after \\caption) lets you use \\ref{fig:myfig} in the text.

**Two figures side by side** use the \`subfigure\` environment from \`subcaption\` package.`,
      examples: [
        {
          code: `\\documentclass{article}\n\\usepackage{graphicx}\n\\begin{document}\n\\section{Results}\nFigure~\\ref{fig:result} shows the output.\n\\begin{figure}[h]\n  \\centering\n  \\includegraphics[width=0.5\\textwidth]{graph.png}\n  \\caption{The main result.}\n  \\label{fig:result}\n\\end{figure}\n\\end{document}`,
          caption: "figure floats; \\caption provides the caption; \\label enables cross-referencing.",
          renderMode: "document",
        },
      ],
      keyPoints: [
        "`\\usepackage{graphicx}` is required for `\\includegraphics`",
        "Wrap images in `\\begin{figure}[h]...\\end{figure}`",
        "`\\centering` centres; `\\caption{}` adds a caption; `\\label` enables \\ref",
        "File extension can often be omitted — LaTeX tries .pdf, .png, .jpg",
      ],
    },
    goalText: "Write a document with a figure environment containing \\centering, \\includegraphics (any filename), a \\caption, and a \\label. Reference the figure in the text with \\ref.",
    targetLatex: `\\documentclass{article}\n\\usepackage{graphicx}\n\\begin{document}\nSee figure~\\ref{fig:diagram}.\n\\begin{figure}[h]\n  \\centering\n  \\includegraphics[width=0.5\\textwidth]{diagram.pdf}\n  \\caption{The system diagram.}\n  \\label{fig:diagram}\n\\end{figure}\n\\end{document}`,
    renderMode: "document",
    validationMode: "pattern",
    requiredPatterns: [
      "\\\\usepackage\\{graphicx\\}",
      "\\\\begin\\{figure\\}",
      "\\\\includegraphics",
      "\\\\caption\\{",
      "\\\\label\\{fig:",
      "\\\\ref\\{fig:",
    ],
    hints: [
      "Load \\usepackage{graphicx} in the preamble",
      "\\begin{figure}[h] ... \\centering ... \\includegraphics[width=0.5\\textwidth]{name.pdf} ... \\caption{text} ... \\label{fig:name} ... \\end{figure}",
      "Reference it in text with \\ref{fig:name}",
    ],
    solutionLatex: `\\documentclass{article}\n\\usepackage{graphicx}\n\\begin{document}\nSee figure~\\ref{fig:plot}.\n\\begin{figure}[h]\n  \\centering\n  \\includegraphics[width=0.5\\textwidth]{plot.pdf}\n  \\caption{A plot of the data.}\n  \\label{fig:plot}\n\\end{figure}\n\\end{document}`,
    tags: ["figures", "graphicx", "floats"],
    estimatedMinutes: 5,
    conceptExplanation: "figure environment + \\includegraphics places images; \\caption + \\label enables auto-numbered cross-references.",
    isBoss: false,
  },

  {
    id: "2.9",
    worldId: 2,
    title: "Bibliography",
    lesson: {
      title: "Citations and references",
      body: `Academic writing requires citations. LaTeX handles this through BibTeX/BibLaTeX.

**In your main .tex file:**
\`\`\`
\\usepackage{cite}  % or use biblatex

\\cite{knuth1984}    % in the text
\\cite[p.~42]{lamport}  % with page number

\\bibliographystyle{plain}
\\bibliography{references}  % loads references.bib
\`\`\`

**In your references.bib file:**
\`\`\`
@article{knuth1984,
  author  = {Donald Knuth},
  title   = {Literate Programming},
  journal = {The Computer Journal},
  year    = {1984},
  volume  = {27},
  pages   = {97--111}
}

@book{lamport,
  author    = {Leslie Lamport},
  title     = {\\LaTeX: A Document Preparation System},
  publisher = {Addison-Wesley},
  year      = {1994}
}
\`\`\`

**Modern alternative — BibLaTeX:**
\`\`\`
\\usepackage[style=authoryear]{biblatex}
\\addbibresource{references.bib}
...
\\autocite{knuth1984}
...
\\printbibliography
\`\`\`

In this sandbox we can't actually run BibTeX, but you should know the structure.`,
      examples: [
        {
          code: `\\documentclass{article}\n\\usepackage{cite}\n\\begin{document}\nAs shown by Knuth~\\cite{knuth1984}, literate programming improves readability.\n\n\\begin{thebibliography}{9}\n  \\bibitem{knuth1984}\n  D.~Knuth, \\textit{Literate Programming}, The Computer Journal, 1984.\n\\end{thebibliography}\n\\end{document}`,
          caption: "thebibliography is a simple inline bibliography — no separate .bib file needed.",
          renderMode: "document",
        },
      ],
      keyPoints: [
        "`\\cite{key}` inserts a citation number; `\\cite[p.~5]{key}` adds a page",
        "`thebibliography` environment for simple inline references (no .bib file)",
        "`\\bibliographystyle{plain}` + `\\bibliography{file}` for BibTeX workflow",
        "BibLaTeX + biber is the modern recommended approach",
      ],
    },
    goalText: "Write a document that uses \\cite{} to cite at least one reference, and includes a thebibliography environment with at least one \\bibitem.",
    targetLatex: `\\documentclass{article}\n\\begin{document}\nThis follows from \\cite{lamport}.\n\n\\begin{thebibliography}{9}\n  \\bibitem{lamport}\n  L.~Lamport, \\textit{LaTeX: A Document Preparation System}, Addison-Wesley, 1994.\n\\end{thebibliography}\n\\end{document}`,
    renderMode: "document",
    validationMode: "pattern",
    requiredPatterns: [
      "\\\\cite\\{",
      "\\\\begin\\{thebibliography\\}",
      "\\\\bibitem\\{",
      "\\\\end\\{thebibliography\\}",
    ],
    hints: [
      "Use \\cite{key} in the text to cite",
      "Add \\begin{thebibliography}{9} ... \\end{thebibliography} at the end of the document",
      "Each entry: \\bibitem{key} Author, Title, Year.",
    ],
    solutionLatex: `\\documentclass{article}\n\\begin{document}\nAs shown in \\cite{lamport}.\n\n\\begin{thebibliography}{9}\n  \\bibitem{lamport}\n  L.~Lamport, \\textit{\\LaTeX: A Document Preparation System}, 1994.\n\\end{thebibliography}\n\\end{document}`,
    tags: ["bibliography", "citations"],
    estimatedMinutes: 5,
    conceptExplanation: "\\cite{} in text + thebibliography at the end creates a complete reference list.",
    isBoss: false,
  },

  {
    id: "2.B",
    worldId: 2,
    title: "BOSS: Full academic paper",
    lesson: {
      title: "The complete paper structure",
      body: `You now know all the components. A complete academic paper in LaTeX combines every piece you've learned.

Here is the canonical structure:

\`\`\`
\\documentclass[12pt,a4paper]{article}
\\usepackage{amsmath, amssymb, amsthm}
\\usepackage{graphicx}
\\usepackage{hyperref}

\\newtheorem{theorem}{Theorem}
\\newcommand{\\R}{\\mathbb{R}}

\\title{Paper Title}
\\author{Author Name \\\\ Institution}
\\date{\\today}

\\begin{document}
\\maketitle

\\begin{abstract}
  A concise summary.
\\end{abstract}

\\section{Introduction}
...\\cite{ref1}...

\\section{Main Results}
\\begin{theorem}
  ...
\\end{theorem}
\\begin{proof}
  ...
\\end{proof}

\\begin{figure}[h]
  \\centering
  \\includegraphics[width=0.5\\textwidth]{fig}
  \\caption{Caption}\\label{fig:1}
\\end{figure}

\\section{Conclusion}
...

\\begin{thebibliography}{9}
  \\bibitem{ref1} Author, Title, Year.
\\end{thebibliography}
\\end{document}
\`\`\`

This structure is what journals, conferences, and professors expect. Every piece has a purpose.`,
      examples: [
        {
          code: `\\documentclass{article}\n\\usepackage{amsmath,amssymb,amsthm}\n\\newtheorem{theorem}{Theorem}\n\\newcommand{\\R}{\\mathbb{R}}\n\\title{A Complete Example}\n\\author{Alice Smith}\n\\date{\\today}\n\\begin{document}\n\\maketitle\n\\begin{abstract}\nThis paper demonstrates a complete LaTeX structure.\n\\end{abstract}\n\\section{Introduction}\nLet $f:\\R\\to\\R$ be a function. We show it satisfies theorem~\\ref{thm:main}.\n\\section{Main Result}\n\\begin{theorem}\\label{thm:main}\nThe function $f$ is continuous.\n\\end{theorem}\n\\begin{proof}\nBy the $\\varepsilon$-$\\delta$ definition.\n\\end{proof}\n\\section{Conclusion}\nWe have shown the result holds in all cases.\n\\begin{thebibliography}{9}\n  \\bibitem{knuth} D.~Knuth, \\textit{The TeXbook}, 1984.\n\\end{thebibliography}\n\\end{document}`,
          caption: "Everything together: packages, custom commands, theorem, proof, citation, and bibliography.",
          renderMode: "document",
        },
      ],
      keyPoints: [
        "Load packages in a logical order: math → graphics → references",
        "Declare theorems and custom commands before \\begin{document}",
        "maketitle → abstract → sections → bibliography",
        "Use \\label and \\ref throughout for robust cross-references",
      ],
    },
    goalText: "Write a complete mini-paper with: documentclass, at least 3 packages (including amsmath and amsthm), a custom \\newcommand, title/author/date, \\maketitle, abstract, at least 2 sections, one theorem with proof, and a bibliography entry.",
    targetLatex: `\\documentclass{article}
\\usepackage{amsmath,amssymb,amsthm}
\\newtheorem{theorem}{Theorem}
\\newcommand{\\R}{\\mathbb{R}}
\\title{My Paper}
\\author{Me}
\\date{\\today}
\\begin{document}
\\maketitle
\\begin{abstract}
This paper proves something.
\\end{abstract}
\\section{Introduction}
Let $f:\\R\\to\\R$.
\\section{Main Result}
\\begin{theorem}
$f$ is continuous.
\\end{theorem}
\\begin{proof}
By definition.
\\end{proof}
\\begin{thebibliography}{9}
  \\bibitem{ref} Author, title.
\\end{thebibliography}
\\end{document}`,
    renderMode: "document",
    validationMode: "pattern",
    requiredPatterns: [
      "\\\\documentclass",
      "\\\\usepackage\\{amsmath",
      "\\\\usepackage\\{amsthm",
      "\\\\newtheorem\\{",
      "\\\\newcommand\\{",
      "\\\\title\\{",
      "\\\\author\\{",
      "\\\\maketitle",
      "\\\\begin\\{abstract\\}",
      "\\\\section\\{",
      "\\\\begin\\{theorem\\}",
      "\\\\begin\\{proof\\}",
      "\\\\begin\\{thebibliography\\}",
    ],
    hints: [
      "Build it section by section: preamble first, then body",
      "Preamble needs: documentclass, packages, newtheorem, newcommand, title/author/date",
      "Body needs: maketitle, abstract, sections, theorem, proof, bibliography",
    ],
    solutionLatex: `\\documentclass{article}\n\\usepackage{amsmath,amssymb,amsthm}\n\\newtheorem{theorem}{Theorem}\n\\newcommand{\\R}{\\mathbb{R}}\n\\title{My Paper}\\author{Me}\\date{\\today}\n\\begin{document}\n\\maketitle\n\\begin{abstract}We prove a result.\\end{abstract}\n\\section{Introduction}Let $f:\\R\\to\\R$.\n\\section{Main Result}\n\\begin{theorem}$f$ is continuous.\\end{theorem}\n\\begin{proof}By definition.\\end{proof}\n\\begin{thebibliography}{9}\\bibitem{x} Author.\\end{thebibliography}\n\\end{document}`,
    tags: ["boss", "complete-document"],
    estimatedMinutes: 10,
    conceptExplanation: "A complete LaTeX paper combines packages, custom commands, theorem environments, sections, and bibliography into one file.",
    isBoss: true,
  },
];
