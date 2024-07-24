import { ChangeEvent, useRef } from "react";
import {
  Autocomplete,
  AutocompleteItem,
  AutocompleteProps,
  Selection,
} from "@nextui-org/react";
import _get from "lodash/get";
import _isEqual from "lodash/isEqual";
import _mapKeys from "lodash/mapKeys";
import classnames from "classnames";

import {
  useAsyncLoading,
  OptionKey,
  Track,
  SelectOption,
  AutocompleteOnChangeAttributes,
} from "core";

export interface AsyncAutocompleteOnChangeHandler {
  (props: AutocompleteOnChangeAttributes): void;
}

export interface AsyncAutocompleteProps
  extends Omit<AutocompleteProps, "onChange" | "children"> {
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
  onChange: AsyncAutocompleteOnChangeHandler;
  value?: any;
  defaultValue?: string;
}

export function AsyncAutocomplete({
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
  startAdornment,
  onChange,
  value,
  inputProps,
  errorMessage,
  ...props
}: AsyncAutocompleteProps) {
  const autocompleteRef = useRef<HTMLInputElement>(null);
  const {
    search,
    options,
    isLoading,
    scrollerRef,
    getOption,
    onSearch,
    setSelected,
    onOpenChange,
  } = useAsyncLoading({
    endpoint,
    perPage,
    track,
  });

  const emitOnChange = (key: OptionKey | null) => {
    const option = getOption(key as string);

    const autocompleteRefProp = autocompleteRef?.current ?? {};

    const e = {
      target: {
        ...autocompleteRefProp,
        name,
        value: String(key),
      },
    } as ChangeEvent<HTMLInputElement>;

    if (!option) {
      if (!required) onChange?.({ e });
      else console.error("AsyncAutocomplete item not founded");
    }

    onChange?.({ e, option, key });
  };

  const handleSelectionChange = (key: OptionKey | null) => {
    setSelected(key as Selection);
    emitOnChange(key);
  };

  return (
    <Autocomplete
      ref={autocompleteRef}
      required={required}
      name={name}
      label={label}
      value={value}
      startContent={!startAdornment ? undefined : <>{startAdornment}</>}
      selectedKey={value ? String(value) : undefined}
      onOpenChange={onOpenChange}
      scrollRef={scrollerRef}
      fullWidth
      size={size}
      isLoading={isLoading}
      isInvalid={Boolean(errorMessage)}
      errorMessage={errorMessage}
      inputValue={search}
      onInputChange={onSearch}
      onSelectionChange={handleSelectionChange}
      inputProps={{
        ...inputProps,
        classNames: {
          inputWrapper: classnames(
            "border-small",
            inputProps?.classNames?.inputWrapper
          ),
          ...inputProps?.classNames,
        },
      }}
      {...props}
    >
      {options.map((option: SelectOption) => {
        const itemKey = _get(option, track.key) as string;
        return (
          <AutocompleteItem key={itemKey} value={itemKey}>
            {_get(option, track.label) as string}
          </AutocompleteItem>
        );
      })}
    </Autocomplete>
  );
}
