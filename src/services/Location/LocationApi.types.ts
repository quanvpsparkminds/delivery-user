import { number } from "zod";

export type TLocation = {
  long: number;
  lat: number;
};

export type TAddress = {
  road: string;
  suburb: string;
  city: string;
  postcode: string;
  country: string;
  country_code: string;
};

export type TReverseGeocode = {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  lat: number;
  lon: number;
  class: string;
  type: string;
  place_rank: number;
  importance: number;
  addresstype: string;
  name: string;
  display_name: string;
  address: TAddress;
};
