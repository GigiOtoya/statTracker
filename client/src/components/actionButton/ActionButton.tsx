import "./ActionButton.css";
import { ButtonType } from "../../types/types";
interface buttonProps {
  text: string;
  icon: string;
  type: ButtonType;
  fn?: () => {};
}

export const ActionButton = ({ text, icon, type }: buttonProps) => {
  return (
    <button className={`action-btn ${type}`}>
      <img src={icon} alt="icon" />
      <span>{text}</span>
    </button>
  );
};
