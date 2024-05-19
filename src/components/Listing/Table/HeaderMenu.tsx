import { MouseEvent } from "react";
import classNames from "classnames";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Dropdown,
  DropdownTrigger,
  Chip,
  DropdownMenu,
  DropdownItem,
  DropdownProps,
  Button,
} from "@nextui-org/react";
import { TableColumnAttributes } from "./Table";
import { AscSortIcon, DescSortIcon } from "assets";
import { Order } from "core";

export interface HeaderMenuProps {
  column: TableColumnAttributes;
  isVisible?: boolean;
  allowsSorting?: boolean;
  onSort?: (
    column: TableColumnAttributes,
    direction: Order,
    e: MouseEvent<HTMLLIElement>
  ) => void;
  dropdownProps?: Omit<DropdownProps, "children">;
}

export const HeaderMenu = ({
  isVisible,
  allowsSorting,
  column,
  onSort,
  dropdownProps = {},
}: HeaderMenuProps) => {
  const handleSort = (direction: Order) => {
    return (e: MouseEvent<HTMLLIElement>) => {
      onSort?.(column, direction, e);
    };
  };

  return (
    <Dropdown {...dropdownProps}>
      <DropdownTrigger>
        <Button
          isIconOnly
          size="sm"
          radius="full"
          className={classNames("bg-transparent hover:bg-gray-300", {
            hidden: !isVisible,
          })}
        >
          <FontAwesomeIcon icon={faEllipsisVertical} />
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Action event example"
        onAction={(key) => alert(key)}
      >
        <DropdownItem
          key="sort_asc"
          startContent={<AscSortIcon />}
          onClick={handleSort("ASC")}
          isReadOnly={allowsSorting}
        >
          Ordenar do menor para o maior
        </DropdownItem>
        <DropdownItem
          key="sort_desc"
          startContent={<DescSortIcon />}
          onClick={handleSort("DESC")}
          isReadOnly={allowsSorting}
        >
          Ordenar do maior para o menor
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
