import { useState } from "react";
import arrow from "../assets/arrow-down.svg";
import { Item } from "../types/types";

type DropDownProps = {
  items: Item[];
  placeHolder?: String;
  switchItem: (id: number) => void;
};

export const DropDown = ({ items, placeHolder, switchItem }: DropDownProps) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [selected, setSelected] = useState<Item>();

  const handleOnClick = () => {
    setVisible(!visible);
  };

  const handleSelect = (item: Item) => {
    setSelected(item);
    switchItem(item.id);
    setVisible(!visible);
  };

  return (
    <div className="dropdown-container">
      <div className="dropdown-main">
        <span className="dropdown-btn" onClick={handleOnClick}>
          <img src={arrow} alt="arrow" width={20} />
        </span>
        <span className="dropdown-selection">{selected?.name ?? placeHolder}</span>
      </div>
      {visible && (
        <div className="dropdown-contents">
          <ul className="dropdown-list">
            {items.map((item) => (
              <li key={item.id} className="dropdown-item" onClick={() => handleSelect(item)}>
                {" "}
                {item.name}{" "}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
