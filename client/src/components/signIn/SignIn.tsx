import { SignIn } from "@clerk/clerk-react";
import styles from "./SignIn.module.css";

export const SignInComponent = () => {
  return (
    <SignIn
      appearance={{
        variables: {
          colorPrimary: "#1A6F05",
        },
        elements: {
          rootBox: styles.rootBox,
        },
      }}
    />
  );
};
