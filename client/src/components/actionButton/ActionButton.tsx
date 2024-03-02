import { ButtonHTMLAttributes, ReactNode } from "react";
import { ButtonType } from "../../types/utilityTypes";
import classNames from "classnames";
import styles from "./ActionButton.module.css";

interface buttonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  icon?: string | ReactNode;
  className: ButtonType;
}

export const ActionButton = ({ text, icon, className, ...props }: buttonProps) => {
  const displayIcon = typeof icon === "string" ? <img src={icon} alt="icon" /> : icon;
  const classes = classNames(styles.btn, ...className.split(" ").map((s) => styles[s]));

  return (
    <button className={classes} {...props}>
      <span className={styles.icon}>{displayIcon}</span>
      <span>{text}</span>
    </button>
  );
};
