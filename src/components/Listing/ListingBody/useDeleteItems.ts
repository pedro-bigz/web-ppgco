import { AxiosError, AxiosResponse } from "axios";
import { axiosMain } from "core";
import { useState } from "react";

export interface UseDeleteItemsParams {
  endpoint: string;
}

export interface DeleteApiCallbacks {
  onSuccess?: OnSuccessInterface;
  onError?: OnErrorInterface;
  onSettled?: OnSettledInterface;
}

interface OnNotifyInterface<T = any, R = void> {
  (data: T): R;
}

interface OnSuccessInterface extends OnNotifyInterface {}

interface OnSettledInterface extends OnNotifyInterface {}

interface OnErrorInterface extends OnNotifyInterface<AxiosError> {}

interface UseDeleteSetterInterface {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  error?: AxiosError | {};
  data?: any;
  response?: Partial<AxiosResponse>;
}

export function useDeleteItems({ endpoint }: UseDeleteItemsParams) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [response, setResponse] = useState<Partial<AxiosResponse>>();
  const [errors, setErrors] = useState<Partial<AxiosError>>({});

  const onResponseCallback = (
    {
      isLoading,
      isSuccess,
      isError,
      error = {},
      data,
      response = {},
    }: UseDeleteSetterInterface,
    onNotify?: OnNotifyInterface,
    onSettled?: OnSettledInterface
  ) => {
    setIsLoading(isLoading);
    setIsSuccess(isSuccess);
    setIsError(isError);
    setErrors(error);
    setResponse(response);

    onNotify?.(data);
    onSettled?.(data);
  };

  const onResponseSuccessCallback = (
    response: any,
    cb?: DeleteApiCallbacks
  ) => {
    onResponseCallback(
      {
        response,
        isLoading: false,
        isSuccess: true,
        isError: false,
        data: response.data,
      },
      cb?.onSuccess,
      cb?.onSettled
    );
  };

  const onResponseErrorCallback = (
    error: AxiosError,
    cb?: DeleteApiCallbacks
  ) => {
    onResponseCallback(
      {
        error,
        isLoading: false,
        isSuccess: false,
        isError: true,
        data: error.response?.data,
        response: error.response,
      },
      cb?.onError,
      cb?.onSettled
    );
  };

  return {
    errors,
    isLoading,
    isSuccess,
    isError,
    response,
    mutate(id: number, cb?: DeleteApiCallbacks) {
      setIsLoading(true);
      axiosMain
        .delete(endpoint + "/" + id)
        .then((response) => {
          onResponseSuccessCallback(response, cb);
        })
        .catch((error) => {
          onResponseErrorCallback(error, cb);
        });
    },
  };
}
