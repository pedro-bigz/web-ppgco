import axios from "axios";
import jwtDecode from "jwt-decode";
import dayjs from "dayjs";

import { DecodedToken, useUserContext } from "core";
import { tokenStorage } from "services";
import { API_PPGCO_URL } from "core/env";

import { refreshTokenApi } from "./refresh-token.api";

const headers = new Headers({});

headers.append("Content-Type", "application/json; charset=utf-8");
headers.append("Authorization", tokenStorage.getAuthorization());

export const axiosMain = axios.create({
  baseURL: API_PPGCO_URL,
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
});

axiosMain.interceptors.request.use(async (config: any) => {
  if (!tokenStorage.hasToken()) return config;

  const headers = new Headers(config.headers);

  headers.set("Authorization", tokenStorage.getAuthorization());

  const request = {
    ...config,
    headers: Object.fromEntries(headers.entries()),
  };

  if (!tokenStorage.isExpired() || !tokenStorage.isKeepConnected()) {
    return request;
  }

  const refreshToken = tokenStorage.getRefreshToken();

  if (!refreshToken) {
    return request;
  }

  await refreshTokenApi(refreshToken, headers);

  return request;
});
