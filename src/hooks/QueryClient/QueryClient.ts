import { focusManager, QueryClient } from "@tanstack/react-query";
import { useOnlineManager } from "./OnlineManager";
import { Platform } from "react-native";
import { AppStateStatus } from "react-native";
import { useAppState } from "hooks/Common";

export function useQueryClient() {
  const queryClient = new QueryClient();

  /**
   * Set the online status of the app
   */
  useOnlineManager();

  /**
   * Set the focused status of the app
   */
  useAppState((status: AppStateStatus) => {
    if (Platform.OS !== "web") {
      focusManager.setFocused(status === "active");
    }
  });

  return queryClient;
}
