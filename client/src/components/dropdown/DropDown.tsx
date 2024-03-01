import { ReactNode, useRef, useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";
import styles from "./DropDown.module.css";
import { useDetectOutside } from "../../hooks/useDetectOutside";

type DropDownProps = {
  items: string[];
  selected?: string;
  placeHolder?: String;
  children?: ReactNode;
  switchItem: (id: number) => void;
};

export const DropDown = ({ items, selected, placeHolder, switchItem, children }: DropDownProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState<boolean>(false);

  const handleOnClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setVisible(!visible);
    console.log("clicked");
  };

  const handleClickOutisde = () => {
    setVisible(false);
  };

  useDetectOutside({
    ref: ref,
    onClick() {
      handleClickOutisde();
    },
  });

  const handleSelect = (index: number) => {
    switchItem(index);
    setVisible(!visible);
  };

  return (
    <div ref={ref} className={styles.container}>
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
