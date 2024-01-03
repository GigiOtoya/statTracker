import { useState } from "react";
import navLeft from "../../assets/navigate_left.svg";
import navRight from "../../assets/navigate_right.svg";
import { positionList, Positions } from "../../types/positions";

interface SelectProps {
  label: string;
  name: string;
  value?: Positions;
  updatePlayer: (name: string, value: string) => void;
}

export const HorizontalSelect = ({ label, name, value, updatePlayer }: SelectProps) => {
  const [index, setIndex] = useState(value ? positionList.indexOf(value) : 0);

  const handleOnClickLeft = () => {
    const newIndex = getLeftIndex(index);
    setIndex(newIndex);
    updatePlayer(name, positionList[newIndex]);
  };

  const handleOnClickRight = () => {
    const newIndex = getRightIndex(index);
    setIndex(newIndex);
    updatePlayer(name, positionList[newIndex]);
  };

  const getLeftIndex = (index: number) => {
    return (index - 1 + positionList.length) % positionList.length;
  };

  const getRightIndex = (index: number) => {
    return (index + 1) % positionList.length;
  };

  return (
    <div className="horizontal-select-container">
      <label>{label}:</label>
      <span className="horizontal-select">
        <span className="shift" onClick={handleOnClickLeft}>
          <img src={navLeft} alt="<" />
        </span>
        <span className="not-selected">{positionList[getLeftIndex(index)]}</span>
        <span className="selected">{value ? value : "_"}</span>
        <span className="not-selected">{positionList[getRightIndex(index)]}</span>
        <span className="shift" onClick={handleOnClickRight}>
          <img src={navRight} alt=">" />
        </span>
      </span>
    </div>
  );
};
