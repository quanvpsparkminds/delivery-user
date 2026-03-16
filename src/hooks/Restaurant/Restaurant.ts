import { useQuery } from "@tanstack/react-query";
import { restaurantApi } from "services";

export const useRestaurantQuery = () => {
  return useQuery({
    queryKey: ["restaurant"],
    queryFn: () => restaurantApi.getRestaurant(),
    select: (data) => data.data,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

export const useRestaurantDetailQuery = (
  id: number | string,
  params: { lat: number | string; lng: number | string }
) => {
  return useQuery({
    queryKey: ["restaurant", id, params],
    queryFn: () => restaurantApi.getRestaurantDetail(id, params),
    select: (data) => data.data,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    enabled: !!id,
  });
};
