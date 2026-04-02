import error from "@assets/images/error.svg";
import styles from "./FetchError.module.scss";

interface FetchErrorProps {
  message: string;
  onRetry?: () => void;
}

const FetchError = ({ message, onRetry }: FetchErrorProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <img src={error} alt="Error Icon" className={styles.errorIcon}></img>
        <p className={styles.message}>{message}</p>
        {onRetry && (
          <button className={styles.retryButton} onClick={onRetry}>
            Retry
          </button>
        )}
      </div>
    </div>
  );
};

export default FetchError;
