import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notificationApi } from "services/Notification/Notification";

export const useNotificationQuery = () => {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      const response = await notificationApi.getNotifications();
      return response.data;
    },
    refetchInterval: 10000,
  });
};

export const useMarkAsReadMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: notificationApi.readNotification,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
};

export const useReadAllNotificationsMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: notificationApi.readAllNotifications,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
};
