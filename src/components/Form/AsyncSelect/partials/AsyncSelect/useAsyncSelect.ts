import _get from "lodash/get";
import _isEqual from "lodash/isEqual";
import _mapKeys from "lodash/mapKeys";
import { useSelectOptions, UseSelectOptions } from "./useSelectOptions";
import { useState } from "react";
import { useInfiniteScroll } from "@nextui-org/use-infinite-scroll";

export interface UseAsyncSelectParams extends UseSelectOptions {}

export const useAsyncSelect = ({
  endpoint,
  perPage,
  track,
}: UseSelectOptions) => {
  const [isOpen, onOpenChange] = useState<boolean>(false);
  const {
    options,
    hasMore,
    isLoading,
    search,
    selected,
    optionsMap,
    getOption,
    onSearch,
    onLoadMore,
    setSelected,
    // onLoadOptions,
  } = useSelectOptions({
    endpoint,
    perPage,
    track,
  });

  const [, scrollerRef] = useInfiniteScroll({
    hasMore,
    isEnabled: isOpen,
    shouldUseLoader: false,
    onLoadMore,
  });

  return {
    isOpen,
    options,
    hasMore,
    isLoading,
    scrollerRef,
    search,
    selected,
    optionsMap,
    getOption,
    onSearch,
    onLoadMore,
    onOpenChange,
    setSelected,
    // onLoadOptions,
  };
};
