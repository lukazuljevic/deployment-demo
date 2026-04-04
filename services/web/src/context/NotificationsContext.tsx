import { useLocalStorage } from "@hooks/useLocalStorage";
import { type Notification } from "@tstypes/Notification";
import { createContext, type ReactNode } from "react";
import { v4 as uuidv4 } from "uuid";

interface NotificationsContextType {
  notifications: Notification[];
  addNotification: (message: string) => void;
  clearNotifications: () => void;
}

export const NotificationsContext = createContext<
  NotificationsContextType | undefined
>(undefined);

export const NotificationsProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [notifications, setNotifications] = useLocalStorage<Notification[]>({
    key: "notifications",
    initialValue: [],
  });

  const addNotification = (message: string) => {
    const newNotification = {
      id: uuidv4(),
      message,
      timestamp: Date.now(),
    };

    setNotifications((prev) => [...prev, newNotification]);
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  return (
    <NotificationsContext.Provider
      value={{ notifications, addNotification, clearNotifications }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};
