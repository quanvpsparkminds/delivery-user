/**
 * Enhanced API Response type with better error handling
 *
 * T for successful data type
 * E for extra data type when error occurs
 */
export type ApiResponse<T, E = Record<string, any>> = {
  data: T;
  metadata?: any;
  status: number;
  messageCode: string;
  message: string;
  extraData?: E;
};

/**
 * Token refresh callback type
 * Called when tokens are refreshed or cleared
 */
export type TRefreshTokenCallback = (
  token: string,
  refreshToken: string
) => void;

/**
 * API setup parameters
 */
export type TApiSetupParams = {
  token?: string;
  enableLogging?: boolean;
};

/**
 * Pagination link header
 */
export type TLinkHeader = {
  page: string;
  rel: string;
  size: string;
  url: string;
};

/**
 * Pagination information
 */
export type TPaging = {
  page?: number;
  size?: number;
  sort?: string[];
};

/**
 * Request configuration with cancellation
 */
export type RequestConfig = {
  params?: Record<string, any>;
  headers?: Record<string, any>;
  timeout?: number;
  cancelToken?: any;
};
