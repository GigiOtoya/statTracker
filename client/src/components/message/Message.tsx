import { InfoBoxMessage } from "../../types/utilityTypes";
import styles from "./Message.module.css";

interface MessageProps {
  message: InfoBoxMessage;
}

export const Message = ({ message }: MessageProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.message}>
        <div>{message.title}</div>
        <div>{message.body}</div>
      </div>
    </div>
  );
};
