import { jwtDecode } from "jwt-decode";
import { fromUnixTime, isPast } from "date-fns";

export type TDecodedAccessToken = {
  authorities: string[];
  exp: number;
  iat: number;
  jti: string;
  refreshId: string;
  sub: string;
  userId: number;
};

export const decodeAccessToken = (accessToken: string): TDecodedAccessToken =>
  JSON.parse(JSON.stringify(jwtDecode(accessToken)));

export const isTokenExpired = (accessToken: string): boolean => {
  if (!accessToken) return false;
  try {
    const { exp } = decodeAccessToken(accessToken);
    const expireDate = fromUnixTime(exp);
    const isExpired = isPast(expireDate);
    return isExpired;
  } catch (err) {
    return false;
  }
};
