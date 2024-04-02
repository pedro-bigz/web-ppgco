import toast from "react-hot-toast";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { TypeDefaultApiParams } from "./types";
import { axiosInstances } from "core";

interface ParamsUseApiQuery extends TypeDefaultApiParams {
  params?: unknown;
  disableCache?: boolean;
}

export const useApiQuery = <Response>({
  instance = "main",
  endpoint,
  params,
  responseSchema,
  message,
  queryKey = [],
  options = {},
  disableCache = false,
}: ParamsUseApiQuery) => {
  const api = axiosInstances[instance];
  const apiRequest = async (): Promise<Response> => {
    return api
      .get<Response>(endpoint, { params })
      .then((data) => data.data)
      .then((data) => {
        if (!responseSchema) return data;

        const safeData = responseSchema.safeParse(data);

        if (safeData.success) return safeData.data;

        toast.error(message?.error || "Houve um erro nos dados recebidos.");

        return data;
      });
  };
  const cacheInfo = disableCache ? { cache: Infinity } : {};

  return useQuery(
    queryOptions({
      queryKey,
      queryFn: apiRequest,
      ...options,
      ...cacheInfo,
      staleTime: 60000,
    })
  );
};
