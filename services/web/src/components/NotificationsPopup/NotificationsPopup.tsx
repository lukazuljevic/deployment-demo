import notification from "@assets/images/notification.svg";
import notificationNotEmpty from "@assets/images/notificationNotEmpty.svg";
import popupExit from "@assets/images/popup_exit.svg";
import NotificationsEmptyState from "@components/NotificationsEmptyState";
import useNotifications from "@hooks/useNotifications";
import { useState } from "react";
import { createPortal } from "react-dom";
import styles from "./NotificationsPopup.module.scss";

const NotificationsPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { notifications, clearNotifications } = useNotifications();

  const popupContent = (
    <div className={styles.popup}>
      <div className={styles.popupUpper}>
        <h1>Notifications</h1>
        <button onClick={() => setIsOpen(false)} className={styles.exitButton}>
          <img src={popupExit} alt="exit" />
        </button>
      </div>

      <div className={styles.popupContent}>
        {notifications.length === 0 ? (
          <NotificationsEmptyState />
        ) : (
          <ul className={styles.notificationsContainer}>
            {notifications.map((n) => (
              <li key={n.id} className={styles.notificationItem}>
                <span className={styles.message}>{n.message}</span>
                <span className={styles.timestamp}>
                  {new Date(n.createdAt).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        )}
        {notifications.length > 0 && (
          <button onClick={clearNotifications} className={styles.clearButton}>
            Clear All
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className={styles.buttonWrapper}>
      <button onClick={() => setIsOpen(!isOpen)} className={styles.openButton}>
        {notifications.length === 0 ? (
          <img src={notification} alt="notifications" />
        ) : (
          <img src={notificationNotEmpty} alt="notifications" />
        )}
      </button>

      {isOpen && createPortal(popupContent, document.getElementById("root")!)}
    </div>
  );
};

export default NotificationsPopup;
