import { useEffect, useRef, useState } from "react";

export function useTableScroller() {
  const [isEndTable, setIsEndTable] = useState<boolean>(false);
  const tableRef = useRef<HTMLDivElement>(null);
  const tableScrollerStateRef = useRef<boolean>(false);

  // Function to handle the scroll event
  const handleScroll = () => {
    const table = tableRef.current;
    const divElement = table?.parentNode as HTMLElement;

    if (divElement && table) {
      const isEnded =
        table.scrollWidth - divElement.clientWidth < divElement.scrollLeft;

      if (tableScrollerStateRef.current === isEnded) return;

      setIsEndTable(isEnded);
      tableScrollerStateRef.current = isEnded;
    }
  };

  // Add the scroll event listener
  useEffect(() => {
    const divElement = tableRef.current?.parentNode as HTMLElement;

    if (divElement) {
      divElement.addEventListener("scroll", handleScroll);
    }

    // Clean up the event listener
    return () => {
      if (divElement) {
        divElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return { isEndTable, tableRef, handleScroll };
}
