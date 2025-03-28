import * as z from "zod";
import { AxiosRequestConfig } from "axios";

export interface TypeDefaultApiParams {
  instance?: "main" | "auth";
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
