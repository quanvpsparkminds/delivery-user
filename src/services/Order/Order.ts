import { ApiResponse } from "services/Api.types";
import { TOrderRequest, TOrderResponse } from "./Order.types";
import { api } from "services/Api";

const createOrder = async (
  data: TOrderRequest,
): Promise<ApiResponse<TOrderResponse>> => {
  return await api.post<TOrderResponse>("/orders", data);
};

const getOrders = async (): Promise<ApiResponse<TOrderResponse[]>> => {
  return await api.get<TOrderResponse[]>("/orders");
};

const findShipper = async (id: string): Promise<ApiResponse<any>> => {
  return await api.post<any>(`/orders/${id}/shipper`, {});
};

const getOrderDetail = async (id: string): Promise<ApiResponse<TOrderResponse>> => {
  return await api.get<TOrderResponse>(`/orders/${id}`);
};

export const orderApi = { createOrder, getOrders, findShipper, getOrderDetail };

