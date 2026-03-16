import { api } from "services/Api";
import { TLogin, TLoginResponse } from "./Auth.types";
import { ApiResponse } from "services/Api.types";

const login = async (params: TLogin): Promise<ApiResponse<TLoginResponse>> => {
  return api.post<TLoginResponse>("/auth/login", params);
};

export const authApi = { login };