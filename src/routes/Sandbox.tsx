import { useState, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import { LaTeXEditor } from "../components/Editor/LaTeXEditor";
import { DocumentPreview } from "../components/Preview/DocumentPreview";
import { KaTeXPreview } from "../components/Preview/KaTeXPreview";
import styles from "./Sandbox.module.css";

type PreviewMode = "document" | "math";

interface Template {
  name: string;
  emoji: string;
  preamble: string;
  body: string;
  mode: PreviewMode;
}

const TEMPLATES: Template[] = [
  {
    name: "Blank",
    emoji: "📄",
    preamble: `\\documentclass{article}
\\usepackage{amsmath, amssymb}
\\usepackage[margin=2.5cm]{geometry}`,
    body: `% Your content here`,
    mode: "document",
  },
  {
    name: "Math cheatsheet",
    emoji: "∫",
    preamble: `\\documentclass{article}
\\usepackage{amsmath, amssymb, amsthm}
\\usepackage[margin=2cm]{geometry}
\\newtheorem{theorem}{Theorem}
\\newcommand{\\R}{\\mathbb{R}}
\\newcommand{\\N}{\\mathbb{N}}
\\newcommand{\\pd}[2]{\\frac{\\partial #1}{\\partial #2}}`,
    body: `\\title{Math Reference Sheet}
\\author{Your Name}
\\date{\\today}
\\begin{document}
\\maketitle

\\section{Calculus}

The chain rule:
\\[ \\frac{d}{dx}[f(g(x))] = f'(g(x)) \\cdot g'(x) \\]

Integration by parts:
\\[ \\int u\\,dv = uv - \\int v\\,du \\]

\\section{Linear Algebra}

For matrix $A \\in \\R^{n \\times n}$, the eigenvalue equation is:
\\[ A\\mathbf{v} = \\lambda \\mathbf{v} \\]

\\begin{theorem}[Spectral Theorem]
Every symmetric matrix $A = A^\\top$ is diagonalizable.
\\end{theorem}

\\end{document}`,
    mode: "document",
  },
  {
    name: "Research paper",
    emoji: "📝",
    preamble: `\\documentclass[12pt, a4paper]{article}
\\usepackage{amsmath, amssymb, amsthm}
\\usepackage{graphicx}
\\usepackage[margin=2.5cm]{geometry}
\\usepackage{hyperref}
\\usepackage{microtype}
\\usepackage[style=authoryear]{biblatex}

\\newtheorem{theorem}{Theorem}
\\newtheorem{lemma}[theorem]{Lemma}
\\theoremstyle{definition}
\\newtheorem{definition}{Definition}`,
    body: `\\title{Title of the Paper}
\\author{Author Name\\thanks{Department, University. Email: author@university.edu}}
\\date{\\today}

\\begin{document}
\\maketitle

\\begin{abstract}
A concise summary of the paper's contributions, methodology, and main findings. Should be 150--250 words.
\\end{abstract}

\\section{Introduction}
Introduce the problem, motivate the work, and state contributions.

\\section{Background}
\\begin{definition}
A set $S \\subseteq \\mathbb{R}^n$ is \\emph{convex} if for all $x, y \\in S$ and $\\lambda \\in [0,1]$:
\\[ \\lambda x + (1-\\lambda)y \\in S. \\]
\\end{definition}

\\section{Main Results}
\\begin{theorem}\\label{thm:main}
  State your main result here.
\\end{theorem}
\\begin{proof}
  Proof goes here.
\\end{proof}

\\section{Conclusion}
Summarise contributions and suggest future work.

\\end{document}`,
    mode: "document",
  },
  {
    name: "Presentation (Beamer)",
    emoji: "🎯",
    preamble: `\\documentclass{beamer}
\\usetheme{Madrid}
\\usecolortheme{whale}
\\usepackage{amsmath, amssymb}`,
    body: `\\title{Presentation Title}
\\subtitle{A subtitle}
\\author{Your Name}
\\institute{Your University}
\\date{\\today}

\\begin{document}

\\begin{frame}
  \\titlepage
\\end{frame}

\\begin{frame}{Outline}
  \\tableofcontents
\\end{frame}

\\section{Introduction}
\\begin{frame}{Motivation}
  \\begin{itemize}
    \\item First point \\pause
    \\item Second point \\pause
    \\item Third point
  \\end{itemize}
\\end{frame}

\\section{Results}
\\begin{frame}{Main Result}
  \\begin{block}{Theorem}
    $E = mc^2$
  \\end{block}
  \\begin{columns}
    \\column{0.5\\textwidth}
      Left column content.
    \\column{0.5\\textwidth}
      Right column content.
  \\end{columns}
\\end{frame}

\\begin{frame}{Conclusion}
  \\begin{enumerate}
    \\item Summary point one
    \\item Summary point two
  \\end{enumerate}
\\end{frame}

\\end{document}`,
    mode: "document",
  },
  {
    name: "CV / Resume",
    emoji: "👤",
    preamble: `\\documentclass[11pt, a4paper]{article}
\\usepackage[margin=1.8cm]{geometry}
\\usepackage{titlesec, enumitem, hyperref, xcolor, fontawesome5}
\\definecolor{accent}{HTML}{2563EB}
\\titleformat{\\section}{\\large\\bfseries\\color{accent}}{}{0em}{}[\\titlerule]
\\setlength{\\parindent}{0pt}`,
    body: `\\begin{document}

% ── Header ──────────────────────────────────────────────
{\\huge\\bfseries Your Name} \\hfill
\\textcolor{accent}{\\textbf{Software Engineer}}

\\medskip
your.email@gmail.com $\\cdot$
+1 (555) 000-0000 $\\cdot$
\\href{https://linkedin.com/in/you}{linkedin.com/in/you} $\\cdot$
\\href{https://github.com/you}{github.com/you}

\\section{Education}
\\textbf{B.Sc. Computer Science} \\hfill \\textit{2020--2024}\\\\
American University in Cairo \\hfill GPA: 3.9/4.0

\\section{Experience}
\\textbf{Software Engineer Intern} --- Google \\hfill \\textit{Summer 2023}
\\begin{itemize}[noitemsep, topsep=2pt]
  \\item Built feature X that improved Y by 30\\%
  \\item Collaborated with team of 8 engineers
\\end{itemize}

\\section{Skills}
\\textbf{Languages:} Python, C++, JavaScript, LaTeX\\\\
\\textbf{Tools:} Git, Docker, TensorFlow, React

\\section{Projects}
\\textbf{LearnLaTeX} --- Interactive LaTeX learning platform
\\begin{itemize}[noitemsep, topsep=2pt]
  \\item React, TypeScript, KaTeX, CodeMirror 6
  \\item \\href{https://github.com}{github.com/you/learnlatex}
\\end{itemize}

\\end{document}`,
    mode: "document",
  },
  {
    name: "Book chapter",
    emoji: "📚",
    preamble: `\\documentclass[12pt]{report}
\\usepackage{amsmath, amssymb, amsthm}
\\usepackage{graphicx}
\\usepackage[margin=3cm]{geometry}
\\usepackage{fancyhdr, hyperref}
\\pagestyle{fancy}
\\fancyhead[LE,RO]{\\thepage}
\\fancyhead[LO]{\\rightmark}
\\fancyhead[RE]{\\leftmark}

\\newtheorem{theorem}{Theorem}[chapter]
\\newtheorem{lemma}[theorem]{Lemma}
\\theoremstyle{definition}
\\newtheorem{definition}[theorem]{Definition}
\\theoremstyle{remark}
\\newtheorem{remark}{Remark}`,
    body: `\\begin{document}

\\chapter{Introduction to Analysis}

\\section{The Real Number Line}

\\begin{definition}[Completeness]
A field $\\mathbb{F}$ is \\emph{complete} if every Cauchy sequence converges.
\\end{definition}

\\section{Sequences and Limits}

\\begin{theorem}[Bolzano--Weierstrass]
Every bounded sequence in $\\mathbb{R}$ has a convergent subsequence.
\\end{theorem}
\\begin{proof}
By the nested interval theorem...
\\end{proof}

\\begin{remark}
This theorem fails in $\\mathbb{Q}$.
\\end{remark}

\\section{Exercises}
\\begin{enumerate}
  \\item Prove that $\\sqrt{2} \\notin \\mathbb{Q}$.
  \\item Show the limit $\\lim_{n\\to\\infty} \\frac{1}{n} = 0$.
\\end{enumerate}

\\end{document}`,
    mode: "document",
  },
  {
    name: "Math only",
    emoji: "∑",
    preamble: "",
    body: `% Fourier transform
F(\\omega) = \\int_{-\\infty}^{\\infty} f(t)\\, e^{-i\\omega t}\\,dt`,
    mode: "math",
  },
];

export function Sandbox() {
  const [preamble, setPreamble] = useState(TEMPLATES[0].preamble);
  const [body, setBody] = useState(TEMPLATES[0].body);
  const [showPreamble, setShowPreamble] = useState(true);
  const [mode, setMode] = useState<PreviewMode>("document");
  const [copied, setCopied] = useState(false);
  const [shareMsg, setShareMsg] = useState("");

  const fullDoc = useMemo(() => {
    if (mode === "math") return body;
    return `${preamble}\n${body}`;
  }, [preamble, body, mode]);

  const loadTemplate = useCallback((t: Template) => {
    setPreamble(t.preamble);
    setBody(t.body);
    setMode(t.mode);
    setShowPreamble(t.mode === "document");
  }, []);

  const copyLatex = useCallback(() => {
    navigator.clipboard.writeText(fullDoc).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [fullDoc]);

  const shareUrl = useCallback(() => {
    const encoded = btoa(unescape(encodeURIComponent(JSON.stringify({ preamble, body, mode }))));
    const url = `${window.location.origin}/sandbox#${encoded}`;
    navigator.clipboard.writeText(url).then(() => {
      setShareMsg("Link copied!");
      setTimeout(() => setShareMsg(""), 2500);
    });
  }, [preamble, body, mode]);

  return (
    <div className={styles.root}>
      {/* Header */}
      <header className={styles.header}>
        <Link to="/" className={styles.back}>← World Map</Link>
        <h1 className={styles.title}>Sandbox</h1>

        <div className={styles.templates}>
          {TEMPLATES.map(t => (
            <button
              key={t.name}
              className={styles.templateBtn}
              onClick={() => loadTemplate(t)}
              title={t.name}
            >
              {t.emoji} {t.name}
            </button>
          ))}
        </div>

        <div className={styles.actions}>
          <button
            className={`${styles.modeBtn} ${mode === "document" ? styles.modeBtnActive : ""}`}
            onClick={() => setMode("document")}
          >📄 Document</button>
          <button
            className={`${styles.modeBtn} ${mode === "math" ? styles.modeBtnActive : ""}`}
            onClick={() => setMode("math")}
          >∑ Math only</button>
          <button className={styles.actionBtn} onClick={copyLatex}>
            {copied ? "✓ Copied!" : "Copy LaTeX"}
          </button>
          <button className={styles.actionBtn} onClick={shareUrl}>
            {shareMsg || "Share URL"}
          </button>
        </div>
      </header>

      <div className={styles.body}>
        {/* Editor side */}
        <div className={styles.editorSide}>
          {mode === "document" && (
            <div className={styles.preambleSection}>
              <button
                className={styles.preambleToggle}
                onClick={() => setShowPreamble(p => !p)}
              >
                {showPreamble ? "▾" : "▸"} Preamble
                <span className={styles.preambleHint}>(packages, custom commands)</span>
              </button>
              {showPreamble && (
                <div className={styles.preambleEditor}>
                  <LaTeXEditor
                    value={preamble}
                    onChange={setPreamble}
                    fontSize={13}
                    placeholder="\documentclass{article}"
                  />
                </div>
              )}
            </div>
          )}

          <div className={styles.bodyLabel}>
            {mode === "document" ? "Body (between \\begin{document} and \\end{document})" : "LaTeX expression"}
          </div>
          <div className={styles.bodyEditor}>
            <LaTeXEditor
              value={body}
              onChange={setBody}
              fontSize={14}
              placeholder={mode === "document" ? "Your document content here…" : "\\frac{a}{b}"}
            />
          </div>
        </div>

        {/* Preview side */}
        <div className={styles.previewSide}>
          <div className={styles.previewLabel}>Preview</div>
          <div className={styles.previewContent}>
            {mode === "math" ? (
              <div className={styles.mathPreview}>
                <KaTeXPreview latex={body} displayMode={true} />
              </div>
            ) : (
              <DocumentPreview latex={fullDoc} showMeta />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
