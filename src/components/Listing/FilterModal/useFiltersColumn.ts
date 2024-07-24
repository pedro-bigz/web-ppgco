import { useEffect, useRef } from "react";
import { GenericFunction } from "utils";

interface UseFilterColumnParams {
  columns: any[];
  watchFieldValue: GenericFunction;
  setFieldValue: GenericFunction;
}

export function useFiltersColumn({
  columns,
  watchFieldValue,
  setFieldValue,
}: UseFilterColumnParams) {
  const [column = {}, columnKey] = watchFieldValue("column", "column_key");

  const columnRef = useRef<string>();

  const setColumn = (value: any) => {
    setFieldValue("column", value);
  };

  const setColumnKey = (value: any) => {
    setFieldValue("column_key", value);
  };

  useEffect(() => {
    if (!columnKey || column?.key === columnKey) return;

    const col = columns.find((col) => col.key === columnKey);

    if (!col) return;

    setColumn(col);
  }, [columnKey]);

  return {
    column,
    columnKey,
    columnRef,
    setColumn,
    setColumnKey,
  };
}
