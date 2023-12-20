import { useState } from "react";
import navLeft from "../../assets/navigate_left.svg";
import navRight from "../../assets/navigate_right.svg";
import { positions } from "../../types/types";

interface SelectProps {
  label: string;
  name: string;
  value?: string;
  updatePlayer: (name: string, value: string) => void;
}

export const HorizontalSelect = ({ label, name, value, updatePlayer }: SelectProps) => {
  const pos = Object.keys(positions);
  const [index, setIndex] = useState(value ? pos.indexOf(value) : 0);

  const handleOnClickLeft = () => {
    // setIndex((currIndex) => getLeftIndex(currIndex));
    const newIndex = getLeftIndex(index);
    setIndex(newIndex);
    updatePlayer(name, pos[newIndex]);
  };

  const handleOnClickRight = () => {
    const newIndex = getRightIndex(index);
    setIndex(newIndex);
    updatePlayer(name, pos[newIndex]);
  };

  const getLeftIndex = (index: number) => {
    return (index - 1 + pos.length) % pos.length;
  };

  const getRightIndex = (index: number) => {
    return (index + 1) % pos.length;
  };

  return (
    <div className="horizontal-select-container">
      <label>{label}:</label>
      <span className="horizontal-select">
        <span className="shift" onClick={handleOnClickLeft}>
          <img src={navLeft} alt="<" />
        </span>
        <span className="not-selected">{pos[getLeftIndex(index)]}</span>
        <span className="selected">{value === "" ? "_" : value}</span>
        <span className="not-selected">{pos[getRightIndex(index)]}</span>
        <span className="shift" onClick={handleOnClickRight}>
          <img src={navRight} alt=">" />
        </span>
      </span>
    </div>
  );
};
