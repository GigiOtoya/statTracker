import { SignUp } from "@clerk/clerk-react";
import styles from "../signIn/SignIn.module.css";

export const SignUpComponent = () => {
  return (
    <SignUp
      signInUrl="/SignIn"
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
