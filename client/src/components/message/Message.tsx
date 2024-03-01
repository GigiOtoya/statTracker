import styles from "./Message.module.css";

interface MessageProps {
  text: string;
}

export const Message = ({ text }: MessageProps) => {
  return (
    <div className={styles.container}>
      <p className={styles.message}>{text}</p>
    </div>
  );
};
