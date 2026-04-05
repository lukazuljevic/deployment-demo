import error from "@assets/images/error.svg";
import useGoHome from "@hooks/useGoHome";
import { createPortal } from "react-dom";
import { FaTimes } from "react-icons/fa";
import styles from "./ErrorPage.module.scss";

const ErrorPage = () => {
  const goHome = useGoHome();

  const content = (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <div className={styles.innerContainer}>
          <button className={styles.closeButton} onClick={goHome}>
            <FaTimes size={32} />
          </button>
          <img src={error} alt="Error Icon" className={styles.errorIcon} />
          <p className={styles.message}>An error occurred.</p>
        </div>
      </div>
    </div>
  );

  return createPortal(content, document.getElementById("root")!);
};

export default ErrorPage;
