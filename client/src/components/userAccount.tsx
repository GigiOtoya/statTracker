import { UserProfile } from "@clerk/clerk-react";
import styles from "../components/signIn/SignIn.module.css";

export const UserAccount = () => {
  return (
    <UserProfile
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
