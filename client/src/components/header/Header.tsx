import { SignOutButton, SignedIn, SignedOut, useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import { DropDown } from "../dropdown/DropDown";

export const Header = () => {
  const { user } = useUser();

  return (
    <div className={styles.bar}>
      <header className={styles.header}>
        <div className={styles.title}>
          <Link to="/">Squad Builder</Link>
        </div>
        <SignedIn>
          <div className={styles.action}>
            <div> {user?.emailAddresses[0].emailAddress}</div>
            <SignOutButton>
              <Link to="/">Sign Out</Link>
            </SignOutButton>
          </div>
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
