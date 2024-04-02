import axios from "axios";
import jwtDecode from "jwt-decode";
import dayjs from "dayjs";

import { DecodedToken, useUserContext } from "hooks";
import { tokenStorage } from "services";
import { API_PPGCO_URL } from "core/env";

import { refreshTokenApi } from "./refresh-token.api";

export const axiosMain = axios.create({
  baseURL: API_PPGCO_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosMain.interceptors.request.use(async (config: any) => {
  const token = tokenStorage.getToken();
  if (!token) return config;

  const decodedToken: DecodedToken = jwtDecode(token);
  const expirationDate = dayjs(decodedToken.exp).add(1000, "millisecond");

  const headers = {
    Authorization: `Bearer ${token}`,
    ...config.headers,
  };

  const request = { ...config, headers };

  if (dayjs().isAfter(expirationDate) || !tokenStorage.isKeepConnected()) {
    return request;
  }

  const refreshToken = tokenStorage.getRefreshToken();

  if (!refreshToken) {
    return request;
  }

  const { setUser } = useUserContext();

  await refreshTokenApi(refreshToken).then(({ auth, user }: any) => {
    headers.Authorization = `Bearer ${auth.accessToken}`;
    setUser(user);
  });

  return request;
});
