import { ChangeEvent, useEffect, useRef, useState } from "react";
import {
  Select as NextSelect,
  SelectItem,
  SelectProps as NextSelectProps,
  Selection,
} from "@nextui-org/react";
import _get from "lodash/get";
import _isEqual from "lodash/isEqual";
import _mapKeys from "lodash/mapKeys";
import classnames from "classnames";
import { TextField } from "components/Form/TextField";
import {
  SelectOnChangeAttributes,
  SelectOption,
  Track,
  useMapOptions,
} from "core";

export interface SelectOnChangeHandler {
  (props: SelectOnChangeAttributes): void;
}

export interface SelectProps
  extends Omit<NextSelectProps, "children" | "onChange"> {
  name: string;
  label: string;
  track?: Track;
  placeholder?: string;
  mask?: string;
  multiple?: boolean;
  required?: boolean;
  startAdornment?: JSX.Element | string;
  options: SelectOption[];
  disabled?: boolean;
  onChange: SelectOnChangeHandler;
  value?: any;
  defaultValue?: string;
  errorMessage?: string;
}

export function Select({
  name,
  size = "sm",
  track = {
    label: "label",
    key: "value",
  },
  required,
  startAdornment,
  options,
  onChange,
  disabled = false,
  value,
  classNames,
  errorMessage,
  ...props
}: SelectProps) {
  const selectName = name + "_" + track.key;
  const autocompleteRef = useRef<HTMLSelectElement>(null);

  const { optionsMap } = useMapOptions({ options, track });

  const handleChange = (keys: Selection) => {
    const options = [...keys].map((key) => _get(optionsMap, key));

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
      else console.error("Select item not founded");
    }

    onChange?.({ e, options, keys });
  };

  return (
    <>
      <TextField.Form isHidden name={name} />
      <NextSelect
        required={required}
        name={selectName}
        value={value}
        isInvalid={Boolean(errorMessage)}
        errorMessage={errorMessage}
        startContent={!startAdornment ? undefined : <>{startAdornment}</>}
        selectedKeys={value ? [String(value)] : undefined}
        onSelectionChange={handleChange}
        fullWidth
        size={size}
        isDisabled={disabled}
        classNames={{
          trigger: classnames("border-small", classNames?.trigger),
          ...classNames,
        }}
        {...props}
      >
        {options?.map((option) => {
          const itemKey = _get(option, track.key) as string;
          return (
            <SelectItem key={itemKey} value={itemKey}>
              {_get(option, track.label) as string}
            </SelectItem>
          );
        })}
      </NextSelect>
    </>
  );
}
