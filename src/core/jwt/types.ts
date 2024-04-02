import * as z from "zod";
import { AxiosRequestConfig } from "axios";

export interface TypeDefaultApiParams {
  instance?: "igreen";
  endpoint: string;
  body?: AxiosRequestConfig;
  paramsSchema?: z.ZodTypeAny;
  responseSchema?: z.ZodTypeAny;
  message?: {
    error?: string;
    success?: string;
  };
  queryKey?: string[];
  options?: any;
}

export type DecodedToken = {
  _id: number;
  email: string;
  iat: number;
  exp: number;
};
