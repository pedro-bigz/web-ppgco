import { UIEvent, useCallback, useEffect, useRef } from "react";

interface UseInfiniteScroll {
  hasMore: boolean;
  isEnabled: boolean;
  shouldUseLoader: boolean;
  onLoadMore: () => void;
}

export function useInfiniteScroll({
  hasMore,
  isEnabled,
  shouldUseLoader = false,
  onLoadMore,
}: UseInfiniteScroll) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const onScroll = useCallback(
    (element: HTMLDivElement, e: Event) => {
      const scrolledToBottom = (_e: Event) => {
        console.log({ _e });
        onLoadMore();
      };

      if (element.offsetHeight + element.scrollTop >= element.scrollHeight) {
        scrolledToBottom(e);
      }
    },
    [onLoadMore]
  );

  useEffect(() => {
    scrollerRef?.current?.addEventListener("scroll", function (e) {
      onScroll(this, e);
    });
  }, [onScroll]);

  // if (!isEnabled || !hasMore) return;

  console.log({
    hasMore,
    isEnabled,
    shouldUseLoader,
    onLoadMore,
  });

  return { scrollerRef };
}
