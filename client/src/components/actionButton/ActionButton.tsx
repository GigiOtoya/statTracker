import "./ActionButton.css";
import { ButtonType } from "../../types/types";
interface buttonProps {
  text: string;
  icon?: string;
  type: ButtonType;
  fn: (value: boolean) => void;
}

export const ActionButton = ({ text, icon, type, fn }: buttonProps) => {
  return (
    <button className={`action-btn ${type}`} onClick={() => fn(true)}>
      {icon && <img src={icon} alt="icon" />}
      <span>{text}</span>
    </button>
  );
};
