import { Link } from "react-router-dom";
import styles from "./GetStarted.module.css";
import { SplitScreen } from "../../Layouts/SplitScreen";

export const GetStarted = () => {
  return (
    <SplitScreen>
      <>
        <div className={styles.background}>
          <div className={styles.welcome}>
            <div className={styles.button}>
              <Link to="/SignUp">Get Started</Link>
            </div>
            <div className={styles.footer}>
              <span>Have an account?</span>
              <Link to="/SignIn"> Sign In </Link>
            </div>
          </div>
        </div>
      </>
      <></>
    </SplitScreen>
  );
};
