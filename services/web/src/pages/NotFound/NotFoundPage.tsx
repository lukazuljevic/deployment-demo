import useGoHome from "@hooks/useGoHome";
import { FaTimes } from "react-icons/fa";
import styles from "./NotFoundPage.module.scss";

const NotFoundPage = () => {
  const goHome = useGoHome();

  return (
    <div className={styles.container}>
      <button className={styles.closeButton} onClick={goHome}>
        <FaTimes size={32} />
      </button>
      <h1 className={styles.errorCode}>404</h1>
      <p className={styles.message}>
        Oops! The page you’re looking for doesn’t exist.
      </p>
    </div>
  );
};

export default NotFoundPage;
