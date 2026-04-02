import error from "@assets/images/error.svg";
import useGoHome from "@hooks/useGoHome";
import { FaTimes } from "react-icons/fa";
import styles from "./ErrorPage.module.scss";

const ErrorPage = () => {
  const goHome = useGoHome();

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <button className={styles.closeButton} onClick={goHome}>
          <FaTimes size={32} />
        </button>
        <img src={error} alt="Error Icon" className={styles.errorIcon}></img>
        <p className={styles.message}>An error occured.</p>
      </div>
    </div>
  );
};

export default ErrorPage;
