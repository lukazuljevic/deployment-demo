import useGoHome from "@hooks/useGoHome";
import { FaTimes } from "react-icons/fa";
import styles from "./ForbiddenPage.module.scss";

const ForbiddenPage = () => {
  const goHome = useGoHome();

  return (
    <div className={styles.container}>
      <h1 className={styles.errorCode}>403</h1>
      <p className={styles.message}>
        You do not have permission to access this page.
      </p>
      <button className={styles.closeButton} onClick={goHome}>
        <FaTimes size={32} />
      </button>
    </div>
  );
};

export default ForbiddenPage;
