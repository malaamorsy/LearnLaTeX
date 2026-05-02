import { useState } from "react";
import { Link } from "react-router-dom";
import { WORLDS } from "../data/worlds";
import { useGameStore } from "../store/useGameStore";
import { MobiusLogo } from "../components/shared/MobiusLogo";
import styles from "./WorldMap.module.css";

export function WorldMap() {
  const unlockedWorlds = useGameStore((s) => s.unlockedWorlds);
  const levelProgress = useGameStore((s) => s.levelProgress);
  const resetAllProgress = useGameStore((s) => s.resetAllProgress);
  const [confirmReset, setConfirmReset] = useState(false);

  const totalStars = Object.values(levelProgress).reduce((sum, p) => sum + p.stars, 0);
  const completedLevels = Object.values(levelProgress).filter(p => p.completed).length;
  const totalLevels = WORLDS.flatMap(w => w.levels).length;

  function getWorldProgress(worldId: number) {
    const world = WORLDS.find((w) => w.id === worldId);
    if (!world) return { completed: 0, total: 0, stars: 0 };
    const total = world.levels.length;
    const completed = world.levels.filter((l) => levelProgress[l.id]?.completed).length;
    const stars = world.levels.reduce((sum, l) => sum + (levelProgress[l.id]?.stars ?? 0), 0);
    return { completed, total, stars };
  }

  function getFirstUncompletedLevel(worldId: number) {
    const world = WORLDS.find((w) => w.id === worldId);
    if (!world) return null;
    return world.levels.find((l) => !levelProgress[l.id]?.completed) ?? world.levels[0];
  }

  function handleReset() {
    if (confirmReset) {
      resetAllProgress();
      setConfirmReset(false);
    } else {
      setConfirmReset(true);
      setTimeout(() => setConfirmReset(false), 4000);
    }
  }

  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <MobiusLogo size={30} color="var(--color-accent)" />
          <span className={styles.logoText}>LearnLaTeX</span>
        </div>
        <div className={styles.headerRight}>
          <div className={styles.globalStats}>
            <span>⭐ {totalStars} stars</span>
            <span className={styles.statDivider}>·</span>
            <span>{completedLevels}/{totalLevels} levels</span>
          </div>
          <Link to="/sandbox" className={styles.navBtn}>Sandbox</Link>
          <Link to="/reference" className={styles.navBtn}>Reference</Link>
          <button
            className={`${styles.resetBtn} ${confirmReset ? styles.resetBtnConfirm : ""}`}
            onClick={handleReset}
            title="Reset all progress"
          >
            {confirmReset ? "⚠️ Click again to confirm" : "↺ Reset Progress"}
          </button>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.hero}>
          <h1>Learn LaTeX by doing it.</h1>
          <p>12 worlds · {totalLevels} levels · documents, math, presentations, CVs, and more.</p>
        </div>

        <div className={styles.grid}>
          {WORLDS.map((world) => {
            const unlocked = unlockedWorlds.includes(world.id);
            const progress = getWorldProgress(world.id);
            const pct = progress.total > 0 ? Math.round((progress.completed / progress.total) * 100) : 0;
            const firstLevel = getFirstUncompletedLevel(world.id);
            const allDone = progress.completed === progress.total && progress.total > 0;

            return (
              <div
                key={world.id}
                className={`${styles.card} ${!unlocked ? styles.locked : ""} ${allDone ? styles.cardDone : ""}`}
              >
                <div className={styles.cardHeader}>
                  <div className={styles.cardMeta}>
                    <span className={styles.worldNum}>World {world.id}</span>
                    {allDone && <span className={styles.doneBadge}>✓ Done</span>}
                  </div>
                  <div className={styles.iconRow}>
                    <span className={styles.icon}>{world.icon}</span>
                    <div>
                      <div className={styles.cardTitle}>{world.title}</div>
                      <div className={styles.cardDesc}>{world.description}</div>
                    </div>
                  </div>
                </div>

                {unlocked ? (
                  <>
                    <div className={styles.progressRow}>
                      <div className={styles.progressBar}>
                        <div className={styles.progressFill} style={{ width: `${pct}%` }} />
                      </div>
                      <span className={styles.progressLabel}>
                        {progress.completed}/{progress.total}
                        {progress.stars > 0 && ` · ⭐${progress.stars}`}
                      </span>
                    </div>

                    <div className={styles.levels}>
                      {world.levels.map((level) => {
                        const lp = levelProgress[level.id];
                        return (
                          <Link
                            key={level.id}
                            to={`/level/${level.id}`}
                            className={`${styles.levelDot} ${lp?.completed ? styles.levelDone : ""} ${level.isBoss ? styles.levelBoss : ""}`}
                            title={`${level.id}: ${level.title}${lp?.completed ? ` (★${lp.stars}/3)` : ""}`}
                          >
                            {level.isBoss ? "B" : level.id.split(".")[1]}
                          </Link>
                        );
                      })}
                    </div>

                    {firstLevel && (
                      <Link to={`/level/${firstLevel.id}`} className={styles.playBtn}>
                        {progress.completed === 0 ? "Start World" : allDone ? "Review" : "Continue"} →
                      </Link>
                    )}
                  </>
                ) : (
                  <div className={styles.lockedMsg}>
                    🔒 Complete World {world.unlockCondition} to unlock
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>

      <footer className={styles.footer}>
        <span>Developed by <a href="mailto:muhammed.alaa@aucegypt.edu">Muhammed Alaa ElDin</a></span>
        <span className={styles.footerDivider}>·</span>
        <span>Open source · No account required · Progress saved locally</span>
      </footer>
    </div>
  );
}
