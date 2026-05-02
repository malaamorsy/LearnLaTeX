import katex from "katex";
import type { Level, ValidationResult } from "../types";

function normalizeKatexOutput(latex: string): string {
  try {
    const html = katex.renderToString(latex, {
      throwOnError: false,
      displayMode: true,
    });
    return html
      .replace(/id="[^"]*"/g, "")
      .replace(/aria-[a-z-]+="[^"]*"/g, "")
      .replace(/\s+/g, " ")
      .trim();
  } catch {
    return "";
  }
}

function computeMatchQuality(a: string, b: string): number {
  if (a === b) return 1;
  if (!a || !b) return 0;
  const longer = a.length > b.length ? a : b;
  const shorter = a.length > b.length ? b : a;
  const setA = new Set(shorter.split(""));
  const setB = new Set(longer.split(""));
  let overlap = 0;
  setA.forEach((c) => { if (setB.has(c)) overlap++; });
  return overlap / setB.size;
}

function patternMatchQuality(input: string, patterns: string[]): number {
  if (patterns.length === 0) return 1;
  const matched = patterns.filter((p) => {
    try { return new RegExp(p, "s").test(input); } catch { return false; }
  });
  return matched.length / patterns.length;
}

export function validateLevel(
  playerInput: string,
  level: Level
): ValidationResult {
  const { validationMode, targetLatex, acceptedForms, validatorFn, requiredPatterns, forbiddenPatterns, renderMode } = level;

  if (!playerInput.trim()) return { isMatch: false, matchQuality: 0 };

  // Pattern mode: check regex patterns against raw LaTeX input
  if (validationMode === "pattern") {
    const required = requiredPatterns ?? [];
    const forbidden = forbiddenPatterns ?? [];
    const quality = patternMatchQuality(playerInput, required);
    const hasForbidden = forbidden.some((p) => {
      try { return new RegExp(p, "s").test(playerInput); } catch { return false; }
    });
    const allRequired = required.every((p) => {
      try { return new RegExp(p, "s").test(playerInput); } catch { return false; }
    });
    return {
      isMatch: allRequired && !hasForbidden,
      matchQuality: hasForbidden ? Math.min(quality, 0.7) : quality,
    };
  }

  // Contains mode: player input must contain the target string
  if (validationMode === "contains") {
    const isMatch = playerInput.includes(targetLatex);
    return { isMatch, matchQuality: isMatch ? 1 : computeMatchQuality(playerInput, targetLatex) };
  }

  // Custom mode
  if (validationMode === "custom" && validatorFn) {
    return {
      isMatch: validatorFn(playerInput),
      matchQuality: 1,
    };
  }

  // For document mode, use pattern matching if patterns defined, else contains
  if (renderMode === "document" || renderMode === "document-validate") {
    if (requiredPatterns && requiredPatterns.length > 0) {
      return validateLevel(playerInput, { ...level, validationMode: "pattern" });
    }
    const isMatch = playerInput.includes(targetLatex);
    return { isMatch, matchQuality: isMatch ? 1 : 0.3 };
  }

  // KaTeX-based modes
  if (validationMode === "exact-katex") {
    const playerNorm = normalizeKatexOutput(playerInput);
    const targetNorm = normalizeKatexOutput(targetLatex);
    return {
      isMatch: playerNorm !== "" && playerNorm === targetNorm,
      matchQuality: computeMatchQuality(playerNorm, targetNorm),
    };
  }

  if (validationMode === "semantic") {
    const playerNorm = normalizeKatexOutput(playerInput);
    const forms = acceptedForms ?? [targetLatex];
    const isMatch = playerNorm !== "" && forms.some(
      (form) => normalizeKatexOutput(form) === playerNorm
    );
    const targetNorm = normalizeKatexOutput(targetLatex);
    return {
      isMatch,
      matchQuality: computeMatchQuality(playerNorm, targetNorm),
    };
  }

  return { isMatch: false, matchQuality: 0 };
}
