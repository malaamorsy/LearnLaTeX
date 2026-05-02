import type { Lesson, RenderMode } from "../../types";
import { KaTeXPreview } from "../Preview/KaTeXPreview";
import { renderLatexDocument } from "../../utils/latexDocRenderer";
import styles from "./LessonPanel.module.css";
import "../../styles/docPreview.css";

function renderInline(text: string): string {
  return text
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*\n]+)\*/g, "<em>$1</em>")
    .replace(/`([^`]+)`/g, "<code>$1</code>");
}

interface Props {
  lesson: Lesson;
  onStartChallenge: () => void;
}

function ExampleOutput({ code, renderMode }: { code: string; renderMode?: RenderMode }) {
  if (!renderMode || renderMode === "katex") {
    return <KaTeXPreview latex={code} displayMode={true} />;
  }
  // Use a simple styled div — lesson examples should look like rendered docs
  return (
    <div
      style={{
        fontFamily: "Georgia, serif",
        fontSize: "0.85rem",
        lineHeight: 1.7,
        color: "var(--color-text)",
        width: "100%",
      }}
      dangerouslySetInnerHTML={{ __html: renderLatexDocument(code) }}
    />
  );
}

export function LessonPanel({ lesson, onStartChallenge }: Props) {
  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <h2 className={styles.title}>{lesson.title}</h2>

        <div className={styles.body}>
          {lesson.body.split("\n\n").map((para, i) => {
            // Fenced code blocks
            if (para.startsWith("```")) {
              const code = para.replace(/^```[a-z]*\n?/, "").replace(/\n?```$/, "");
              return (
                <pre key={i} className={styles.codeBlock}>
                  <code>{code}</code>
                </pre>
              );
            }
            // Bullet lists (lines starting with - )
            if (para.split("\n").every(l => l.trim().startsWith("- ") || l.trim() === "")) {
              const items = para.split("\n").filter(l => l.trim().startsWith("- "));
              return (
                <ul key={i} className={styles.bodyList}>
                  {items.map((item, j) => {
                    const content = renderInline(item.replace(/^-\s+/, ""));
                    return <li key={j} dangerouslySetInnerHTML={{ __html: content }} />;
                  })}
                </ul>
              );
            }
            // Regular paragraph — render inline markdown
            const html = renderInline(para);
            return <p key={i} dangerouslySetInnerHTML={{ __html: html }} />;
          })}
        </div>

        {lesson.examples.length > 0 && (
          <div className={styles.examples}>
            <h3 className={styles.examplesTitle}>Examples</h3>
            {lesson.examples.map((ex, i) => (
              <div key={i} className={styles.example}>
                <div className={styles.exampleCode}>
                  <div className={styles.codeLabel}>LaTeX</div>
                  <pre className={styles.codeBlock}><code>{ex.code}</code></pre>
                </div>
                <div className={styles.exampleArrow}>→</div>
                <div className={styles.exampleOutput}>
                  <div className={styles.codeLabel}>Output</div>
                  <div className={styles.outputBox}>
                    <ExampleOutput code={ex.code} renderMode={ex.renderMode} />
                  </div>
                </div>
                {ex.caption && <p className={styles.caption}>{ex.caption}</p>}
              </div>
            ))}
          </div>
        )}

        {lesson.keyPoints.length > 0 && (
          <div className={styles.keyPoints}>
            <h3 className={styles.keyPointsTitle}>Key points</h3>
            <ul>
              {lesson.keyPoints.map((pt, i) => (
                <li key={i} dangerouslySetInnerHTML={{ __html: renderInline(pt) }} />
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className={styles.footer}>
        <button className={styles.challengeBtn} onClick={onStartChallenge}>
          Start Challenge →
        </button>
      </div>
    </div>
  );
}
