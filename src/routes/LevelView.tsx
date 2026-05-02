import { useState, useCallback, useEffect, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getLevelById, getNextLevel, WORLDS } from "../data/worlds";
import { useGameStore } from "../store/useGameStore";
import { validateLevel } from "../utils/validation";
import { LaTeXEditor } from "../components/Editor/LaTeXEditor";
import { KaTeXPreview } from "../components/Preview/KaTeXPreview";
import { DocumentPreview } from "../components/Preview/DocumentPreview";
import { MatchStatus } from "../components/Preview/MatchStatus";
import { HintPanel } from "../components/LevelUI/HintPanel";
import { LessonPanel } from "../components/LevelUI/LessonPanel";
import { StarRating } from "../components/shared/StarRating";
import { LevelComplete } from "../components/Modals/LevelComplete";
import styles from "./LevelView.module.css";

type Tab = "lesson" | "challenge";

const DEFAULT_WRAP_PREAMBLE = `\\documentclass{article}
\\usepackage{amsmath,amssymb,amsthm}
\\usepackage{graphicx,geometry,hyperref,enumitem,booktabs,xcolor}
\\geometry{margin=2.5cm}`;

export function wrapDocument(content: string, preamble?: string): string {
  const pre = preamble ?? DEFAULT_WRAP_PREAMBLE;
  return `${pre}\n\\begin{document}\n${content}\n\\end{document}`;
}

function Preview({ latex, renderMode, empty }: { latex: string; renderMode?: string; empty?: string }) {
  if (renderMode === "document" || renderMode === "document-validate") {
    return <DocumentPreview latex={latex} emptyMessage={empty} />;
  }
  return (
    <div className={styles.katexInner}>
      <KaTeXPreview latex={latex} />
    </div>
  );
}

export function LevelView() {
  const { levelId } = useParams<{ levelId: string }>();
  const navigate = useNavigate();

  const found = levelId ? getLevelById(levelId) : null;
  const { level, world } = found ?? {};

  const hasLesson = !!level?.lesson;
  const [tab, setTab] = useState<Tab>(hasLesson ? "lesson" : "challenge");
  const [input, setInput] = useState("");
  const [showComplete, setShowComplete] = useState(false);
  const [startTime] = useState(Date.now);

  const hintsRevealed = useGameStore((s) => s.hintsRevealedForLevel[levelId ?? ""] ?? 0);
  const completeLevel = useGameStore((s) => s.completeLevel);
  const resetLevel = useGameStore((s) => s.resetLevel);
  const levelProgress = useGameStore((s) => s.levelProgress);
  const thisLevelProgress = levelProgress[levelId ?? ""];

  // Sidebar: levels in this world
  const worldLevels = world ? WORLDS.find(w => w.id === world.id)?.levels ?? [] : [];

  // When autoWrap is true, wrap for rendering but validate raw input
  const wrappedInput = useMemo(() => {
    if (!level?.autoWrap || !input.trim()) return input;
    return wrapDocument(input, level.wrapPreamble);
  }, [input, level]);

  const validation = useMemo(() => {
    if (!level || !input.trim()) return { isMatch: false, matchQuality: 0 };
    // Validate against the raw (unwrapped) input — patterns match content only
    return validateLevel(input, level);
  }, [input, level]);

  useEffect(() => {
    setInput("");
    setShowComplete(false);
    setTab(level?.lesson ? "lesson" : "challenge");
  }, [levelId, level]);

  const computeStars = useCallback(() => {
    if (hintsRevealed === 0) return 3;
    if (hintsRevealed === 1) return 2;
    return 1;
  }, [hintsRevealed]);

  const handleSubmit = useCallback(() => {
    if (!validation.isMatch || !level) return;
    const elapsed = Math.round((Date.now() - startTime) / 1000);
    const stars = computeStars();
    completeLevel(level.id, stars, elapsed);
    setShowComplete(true);
  }, [validation.isMatch, level, startTime, computeStars, completeLevel]);

  const handleNext = useCallback(() => {
    if (!level) return;
    const next = getNextLevel(level.id);
    setShowComplete(false);
    if (next) navigate(`/level/${next.id}`);
    else navigate("/");
  }, [level, navigate]);

  const handleReplay = useCallback(() => {
    if (!level) return;
    resetLevel(level.id);
    setInput("");
    setShowComplete(false);
  }, [level, resetLevel]);

  if (!level || !world) {
    return (
      <div className={styles.notFound}>
        <h2>Level not found</h2>
        <Link to="/">← Back to world map</Link>
      </div>
    );
  }

  const rm = level.renderMode ?? "katex";

  return (
    <div className={styles.root}>
      {/* ── Top bar ── */}
      <header className={styles.topbar}>
        <Link to="/" className={styles.breadcrumb}>← {world.title}</Link>

        <div className={styles.tabBar}>
          {hasLesson && (
            <button
              className={`${styles.tabBtn} ${tab === "lesson" ? styles.tabActive : ""}`}
              onClick={() => setTab("lesson")}
            >
              📖 Lesson
            </button>
          )}
          <button
            className={`${styles.tabBtn} ${tab === "challenge" ? styles.tabActive : ""}`}
            onClick={() => setTab("challenge")}
          >
            ✏️ Challenge
          </button>
        </div>

        <div className={styles.topRight}>
          <span className={styles.levelId}>
            {level.isBoss && <span className={styles.bossBadge}>BOSS</span>}
            {level.id}
          </span>
          {thisLevelProgress && <StarRating stars={thisLevelProgress.stars} size="sm" />}
          <HintPanel level={level} />
        </div>
      </header>

      {/* ── Lesson ── */}
      {tab === "lesson" && level.lesson && (
        <div className={styles.lessonWrap}>
          <LessonPanel lesson={level.lesson} onStartChallenge={() => setTab("challenge")} />
        </div>
      )}

      {/* ── Challenge ── */}
      {tab === "challenge" && (
        <div className={styles.challengeRoot}>

          {/* LEFT: Sidebar level list */}
          <aside className={styles.sidebar}>
            <div className={styles.sidebarTitle}>{world.title}</div>
            <nav className={styles.levelList}>
              {worldLevels.map(l => {
                const lp = levelProgress[l.id];
                const isActive = l.id === level.id;
                return (
                  <Link
                    key={l.id}
                    to={`/level/${l.id}`}
                    className={`${styles.levelItem} ${isActive ? styles.levelItemActive : ""} ${l.isBoss ? styles.levelItemBoss : ""}`}
                  >
                    <span className={styles.levelItemId}>{l.id}</span>
                    <span className={styles.levelItemTitle}>{l.title}</span>
                    {lp?.completed && (
                      <span className={styles.levelItemStars}>
                        {"★".repeat(lp.stars)}{"☆".repeat(3 - lp.stars)}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </aside>

          {/* CENTER: Editor */}
          <div className={styles.editorCol}>
            {/* Goal banner */}
            <div className={styles.goalBanner}>
              <span className={styles.goalLabel}>Goal</span>
              <span className={styles.goalText}>{level.goalText}</span>
              {level.autoWrap && (
                <span className={styles.autoWrapBadge} title="Just write the content — the document shell is added automatically">
                  auto-wrapped
                </span>
              )}
            </div>

            {/* Editor */}
            <div className={styles.editorArea}>
              <LaTeXEditor
                value={input}
                onChange={setInput}
                onSubmit={handleSubmit}
                fontSize={14}
                placeholder={
                  level.autoWrap
                    ? "% Write just the content here — document structure is added automatically\n\n"
                    : rm !== "katex"
                      ? "\\documentclass{article}\n\\begin{document}\n\n\\end{document}"
                      : "Type LaTeX here…"
                }
              />
            </div>

            {/* Bottom bar */}
            <div className={styles.bottomBar}>
              <button className={styles.resetBtn} onClick={handleReplay}>↺ Reset</button>
              <div className={styles.statusArea}>
                <MatchStatus
                  quality={validation.matchQuality}
                  isMatch={validation.isMatch}
                  hasInput={input.trim().length > 0}
                />
              </div>
              <button
                className={`${styles.submitBtn} ${validation.isMatch ? styles.submitReady : ""}`}
                disabled={!validation.isMatch}
                onClick={handleSubmit}
              >
                Submit ↵
              </button>
            </div>
          </div>

          {/* RIGHT: Target + Your output */}
          <div className={styles.previewCol}>
            <div className={styles.previewHalf}>
              <div className={styles.previewLabel}>
                <span className={styles.previewLabelDot} style={{ background: "#10b981" }} />
                Target output
              </div>
              <div className={styles.previewContent}>
                <Preview
                  latex={level.autoWrap ? wrapDocument(level.targetLatex, level.wrapPreamble) : level.targetLatex}
                  renderMode={rm}
                />
              </div>
            </div>

            <div className={styles.previewDivider} />

            <div className={styles.previewHalf}>
              <div className={styles.previewLabel}>
                <span
                  className={styles.previewLabelDot}
                  style={{ background: validation.isMatch ? "#10b981" : input.trim() ? "#f59e0b" : "#6b7280" }}
                />
                Your output
              </div>
              <div className={styles.previewContent}>
                <Preview
                  latex={wrappedInput}
                  renderMode={rm}
                  empty={level.autoWrap
                    ? "Start typing content — auto-wrapped in a document shell"
                    : rm !== "katex"
                      ? "Start typing — your rendered document appears here"
                      : "Start typing LaTeX…"}
                />
              </div>
            </div>
          </div>

        </div>
      )}

      {showComplete && (
        <LevelComplete
          level={level}
          stars={computeStars()}
          onNext={handleNext}
          onReplay={handleReplay}
        />
      )}
    </div>
  );
}
