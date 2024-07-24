import { RefObject } from "react";
import {
  ListboxProps,
  Listbox,
  ListboxItem,
  ScrollShadow,
  Spinner,
} from "@nextui-org/react";
import _get from "lodash/get";
import classnames from "classnames";

import {
  ListBoxOnChangeHandler,
  ListBoxTrack,
  SelectOption,
  useListBox,
} from "./useListBox";

type Slots = "scrollWrapper" | "base" | "list" | "emptyContent";

export interface ListBoxProps
  extends Omit<ListboxProps, "onChange" | "children"> {
  options: any[];
  scrollerRef?: RefObject<HTMLDivElement>;
  name: string;
  label?: string;
  track: ListBoxTrack;
  placeholder?: string;
  isMultiple?: boolean;
  required?: boolean;
  onChange: ListBoxOnChangeHandler;
  value?: any;
  size?: "sm" | "md" | "lg" | "xl";
  defaultValue?: string;
  errorMessage?: string;
  width?: string;
  height?: string;
  isSearchable?: boolean;
  isLoading?: boolean;
  classNames?: Record<Slots, any>;
}

export function ListBox({
  name,
  label,
  width,
  height = "300px",
  track = {
    label: "label",
    key: "value",
  },
  value,
  className,
  isSearchable,
  isMultiple,
  scrollerRef,
  options,
  isLoading,
  classNames,
  onChange,
  ...props
}: ListBoxProps) {
  const { listboxRef, handleSelectionChange } = useListBox({
    name,
    options,
    onChange,
    track,
  });

  return (
    <ScrollShadow
      ref={scrollerRef}
      hideScrollBar
      className={classnames(classNames?.scrollWrapper, "w-full max-h-64")}
    >
      <Listbox
        ref={listboxRef}
        className={className}
        label={label}
        selectionMode={isMultiple ? "multiple" : "single"}
        selectedKeys={value}
        bottomContent={isLoading ? <Spinner /> : undefined}
        emptyContent={!isLoading && <div>Nenhum item encontrado</div>}
        onSelectionChange={handleSelectionChange}
        {...props}
      >
        {options.map((option: SelectOption) => {
          const itemKey = _get(option, track.key) as string;
          return (
            <ListboxItem key={itemKey} value={itemKey}>
              {_get(option, track.label) as string}
            </ListboxItem>
          );
        })}
      </Listbox>
    </ScrollShadow>
  );
}
