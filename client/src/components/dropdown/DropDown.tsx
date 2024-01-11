import { ReactNode, useState } from "react";
import arrow from "../../assets/arrow-down.svg";
import { DropdownItem } from "../../types/teamTypes";
import "./DropDown.css";

type DropDownProps = {
  items: DropdownItem[];
  placeHolder?: String;
  children?: ReactNode;
  switchItem: (id: number) => void;
};

export const DropDown = ({ items, placeHolder, switchItem, children }: DropDownProps) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [selected, setSelected] = useState<DropdownItem>();

  const handleOnClick = () => {
    setVisible(!visible);
  };

  const handleSelect = (item: DropdownItem) => {
    setSelected(item);
    switchItem(item.id);
    setVisible(!visible);
  };

  return (
    <div className="dropdown-container">
      <div className="dropdown-header">
        <span className="dropdown-header-arrow" onClick={handleOnClick}>
          <img src={arrow} alt="arrow" width={20} />
        </span>
        <div className="dropdown-header-focal">
          <div className="dropdown-header-focal-item">{selected?.name ?? placeHolder}</div>
          <div className="dropdown-header-focal-item">{children}</div>
        </div>
      </div>
      {visible && (
        <div className="dropdown-content">
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
