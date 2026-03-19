import { api } from "services/Api";
import { TNotificationResponse } from "./Notification.types";

const getNotifications = async () => {
  return await api.get<TNotificationResponse[]>("/notification");
};

const readNotification = async (id: number) => {
  return await api.put(`/notification/${id}/read`, {});
};

const readAllNotifications = async () => {
  return await api.put("/notification/read/all", {});
};

export const notificationApi = {
  getNotifications,
  readNotification,
  readAllNotifications,
};
