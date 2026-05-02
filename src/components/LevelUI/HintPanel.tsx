import { useState } from "react";
import type { Level } from "../../types";
import { useGameStore } from "../../store/useGameStore";
import styles from "./HintPanel.module.css";

interface Props {
  level: Level;
}

const STAR_COST = ["3→2 stars", "2→1 star", "1 star max"];

export function HintPanel({ level }: Props) {
  const [open, setOpen] = useState(false);
  const hintsRevealed = useGameStore((s) => s.hintsRevealedForLevel[level.id] ?? 0);
  const useHint = useGameStore((s) => s.useHint);
  const revealSolution = useGameStore((s) => s.revealSolution);

  const handleHint = () => {
    if (hintsRevealed < 3) useHint(level.id);
  };

  return (
    <div className={styles.container}>
      <button className={styles.toggle} onClick={() => setOpen((o) => !o)}>
        💡 Hints {hintsRevealed > 0 && <span className={styles.badge}>{hintsRevealed}</span>}
      </button>

      {open && (
        <div className={styles.panel}>
          <h3 className={styles.title}>Hints</h3>
          <div className={styles.hints}>
            {level.hints.map((hint, i) => (
              <div key={i} className={`${styles.hint} ${i < hintsRevealed ? styles.revealed : styles.locked}`}>
                <span className={styles.number}>{i + 1}</span>
                <div className={styles.content}>
                  {i < hintsRevealed ? (
                    <p>{hint}</p>
                  ) : (
                    <button
                      className={styles.revealBtn}
                      onClick={handleHint}
                      disabled={hintsRevealed !== i}
                    >
                      Reveal hint {i + 1} <span className={styles.cost}>({STAR_COST[i]})</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {hintsRevealed < 3 ? null : (
            <button
              className={styles.solutionBtn}
              onClick={() => revealSolution(level.id)}
            >
              Show solution (0 stars)
            </button>
          )}
        </div>
      )}
    </div>
  );
}
