import styles from "./MatchStatus.module.css";

interface Props {
  quality: number; // 0 to 1
  isMatch: boolean;
  hasInput: boolean;
}

export function MatchStatus({ quality, isMatch, hasInput }: Props) {
  if (!hasInput) return null;

  if (isMatch) {
    return (
      <div className={`${styles.badge} ${styles.match}`}>
        ✓ Perfect match!
      </div>
    );
  }

  if (quality > 0.6) {
    return (
      <div className={`${styles.badge} ${styles.close}`}>
        ~ Getting closer…
      </div>
    );
  }

  return (
    <div className={`${styles.badge} ${styles.far}`}>
      Keep going…
    </div>
  );
}
