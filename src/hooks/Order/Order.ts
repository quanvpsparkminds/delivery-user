import { useMutation } from "@tanstack/react-query";
import { orderApi } from "services";
import { TOrderRequest } from "services/Order/Order.types";

export const useCreateOrderMutation = () => {
  return useMutation({
    mutationFn: (data: TOrderRequest) => orderApi.createOrder(data),
  });
};
