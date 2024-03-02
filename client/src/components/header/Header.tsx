import { SignedIn, SignedOut, useUser, useAuth } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { ActionButton } from "../actionButton/ActionButton";
import { BiSolidUserDetail } from "react-icons/bi";
import { UserOptions } from "../userOptions/UserOptions";
import { useState } from "react";
import styles from "./Header.module.css";

export const Header = () => {
  const [showUserOptions, setShowUserOptions] = useState(false);
  const { user } = useUser();

  if (!user) {
    return null;
  }

  const email = user.emailAddresses[0].emailAddress;

  const handleOnClick = () => {
    setShowUserOptions(!showUserOptions);
  };

  return (
    <div className={styles.bar}>
      <header className={styles.header}>
        <div className={styles.title}>
          <Link to="/">Squad Builder</Link>
        </div>
        <SignedIn>
          <ActionButton
            text={email ?? "user"}
            className="btn-clear large"
            icon={<BiSolidUserDetail fontSize={"24px"} />}
            onClick={handleOnClick}
          />
          {showUserOptions && <UserOptions user={user}>1</UserOptions>}
        </SignedIn>
        <SignedOut>
          <div className={styles.action}>
            <Link to="/SignIn">Sign In</Link>
            <Link to="/SignUp">Sign Up</Link>
          </div>
        </SignedOut>
      </header>
    </div>
  );
};
