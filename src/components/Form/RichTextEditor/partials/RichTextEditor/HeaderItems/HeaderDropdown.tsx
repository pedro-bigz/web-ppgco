import {
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { Headings, Tools, useTools } from "../RichTextEditor.tools";
import classnames from "classnames";
import { Editor } from "@tiptap/react";
import { Langs } from "../RichTextEditor.lang";

export interface HeaderDropdownChildrenProps
  extends Partial<Pick<Tools, "title" | "icon" | "className">> {
  key: string;
}

export interface HeaderDropdownItemProps
  extends Partial<Pick<Tools, "title" | "icon" | "className">> {
  key: string;
  childrens?: Array<string | HeaderDropdownChildrenProps>;
}

export interface HeaderDropdownProps {
  item: HeaderDropdownItemProps;
  editor: Editor;
  lang: Langs;
}

export function HeaderDropdown({
  editor,
  item,
  lang = "pt",
}: HeaderDropdownProps) {
  const { tools } = useTools({ editor, lang });

  const childrens = Object.fromEntries<Tools>(
    item?.childrens?.map<[string, Tools]>(
      (children: string | HeaderDropdownChildrenProps) => {
        if (typeof children === "string") {
          return [children, tools[children] as Tools];
        }

        const { key, ...otherProps } = children;

        return [key, { ...tools[key], ...otherProps } as Tools];
      }
    ) ?? []
  );

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Button
          isIconOnly={!item?.title}
          size="sm"
          variant="flat"
          className="bg-white min-w-12"
        >
          <span>{item?.icon}</span>
          <span>{item?.title}</span>
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        disallowEmptySelection
        aria-label="rich text header dropdown"
        className="max-w-[300px]"
        selectedKeys={
          new Set(
            Object.entries(childrens ?? {})
              .filter(([_, values]) => values?.isActive)
              .map(([key]) => key)
          )
        }
      >
        {Object.entries(childrens ?? {}).map(([key, values]) => (
          <DropdownItem
            key={key}
            onClick={() => values?.action?.()}
            className={classnames({
              "is-active bg-primary text-white": values?.isActive,
            })}
          >
            <span className={values?.className}>
              {childrens?.[key as Headings]?.title}
            </span>
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
