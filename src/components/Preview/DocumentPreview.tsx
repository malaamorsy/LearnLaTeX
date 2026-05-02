import { useMemo } from "react";
import { renderLatexDocument, getDocumentMeta } from "../../utils/latexDocRenderer";
import styles from "./DocumentPreview.module.css";
import "../../styles/docPreview.css";

interface Props {
  latex: string;
  showMeta?: boolean;
  emptyMessage?: string;
}

export function DocumentPreview({ latex, showMeta = false, emptyMessage }: Props) {
  const { html, meta } = useMemo(() => {
    if (!latex.trim()) return { html: "", meta: null };
    return {
      html: renderLatexDocument(latex),
      meta: getDocumentMeta(latex),
    };
  }, [latex]);

  if (!latex.trim()) {
    return (
      <div className={styles.empty}>
        {emptyMessage ?? "Start typing to see your document…"}
      </div>
    );
  }

  return (
    <div className={styles.root}>
      {showMeta && meta && (meta.documentClass || meta.packages.length > 0) && (
        <div className="doc-meta">
          {meta.documentClass && (
            <span><span className="doc-meta-tag">class</span> {meta.documentClass}</span>
          )}
          {meta.packages.map((pkg) => (
            <span key={pkg}><span className="doc-meta-tag">pkg</span> {pkg}</span>
          ))}
        </div>
      )}
      <div
        className={styles.docBody}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
