import { ApiResponse } from "services/Api.types";
import { TOrderRequest, TOrderResponse } from "./Order.types";
import { api } from "services/Api";

const createOrder = async (
  data: TOrderRequest,
): Promise<ApiResponse<TOrderResponse>> => {
  return await api.post<TOrderResponse>("/orders", data);
};

export const orderApi = { createOrder };
