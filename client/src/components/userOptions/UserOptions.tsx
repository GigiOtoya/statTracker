import { useRef, useState } from "react";
import { useDetectOutside } from "../../hooks/useDetectOutside";
import { SignOutButton, useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { ActionButton } from "../actionButton/ActionButton";
import { FiLogOut } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { BiSolidUserDetail } from "react-icons/bi";
import styles from "./UserOptions.module.css";

export const UserOptions = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { user, isSignedIn } = useUser();
  const [showOptions, setShowOptions] = useState<boolean>(false);

  useDetectOutside({
    ref: ref,
    onClick() {
      handleClickOutisde();
    },
  });

  if (!isSignedIn) {
    return null;
  }

  const handleOnClick = () => {
    setShowOptions(!showOptions);
  };

  const handleClickOutisde = () => {
    setShowOptions(false);
  };

  return (
    <div ref={ref}>
      <ActionButton
        text={user.emailAddresses[0].emailAddress}
        className="btn-clear large"
        icon={<BiSolidUserDetail fontSize={"24px"} />}
        onClick={handleOnClick}
      />

      {showOptions && (
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
            <SignOutButton>
              <Link to="/">
                <span>
                  <span>
                    <FiLogOut size={24} />
                  </span>
                  <span>Sign Out</span>
                </span>
              </Link>
            </SignOutButton>
          </div>
        </div>
      )}
    </div>
  );
};
