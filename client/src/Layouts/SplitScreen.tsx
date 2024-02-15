import styles from "./SplitScreen.module.css";

interface SplitScreenProps {
  children: React.ReactNode[];
}

export const SplitScreen = ({ children }: SplitScreenProps) => {
  const [left, right] = children;

  return (
    <div className={styles.container}>
      <div className={styles.left}>{left}</div>
      <div className={styles.right}>{right}</div>
    </div>
  );
};
