import { HTMLAttributes, useEffect, useState } from "react";
import {
  ListboxProps as NextListboxProps,
  Listbox as NextListbox,
  ListboxItem as NextListboxItem,
  ListboxItemProps as NextListboxItemProps,
  Selection,
} from "@nextui-org/react";
import _get from "lodash/get";
import _isEqual from "lodash/isEqual";
import _mapKeys from "lodash/mapKeys";
import { ListboxWrapper } from "./ListboxWrapper";

export type ListboxItemOptionValue = any;
export type ListboxItemOption = Record<string, ListboxItemOptionValue>;
export type ListboxItemOptions = ListboxItemOption[];

export interface ListboxTrack {
  label: string;
  key: string;
}

export interface ListboxProps extends Omit<NextListboxProps, "children"> {
  items: ListboxItemOptions;
  track: ListboxTrack;
  wrapperProps?: Omit<HTMLAttributes<HTMLDivElement>, "children">;
  itemProps?: NextListboxItemProps;
}

export function Listbox({
  items,
  track = {
    label: "label",
    key: "value",
  },
  wrapperProps,
  itemProps,
  onSelectionChange,
  ...props
}: ListboxProps) {
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));

  const onChange = (keys: Selection) => {
    setSelectedKeys(keys);
    onSelectionChange?.(keys);
  };

  return (
    <ListboxWrapper {...wrapperProps}>
      <NextListbox
        aria-label="listbox-selection"
        selectedKeys={selectedKeys}
        onSelectionChange={onChange}
        className="p-0"
        {...props}
      >
        {items.map((item: ListboxItemOption) => (
          <NextListboxItem {...itemProps} key={_get(item, track.key) as string}>
            {_get(item, track.label) as string}
          </NextListboxItem>
        ))}
      </NextListbox>
    </ListboxWrapper>
  );
}
