import { useMutation, useQuery } from "@tanstack/react-query";
import { orderApi } from "services";
import { TOrderRequest } from "services/Order/Order.types";

export const useCreateOrderMutation = () => {
  return useMutation({
    mutationFn: (data: TOrderRequest) => orderApi.createOrder(data),
  });
};

export const useOrdersQuery = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: () => orderApi.getOrders(),
  });
};

export const useFindShipperMutation = () => {
  return useMutation({
    mutationFn: (id: string) => orderApi.findShipper(id),
  });
};

export const useOrderDetailQuery = (id: string) => {
  return useQuery({
    queryKey: ["order", id],
    queryFn: () => orderApi.getOrderDetail(id),
    enabled: !!id,
  });
};


