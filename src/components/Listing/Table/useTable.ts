import { useMemo, useState } from "react";
import _isEmpty from "lodash/isEmpty";
import _get from "lodash/get";

import { ActionsItem } from "./ActionsDropdown";
import { TableColumnAttributes, TableRowInterface } from "./Table";
import { useTableSort } from "./useTableSort";
import { useBulkSelection } from "./useBulkSelection";
import dayjs from "dayjs";
import { useTableScroller } from "./useTableScroller";

type Key = string | number;

export interface UseTableParams {
  actions?: ActionsItem[];
  rows: TableRowInterface[];
  columns: TableColumnAttributes[];
  isRemoteData?: boolean;
  onSelectKeys?: (keys: Set<Key>) => void;
}

export function useTable({
  actions,
  rows,
  columns,
  isRemoteData = true,
  onSelectKeys,
}: UseTableParams) {
  const { handleSort } = useTableSort({ rows, isRemoteData });
  const { selectedKeys, handleOnSelectionChange } = useBulkSelection({
    onSelectKeys,
  });

  const [isMouseEnter, setIsMouseEnter] = useState<Record<Key, boolean>>({});

  const columnsWithActions = useMemo(() => {
    if (!actions || _isEmpty(actions)) return columns;
    return [...columns, { key: "actions", label: "Ações" }];
  }, [columns]);

  const handleMouseEnter = (key: Key, value: boolean) => {
    return () => setIsMouseEnter({ [key]: value });
  };

  const formatCellValue = (
    text: string | number | boolean | null | undefined
  ) => {
    if (!text) {
      return "";
    }

    if (typeof text === "boolean") {
      return text ? "Sim" : "Não";
    }

    if (typeof text === "number" || !Number.isNaN(+text)) {
      return text;
    }

    const date = dayjs(text, "YYYY-MM-DD");

    if (date.isValid()) {
      return date.format("DD MMM YYYY");
    }

    const dateTime = dayjs(text, "YYYY-MM-DDTHH:mm:ss.SSSZ");

    if (dateTime.isValid()) {
      return dateTime.format("DD/MM/YYYY [ás] HH:mm");
    }

    return text;
  };

  const { isEndTable, tableRef } = useTableScroller();

  return {
    tableRef,
    isEndTable,
    selectedKeys,
    isMouseEnter,
    columnsWithActions,
    handleSort,
    setIsMouseEnter,
    handleMouseEnter,
    formatCellValue,
    handleOnSelectionChange,
  };
}
