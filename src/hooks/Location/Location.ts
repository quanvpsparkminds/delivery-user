import { useQuery } from "@tanstack/react-query";
import { useAppSelector } from "hooks/RTK";
import { locationApi } from "services";
import { selectLocation } from "store/slices/LocationSlice";

export const useLocationQuery = () => {
  const location = useAppSelector(selectLocation);
  return useQuery({
    queryKey: ["location"],
    queryFn: () =>
      locationApi.location({ long: location.long, lat: location.lat }),
    select: (response) => response.data,
    staleTime: 5 * 60 * 1000,
    retry: 0,
  });
};

export const useSearchLocationQuery = (text?: string) => {
  return useQuery({
    queryKey: ["search-location", text],
    queryFn: () => locationApi.search(text || ""),
    select: (response) => response.data,
    staleTime: 1 * 60 * 1000,
    gcTime: 1 * 60 * 1000,
    retry: 0,
  });
};
