import { useEffect, useRef } from "react";
import { EditorView, basicSetup } from "codemirror";
import { keymap, placeholder as cmPlaceholder } from "@codemirror/view";
import { autocompletion, closeBrackets } from "@codemirror/autocomplete";
import styles from "./LaTeXEditor.module.css";

interface Props {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: () => void;
  fontSize?: number;
  placeholder?: string;
}

const latexTheme = EditorView.theme({
  "&": { height: "100%", backgroundColor: "#1e1e2e", color: "#cdd6f4" },
  ".cm-scroller": {
    overflow: "auto",
    fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace",
    color: "#cdd6f4",
  },
  ".cm-content": {
    padding: "0.75rem 1rem",
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
    caretColor: "#89b4fa",
    color: "#cdd6f4",
  },
  ".cm-line": { color: "#cdd6f4" },
  "&.cm-focused": { outline: "none" },
  ".cm-gutters": {
    backgroundColor: "#181825",
    color: "#45475a",
    borderRight: "1px solid #313244",
  },
  ".cm-activeLineGutter": { backgroundColor: "#1e1e2e" },
  ".cm-activeLine": { backgroundColor: "rgba(137,180,250,0.06)" },
  ".cm-selectionBackground, ::selection": { backgroundColor: "rgba(137,180,250,0.25) !important" },
  ".cm-cursor": { borderLeftColor: "#89b4fa" },
  ".cm-placeholder": { color: "#45475a", fontStyle: "italic" },
  ".cm-matchingBracket": { color: "#a6e3a1", fontWeight: "bold" },
}, { dark: true });

export function LaTeXEditor({ value, onChange, onSubmit, fontSize = 14, placeholder }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);
  const onChangeRef = useRef(onChange);
  const onSubmitRef = useRef(onSubmit);

  useEffect(() => { onChangeRef.current = onChange; }, [onChange]);
  useEffect(() => { onSubmitRef.current = onSubmit; }, [onSubmit]);

  useEffect(() => {
    if (!containerRef.current) return;

    const extensions = [
      basicSetup,
      closeBrackets(),
      autocompletion(),
      latexTheme,
      EditorView.theme({
        ".cm-content": { fontSize: `${fontSize}px`, lineHeight: "1.65" },
      }),
      keymap.of([{
        key: "Ctrl-Enter",
        run: () => { onSubmitRef.current?.(); return true; },
      }]),
      EditorView.updateListener.of((update) => {
        if (update.docChanged) {
          onChangeRef.current(update.state.doc.toString());
        }
      }),
      EditorView.contentAttributes.of({ "aria-label": "LaTeX editor" }),
    ];

    // Use CodeMirror's own placeholder — correctly positioned inside the content area
    if (placeholder) {
      extensions.push(cmPlaceholder(placeholder));
    }

    const view = new EditorView({
      doc: value,
      extensions,
      parent: containerRef.current,
    });

    viewRef.current = view;
    return () => view.destroy();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Sync external value changes (reset)
  useEffect(() => {
    const view = viewRef.current;
    if (!view) return;
    const current = view.state.doc.toString();
    if (current !== value) {
      view.dispatch({
        changes: { from: 0, to: current.length, insert: value },
        scrollIntoView: true,
      });
    }
  }, [value]);

  return <div className={styles.wrapper} ref={containerRef} />;
}
