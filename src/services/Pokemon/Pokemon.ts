import { ApiResponse } from "services/Api.types";
import { TPokemon } from "./Pokemon.types";
import { api } from "services/Api";

const pokemon = async (
  size: number,
  page: number
): Promise<ApiResponse<TPokemon[]>> => {
  return await api.get<TPokemon[]>("v2/pokemon/", {
    params: { offset: page, limit: size },
  });
};

export const pokemonApi = { pokemon };
