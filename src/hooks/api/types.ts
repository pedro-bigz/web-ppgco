import * as z from "zod";
import { AxiosRequestConfig } from "axios";

export interface TypeDefaultApiParams {
  instance?: "main";
  endpoint: string;
  body?: AxiosRequestConfig;
  paramsSchema?: z.ZodTypeAny;
  responseSchema?: z.ZodTypeAny;
  message?: {
    error?: string;
    success?: string;
  };
  queryKey?: string[];
  options?: {
    [key: string]: string;
  };
}

export type DecodedToken = {
  _id: number;
  email: string;
  iat: number;
  exp: number;
};
