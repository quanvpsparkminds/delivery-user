import { api } from "services/Api";
import { TLogin, TLoginResponse, TUser } from "./Auth.types";
import { ApiResponse } from "services/Api.types";

const login = async (params: TLogin): Promise<ApiResponse<TLoginResponse>> => {
  return api.post<TLoginResponse>("/auth/login", params);
};

const getMe = async (): Promise<ApiResponse<TUser>> => {
  return api.get<TUser>("/user/me");
};

export const authApi = { login, getMe };