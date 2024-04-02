import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { axiosInstances } from "core";
import { TypeDefaultApiParams } from "./types";
import { logger } from "utils";

interface ParamsUseApiMutate extends TypeDefaultApiParams {
  method?: "put" | "post" | "patch" | "delete";
  enableDefaultToast?: boolean;
}

export const useApiMutate = <Param, Response>({
  instance = "main",
  method = "post",
  endpoint,
  paramsSchema,
  responseSchema,
  message,
  options = {},
  enableDefaultToast = true,
}: ParamsUseApiMutate) => {
  const apiFn = axiosInstances[instance][method];

  const apiRequest = async (body: Param): Promise<Response> => {
    try {
      const response = await apiFn<Response>(endpoint, body);
      const data = response?.data;

      if (!responseSchema) return data;

      const safeData = responseSchema.safeParse(data);

      if (safeData.success) return safeData.data as Response;

      if (message?.error || enableDefaultToast) {
        toast.error(message?.error || "Houve um erro nos dados recebidos.");
      }
      return data;
    } catch (err) {
      if (message?.error || enableDefaultToast) {
        toast.error(message?.error || "Houve um erro na requisição.");
      }
      return Promise.reject(err);
    }
  };

  const handleMutate = (body: Param): Promise<Response> => {
    if (!paramsSchema) return apiRequest(body);

    const safeParams = paramsSchema.safeParse(body);
    console.log({ safeParams });

    if (safeParams.success) {
      return apiRequest(body);
    }

    logger.debug(safeParams.error);

    if (enableDefaultToast) {
      toast.error("Houve um problema com os dados para realizar a solicitação");
    }

    return Promise.reject({} as Response);
  };

  return useMutation({ mutationFn: handleMutate, ...options });
};
