import { ReactNode, useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";
import "./DropDown.css";

type DropDownProps = {
  items: string[];
  selected?: string;
  placeHolder?: String;
  children?: ReactNode;
  switchItem: (id: number) => void;
};

export const DropDown = ({ items, selected, placeHolder, switchItem, children }: DropDownProps) => {
  const [visible, setVisible] = useState<boolean>(false);

  const handleOnClick = () => {
    setVisible(!visible);
  };

  const handleSelect = (index: number) => {
    switchItem(index);
    setVisible(!visible);
  };

  return (
    <div className="dropdown-container">
      <div className="dropdown-header">
        <span className="dropdown-header-arrow" onClick={handleOnClick}>
          {visible ? (
            <MdKeyboardArrowDown size={50} fill="white" />
          ) : (
            <MdKeyboardArrowRight size={50} fill="white" />
          )}
        </span>
        <div className="dropdown-header-focal">
          <div className="dropdown-header-focal-item">{selected ?? placeHolder}</div>
          <div className="dropdown-header-focal-item">{children}</div>
        </div>
      </div>
      {visible && (
        <div className="dropdown-content">
          <ul className="dropdown-list">
            {items.map((item, index) => (
              <li key={index} className="dropdown-item" onClick={() => handleSelect(index)}>
                {" "}
                {item}{" "}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
