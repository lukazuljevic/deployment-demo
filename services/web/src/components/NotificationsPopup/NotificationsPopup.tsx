import notification from "@assets/images/notification.svg";
import popupExit from "@assets/images/popup_exit.svg";
import NotificationsEmptyState from "@components/NotificationsEmptyState";
import useNotifications from "@hooks/useNotifications";
import { useState } from "react";
import styles from "./NotificationsPopup.module.scss";

const NotificationsPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { notifications, clearNotifications } = useNotifications();

  return (
    <div className={styles.buttonWrapper}>
      <button onClick={() => setIsOpen(!isOpen)} className={styles.openButton}>
        <img src={notification} alt="notifications" />
      </button>

      {isOpen && (
        <div className={styles.popup}>
          <div className={styles.popupUpper}>
            <h1>Notifications</h1>
            <button
              onClick={() => setIsOpen(false)}
              className={styles.exitButton}
            >
              <img src={popupExit} alt="exit" className={styles.exitButton} />
            </button>
          </div>

          <div className={styles.popupContent}>
            {notifications.length === 0 ? (
              <NotificationsEmptyState />
            ) : (
              <div className={styles.notificationsContainer}>
                {notifications.map((n) => (
                  <li key={n.id} className={styles.notificationItem}>
                    <span className={styles.message}>{n.message}</span>
                    <span className={styles.timestamp}>
                      {new Date(n.timestamp).toLocaleString()}
                    </span>
                  </li>
                ))}
              </div>
            )}
          </div>

          {notifications.length > 0 && (
            <button onClick={clearNotifications} className={styles.clearButton}>
              Clear All
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationsPopup;
