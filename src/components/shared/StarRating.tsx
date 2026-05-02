import styles from "./StarRating.module.css";

interface Props {
  stars: number;
  max?: number;
  size?: "sm" | "md" | "lg";
}

export function StarRating({ stars, max = 3, size = "md" }: Props) {
  return (
    <div className={`${styles.stars} ${styles[size]}`} aria-label={`${stars} of ${max} stars`}>
      {Array.from({ length: max }, (_, i) => (
        <span key={i} className={i < stars ? styles.filled : styles.empty}>
          ★
        </span>
      ))}
    </div>
  );
}
