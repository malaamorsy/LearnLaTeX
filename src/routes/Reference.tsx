import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { KaTeXPreview } from "../components/Preview/KaTeXPreview";
import styles from "./Reference.module.css";

interface Entry {
  command: string;
  description: string;
  example?: string; // LaTeX to render
  syntax?: string;  // display syntax (not rendered)
  category: string;
  subcategory?: string;
  renderMode?: "katex" | "code"; // default: code
  packages?: string[];
  note?: string;
}

const REFERENCE: Entry[] = [
  // ── DOCUMENT CLASSES ────────────────────────────────
  { category: "Document Classes", command: "\\documentclass{article}", description: "Short documents: papers, homework, reports. Sections start at \\section.", syntax: "\\documentclass[12pt,a4paper]{article}" },
  { category: "Document Classes", command: "\\documentclass{report}", description: "Longer documents with chapters. Hierarchy: \\chapter → \\section.", syntax: "\\documentclass[12pt]{report}" },
  { category: "Document Classes", command: "\\documentclass{book}", description: "Books. Two-sided by default. \\frontmatter, \\mainmatter, \\backmatter.", syntax: "\\documentclass[12pt,twoside]{book}" },
  { category: "Document Classes", command: "\\documentclass{beamer}", description: "Presentation slides. Uses frames instead of pages.", syntax: "\\documentclass{beamer}" },
  { category: "Document Classes", command: "\\documentclass{letter}", description: "Formal letters with opening, closing, signature.", syntax: "\\documentclass{letter}" },
  { category: "Document Classes", command: "\\documentclass{standalone}", description: "Single figure or diagram — no page margins.", syntax: "\\documentclass{standalone}" },
  { category: "Document Classes", command: "Class options", description: "Common options passed in [brackets].", syntax: "[10pt|11pt|12pt]  [a4paper|letterpaper]  [twoside]  [twocolumn]  [draft]  [landscape]" },

  // ── ESSENTIAL PACKAGES ──────────────────────────────
  { category: "Essential Packages", command: "amsmath", description: "Enhanced math environments: align, cases, split, gather, multline. Almost always needed.", syntax: "\\usepackage{amsmath}", packages: ["amsmath"] },
  { category: "Essential Packages", command: "amssymb", description: "Extra math symbols: ℝ (\\mathbb{R}), ∴ (\\therefore), etc.", syntax: "\\usepackage{amssymb}", packages: ["amssymb"] },
  { category: "Essential Packages", command: "amsthm", description: "Theorem, lemma, definition, proof environments.", syntax: "\\usepackage{amsthm}", packages: ["amsthm"] },
  { category: "Essential Packages", command: "geometry", description: "Set page margins, paper size, orientation.", syntax: "\\usepackage[a4paper, margin=2.5cm]{geometry}", packages: ["geometry"] },
  { category: "Essential Packages", command: "graphicx", description: "Include images (\\includegraphics). Supports PDF, PNG, JPG.", syntax: "\\usepackage{graphicx}", packages: ["graphicx"] },
  { category: "Essential Packages", command: "hyperref", description: "Clickable links and cross-references. PDF bookmarks. Load last.", syntax: "\\usepackage[colorlinks=true, linkcolor=blue]{hyperref}", packages: ["hyperref"] },
  { category: "Essential Packages", command: "xcolor", description: "Text and background colors. Named colors, RGB, HTML hex.", syntax: "\\usepackage[dvipsnames]{xcolor}", packages: ["xcolor"] },
  { category: "Essential Packages", command: "fontenc + inputenc", description: "Character encoding. fontenc=T1 for proper hyphenation; inputenc=utf8 for Unicode input.", syntax: "\\usepackage[T1]{fontenc}\n\\usepackage[utf8]{inputenc}" },
  { category: "Essential Packages", command: "babel", description: "Multilingual support: hyphenation, date formats, typographic conventions.", syntax: "\\usepackage[english]{babel}", packages: ["babel"] },
  { category: "Essential Packages", command: "microtype", description: "Microtypographic improvements: character protrusion, font expansion. Better-looking text.", syntax: "\\usepackage{microtype}", packages: ["microtype"] },
  { category: "Essential Packages", command: "booktabs", description: "Publication-quality tables: \\toprule, \\midrule, \\bottomrule.", syntax: "\\usepackage{booktabs}", packages: ["booktabs"] },
  { category: "Essential Packages", command: "enumitem", description: "Customise list spacing, labels, and appearance.", syntax: "\\usepackage{enumitem}", packages: ["enumitem"] },
  { category: "Essential Packages", command: "cleveref", description: "Smart cross-references: \\cref{} automatically adds 'Figure', 'Equation', etc.", syntax: "\\usepackage{cleveref}", packages: ["cleveref"] },
  { category: "Essential Packages", command: "siunitx", description: "Units and numbers: \\SI{5.3e-3}{\\metre\\per\\second}.", syntax: "\\usepackage{siunitx}", packages: ["siunitx"] },
  { category: "Essential Packages", command: "biblatex", description: "Modern bibliography management. Use with Biber backend.", syntax: "\\usepackage[style=authoryear]{biblatex}\n\\addbibresource{refs.bib}", packages: ["biblatex"] },
  { category: "Essential Packages", command: "listings / minted", description: "Code listings with syntax highlighting.", syntax: "\\usepackage{listings}\n% or: \\usepackage{minted}", packages: ["listings", "minted"] },
  { category: "Essential Packages", command: "tikz / pgfplots", description: "Vector graphics and function plots directly in LaTeX.", syntax: "\\usepackage{tikz}\n\\usepackage{pgfplots}", packages: ["tikz"] },
  { category: "Essential Packages", command: "multicol", description: "Multi-column text layout.", syntax: "\\usepackage{multicol}", packages: ["multicol"] },
  { category: "Essential Packages", command: "fancyhdr", description: "Custom headers and footers on every page.", syntax: "\\usepackage{fancyhdr}", packages: ["fancyhdr"] },
  { category: "Essential Packages", command: "subcaption", description: "Sub-figures and sub-tables with (a), (b), (c) labels.", syntax: "\\usepackage{subcaption}", packages: ["subcaption"] },
  { category: "Essential Packages", command: "algorithm2e / algorithmicx", description: "Pseudocode and algorithm environments.", syntax: "\\usepackage[ruled]{algorithm2e}", packages: ["algorithm2e"] },

  // ── TEXT FORMATTING ─────────────────────────────────
  { category: "Text Formatting", command: "\\textbf{text}", description: "Bold text", example: "\\textbf{bold}", renderMode: "katex" },
  { category: "Text Formatting", command: "\\textit{text}", description: "Italic text", example: "\\textit{italic}", renderMode: "katex" },
  { category: "Text Formatting", command: "\\underline{text}", description: "Underlined text", example: "\\underline{underline}", renderMode: "katex" },
  { category: "Text Formatting", command: "\\texttt{text}", description: "Monospace (typewriter) font", example: "\\texttt{code}", renderMode: "katex" },
  { category: "Text Formatting", command: "\\emph{text}", description: "Semantic emphasis — italic in normal text, upright inside italic", example: "\\emph{emphasis}", renderMode: "katex" },
  { category: "Text Formatting", command: "\\textsc{text}", description: "Small capitals", example: "\\textsc{Small Caps}", renderMode: "katex" },
  { category: "Text Formatting", command: "\\textsf{text}", description: "Sans-serif font", example: "\\textsf{sans-serif}", renderMode: "katex" },
  { category: "Text Formatting", command: "Font sizes", description: "Size commands (smallest to largest)", example: "{\\tiny A} {\\scriptsize A} {\\footnotesize A} {\\small A} {\\normalsize A} {\\large A} {\\Large A} {\\LARGE A} {\\huge A} {\\Huge A}", renderMode: "katex" },
  { category: "Text Formatting", command: "\\textcolor{color}{text}", description: "Colored text (requires xcolor)", syntax: "\\textcolor{red}{danger}  \\textcolor[HTML]{FF6B00}{custom}", packages: ["xcolor"] },
  { category: "Text Formatting", command: "\\colorbox{color}{text}", description: "Colored background box", syntax: "\\colorbox{yellow}{highlighted}", packages: ["xcolor"] },
  { category: "Text Formatting", command: "\\noindent", description: "Suppress paragraph indentation" },
  { category: "Text Formatting", command: "\\linebreak / \\newpage", description: "Force a line break or page break" },
  { category: "Text Formatting", command: "\\hspace{1cm} / \\vspace{1cm}", description: "Horizontal / vertical space of specified length" },
  { category: "Text Formatting", command: "\\centering / \\raggedright / \\raggedleft", description: "Text alignment within a block or environment" },
  { category: "Text Formatting", command: "~ (tilde)", description: "Non-breaking space — use between 'Figure~\\ref{...}' to prevent ugly breaks", syntax: "Figure~\\ref{fig:1}" },

  // ── FONTS ───────────────────────────────────────────
  { category: "Fonts", command: "Default (Computer Modern)", description: "LaTeX's classic serif font. No package needed." },
  { category: "Fonts", command: "\\usepackage{lmodern}", description: "Latin Modern — improved Computer Modern with full Unicode coverage." },
  { category: "Fonts", command: "\\usepackage{times} / \\usepackage{mathptmx}", description: "Times New Roman style for text and math." },
  { category: "Fonts", command: "\\usepackage{palatino}", description: "Palatino — elegant serif font." },
  { category: "Fonts", command: "\\usepackage{helvet} + \\renewcommand{\\familydefault}{\\sfdefault}", description: "Helvetica / Arial-style sans-serif as main font." },
  { category: "Fonts", command: "\\usepackage{inconsolata}", description: "High-quality monospace font for code listings." },
  { category: "Fonts", command: "fontspec (XeLaTeX/LuaLaTeX)", description: "Use any OpenType/TrueType system font.", syntax: "\\usepackage{fontspec}\n\\setmainfont{Times New Roman}\n\\setsansfont{Arial}\n\\setmonofont{Courier New}", packages: ["fontspec"], note: "Requires XeLaTeX or LuaLaTeX" },
  { category: "Fonts", command: "\\rmfamily / \\sffamily / \\ttfamily", description: "Switch to serif / sans-serif / monospace within text", syntax: "{\\sffamily This is sans-serif}" },

  // ── PAGE LAYOUT ─────────────────────────────────────
  { category: "Page Layout", command: "geometry", description: "Set margins and paper size", syntax: "\\usepackage[top=2cm, bottom=2cm, left=2.5cm, right=2.5cm]{geometry}", packages: ["geometry"] },
  { category: "Page Layout", command: "\\pagestyle{fancy}", description: "Enable custom headers/footers (fancyhdr)", syntax: "\\usepackage{fancyhdr}\n\\pagestyle{fancy}\n\\fancyhead[L]{Left Head} \\fancyhead[C]{Centre} \\fancyhead[R]{Right}\n\\fancyfoot[C]{\\thepage}", packages: ["fancyhdr"] },
  { category: "Page Layout", command: "\\pagestyle{empty}", description: "No header or footer on this page" },
  { category: "Page Layout", command: "\\thispagestyle{plain}", description: "Override page style for just one page" },
  { category: "Page Layout", command: "\\pagenumbering{roman}", description: "Page number style: roman, arabic, alph, Alph", syntax: "\\pagenumbering{roman}  % i, ii, iii\n\\pagenumbering{arabic} % 1, 2, 3" },
  { category: "Page Layout", command: "\\setlength{\\parskip}{1em}", description: "Space between paragraphs" },
  { category: "Page Layout", command: "\\setlength{\\parindent}{0pt}", description: "Remove paragraph indentation" },
  { category: "Page Layout", command: "\\linespread{1.5}", description: "Line spacing (1.5 = one-and-a-half, 2 = double)" },
  { category: "Page Layout", command: "\\usepackage{setspace}", description: "\\singlespacing / \\onehalfspacing / \\doublespacing", packages: ["setspace"] },
  { category: "Page Layout", command: "\\twocolumn / \\onecolumn", description: "Switch between single and two-column layout" },
  { category: "Page Layout", command: "\\usepackage{multicol}", description: "\\begin{multicols}{3} for flexible multi-column", packages: ["multicol"] },

  // ── DOCUMENT STRUCTURE ──────────────────────────────
  { category: "Document Structure", command: "\\section{Title}", description: "Numbered section heading (article/report/book)" },
  { category: "Document Structure", command: "\\subsection / \\subsubsection", description: "Sub-level headings" },
  { category: "Document Structure", command: "\\chapter{Title}", description: "Chapter heading (report/book only)" },
  { category: "Document Structure", command: "\\section*{Title}", description: "Unnumbered section (star suppresses number)" },
  { category: "Document Structure", command: "\\tableofcontents", description: "Auto-generated table of contents (requires two compilations)" },
  { category: "Document Structure", command: "\\listoffigures / \\listoftables", description: "Auto-generated figure/table lists" },
  { category: "Document Structure", command: "\\appendix", description: "Mark the start of appendices — sections become A, B, C" },
  { category: "Document Structure", command: "\\frontmatter / \\mainmatter / \\backmatter", description: "Book structure: roman page numbers, arabic, bibliography", note: "book class only" },
  { category: "Document Structure", command: "\\title / \\author / \\date / \\maketitle", description: "Title block", syntax: "\\title{My Paper}\n\\author{Name\\thanks{Affiliation}}\n\\date{\\today}\n\\maketitle" },
  { category: "Document Structure", command: "\\begin{abstract}", description: "Abstract block (article/report)" },
  { category: "Document Structure", command: "\\footnote{text}", description: "Inline footnote — appears at page bottom", example: "text\\footnote{footnote}", renderMode: "katex" },
  { category: "Document Structure", command: "\\label + \\ref", description: "Cross-reference any numbered item", syntax: "\\section{Intro}\\label{sec:intro}\nSee section~\\ref{sec:intro}." },
  { category: "Document Structure", command: "\\pageref{key}", description: "Reference the page number instead of the item number" },
  { category: "Document Structure", command: "\\input{file} / \\include{file}", description: "Include another .tex file. \\include adds a page break." },

  // ── MATH ────────────────────────────────────────────
  { category: "Math", subcategory: "Modes", command: "$...$", description: "Inline math", example: "The formula $E = mc^2$ is famous.", renderMode: "katex" },
  { category: "Math", subcategory: "Modes", command: "\\[...\\]", description: "Display math (unnumbered)", example: "\\[ x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a} \\]", renderMode: "katex" },
  { category: "Math", subcategory: "Modes", command: "equation", description: "Numbered display equation", syntax: "\\begin{equation}\n  E = mc^2 \\label{eq:einstein}\n\\end{equation}" },
  { category: "Math", subcategory: "Environments", command: "align / align*", description: "Multiple aligned equations (at &)", syntax: "\\begin{align*}\n  f(x) &= x^2 + 2x \\\\\n       &= x(x+2)\n\\end{align*}", packages: ["amsmath"] },
  { category: "Math", subcategory: "Environments", command: "cases", description: "Piecewise function", example: "f(x) = \\begin{cases} x & x \\geq 0 \\\\ -x & x < 0 \\end{cases}", renderMode: "katex", packages: ["amsmath"] },
  { category: "Math", subcategory: "Environments", command: "pmatrix / bmatrix / vmatrix", description: "Matrix with ( ), [ ], or | | brackets", example: "\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}", renderMode: "katex", packages: ["amsmath"] },
  { category: "Math", subcategory: "Fractions", command: "\\frac{a}{b}", description: "Fraction", example: "\\frac{a+b}{c-d}", renderMode: "katex" },
  { category: "Math", subcategory: "Fractions", command: "\\dfrac / \\tfrac", description: "Display-size / text-size fraction forced", example: "\\dfrac{1}{2}", renderMode: "katex" },
  { category: "Math", subcategory: "Fractions", command: "\\binom{n}{k}", description: "Binomial coefficient", example: "\\binom{n}{k}", renderMode: "katex" },
  { category: "Math", subcategory: "Roots", command: "\\sqrt{x} / \\sqrt[n]{x}", description: "Square root / nth root", example: "\\sqrt{x} \\quad \\sqrt[3]{x}", renderMode: "katex" },
  { category: "Math", subcategory: "Scripts", command: "x^{n} / x_{i}", description: "Superscript / subscript", example: "x_{ij}^{n+1}", renderMode: "katex" },
  { category: "Math", subcategory: "Operators", command: "\\sum / \\prod / \\int", description: "Summation, product, integral", example: "\\sum_{i=1}^{n} x_i \\quad \\int_0^1 f\\,dx", renderMode: "katex" },
  { category: "Math", subcategory: "Operators", command: "\\iint / \\iiint / \\oint", description: "Double/triple/contour integral", example: "\\iint_D f\\,dA \\quad \\oint_C f\\,dz", renderMode: "katex" },
  { category: "Math", subcategory: "Operators", command: "\\lim / \\sup / \\inf", description: "Limit, supremum, infimum", example: "\\lim_{x \\to 0} f(x)", renderMode: "katex" },
  { category: "Math", subcategory: "Brackets", command: "\\left( ... \\right)", description: "Auto-sized brackets", example: "\\left( \\frac{a}{b} \\right)", renderMode: "katex" },
  { category: "Math", subcategory: "Brackets", command: "\\lfloor \\rfloor / \\lceil \\rceil", description: "Floor / ceiling", example: "\\lfloor x \\rfloor \\quad \\lceil x \\rceil", renderMode: "katex" },
  { category: "Math", subcategory: "Brackets", command: "\\langle \\rangle", description: "Angle brackets (inner product, bra-ket)", example: "\\langle u, v \\rangle", renderMode: "katex" },
  { category: "Math", subcategory: "Accents", command: "\\hat{x} / \\bar{x} / \\vec{v}", description: "Hat / bar / vector arrow", example: "\\hat{x} \\quad \\bar{X} \\quad \\vec{v}", renderMode: "katex" },
  { category: "Math", subcategory: "Accents", command: "\\dot{x} / \\ddot{x}", description: "Time derivatives (dot notation)", example: "\\dot{x} \\quad \\ddot{x}", renderMode: "katex" },
  { category: "Math", subcategory: "Fonts", command: "\\mathbf / \\mathbb / \\mathcal / \\mathfrak", description: "Math font families", example: "\\mathbf{v} \\quad \\mathbb{R} \\quad \\mathcal{L} \\quad \\mathfrak{g}", renderMode: "katex" },
  { category: "Math", subcategory: "Greek", command: "Lowercase", description: "Greek letters", example: "\\alpha\\beta\\gamma\\delta\\epsilon\\zeta\\eta\\theta\\iota\\kappa\\lambda\\mu\\nu\\xi\\pi\\rho\\sigma\\tau\\upsilon\\phi\\chi\\psi\\omega", renderMode: "katex" },
  { category: "Math", subcategory: "Greek", command: "Uppercase", description: "Uppercase Greek", example: "\\Gamma\\Delta\\Theta\\Lambda\\Xi\\Pi\\Sigma\\Upsilon\\Phi\\Psi\\Omega", renderMode: "katex" },
  { category: "Math", subcategory: "Symbols", command: "Relations", description: "Comparison symbols", example: "\\leq \\geq \\neq \\approx \\equiv \\sim \\propto \\ll \\gg", renderMode: "katex" },
  { category: "Math", subcategory: "Symbols", command: "Operators", description: "Arithmetic operators", example: "\\pm \\mp \\times \\div \\cdot \\circ \\oplus \\otimes", renderMode: "katex" },
  { category: "Math", subcategory: "Symbols", command: "Sets", description: "Set theory", example: "\\in \\notin \\subset \\supset \\cup \\cap \\emptyset \\setminus", renderMode: "katex" },
  { category: "Math", subcategory: "Symbols", command: "Logic", description: "Logic symbols", example: "\\forall \\exists \\neg \\land \\lor \\Rightarrow \\Leftrightarrow", renderMode: "katex" },
  { category: "Math", subcategory: "Symbols", command: "Arrows", description: "Arrows", example: "\\to \\leftarrow \\leftrightarrow \\Rightarrow \\Leftrightarrow \\mapsto \\hookrightarrow", renderMode: "katex" },
  { category: "Math", subcategory: "Symbols", command: "Misc", description: "Miscellaneous", example: "\\infty \\partial \\nabla \\hbar \\ell \\Re \\Im \\angle \\triangle", renderMode: "katex" },
  { category: "Math", subcategory: "Spacing", command: "\\, \\; \\quad \\qquad", description: "Math spacing (thin, medium, em, 2em)", example: "a\\,b \\quad a\\;b \\quad a\\quad b", renderMode: "katex" },

  // ── LISTS ───────────────────────────────────────────
  { category: "Lists", command: "itemize", description: "Bullet list", syntax: "\\begin{itemize}\n  \\item First\n  \\item Second\n\\end{itemize}" },
  { category: "Lists", command: "enumerate", description: "Numbered list", syntax: "\\begin{enumerate}\n  \\item First\n  \\item Second\n\\end{enumerate}" },
  { category: "Lists", command: "description", description: "Term/definition list", syntax: "\\begin{description}\n  \\item[Term] Definition.\n\\end{description}" },
  { category: "Lists", command: "Nested lists", description: "Lists inside lists (up to 4 levels)", syntax: "\\begin{itemize}\n  \\item Outer\n  \\begin{enumerate}\n    \\item Inner\n  \\end{enumerate}\n\\end{itemize}" },
  { category: "Lists", command: "enumitem customisation", description: "Custom labels, spacing, resuming numbering", syntax: "\\begin{enumerate}[label=\\alph*.]\n  \\item First (a.)\n\\end{enumerate}", packages: ["enumitem"] },

  // ── TABLES ──────────────────────────────────────────
  { category: "Tables", command: "tabular{lrc}", description: "Basic table — l=left, c=centre, r=right, |=vertical line", syntax: "\\begin{tabular}{|l|c|r|}\n  \\hline\n  A & B & C \\\\\n  \\hline\n\\end{tabular}" },
  { category: "Tables", command: "booktabs (professional)", description: "Publication-quality tables without vertical lines", syntax: "\\begin{tabular}{lcc}\n  \\toprule\n  Name & Value & Unit \\\\\n  \\midrule\n  Mass & 9.11 & kg \\\\\n  \\bottomrule\n\\end{tabular}", packages: ["booktabs"] },
  { category: "Tables", command: "\\multicolumn{n}{c}{text}", description: "Merge n columns", syntax: "\\multicolumn{2}{c}{Merged header}" },
  { category: "Tables", command: "\\multirow{n}{*}{text}", description: "Merge n rows (requires multirow package)", syntax: "\\multirow{2}{*}{Merged}", packages: ["multirow"] },
  { category: "Tables", command: "table float", description: "Float table with caption and label", syntax: "\\begin{table}[h]\n  \\centering\n  \\caption{My table.}\n  \\label{tab:1}\n  \\begin{tabular}{lc}...\n  \\end{tabular}\n\\end{table}" },
  { category: "Tables", command: "longtable", description: "Table spanning multiple pages", packages: ["longtable"] },

  // ── FIGURES ─────────────────────────────────────────
  { category: "Figures", command: "\\includegraphics", description: "Insert an image", syntax: "\\includegraphics[width=0.5\\textwidth]{filename}" },
  { category: "Figures", command: "figure float", description: "Floating figure with caption", syntax: "\\begin{figure}[h]\n  \\centering\n  \\includegraphics[width=0.6\\textwidth]{plot}\n  \\caption{Description.}\n  \\label{fig:1}\n\\end{figure}" },
  { category: "Figures", command: "Placement specifiers", description: "h=here, t=top, b=bottom, p=own page, !=force, H=exactly here", syntax: "\\begin{figure}[ht!]" },
  { category: "Figures", command: "subfigure", description: "Side-by-side sub-figures (a) (b)", syntax: "\\begin{figure}\n  \\begin{subfigure}{0.48\\textwidth}\n    \\includegraphics{a}\n    \\caption{Left}\n  \\end{subfigure}\n  \\hfill\n  \\begin{subfigure}{0.48\\textwidth}\n    \\includegraphics{b}\n    \\caption{Right}\n  \\end{subfigure}\n\\end{figure}", packages: ["subcaption"] },
  { category: "Figures", command: "wrapfigure", description: "Figure with text wrapping around it", packages: ["wrapfig"] },
  { category: "Figures", command: "TikZ", description: "Draw diagrams, graphs, trees inline", syntax: "\\begin{tikzpicture}\n  \\draw (0,0) circle (1cm);\n  \\node at (0,0) {centre};\n\\end{tikzpicture}", packages: ["tikz"] },

  // ── BIBLIOGRAPHY ────────────────────────────────────
  { category: "Bibliography", command: "thebibliography (simple)", description: "Inline bibliography — no separate .bib file", syntax: "\\begin{thebibliography}{9}\n  \\bibitem{key} Author, \\textit{Title}, Year.\n\\end{thebibliography}\n% Cite with:\n\\cite{key}" },
  { category: "Bibliography", command: "BibTeX workflow", description: "Separate .bib file + natbib or plain style", syntax: "% In .tex file:\n\\bibliographystyle{plain}\n\\bibliography{references}\n% In references.bib:\n@article{key,\n  author={Name},\n  title={Title},\n  year={2024}\n}" },
  { category: "Bibliography", command: "BibLaTeX (modern)", description: "Best practice for new documents. Compile with biber.", syntax: "\\usepackage[style=authoryear]{biblatex}\n\\addbibresource{refs.bib}\n...\n\\autocite{key}\n...\n\\printbibliography", packages: ["biblatex"] },
  { category: "Bibliography", command: "BibTeX entry types", description: "Common entry types for .bib files", syntax: "@article{key, author={}, title={}, journal={}, year={}, volume={}, pages={}}\n@book{key, author={}, title={}, publisher={}, year={}}\n@inproceedings{key, author={}, title={}, booktitle={}, year={}}\n@misc{key, author={}, title={}, howpublished={\\url{}}, year={}}" },
  { category: "Bibliography", command: "\\cite / \\citep / \\citet", description: "Citation commands. \\cite=[1], \\citep=(Author, 2024), \\citet=Author (2024)", syntax: "\\cite{key}  \\cite[p.~42]{key}\n\\citep{key}  \\citet{key}  % natbib" },

  // ── CUSTOM COMMANDS ─────────────────────────────────
  { category: "Custom Commands", command: "\\newcommand{\\name}{def}", description: "Define a new command with no arguments", syntax: "\\newcommand{\\R}{\\mathbb{R}}" },
  { category: "Custom Commands", command: "\\newcommand{\\name}[n]{def}", description: "Command with n arguments (#1, #2, ...)", syntax: "\\newcommand{\\pd}[2]{\\frac{\\partial #1}{\\partial #2}}" },
  { category: "Custom Commands", command: "Optional argument", description: "Command with optional first argument [default]", syntax: "\\newcommand{\\norm}[2][2]{\\|#2\\|_{#1}}\n% \\norm{v} → ‖v‖₂  (default)\n% \\norm[\\infty]{v} → ‖v‖_∞" },
  { category: "Custom Commands", command: "\\renewcommand", description: "Redefine an existing command", syntax: "\\renewcommand{\\epsilon}{\\varepsilon}" },
  { category: "Custom Commands", command: "\\DeclareMathOperator", description: "Upright named math operator (like \\sin)", syntax: "\\DeclareMathOperator{\\Tr}{Tr}\n% Usage: \\Tr(A)", packages: ["amsmath"] },
  { category: "Custom Commands", command: "\\newenvironment{name}{before}{after}", description: "Create a new environment", syntax: "\\newenvironment{mybox}{\\begin{center}\\begin{tabular}{|p{0.9\\linewidth}|}\\hline}{\\hline\\end{tabular}\\end{center}}" },

  // ── THEOREMS ────────────────────────────────────────
  { category: "Theorems", command: "\\newtheorem{theorem}{Theorem}", description: "Declare a theorem-like environment in the preamble", packages: ["amsthm"] },
  { category: "Theorems", command: "\\theoremstyle{plain/definition/remark}", description: "Set style for subsequent \\newtheorem declarations", syntax: "\\theoremstyle{definition}\n\\newtheorem{definition}{Definition}" },
  { category: "Theorems", command: "Shared counter", description: "Theorem and Lemma share numbering", syntax: "\\newtheorem{lemma}[theorem]{Lemma}" },
  { category: "Theorems", command: "Named theorem", description: "Add a parenthetical name", syntax: "\\begin{theorem}[Pythagoras]\n  $a^2 + b^2 = c^2$.\n\\end{theorem}" },
  { category: "Theorems", command: "proof environment", description: "Auto adds QED symbol (□ or ∎)", syntax: "\\begin{proof}\n  By strong induction...\n\\end{proof}" },

  // ── PRESENTATIONS (BEAMER) ──────────────────────────
  { category: "Presentations", command: "\\begin{frame}{Title}", description: "A slide in Beamer", syntax: "\\begin{frame}{My Slide}\n  Content here.\n\\end{frame}" },
  { category: "Presentations", command: "Beamer themes", description: "Built-in themes change the visual style", syntax: "\\usetheme{Madrid}  % or: Warsaw, Berlin, Boadilla, Copenhagen...\n\\usecolortheme{beaver}" },
  { category: "Presentations", command: "\\pause", description: "Progressive reveal — show items one at a time", syntax: "\\begin{itemize}\n  \\item First \\pause\n  \\item Second \\pause\n  \\item Third\n\\end{itemize}" },
  { category: "Presentations", command: "\\only / \\uncover / \\visible", description: "Fine-grained overlay control", syntax: "\\only<2>{Shown only on slide 2}\n\\uncover<3->{Shown from slide 3 onwards}" },
  { category: "Presentations", command: "columns environment", description: "Side-by-side columns on a slide", syntax: "\\begin{columns}\n  \\column{0.5\\textwidth} Left\n  \\column{0.5\\textwidth} Right\n\\end{columns}" },
  { category: "Presentations", command: "\\titlepage / \\tableofcontents", description: "Auto-generate title slide and section outline" },
  { category: "Presentations", command: "handout mode", description: "Print version without pauses", syntax: "\\documentclass[handout]{beamer}" },
  { category: "Presentations", command: "\\institute / \\logo", description: "Add institution and logo to slides", syntax: "\\institute{AUC}\n\\logo{\\includegraphics[height=1cm]{logo}}" },

  // ── RESUMES & CVS ───────────────────────────────────
  { category: "Resumes & CVs", command: "moderncv package", description: "Professional CV template with multiple styles", syntax: "\\documentclass[11pt,a4paper]{moderncv}\n\\moderncvstyle{classic}  % banking, casual, classic, oldstyle\n\\moderncvcolor{blue}", packages: ["moderncv"] },
  { category: "Resumes & CVs", command: "\\cventry", description: "A CV entry row in moderncv", syntax: "\\cventry{2020--2024}{BSc Computer Science}{AUC}{Cairo}{GPA: 3.9}{}" },
  { category: "Resumes & CVs", command: "\\cvitem / \\cvlistitem", description: "Simple label/content row or bullet item", syntax: "\\cvitem{Skills}{Python, LaTeX, C++}" },
  { category: "Resumes & CVs", command: "europasscv", description: "EU standard Europass CV format", packages: ["europasscv"] },
  { category: "Resumes & CVs", command: "DIY resume approach", description: "Use article class with custom formatting", syntax: "\\documentclass{article}\n\\usepackage[margin=1in]{geometry}\n\\usepackage{enumitem,titlesec,hyperref}" },

  // ── CODE LISTINGS ───────────────────────────────────
  { category: "Code Listings", command: "listings package", description: "Code with basic syntax highlighting", syntax: "\\usepackage{listings}\n\\lstset{language=Python, basicstyle=\\ttfamily\\small, keywordstyle=\\color{blue}}\n\\begin{lstlisting}\ndef hello():\n    print('Hello')\n\\end{lstlisting}", packages: ["listings"] },
  { category: "Code Listings", command: "minted package", description: "Beautiful code with Pygments highlighting (requires Python)", syntax: "\\usepackage{minted}\n\\begin{minted}{python}\ndef hello():\n    print('Hello')\n\\end{minted}", packages: ["minted"], note: "Requires --shell-escape flag" },
  { category: "Code Listings", command: "verbatim environment", description: "Literal text, no interpretation", syntax: "\\begin{verbatim}\n  \\command{not} interpreted\n\\end{verbatim}" },
  { category: "Code Listings", command: "\\verb|code|", description: "Inline verbatim", syntax: "Use \\verb|\\textbf{}| for bold." },

  // ── ALGORITHMS ──────────────────────────────────────
  { category: "Algorithms", command: "algorithm2e", description: "Pseudocode algorithm environment", syntax: "\\usepackage[ruled,vlined]{algorithm2e}\n\\begin{algorithm}\n  \\KwIn{Array $A$}\n  \\For{$i \\leftarrow 1$ \\KwTo $n$}{\n    \\If{$A[i] > \\max$}{$\\max \\leftarrow A[i]$}\n  }\n  \\Return{\\max}\n\\end{algorithm}", packages: ["algorithm2e"] },
  { category: "Algorithms", command: "algorithmicx + algpseudocode", description: "Alternative pseudocode package", syntax: "\\usepackage{algorithm}\n\\usepackage{algpseudocode}\n\\begin{algorithm}\n  \\begin{algorithmic}\n    \\Procedure{Sort}{$A$}\n      \\State \\textbf{return} sorted $A$\n    \\EndProcedure\n  \\end{algorithmic}\n\\end{algorithm}", packages: ["algorithm", "algpseudocode"] },

  // ── SPECIAL CHARACTERS ──────────────────────────────
  { category: "Special Characters", command: "Escaping", description: "Characters that must be escaped in LaTeX", syntax: "\\%  \\$  \\&  \\#  \\_  \\{  \\}  \\textbackslash  \\textasciicircum  \\textasciitilde" },
  { category: "Special Characters", command: "Dashes", description: "Hyphen, en-dash, em-dash", syntax: "- (hyphen)   -- (en-dash, ranges)   --- (em-dash, pause)" },
  { category: "Special Characters", command: "Quotes", description: "Typographic quotation marks", syntax: "`single'   ``double''   \\enquote{smart}  % csquotes" },
  { category: "Special Characters", command: "Ellipsis", description: "Proper ellipsis", syntax: "\\ldots  or  \\dots" },
  { category: "Special Characters", command: "Non-breaking space", description: "Prevent line break between two words", syntax: "Figure~1  or  Dr.~Smith" },
  { category: "Special Characters", command: "\\LaTeX / \\TeX", description: "The LaTeX and TeX logos", example: "\\LaTeX \\quad \\TeX", renderMode: "katex" },

  // ── HYPERLINKS ──────────────────────────────────────
  { category: "Hyperlinks", command: "\\href{url}{text}", description: "Clickable hyperlink", syntax: "\\href{https://example.com}{Click here}", packages: ["hyperref"] },
  { category: "Hyperlinks", command: "\\url{url}", description: "Display a URL as a clickable link", syntax: "\\url{https://example.com}", packages: ["hyperref"] },
  { category: "Hyperlinks", command: "\\hyperref[key]{text}", description: "Internal link to a \\label", packages: ["hyperref"] },
  { category: "Hyperlinks", command: "hyperref options", description: "Configure link colors and PDF metadata", syntax: "\\usepackage[colorlinks=true, linkcolor=blue, citecolor=green, urlcolor=cyan, pdftitle={My Paper}]{hyperref}" },

  // ── INTERNATIONALIZATION ─────────────────────────────
  { category: "Internationalization", command: "babel", description: "Language-specific hyphenation, captions, date", syntax: "\\usepackage[arabic,english]{babel}\n\\selectlanguage{arabic}" },
  { category: "Internationalization", command: "polyglossia (XeLaTeX)", description: "Modern multilingual support for XeLaTeX", syntax: "\\usepackage{polyglossia}\n\\setmainlanguage{english}\n\\setotherlanguage{arabic}", note: "XeLaTeX/LuaLaTeX only" },
  { category: "Internationalization", command: "RTL text", description: "Right-to-left text (Arabic, Hebrew)", syntax: "\\usepackage[bidi=basic]{babel}\n% or with XeLaTeX:\n\\usepackage{polyglossia}\n\\setmainlanguage[numerals=maghrib]{arabic}" },
  { category: "Internationalization", command: "siunitx (units)", description: "Type numbers and SI units correctly", syntax: "\\SI{5.3e-3}{\\metre\\per\\second}\n\\num{1234567.89}", packages: ["siunitx"] },
];

const CATEGORIES = Array.from(new Set(REFERENCE.map(e => e.category)));

export function Reference() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return REFERENCE.filter(e => {
      const matchCat = activeCategory === "All" || e.category === activeCategory;
      const matchQ = !q ||
        e.command.toLowerCase().includes(q) ||
        e.description.toLowerCase().includes(q) ||
        (e.subcategory?.toLowerCase().includes(q) ?? false);
      return matchCat && matchQ;
    });
  }, [query, activeCategory]);

  // Group by category → subcategory
  const grouped = useMemo(() => {
    const map = new Map<string, Map<string, Entry[]>>();
    for (const e of filtered) {
      if (!map.has(e.category)) map.set(e.category, new Map());
      const sub = e.subcategory ?? "_";
      const catMap = map.get(e.category)!;
      if (!catMap.has(sub)) catMap.set(sub, []);
      catMap.get(sub)!.push(e);
    }
    return map;
  }, [filtered]);

  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <Link to="/" className={styles.back}>← World Map</Link>
        <h1 className={styles.title}>LaTeX Reference</h1>
        <div className={styles.controls}>
          <input
            className={styles.search}
            placeholder="Search commands…"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>
      </header>

      <div className={styles.body}>
        {/* Left nav */}
        <nav className={styles.nav}>
          <button
            className={`${styles.navItem} ${activeCategory === "All" ? styles.navActive : ""}`}
            onClick={() => setActiveCategory("All")}
          >
            All ({REFERENCE.length})
          </button>
          {CATEGORIES.map(cat => {
            const count = REFERENCE.filter(e => e.category === cat).length;
            return (
              <button
                key={cat}
                className={`${styles.navItem} ${activeCategory === cat ? styles.navActive : ""}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat} <span className={styles.navCount}>{count}</span>
              </button>
            );
          })}
        </nav>

        {/* Content */}
        <div className={styles.content}>
          {filtered.length === 0 && (
            <p className={styles.empty}>No entries match "{query}"</p>
          )}

          {Array.from(grouped.entries()).map(([cat, subMap]) => (
            <section key={cat} className={styles.section}>
              <h2 className={styles.sectionTitle}>{cat}</h2>

              {Array.from(subMap.entries()).map(([sub, entries]) => (
                <div key={sub}>
                  {sub !== "_" && <h3 className={styles.subTitle}>{sub}</h3>}
                  <div className={styles.entries}>
                    {entries.map((entry, i) => (
                      <div key={i} className={styles.entry}>
                        <div className={styles.entryLeft}>
                          <code className={styles.command}>{entry.command}</code>
                          {entry.packages && (
                            <div className={styles.pkgRow}>
                              {entry.packages.map(p => (
                                <span key={p} className={styles.pkg}>{p}</span>
                              ))}
                            </div>
                          )}
                          <p className={styles.desc}>{entry.description}</p>
                          {entry.note && <p className={styles.note}>⚠ {entry.note}</p>}
                        </div>
                        <div className={styles.entryRight}>
                          {entry.renderMode === "katex" && entry.example ? (
                            <div className={styles.rendered}>
                              <KaTeXPreview latex={entry.example} displayMode={false} />
                            </div>
                          ) : (entry.syntax || entry.example) ? (
                            <pre className={styles.codeBlock}>
                              <code>{entry.syntax ?? entry.example}</code>
                            </pre>
                          ) : null}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
