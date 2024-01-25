import "./ActionButton.css";
import { ButtonType } from "../../types/utilityTypes";
import { ReactNode } from "react";
import { IconType } from "react-icons";

interface buttonProps {
  text: string;
  icon?: string;
  // icon?: ReactNode;
  type: ButtonType;
  // fn: (value: boolean) => void | (() => void);
  fn: () => void;
}

export const ActionButton = ({ text, icon, type, fn }: buttonProps) => {
  return (
    <button className={`action-btn ${type}`} onClick={fn}>
      {icon && <img src={icon} alt="icon" />}
      {/* {icon} */}
      <span>{text}</span>
    </button>
  );
};
