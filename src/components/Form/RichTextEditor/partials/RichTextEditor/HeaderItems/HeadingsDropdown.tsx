import {
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { richTextHeadings, Headings, Tools } from "../RichTextEditor.tools";
import classnames from "classnames";

interface HeadingsDropdownProps {
  tool: Tools;
}

export function HeadingsDropdown({ tool }: HeadingsDropdownProps) {
  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Button size="sm" variant="flat" className="bg-white min-w-12">
          <span>{tool.icon}</span>
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        disallowEmptySelection
        aria-label="Merge options"
        className="max-w-[300px]"
        selectedKeys={
          new Set(
            Object.entries(tool?.childrens ?? {})
              .filter(([_, values]) => values?.isActive)
              .map(([key]) => key)
          )
        }
      >
        {Object.entries(tool?.childrens ?? {}).map(([key, values]) => (
          <DropdownItem
            key={key}
            onClick={() => values?.action?.()}
            className={classnames({
              "is-active bg-primary text-white": values?.isActive,
            })}
          >
            <span className={richTextHeadings[key as Headings]}>
              {tool.childrens?.[key as Headings].title}
            </span>
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
