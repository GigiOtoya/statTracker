import { SignInButton, SignOutButton, SignUpButton, SignedIn, SignedOut } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { ActionButton } from "./actionButton/ActionButton";

export const Header = () => {
  return (
    <header className="header">
      <div className="page-title">
        <Link to="/">Squad Builder</Link>
      </div>
      <SignedIn>
        <div className="header-actions">
          <SignOutButton>
            <ActionButton text="Sign Out" className="btn-clear large" onClick={() => {}} />
          </SignOutButton>
        </div>
      </SignedIn>
      <SignedOut>
        <div className="header-actions">
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
  );
};
