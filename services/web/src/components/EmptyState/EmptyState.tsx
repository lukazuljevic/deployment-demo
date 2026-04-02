import styles from "./EmptyState.module.scss";

interface EmptyStateProps {
  message: string;
}

const EmptyState = ({ message }: EmptyStateProps) => {
  return (
    <div className={styles.wrapper}>
      <p className={styles.message}>{message}</p>
    </div>
  );
};

export default EmptyState;
