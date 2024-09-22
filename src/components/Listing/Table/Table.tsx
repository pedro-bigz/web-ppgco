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
import classnames from "classnames";

import { HeaderMenu } from "./HeaderMenu";
import { ActionsDropdown, ActionsItem } from "./ActionsDropdown";
import { useTable } from "./useTable";
import { ArrowSortIcon } from "./ArrowSortIcon";

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
  tableProps,
  onSelectKeys,
}: TableProps) {
  const {
    tableRef,
    isEndTable,
    selectedKeys,
    isMouseEnter,
    columnsWithActions,
    isSorted,
    getSortIcon,
    getSortDirection,
    handleSort,
    handleMouseEnter,
    formatCellValue,
    handleOnSelectionChange,
  } = useTable({
    actions,
    rows,
    columns,
    isRemoteData,
    onSelectKeys,
  });

  return (
    <NextTable
      ref={tableRef}
      isStriped
      isHeaderSticky
      showSelectionCheckboxes={hasBulkSelection}
      aria-label="Controlled table example with dynamic content"
      selectionMode="multiple"
      selectedKeys={selectedKeys}
      onSelectionChange={handleOnSelectionChange}
      classNames={{ wrapper: "next-table p-1 shadow-none", thead: "px-1" }}
      {...tableProps}
    >
      <TableHeader>
        {columnsWithActions.map((column) => (
          <TableColumn
            className={classnames(
              column.key === "actions" ? "sticky right-[-1rem] z-20" : "",
              "hover:bg-gray-200",
              "pr-0"
            )}
            key={column.key}
            onMouseEnter={handleMouseEnter(column.key, true)}
            onMouseLeave={handleMouseEnter(column.key, false)}
            allowsSorting={column.sortable}
          >
            <div className="flex justify-between">
              <div className="flex items-center">{column.label}</div>
              {isSorted(column) && (
                <ArrowSortIcon
                  column={column}
                  onSort={handleSort}
                  direction={getSortDirection(column)}
                  icon={getSortIcon(column)}
                />
              )}
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
        isLoading={isLoading}
        loadingContent={<Spinner label="Loading..." />}
        emptyContent={
          <div className="font-montserrat">Nenhum item encontrado!</div>
        }
      >
        {rows.map((item) => (
          <TableRow key={item[rowKey] as Key}>
            {(columnKey) =>
              actions && !_isEmpty(actions) && columnKey === "actions" ? (
                <TableCell
                  className={classnames(
                    "sticky bg-transparent z-[99] p-0 flex justify-end",
                    { "right-[-4px]": !isEndTable }
                  )}
                >
                  <ActionsDropdown
                    actions={actions}
                    item={item}
                    isEndTable={isEndTable}
                  />
                </TableCell>
              ) : (
                <TableCell>{formatCellValue(_get(item, columnKey))}</TableCell>
              )
            }
          </TableRow>
        ))}
      </TableBody>
    </NextTable>
  );
}
