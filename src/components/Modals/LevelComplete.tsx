import { useEffect } from "react";
import type { Level } from "../../types";
import { StarRating } from "../shared/StarRating";
import { Confetti } from "../shared/Confetti";
import styles from "./LevelComplete.module.css";

interface Props {
  level: Level;
  stars: number;
  onNext: () => void;
  onReplay: () => void;
}

export function LevelComplete({ level, stars, onNext, onReplay }: Props) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Enter") onNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onNext]);

  return (
    <>
      {stars > 0 && <Confetti />}
      <div className={styles.overlay}>
        <div className={styles.modal}>
          <div className={styles.emoji}>{stars === 3 ? "🎉" : stars === 2 ? "✨" : "✓"}</div>
          <h2 className={styles.title}>Level Complete!</h2>
          <div className={styles.starsRow}>
            <StarRating stars={stars} size="lg" />
          </div>
          <p className={styles.concept}>{level.conceptExplanation}</p>

          {stars < 3 && (
            <button className={styles.replayBtn} onClick={onReplay}>
              Replay for 3 stars
            </button>
          )}

          <button className={styles.nextBtn} onClick={onNext}>
            Next Level →
          </button>
          <p className={styles.hint}>Press Enter to continue</p>
        </div>
      </div>
    </>
  );
}
