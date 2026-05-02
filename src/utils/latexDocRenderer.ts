/**
 * Minimal LaTeX → HTML renderer for document-mode levels.
 * Handles common structural commands so learners see realistic output.
 */

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function processInline(s: string): string {
  // Math: $...$ → KaTeX would handle this, but we just wrap for styling
  s = s.replace(/\$([^$]+?)\$/g, (_m, inner) => `<span class="doc-math">${escapeHtml(inner)}</span>`);
  // Text commands
  s = s.replace(/\\textbf\{([^}]*)\}/g, (_m, c) => `<strong>${processInline(c)}</strong>`);
  s = s.replace(/\\textit\{([^}]*)\}/g, (_m, c) => `<em>${processInline(c)}</em>`);
  s = s.replace(/\\underline\{([^}]*)\}/g, (_m, c) => `<u>${processInline(c)}</u>`);
  s = s.replace(/\\texttt\{([^}]*)\}/g, (_m, c) => `<code>${processInline(c)}</code>`);
  s = s.replace(/\\emph\{([^}]*)\}/g, (_m, c) => `<em>${processInline(c)}</em>`);
  s = s.replace(/\\textsc\{([^}]*)\}/g, (_m, c) => `<span style="font-variant:small-caps">${processInline(c)}</span>`);
  // Colors
  s = s.replace(/\\textcolor\{([^}]*)\}\{([^}]*)\}/g, (_m, color, text) => `<span style="color:${color}">${processInline(text)}</span>`);
  // Inline special
  s = s.replace(/\\LaTeX/g, '<span class="doc-latex">L<sup>A</sup>T<sub>E</sub>X</span>');
  s = s.replace(/\\TeX/g, '<span class="doc-latex">T<sub>E</sub>X</span>');
  s = s.replace(/\\today/g, new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }));
  s = s.replace(/\\ldots/g, "…");
  s = s.replace(/---/g, "—");
  s = s.replace(/--/g, "–");
  s = s.replace(/``/g, "“");
  s = s.replace(/''/g, "”");
  s = s.replace(/\\%/g, "%");
  s = s.replace(/\\&/g, "&amp;");
  s = s.replace(/\\\$/g, "$");
  s = s.replace(/\\#/g, "#");
  s = s.replace(/\\\{/g, "{");
  s = s.replace(/\\\}/g, "}");
  // Footnote (inline)
  s = s.replace(/\\footnote\{([^}]*)\}/g, (_m, text) => `<sup class="doc-footnote" title="${text}">†</sup>`);
  // Href
  s = s.replace(/\\href\{([^}]*)\}\{([^}]*)\}/g, (_m, url, text) => `<a href="${url}" target="_blank">${processInline(text)}</a>`);
  // url
  s = s.replace(/\\url\{([^}]*)\}/g, (_m, url) => `<code>${url}</code>`);
  // Remove remaining unknown commands with one arg
  s = s.replace(/\\[a-zA-Z]+\{([^}]*)\}/g, (_m, c) => processInline(c));
  // Remove solo commands
  s = s.replace(/\\[a-zA-Z]+[*]?\s*/g, "");
  return s;
}

function processEnvironment(name: string, body: string, optArg: string): string {
  switch (name) {
    case "document":
      return `<div class="doc-body">${processBody(body)}</div>`;
    case "abstract":
      return `<div class="doc-abstract"><strong>Abstract</strong><p>${processBody(body)}</p></div>`;
    case "itemize":
      return `<ul class="doc-list">${processListItems(body)}</ul>`;
    case "enumerate":
      return `<ol class="doc-list">${processListItems(body)}</ol>`;
    case "description": {
      const items = body.split(/\\item\s*\[([^\]]*)\]/).slice(1);
      let html = "<dl class='doc-description'>";
      for (let i = 0; i < items.length; i += 2) {
        html += `<dt>${processInline(items[i])}</dt><dd>${processBody(items[i + 1] ?? "")}</dd>`;
      }
      return html + "</dl>";
    }
    case "quote":
    case "quotation":
      return `<blockquote class="doc-quote">${processBody(body)}</blockquote>`;
    case "verbatim":
    case "lstlisting":
      return `<pre class="doc-verbatim"><code>${escapeHtml(body)}</code></pre>`;
    case "center":
      return `<div style="text-align:center">${processBody(body)}</div>`;
    case "flushleft":
      return `<div style="text-align:left">${processBody(body)}</div>`;
    case "flushright":
      return `<div style="text-align:right">${processBody(body)}</div>`;
    case "tabular": {
      return processTabular(body, optArg);
    }
    case "table":
    case "figure":
      return `<figure class="doc-figure">${processBody(body)}</figure>`;
    case "minipage":
      return `<div class="doc-minipage">${processBody(body)}</div>`;
    case "equation":
    case "equation*":
    case "align":
    case "align*":
    case "gather":
    case "gather*":
      return `<div class="doc-display-math"><span class="doc-math">${escapeHtml(body.trim())}</span></div>`;
    case "theorem":
    case "lemma":
    case "proposition":
    case "corollary": {
      const label = optArg ? ` (${optArg})` : "";
      const nameMap: Record<string, string> = { theorem: "Theorem", lemma: "Lemma", proposition: "Proposition", corollary: "Corollary" };
      return `<div class="doc-theorem"><strong>${nameMap[name] ?? name}${label}.</strong> <em>${processBody(body)}</em></div>`;
    }
    case "proof":
      return `<div class="doc-proof"><em>Proof.</em> ${processBody(body)} <span class="doc-qed">□</span></div>`;
    case "definition":
      return `<div class="doc-definition"><strong>Definition.</strong> ${processBody(body)}</div>`;
    default:
      return processBody(body);
  }
}

function processListItems(body: string): string {
  const parts = body.split(/\\item(?:\[([^\]]*)\])?/).slice(1);
  let html = "";
  for (let i = 0; i < parts.length; i += 2) {
    const label = parts[i] ? `<span class="doc-item-label">${processInline(parts[i])}</span> ` : "";
    html += `<li>${label}${processBody(parts[i + 1] ?? "")}</li>`;
  }
  return html;
}

function processTabular(body: string, _colSpec: string): string {
  const rows = body.split(/\\\\/).map((r) => r.replace(/\\hline/g, "").trim()).filter(Boolean);
  let html = '<table class="doc-table"><tbody>';
  for (const row of rows) {
    const cells = row.split("&");
    html += `<tr>${cells.map((c) => `<td>${processInline(c.trim())}</td>`).join("")}</tr>`;
  }
  return html + "</tbody></table>";
}

function processBody(latex: string): string {
  // Strip comments
  let s = latex.replace(/%.*$/gm, "");

  // Extract preamble commands to show as meta info
  s = s.replace(/\\documentclass(\[[^\]]*\])?\{[^}]*\}/g, "");
  s = s.replace(/\\usepackage(\[[^\]]*\])?\{[^}]*\}/g, "");
  s = s.replace(/\\geometry\{[^}]*\}/g, "");

  // Maketitle block
  const titleMatch = s.match(/\\title\{([^}]*)\}/);
  const authorMatch = s.match(/\\author\{([^}]*)\}/);
  const dateMatch = s.match(/\\date\{([^}]*)\}/);
  let titleBlock = "";
  if (s.includes("\\maketitle")) {
    titleBlock = `<div class="doc-title">
      ${titleMatch ? `<h1>${processInline(titleMatch[1])}</h1>` : ""}
      ${authorMatch ? `<p class="doc-author">${processInline(authorMatch[1])}</p>` : ""}
      ${dateMatch ? `<p class="doc-date">${processInline(dateMatch[1])}</p>` : ""}
    </div>`;
  }
  s = s.replace(/\\title\{[^}]*\}/g, "").replace(/\\author\{[^}]*\}/g, "").replace(/\\date\{[^}]*\}/g, "").replace(/\\maketitle/g, titleBlock);

  // TOC
  s = s.replace(/\\tableofcontents/g, '<div class="doc-toc"><strong>Contents</strong><p style="color:var(--color-text-muted);font-size:0.8rem">(Table of contents would appear here)</p></div>');

  // Environments (greedy block match, one level deep)
  s = s.replace(/\\begin\{(\w+\*?)\}(?:\[([^\]]*)\])?([^]*?)\\end\{\1\}/g, (_m, name, opt, body) =>
    processEnvironment(name, body, opt ?? "")
  );

  // Sections
  s = s.replace(/\\chapter\{([^}]*)\}/g, (_m, t) => `<h1 class="doc-chapter">${processInline(t)}</h1>`);
  s = s.replace(/\\section\*?\{([^}]*)\}/g, (_m, t) => `<h2 class="doc-section">${processInline(t)}</h2>`);
  s = s.replace(/\\subsection\*?\{([^}]*)\}/g, (_m, t) => `<h3 class="doc-subsection">${processInline(t)}</h3>`);
  s = s.replace(/\\subsubsection\*?\{([^}]*)\}/g, (_m, t) => `<h4 class="doc-subsubsection">${processInline(t)}</h4>`);
  s = s.replace(/\\paragraph\{([^}]*)\}/g, (_m, t) => `<p><strong>${processInline(t)}</strong></p>`);

  // Labels, refs (simplify)
  s = s.replace(/\\label\{[^}]*\}/g, "");
  s = s.replace(/\\ref\{([^}]*)\}/g, (_m, key) => `<span class="doc-ref">[${key}]</span>`);
  s = s.replace(/\\cite(?:\[[^\]]*\])?\{([^}]*)\}/g, (_m, key) => `<span class="doc-cite">[${key}]</span>`);

  // Newlines / paragraphs
  s = s.replace(/\\\\\s*/g, "<br>");
  s = s.replace(/\\newpage/g, '<hr class="doc-newpage">');
  s = s.replace(/\\clearpage/g, '<hr class="doc-newpage">');
  s = s.replace(/\\par\b/g, "</p><p>");
  s = s.replace(/\\noindent\b/g, "");
  s = s.replace(/\\indent\b/g, "");

  // Inline processing
  s = processInline(s);

  // Convert blank lines to paragraphs
  s = s.replace(/\n{2,}/g, "</p><p>").trim();
  s = `<p>${s}</p>`;
  // Clean up empty paras
  s = s.replace(/<p>\s*<\/p>/g, "");

  return s;
}

export function renderLatexDocument(latex: string): string {
  return processBody(latex);
}

export function getDocumentMeta(latex: string): {
  documentClass: string | null;
  packages: string[];
  hasTitle: boolean;
} {
  const classMatch = latex.match(/\\documentclass(?:\[[^\]]*\])?\{([^}]*)\}/);
  const packages = Array.from(latex.matchAll(/\\usepackage(?:\[[^\]]*\])?\{([^}]*)\}/g)).map((m) => m[1]);
  return {
    documentClass: classMatch?.[1] ?? null,
    packages,
    hasTitle: latex.includes("\\maketitle"),
  };
}
