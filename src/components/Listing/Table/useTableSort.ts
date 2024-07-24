import { useListingContext } from "core";
import { TableColumnAttributes, TableRowInterface } from "./Table";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import _isEmpty from "lodash/isEmpty";
import _orderBy from "lodash/orderBy";
import { Order, OrderBy } from "core";
import {
  faArrowUpShortWide,
  faArrowUpWideShort,
} from "@fortawesome/free-solid-svg-icons";

export interface UseTableSortParams {
  isRemoteData: boolean;
  rows: TableRowInterface[];
}

export function useTableSort({ rows, isRemoteData }: UseTableSortParams) {
  const { orderBy, setOrderBy } = useListingContext();

  const [localOrderBy, setLocalOrderBy] = useState<OrderBy[]>([]);
  const [sortedRows, setSortedRows] = useState<TableRowInterface[]>([]);

  const orderAsRecord = useMemo(() => Object.fromEntries(orderBy), [orderBy]);

  useEffect(() => {
    if (_isEmpty(rows)) return;
    setSortedRows(rows);
  }, [rows]);

  useEffect(() => {
    if (_isEmpty(localOrderBy)) return;
    const columns = localOrderBy.map(([column]) => column);
    const directions = localOrderBy.map(
      ([_, direction]) => direction.toLowerCase() as "asc" | "desc"
    );
    setSortedRows(_orderBy(rows, columns, directions));
  }, [rows, localOrderBy]);

  const isSorted = (column: TableColumnAttributes) => {
    return Boolean(orderAsRecord[column.key]);
  };

  const getSortIcon = (column: TableColumnAttributes) => {
    const direction = orderAsRecord[column.key];
    const icons = {
      ASC: faArrowUpShortWide,
      DESC: faArrowUpWideShort,
    };
    return icons[direction];
  };

  const getSortDirection = (column: TableColumnAttributes) => {
    return orderAsRecord[column.key];
  };

  const handleOrderBy = (
    column: TableColumnAttributes,
    direction: Order,
    sortFunction: Dispatch<SetStateAction<OrderBy[]>>
  ) => {
    const columnKey = String(column.key);
    const orderIndex = orderBy.findIndex(([column]) => {
      return column === columnKey;
    });

    console.log({ columnKey, orderIndex });

    if (orderIndex < 0) {
      return sortFunction([...orderBy, [columnKey, direction]]);
    }

    console.log({ diff: direction !== orderBy[orderIndex][1] });

    if (direction !== orderBy[orderIndex][1]) {
      return sortFunction((state) =>
        state.map(([column, oldDirection], index) =>
          index === orderIndex ? [column, direction] : [column, oldDirection]
        )
      );
    }

    return sortFunction((state) =>
      state.filter(([column]) => column !== columnKey)
    );
  };

  const handleRemoteSort = (
    column: TableColumnAttributes,
    direction: Order
  ) => {
    return handleOrderBy(column, direction, setOrderBy);
  };

  const handleLocalSort = async (
    column: TableColumnAttributes,
    direction: Order
  ) => {
    handleOrderBy(column, direction, setLocalOrderBy);
  };

  const handleSort = (column: TableColumnAttributes, direction: Order) => {
    if (isRemoteData) {
      return handleRemoteSort(column, direction);
    }

    return handleLocalSort(column, direction);
  };

  return {
    sortedRows,
    isSorted,
    getSortIcon,
    getSortDirection,
    handleSort,
    handleRemoteSort,
  };
}
