import { ReactNode, useRef, useState } from "react";
import { useDetectOutside } from "../../hooks/useDetectOutside";
import styles from "./UserOptions.module.css";
import { FaUserCircle } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { SignOutButton, useUser } from "@clerk/clerk-react";
import {} from "@clerk/clerk-react";
import { Link } from "react-router-dom";

interface Props {
  children: ReactNode;
  user: NonNullable<ReturnType<typeof useUser>["user"]>;
}

export const UserOptions = ({ children, user }: Props) => {
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

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <span>
          <FaUserCircle size={50} />
        </span>
        <span>
          <p>{user.fullName}</p>
          <p>{user.emailAddresses[0].emailAddress}</p>
        </span>
      </div>
      <div className={styles.row}>
        <span>Profile</span>
      </div>
      <div className={styles.row}>
        <span>
          <FiLogOut size={24} />
        </span>
        <span>
          <SignOutButton>
            <Link to="/">Sign Out</Link>
          </SignOutButton>
        </span>
      </div>
    </div>
  );
};
