import { hashKey } from "@tanstack/react-query";
import { useApiQuery, useListingContext } from "core";
import { useEffect } from "react";

interface UseListingParams {
  endpoint: string;
  params?: Record<string, string | number>;
  isDisabled?: boolean;
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

export function useListing({
  endpoint,
  params,
  isDisabled = false,
}: UseListingParams) {
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
  const requestParams = {
    page,
    perPage,
    orderBy,
    filters,
    ...params,
  };

  useEffect(() => {
    console.log({ filters });
  }, [filters]);

  const hashK = hashKey([endpoint, JSON.stringify(requestParams)]);

  useEffect(() => {
    console.log({ hashKey: hashK });
  }, [hashK]);

  const { data, isLoading, ...queryResult } = useApiQuery<PaginatedResponse>({
    params: requestParams,
    endpoint,
    options: {
      enabled: !isDisabled,
    },
    queryKey: [hashKey([endpoint, JSON.stringify(requestParams)])],
  });

  useEffect(() => {
    console.log({ data });
  }, [data]);

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
}
