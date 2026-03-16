import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  CreateAxiosDefaults,
} from "axios";
import { t } from "i18next";
import Config from "react-native-config";
import { signOut, store } from "store";
import { isTokenExpired } from "utils";
import { ApiResponse, TApiSetupParams } from "./Api.types";

import * as AxiosLogger from "axios-logger";

const DEFAULT_TIMEOUT = 100000;

const config: CreateAxiosDefaults = {
  baseURL: __DEV__ ? "http://localhost:8080/api/" : Config.BASE_URL,
  timeout: DEFAULT_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

class Api {
  private _token: string = "";
  private _axios: AxiosInstance;

  constructor(customConfig?: CreateAxiosDefaults) {
    this._axios = axios.create(customConfig || config);
    this._setupInterceptors();
  }

  private _setupInterceptors(): void {
    // Request interceptor
    this._axios.interceptors.request.use(
      async (config) => {
        // Check token expiration
        if (this._token && isTokenExpired(this._token)) {
          store.dispatch(signOut());
        }
        console.log(config);

        // Add token to request
        if (this._token) {
          config.headers.Authorization = `Bearer ${this._token}`;
        }

        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor
    this._axios.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config;

        // Handle 401 errors that aren't from the refresh token endpoint
        console.log(error.response);

        if (
          error.response?.status === 401 ||
          (error.response?.data as any)?.messageCode === "error.session.expired"
        ) {
          store.dispatch(signOut());
        }
        return Promise.reject({
          ...error,
          message: t((error.response?.data as any)?.messageCode as string, {
            defaultValue:
              (error.response?.data as any)?.messageCode ??
              "An unknown error occurred",
          }),
        });
      }
    );
  }

  private _formatResponse<T>(response: AxiosResponse): ApiResponse<T> {
    return {
      data: response.data?.data ?? response.data,
      metadata: response.data?.metadata,
      status: response.status,
      messageCode: response.data?.messageCode ?? "unknown_error",
      message: t(response.data?.messageCode, {
        defaultValue: response.data?.message ?? "An unknown error occurred",
      }),
      extraData: response.data?.extraData,
    };
  }

  // Public API methods
  async get<T>(url: string, config?: any): Promise<ApiResponse<T>> {
    const response = await this._axios.get(url, config);
    return this._formatResponse<T>(response);
  }

  async post<T>(
    url: string,
    data?: any,
    config?: any
  ): Promise<ApiResponse<T>> {
    const response = await this._axios.post(url, data, config);
    return this._formatResponse<T>(response);
  }

  async put<T>(url: string, data?: any, config?: any): Promise<ApiResponse<T>> {
    const response = await this._axios.put(url, data, config);
    return this._formatResponse<T>(response);
  }

  async patch<T>(
    url: string,
    data?: any,
    config?: any
  ): Promise<ApiResponse<T>> {
    const response = await this._axios.patch(url, data, config);
    return this._formatResponse<T>(response);
  }

  async delete<T>(url: string, config?: any): Promise<ApiResponse<T>> {
    const response = await this._axios.delete(url, config);
    return this._formatResponse<T>(response);
  }

  // Setup method for configuring the API
  setup(params: TApiSetupParams): void {
    if (params.token) {
      this.injectToken(params.token);
    }

    if (params.enableLogging) {
      this.injectLogger();
    }
  }

  injectToken(token: string): void {
    this._token = token;
  }

  ejectTokens(): void {
    this._token = "";
  }

  injectLogger(): void {
    if (__DEV__) {
      this._axios.interceptors.request.use(
        AxiosLogger.requestLogger,
        AxiosLogger.errorLogger
      );
      this._axios.interceptors.response.use(
        AxiosLogger.responseLogger,
        AxiosLogger.errorLogger
      );
    }
  }

  // Method to create a cancelable request
  createCancelToken() {
    return axios.CancelToken.source();
  }
}

// Create and export the API instance
export const api = new Api();
