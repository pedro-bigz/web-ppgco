import { useApiQuery, useListingContext } from "hooks";
import { useEffect } from "react";
import { c } from "vite/dist/node/types.d-aGj9QkWt";

interface UseListingParams {
  endpoint: string;
  params?: Record<string, string | number>;
  isDisable?: boolean;
}

export interface PaginatedResponse<T = unknown> {
  data: T[];
  nextPage?: number;
  prevPage?: number;
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
}

export const useListing = ({
  endpoint,
  params,
  isDisable = false,
}: UseListingParams) => {
  const {
    page,
    perPage,
    orderBy,
    filters,
    setPage,
    setData,
    setPerPage,
    setIsLoading,
    setTotalPages,
    setTotalItems,
    ...contextData
  } = useListingContext();
  const orderParams = Object.fromEntries(orderBy);
  const requestParams = {
    page,
    perPage,
    orderBy: orderParams,
    filters,
    ...params,
  };

  const { isLoading, data, ...queryResult } = useApiQuery<PaginatedResponse>({
    params: requestParams,
    endpoint,
    options: {
      enabled: !isDisable,
    },
    queryKey: [endpoint, JSON.stringify(requestParams)],
  });

  useEffect(() => {
    if (!data) return;

    setData(data.data ?? []);
    setPage(data.page ?? 1);
    setPerPage(data.perPage ?? 10);
    setTotalPages(data.totalPages ?? 10);
    setTotalItems(data.totalItems ?? 10);
    setIsLoading(isLoading);
  }, [data]);

  return {
    ...queryResult,
    ...contextData,
    page,
    perPage,
    orderBy,
    filters,
    setPage,
    setData,
    setPerPage,
    setIsLoading,
    setTotalPages,
    setTotalItems,
  };
};
