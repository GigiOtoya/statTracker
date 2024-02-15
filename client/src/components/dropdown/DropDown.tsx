import { ReactNode, useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";
import styles from "./DropDown.module.css";

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
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.arrow} onClick={handleOnClick}>
          {visible ? (
            <MdKeyboardArrowDown size={50} fill="white" />
          ) : (
            <MdKeyboardArrowRight size={50} fill="white" />
          )}
        </span>
        <div className={styles.focal}>
          <div>{selected ?? placeHolder}</div>
          <div>{children}</div>
        </div>
      </div>
      {visible && (
        <div className={styles.content}>
          <ul>
            {items.map((item, index) => (
              <li key={index} onClick={() => handleSelect(index)}>
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
