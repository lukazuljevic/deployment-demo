import {
  type ActionResponseDto,
  NotificationResponseDto,
} from "@cart-app/types";
import { useQuery } from "@tanstack/react-query";
import { api } from ".";
import { QueryKeys } from "./queryKeys";

export const getAllNotifications = () => {
  return api.get<NotificationResponseDto>("/notifications");
};

export const addNotification = (message: string) => {
  return api.post<ActionResponseDto>("/notifications", { message });
};

export const removeNotifications = () => {
  return api.delete<ActionResponseDto>("/notifications");
};

export const useAllNotifications = () => {
  return useQuery({
    queryKey: [QueryKeys.NOTIFICIATIONS],
    queryFn: getAllNotifications,
  });
};
