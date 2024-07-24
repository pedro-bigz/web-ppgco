import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Selection } from "@nextui-org/react";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import _differenceBy from "lodash/differenceBy";
import { axiosMain } from "core";
import { PaginatedResponse } from "components/Listing";
import { useMapOptions } from "./useMapOptions";

export type SelectOptionValue = any;
export type SelectOption = Record<string, SelectOptionValue>;
export type AutocompleteOption = SelectOption;

export type OptionKey = string | number;

export type PaginatedOptions = PaginatedResponse<SelectOption[]>;

export interface AutocompleteOnChangeAttributes<
  Element = HTMLInputElement,
  Options = AutocompleteOption
> {
  e: ChangeEvent<Element>;
  option?: Options;
  key?: Selection | OptionKey | null;
}

export interface SelectOnChangeAttributes<
  Element = HTMLSelectElement,
  Options = SelectOption
> {
  e: ChangeEvent<Element>;
  options?: Options;
  keys?: Selection | OptionKey | null;
}

export interface Track {
  label: string;
  key: string;
}

export interface UseSelectOptions {
  endpoint: string;
  perPage: number;
  track: Track;
}

// interface LoadDataParams {
//   page: number;
//   perPage: number;
//   search?: string;
//   searchIn?: string;
//   shouldResetOptions?: boolean;
// }

export function useSelectOptions({
  endpoint,
  perPage,
  track,
}: UseSelectOptions) {
  const [options, setOptions] = useState<SelectOption[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [search, setSearch] = useState<string>();
  const [selected, setSelected] = useState<Selection>();

  const searchRef = useRef<string | null>(null);

  const { optionsMap } = useMapOptions({ options, track });

  const getOption = (key: OptionKey) => {
    return _get(optionsMap, key);
  };

  const { data, isLoading } = useQuery({
    queryKey: [String([endpoint, page, perPage, search, track.label])],
    queryFn: async () => {
      return axiosMain
        .get<PaginatedOptions>(endpoint, {
          params: { perPage, page, search, searchIn: track.label },
        })
        .then(({ data }) => data);
    },
  });

  useEffect(() => {
    if (!data) return;

    const getNewData = (options: SelectOption[]) =>
      _differenceBy(data.data, options, track.key);

    setOptions((prevOptions) => [...prevOptions, ...getNewData(prevOptions)]);
    setHasMore(Boolean(data.nextPage));
  }, [data, track.key]);

  const onLoadMore = () => {
    setPage(page + 1);
  };

  const onSearch = (search?: string) => {
    if (searchRef.current === null) return;
    if (searchRef.current == search) return;

    if (_isEmpty(search)) return resetSearch();

    // console.log({ search, selected });

    const option = getOption(selected as string);
    if (search === _get(option, track.label)) return;

    setPage(1);
    setSearch(search);
    setOptions([]);

    searchRef.current = search ?? "";
  };

  const resetSearch = () => {
    // console.log("onReset");
    setPage(1);
    setSearch("");
    setOptions([]);
  };

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
    onLoadMore,
    setSelected,
    getOption,
    // onLoadOptions,
  };
}
