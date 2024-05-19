import { useMemo, useState } from "react";
import {
  Table as NextTable,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Spinner,
} from "@nextui-org/react";
import _isEmpty from "lodash/isEmpty";
import _get from "lodash/get";
import classNames from "classnames";

import { HeaderMenu } from "./HeaderMenu";
import { TableFooter } from "./TableFooter";
import { useTableSort } from "./useTableSort";
import { useBulkSelection } from "./useBulkSelection";
import { ActionsDropdown, ActionsItem } from "./ActionsDropdown";

type Key = string | number;

export interface TableColumnAttributes {
  key: Key;
  label: string;
  sortable?: boolean;
}

export interface TableRowInterface {
  [key: string]: number | string | boolean | null | undefined;
}
// extends Record<string, number | string | boolean | null | undefined> {}

export interface TableProps {
  rowKey?: string | number;
  actions?: ActionsItem[];
  rows: TableRowInterface[];
  columns: TableColumnAttributes[];
  checkboxSelection?: boolean;
  tableProps?: Record<string, any>;
  hasBulkSelection?: boolean;
  isRemoteData?: boolean;
  isLoading?: boolean;
  onSelectKeys?: (keys: Set<Key>) => void;
}

export function Table({
  rowKey = "id",
  actions,
  rows,
  columns,
  hasBulkSelection = false,
  isLoading = false,
  isRemoteData = true,
  onSelectKeys,
  tableProps,
}: TableProps) {
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

  return (
    <NextTable
      isStriped
      isHeaderSticky
      showSelectionCheckboxes={hasBulkSelection}
      aria-label="Controlled table example with dynamic content"
      selectionMode="multiple"
      selectedKeys={selectedKeys}
      onSelectionChange={handleOnSelectionChange}
      bottomContent={<TableFooter />}
      {...tableProps}
    >
      <TableHeader>
        {columnsWithActions.map((column) => (
          <TableColumn
            className={classNames(
              column.key === "actions" ? "sticky right-[-1rem]" : "",
              "hover:bg-gray-200"
            )}
            key={column.key}
            onMouseEnter={handleMouseEnter(column.key, true)}
            onMouseLeave={handleMouseEnter(column.key, false)}
            allowsSorting={column.sortable}
          >
            <div className="flex justify-between">
              <div className="flex items-center">{column.label}</div>
              {column.key !== "actions" && (
                <HeaderMenu
                  column={column}
                  onSort={handleSort}
                  isVisible={isMouseEnter[column.key]}
                  allowsSorting={column.sortable}
                />
              )}
            </div>
          </TableColumn>
        ))}
      </TableHeader>
      <TableBody
        items={rows}
        isLoading={isLoading}
        loadingContent={<Spinner label="Loading..." />}
        emptyContent={
          <div className="font-montserrat">Nenhum item encontrado!</div>
        }
      >
        {(item) => (
          <TableRow key={item[rowKey] as Key}>
            {(columnKey) =>
              actions && !_isEmpty(actions) && columnKey === "actions" ? (
                <TableCell className="sticky right-[-1rem] bg-white z-[99]">
                  <ActionsDropdown actions={actions} item={item} />
                </TableCell>
              ) : (
                <TableCell>{_get(item, columnKey)}</TableCell>
              )
            }
          </TableRow>
        )}
      </TableBody>
    </NextTable>
  );
}
