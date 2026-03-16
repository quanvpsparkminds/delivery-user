import { api } from "services/Api";
import { ApiResponse } from "services/Api.types";
import { TLocation, TReverseGeocode } from "./LocationApi.types";

const location = async (
  params: TLocation
): Promise<ApiResponse<TReverseGeocode>> => {
  return await api.get<TReverseGeocode>("/reverse", {
    baseURL: "https://nominatim.openstreetmap.org",
    params: { lat: params.lat, lon: params.long, format: "json" },
  });
};

const search = async (
  text: string
): Promise<ApiResponse<TReverseGeocode[]>> => {
  return await api.get<TReverseGeocode[]>("/search", {
    baseURL: "https://nominatim.openstreetmap.org",
    params: {
      q: text,
      lon: encodeURIComponent(text),
      format: "json",
      addressdetails: 1,
      limit: 5,
    },
    headers: {
      "User-Agent": "MyApp/1.0 (myemail@example.com)",
    },
  });
};

export const locationApi = { location, search };
