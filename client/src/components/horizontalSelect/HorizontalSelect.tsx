import { useState } from "react";
import { positionList, Positions } from "../../types/positions";
import navLeft from "../../assets/navigate_left.svg";
import navRight from "../../assets/navigate_right.svg";
import styles from "./horizontalSelect.module.css";

interface SelectProps {
  label: string;
  name: string;
  value?: Positions;
  onChange: (name: string, value: string) => void;
}

export const HorizontalSelect = ({ label, name, value, onChange }: SelectProps) => {
  const [index, setIndex] = useState(value ? positionList.indexOf(value) : 0);

  const handleOnClickLeft = () => {
    const newIndex = getLeftIndex(index);
    setIndex(newIndex);
    onChange(name, positionList[newIndex]);
  };

  const handleOnClickRight = () => {
    const newIndex = getRightIndex(index);
    setIndex(newIndex);
    onChange(name, positionList[newIndex]);
  };

  const getLeftIndex = (index: number) => {
    return (index - 1 + positionList.length) % positionList.length;
  };

  const getRightIndex = (index: number) => {
    return (index + 1) % positionList.length;
  };

  return (
    <div className={styles.wrapper}>
      <label>{label}:</label>
      <div className={styles.container}>
        <span className={styles.shift} onClick={handleOnClickLeft}>
          <img src={navLeft} alt="<" />
        </span>
        <span className={styles.options}>
          <span className={styles.darken}>{positionList[getLeftIndex(index)]}</span>
          <span className={styles.highlight}>{value ? value : "_"}</span>
          <span className={styles.darken}>{positionList[getRightIndex(index)]}</span>
        </span>
        <span className={styles.shift} onClick={handleOnClickRight}>
          <img src={navRight} alt=">" />
        </span>
      </div>
    </div>
  );
};
