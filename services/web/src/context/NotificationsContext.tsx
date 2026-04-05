import {
  addNotification,
  removeNotifications,
  useAllNotifications,
} from "@api/notification";
import { QueryKeys } from "@api/queryKeys";
import type { NotificationResponseDto } from "@cart-app/types";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "main";
import { createContext, type ReactNode } from "react";

interface NotificationsContextType {
  notifications: NotificationResponseDto[];
  isLoading: boolean;
  isError: boolean;
  createNotification: (message: string) => void;
  clearNotifications: () => void;
  refetch: () => void;
}

export const NotificationsContext = createContext<
  NotificationsContextType | undefined
>(undefined);

export const NotificationsProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { data, isLoading, isError, refetch } = useAllNotifications();

  const notifications: NotificationResponseDto[] = Array.isArray(data)
    ? data
    : [];

  const createNotificationMutation = useMutation({
    mutationFn: (message: string) => addNotification(message),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.NOTIFICIATIONS] });
    },
  });

  const clearNotificationsMutation = useMutation({
    mutationFn: () => removeNotifications(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.NOTIFICIATIONS] });
    },
  });

  const createNotification = (message: string) => {
    createNotificationMutation.mutate(message);
  };

  const clearNotifications = () => {
    clearNotificationsMutation.mutate();
  };

  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        isLoading,
        isError,
        createNotification,
        clearNotifications,
        refetch,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};
