import { useMutation, useQuery } from "@tanstack/react-query";
import { AuthFormValues } from "schemas";
import { authApi } from "services/Auth";

export const useSignInMutation = () => {
  return useMutation({
    mutationFn: async (params: AuthFormValues) => {
      return authApi.login({
        ...params,
        mode: "USER",
      });
    },
  });
};

export const useMeQuery = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: () => authApi.getMe(),
  });
};

