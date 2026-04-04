import notificationEmpty from "@assets/images/notificationEmpty.svg";
import styles from "./NotificationsEmptyState.module.scss";

const NotificationsEmptyState = () => {
  return (
    <div className={styles.container}>
      <p className={styles.message}>
        Lol, naše notifikacije suve ka tvoji DMs. Više sriće drugi put!
      </p>
      <img src={notificationEmpty} alt="no notifications" />
    </div>
  );
};

export default NotificationsEmptyState;
