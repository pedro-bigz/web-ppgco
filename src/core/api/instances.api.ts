import { AxiosInstance } from "axios";
import { axiosAuth } from "./auth.api";
import { axiosMain } from "./main.api";

interface ApiAxiosInstances {
  main: AxiosInstance;
  auth: AxiosInstance;
}

export const axiosInstances: ApiAxiosInstances = {
  main: axiosMain,
  auth: axiosAuth,
};
