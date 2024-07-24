import { RefObject, useEffect } from "react";

interface UseOutSideClickParams {
  elementRef: RefObject<HTMLDivElement>;
  onClickOutside: () => void;
}

export function useOutSideClick({
  elementRef,
  onClickOutside,
}: UseOutSideClickParams) {
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (elementRef.current && !elementRef.current.contains(event.target)) {
        onClickOutside && onClickOutside();
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [onClickOutside]);
}
