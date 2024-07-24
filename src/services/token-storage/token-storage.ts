import { axiosMain, dayjs, DecodedToken } from "core";
import jwtDecode from "jwt-decode";

const defaultStorage = localStorage;
const token_name = "ppgco-access-token";
const token_refresh_name = "ppgco-refresh-token";
const keep_connected_name = "ppgco-keep-connected";

export const tokenStorage = {
  getToken() {
    return defaultStorage.getItem(token_name);
  },
  getAuthorization() {
    return `Bearer ${defaultStorage.getItem(token_name)}`;
  },
  hasToken() {
    return !!defaultStorage.getItem(token_name);
  },
  getRefreshToken() {
    return defaultStorage.getItem(token_refresh_name);
  },
  isKeepConnected() {
    return JSON.parse(defaultStorage.getItem(keep_connected_name) || "");
  },
  keepConnected(state = true) {
    defaultStorage.setItem(keep_connected_name, JSON.stringify(state));
  },
  setToken(token: string) {
    defaultStorage.setItem(token_name, token);
  },
  setRefreshToken(token: string) {
    defaultStorage.setItem(token_refresh_name, token);
  },
  resetToken() {
    defaultStorage.removeItem(token_name);
  },
  resetRefreshToken() {
    defaultStorage.removeItem(token_refresh_name);
  },
  resetKeepConnected() {
    defaultStorage.removeItem(keep_connected_name);
  },
  resetAllToken() {
    tokenStorage.resetRefreshToken();
    tokenStorage.resetKeepConnected();
    tokenStorage.resetToken();
  },
  clear() {
    defaultStorage.clear();
  },
  isExpired() {
    const token = tokenStorage.getToken();

    if (!token) return;

    const decodedToken = jwtDecode<DecodedToken>(token);
    const expirationDate = dayjs(decodedToken.exp * 1000);

    return expirationDate.isBefore(dayjs());
  },
  async isValidToken() {
    console.log("isValidToken");

    return new Promise<boolean>((resolve) => {
      axiosMain
        .head("auth/check-token")
        .then(() => resolve(true))
        .catch(() => resolve(false));
    });
  },
};
