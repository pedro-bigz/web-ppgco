import {
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { MouseEvent } from "react";
import { TableRowInterface } from "./Table";

export interface ActionsItem {
  icon?: () => JSX.Element;
  label: string;
  shortcut?: string;
  onClick: (item: TableRowInterface, e: MouseEvent<HTMLLIElement>) => void;
}

export interface ActionsDropdownProps {
  actions: ActionsItem[];
  item: TableRowInterface;
}

const keyfyLabel = (label: string) => {
  return label.toLocaleLowerCase().replaceAll(" ", "_");
};

const handleOnClick = (action: ActionsItem, item: TableRowInterface) => {
  return (e: MouseEvent<HTMLLIElement>) => {
    action.onClick.call(action, item, e);
  };
};

export const ActionsDropdown = ({ actions, item }: ActionsDropdownProps) => {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button radius="full" variant="ghost" className="px-7 float-right">
          Ações
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        variant="faded"
        aria-label="Dropdown action menu"
        items={actions}
      >
        {(action: ActionsItem) => (
          <DropdownItem
            key={keyfyLabel(action.label)}
            shortcut={action.shortcut}
            startContent={action.icon && <action.icon />}
            onClick={handleOnClick(action, item)}
            className="border-none outline-none"
          >
            {action.label}
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
};
