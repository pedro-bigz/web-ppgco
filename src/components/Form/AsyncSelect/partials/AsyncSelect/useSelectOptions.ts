import { Key, useEffect, useRef, useState } from "react";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import _isEqual from "lodash/isEqual";
import _mapKeys from "lodash/mapKeys";
import _differenceBy from "lodash/differenceBy";
import { PaginatedResponse } from "components/Listing/ListingBody/useListing";
import { SelectOptions, Track } from "components/Form/Select";
import { AxiosError, AxiosResponse } from "axios";
import { axiosMain } from "core";
import { List } from "lodash";
import { useMapOptions } from "./useMapOptions";

export type OptionKey = string | number;

export type PaginatedOptions = PaginatedResponse<SelectOptions>;

export interface UseSelectOptions {
  endpoint: string;
  perPage: number;
  track: Track;
}

interface LoadDataParams {
  page: number;
  perPage: number;
  search?: string;
  searchIn?: string;
  shouldResetOptions?: boolean;
}

export const useSelectOptions = ({
  endpoint,
  perPage,
  track,
}: UseSelectOptions) => {
  const [options, setOptions] = useState<SelectOptions>([]);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [search, setSearch] = useState<string>();
  const [selected, setSelected] = useState<OptionKey | null>();

  const { optionsMap } = useMapOptions({ options, track });

  const pageRef = useRef<number>();

  const getNextPage = () => {
    return page + 1;
  };

  const getOption = (key: OptionKey) => {
    return optionsMap[key];
  };

  const onLoadMore = () => {
    console.log("onEnd");
    const searchIn = search ? track.label : undefined;
    const currentPage = getNextPage();
    setPage(currentPage);
    loadData({ page: currentPage, search, searchIn, perPage });
  };

  const onSearch = (search?: string) => {
    setSearch(search);

    if (_isEmpty(search)) return resetSearch();

    const option = getOption(selected as string);
    if (search === option?.[track.label]) return;

    loadData({
      page: 1,
      perPage,
      search,
      searchIn: track.label,
      shouldResetOptions: true,
    });
  };

  const resetSearch = () => {
    loadData({
      page: 1,
      perPage,
      shouldResetOptions: true,
    });
  };

  // const onLoadOptions = async (inputValue: string) => {
  //   const adaptOptions = (options: SelectOptions) =>
  //     options.map((option) => ({
  //       label: option[track.label],
  //       value: option[track.key],
  //     }));

  //   if (!_isEmpty(search) && !_isEmpty(inputValue)) {
  //     return loadData({ page, perPage }).then(adaptOptions);
  //   }
  //   if (!_isEmpty(search) && _isEmpty(inputValue)) {
  //     return onSearch().then(adaptOptions);
  //   }
  //   if (search === inputValue) {
  //     return onLoadMore().then(adaptOptions);
  //   }

  //   return onSearch(inputValue).then(adaptOptions);
  // };

  const loadData = ({
    page,
    perPage,
    search,
    searchIn,
    shouldResetOptions = false,
  }: LoadDataParams) => {
    setIsLoading(true);

    if (shouldResetOptions) {
      setOptions([]);

      page = 1;
      setPage(page);
    }

    const processData = (data: PaginatedOptions) => {
      const getNewData = (options: SelectOptions | List<SelectOptions>) =>
        _differenceBy(data.data, options);
      setOptions((prevOptions) => [...prevOptions, ...getNewData(prevOptions)]);
      setHasMore(Boolean(data.nextPage));
      console.log({ hasMore: Boolean(data.nextPage) });
    };

    const onPromiseResolve = (response: AxiosResponse) => {
      setIsLoading(false);
      processData(response.data);
    };

    const onPromiseReject = (error: AxiosError) => {
      setIsLoading(false);
      console.error(error);
    };

    const params = { perPage, page, search, searchIn };

    axiosMain
      .get<PaginatedOptions>(endpoint, { params })
      .then(onPromiseResolve)
      .catch(onPromiseReject);
  };

  useEffect(() => {
    if (pageRef.current === page) return;
    loadData({ page, perPage });
    pageRef.current = page;
  }, []);

  return {
    options,
    hasMore,
    isLoading,
    page,
    perPage,
    search,
    selected,
    optionsMap,
    onSearch,
    loadData,
    onLoadMore,
    setSelected,
    getOption,
    // onLoadOptions,
  };
};
