import { ApiResponse } from "services/Api.types";
import { TRestaurant } from "./Restaurant.types";
import { api } from "services/Api";

const getRestaurant = async (): Promise<ApiResponse<TRestaurant[]>> => {
  return await api.get<TRestaurant[]>("restaurant");
};

const getRestaurantDetail = async (
  id: number | string,
  params: { lat: number | string; lng: number | string }
): Promise<ApiResponse<TRestaurant>> => {
  return await api.get<TRestaurant>(`restaurant/${id}`, { params });
};

export const restaurantApi = { getRestaurant, getRestaurantDetail };
