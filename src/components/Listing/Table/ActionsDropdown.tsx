import {
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { MouseEvent } from "react";
import { TableRowInterface } from "./Table";
import classnames from "classnames";

export interface ActionsItem {
  icon?: () => JSX.Element;
  label: string;
  shortcut?: string;
  className?: string;
  onClick: (item: TableRowInterface, e: MouseEvent<HTMLLIElement>) => void;
}

export interface ActionsDropdownProps {
  actions: ActionsItem[];
  item: TableRowInterface;
  isEndTable: boolean;
  classNames?: Partial<
    Record<"shadowBox" | "dropdown" | "dropdownItem", string>
  >;
}

const keyfyLabel = (label: string) => {
  return label.toLocaleLowerCase().replaceAll(" ", "_");
};

const handleOnClick = (action: ActionsItem, item: TableRowInterface) => {
  return (e: MouseEvent<HTMLLIElement>) => {
    action.onClick.call(action, item, e);
  };
};

export function ActionsDropdown({
  actions,
  item,
  isEndTable,
  classNames,
}: ActionsDropdownProps) {
  return (
    <div className="flex h-[56px] w-[130px]">
      <div
        className={classnames(
          "flex justify-end",
          "bg-[#6e6e6e63] blur-sm",
          "h-[56px] w-[4px] rounded-l-md z-[99]",
          { hidden: isEndTable }
        )}
      ></div>
      <div
        className={classnames(
          "flex flex-grow items-center justify-center h-[56px] w-[125px] z-[100]",
          {
            "bg-white": !isEndTable,
            "bg-transparent": !isEndTable,
          }
        )}
      >
        <Dropdown className={classNames?.dropdown}>
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
                className={classnames(
                  "border-none outline-none",
                  classNames?.dropdownItem
                )}
              >
                <span className={action.className}>{action.label}</span>
              </DropdownItem>
            )}
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  );
}
