import { ChangeEvent, useRef } from "react";
import { Select, SelectItem, SelectProps, Selection } from "@nextui-org/react";
import _get from "lodash/get";
import _isEqual from "lodash/isEqual";
import _mapKeys from "lodash/mapKeys";

import {
  useAsyncLoading,
  Track,
  SelectOption,
  SelectOnChangeAttributes,
} from "core";
import classnames from "classnames";

export interface AsyncSelectOnChangeHandler {
  (props: SelectOnChangeAttributes): void;
}

export interface AsyncSelectProps
  extends Omit<SelectProps, "onChange" | "children"> {
  endpoint: string;
  perPage?: number;
  name: string;
  label: string;
  track: Track;
  placeholder?: string;
  mask?: string;
  multiple?: boolean;
  required?: boolean;
  startAdornment?: JSX.Element | string;
  onChange: AsyncSelectOnChangeHandler;
  value?: any;
  defaultValue?: string;
}

export function AsyncSelect({
  endpoint,
  perPage = 10,
  name,
  label,
  track = {
    label: "label",
    key: "value",
  },
  size = "sm",
  required,
  multiple,
  startAdornment,
  onChange,
  value,
  errorMessage,
  classNames,
  ...props
}: AsyncSelectProps) {
  const autocompleteRef = useRef<HTMLSelectElement>(null);
  const {
    options,
    isLoading,
    scrollerRef,
    getOption,
    setSelected,
    onOpenChange,
  } = useAsyncLoading({
    endpoint,
    perPage,
    track,
  });

  const emitOnChange = (keys: Selection) => {
    const options = [...keys].map(getOption);

    const autocompleteRefProp = autocompleteRef?.current ?? {};

    const e = {
      target: {
        ...autocompleteRefProp,
        name,
        value: String([...keys]),
      },
    } as ChangeEvent<HTMLSelectElement>;

    if (!options) {
      if (!required) onChange?.({ e });
      else console.error("AsyncSelect item not founded");
    }

    onChange?.({ e, options, keys });
  };

  const handleSelectionChange = (key: Selection) => {
    setSelected(key);
    emitOnChange(key);
  };

  return (
    <Select
      ref={autocompleteRef}
      required={required}
      name={name}
      label={label}
      value={value}
      startContent={!startAdornment ? undefined : <>{startAdornment}</>}
      selectedKeys={value ? String(value) : undefined}
      onOpenChange={onOpenChange}
      scrollRef={scrollerRef}
      fullWidth
      size={size}
      selectionMode={multiple ? "multiple" : "single"}
      isLoading={isLoading}
      isInvalid={Boolean(errorMessage)}
      errorMessage={errorMessage}
      onSelectionChange={handleSelectionChange}
      classNames={{
        ...classNames,
        trigger: classnames(
          "border-small border-[#DEDEDE!important]",
          classNames?.trigger
        ),
      }}
      {...props}
    >
      {options.map((option: SelectOption) => {
        const itemKey = _get(option, track.key) as string;
        return (
          <SelectItem key={itemKey} value={itemKey}>
            {_get(option, track.label) as string}
          </SelectItem>
        );
      })}
    </Select>
  );
}
