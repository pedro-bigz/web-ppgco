import toast from "react-hot-toast";
import {
  DefaultError,
  QueryKey,
  queryOptions,
  useQuery,
} from "@tanstack/react-query";
import { TypeDefaultApiParams } from "core/jwt";
import { axiosInstances } from "core/api";

interface ParamsUseApiQuery extends TypeDefaultApiParams {
  params?: unknown;
  disableCache?: boolean;
}

export function useApiQuery<Response>({
  instance = "main",
  endpoint,
  params,
  responseSchema,
  message,
  queryKey = [],
  options = {},
  disableCache = false,
}: ParamsUseApiQuery) {
  const api = axiosInstances[instance];
  const apiRequest = async (): Promise<Response> => {
    return api
      .get<Response>(endpoint, { params })
      .then((data: { data: any }) => data.data)
      .then((data: unknown) => {
        if (!responseSchema) return data;

        const safeData = responseSchema.safeParse(data);

        if (safeData.success) return safeData.data;

        toast.error(message?.error || "Houve um erro nos dados recebidos.");

        return data;
      });
  };
  const cacheInfo = disableCache ? { cache: Infinity } : {};

  return useQuery<Response, DefaultError, Response, QueryKey>(
    queryOptions({
      queryKey,
      queryFn: apiRequest,
      ...options,
      ...cacheInfo,
      staleTime: 60000,
    })
  );
}
