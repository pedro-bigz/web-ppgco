import { useListingContext } from "hooks";
import { TableColumnAttributes, TableRowInterface } from "./Table";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import _isEmpty from "lodash/isEmpty";
import _orderBy from "lodash/orderBy";
import { Order, OrderBy } from "core";

export interface UseTableSortParams {
  isRemoteData: boolean;
  rows: TableRowInterface[];
}

export const useTableSort = ({ rows, isRemoteData }: UseTableSortParams) => {
  const { orderBy, setOrderBy } = useListingContext();
  const [localOrderBy, setLocalOrderBy] = useState<OrderBy[]>([]);
  const [sortedRows, setSortedRows] = useState<TableRowInterface[]>([]);

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

  const handleOrderBy = (
    column: TableColumnAttributes,
    direction: Order,
    sortFunction: Dispatch<SetStateAction<OrderBy[]>>
  ) => {
    const columnKey = String(column.key);
    const orderIndex = orderBy.findIndex(([column]) => {
      return column === columnKey;
    });

    if (orderIndex < 0) {
      return sortFunction([...orderBy, [columnKey, direction]]);
    }

    const filtredOrderBy = orderBy.filter(([column]) => {
      return column !== columnKey;
    });

    if (direction !== orderBy[orderIndex][1]) {
      return sortFunction([...filtredOrderBy, [columnKey, direction]]);
    }

    return sortFunction(filtredOrderBy);
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

  return { sortedRows, handleSort, handleRemoteSort };
};
