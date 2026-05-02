import { useMemo } from "react";
import katex from "katex";
import { getFriendlyError } from "../../utils/errorMessages";
import "katex/dist/katex.min.css";
import styles from "./KaTeXPreview.module.css";

interface Props {
  latex: string;
  displayMode?: boolean;
  className?: string;
}

export function KaTeXPreview({ latex: input, displayMode = true, className }: Props) {
  const { html, error } = useMemo(() => {
    if (!input.trim()) return { html: "", error: null };
    try {
      return {
        html: katex.renderToString(input, {
          displayMode,
          throwOnError: true,
          strict: false,
        }),
        error: null,
      };
    } catch (e) {
      return {
        html: "",
        error: getFriendlyError(e instanceof Error ? e.message : String(e), input),
      };
    }
  }, [input, displayMode]);

  if (!input.trim()) {
    return <div className={`${styles.empty} ${className ?? ""}`}>Start typing to see your output…</div>;
  }

  if (error) {
    return (
      <div className={`${styles.error} ${className ?? ""}`}>
        <span className={styles.errorIcon}>!</span>
        <span>{error}</span>
      </div>
    );
  }

  return (
    <div
      className={`${styles.output} ${className ?? ""}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
