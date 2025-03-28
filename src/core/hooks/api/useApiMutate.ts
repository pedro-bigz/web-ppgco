import { DefaultError, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { axiosInstances, TypeDefaultApiParams } from "core";
import { logger } from "utils";

interface ParamsUseApiMutate extends TypeDefaultApiParams {
  method?: "put" | "post" | "patch" | "delete";
  enableDefaultToast?: boolean;
}

export function useApiMutate<Param, Response>({
  instance = "main",
  method = "post",
  endpoint,
  paramsSchema,
  responseSchema,
  message,
  options = {},
  enableDefaultToast = true,
}: ParamsUseApiMutate) {
  const apiFn = axiosInstances[instance][method];

  const apiRequest = async (body: Param): Promise<Response> => {
    try {
      const response = await apiFn<Response>(endpoint, body);
      const data = response?.data;

      if (!responseSchema) return data;

      const safeData = responseSchema.safeParse(data);

      if (safeData.success) {
        return safeData.data as Response;
      }

      if (message?.error || enableDefaultToast) {
        throw new Error();
      }

      return data;
    } catch (err) {
      return Promise.reject(err);
    }
  };

  const handleMutate = (body: Param): Promise<Response> => {
    if (!paramsSchema) return apiRequest(body);

    const safeParams = paramsSchema.safeParse(body);

    if (safeParams.success) {
      return apiRequest(body);
    }

    logger.debug(safeParams.error);

    if (enableDefaultToast) {
      toast.error("Houve um problema com os dados para realizar a solicitação");
    }

    return Promise.reject({} as Response);
  };

  return useMutation<Response, DefaultError, Param, unknown>({
    mutationFn: handleMutate,
    ...options,
  });
}
