import { useState } from "react";
import navLeft from "../../assets/navigate_left.svg";
import navRight from "../../assets/navigate_right.svg";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { positionList, Positions } from "../../types/positions";

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
    <div className="horizontal-select-container">
      <label>{label}:</label>
      <div className="horizontal-select">
        <div className="shift" onClick={handleOnClickLeft}>
          <img src={navLeft} alt="<" />
          {/* <MdKeyboardArrowLeft style={{ fill: "white" }} size={20} /> */}
        </div>
        <div className="not-selected">{positionList[getLeftIndex(index)]}</div>
        <div className="selected">{value ? value : "_"}</div>
        <div className="not-selected">{positionList[getRightIndex(index)]}</div>
        <div className="shift" onClick={handleOnClickRight}>
          <img src={navRight} alt=">" />
          {/* <MdKeyboardArrowRight /> */}
        </div>
      </div>
    </div>
  );
};
