import { useRef } from "react";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import { Button } from "@nextui-org/react";
import { TableColumnAttributes } from "./Table";
import { Order } from "core";

type OrderDirection = "ASC" | "DESC";

interface ArrowSortIconProps extends FontAwesomeIconProps {
  column: TableColumnAttributes;
  direction: "ASC" | "DESC";
  onSort?: (column: TableColumnAttributes, direction: Order) => void;
}

export function ArrowSortIcon({
  column,
  direction,
  onSort,
  ...props
}: ArrowSortIconProps) {
  const history = useRef<boolean>(false);

  const toggleSort = () => {
    console.log({ history: history.current, direction });
    if (history.current) {
      onSort?.(column, direction);
      history.current = false;
      return;
    }

    onSort?.(column, direction === "ASC" ? "DESC" : "ASC");
    history.current = true;
  };

  return (
    <Button
      isIconOnly
      size="sm"
      radius="full"
      className="bg-transparent hover:bg-gray-300 mx-1"
      onClick={toggleSort}
    >
      <FontAwesomeIcon {...props} />
    </Button>
  );
}
