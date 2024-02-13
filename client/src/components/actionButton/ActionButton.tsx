import "./ActionButton.css";
import { ButtonHTMLAttributes } from "react";
import { ButtonType } from "../../types/utilityTypes";

interface buttonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  icon?: string;
  className: ButtonType;
}

export const ActionButton = ({ text, icon, className, ...props }: buttonProps) => {
  return (
    <button className={`action-btn ${className}`} {...props}>
      {icon && <img src={icon} alt="icon" />}
      <span>{text}</span>
    </button>
  );
};
