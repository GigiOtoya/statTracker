import { ReactNode, useState } from "react";
import arrow from "../assets/arrow-down.svg";

type DropDownProps = {
  items: ReactNode[];
};

export const DropDown = ({ items }: DropDownProps) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [selected, setSelected] = useState<ReactNode>("dropdown selection");

  const handleOnClick = () => {
    setVisible(!visible);
  };

  const handleSelect = (item: ReactNode) => {
    setSelected(item);
    setVisible(!visible);
  };

  return (
    <div className="dropdown">
      <div className="dropdown-main">
        <span className="dropdown-selection"> {selected} </span>
        <span className="dropdown-btn" onClick={handleOnClick}>
          <img src={arrow} alt="arrow" width={20} />
        </span>
      </div>
      {visible && (
        <div className="dropdown-contents">
          <ul className="dropdown-list">
            {items.map((item) => (
              <li className="dropdown-item" onClick={() => handleSelect(item)}>
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
