import { SignOutButton, SignedIn, SignedOut } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { ActionButton } from "../actionButton/ActionButton";
import styles from "./Header.module.css";

export const Header = () => {
  return (
    <div className={styles.bar}>
      <header className={styles.header}>
        <div className={styles.title}>
          <Link to="/">Squad Builder</Link>
        </div>
        <SignedIn>
          <div className={styles.action}>
            <SignOutButton>
              <ActionButton text="Sign Out" className="btn-clear large" onClick={() => {}} />
            </SignOutButton>
          </div>
        </SignedIn>
        <SignedOut>
          <div className={styles.action}>
            <Link to="/SignIn">Sign In</Link>
            <Link to="/SignUp">Sign Up</Link>
            {/* <SignInButton>
            <ActionButton text="Sign In" className="btn-clear large" onClick={() => {}} />
          </SignInButton>
          <SignUpButton>
            <ActionButton text="Sign Up" className="btn-clear large" onClick={() => {}} />
          </SignUpButton> */}
          </div>
        </SignedOut>
      </header>
    </div>
  );
};
