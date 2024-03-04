import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { UserOptions } from "../userOptions/UserOptions";
import { useState } from "react";
import styles from "./Header.module.css";

export const Header = () => {
  const [showUserOptions, setShowUserOptions] = useState(false);

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
          <UserOptions />
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
