import { ChangeEvent, Key, useRef } from "react";
import {
  Autocomplete,
  AutocompleteItem,
  AutocompleteProps,
} from "@nextui-org/react";
import _get from "lodash/get";
import _isEqual from "lodash/isEqual";
import _mapKeys from "lodash/mapKeys";
import classnames from "classnames";

import { useAsyncSelect } from "./useAsyncSelect";
import { SelectOption, Track } from "components/Form/Select";
import { OptionKey } from "./useSelectOptions";

export interface OnChangeAttributes {
  e: ChangeEvent<HTMLSelectElement | HTMLInputElement>;
  option: SelectOption;
}

export interface AsyncSelectOnChangeHandler {
  (props: OnChangeAttributes): void;
}

export interface AsyncSelectProps
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
  onChange: AsyncSelectOnChangeHandler;
  value?: any;
  defaultValue?: string;
}

export const AsyncSelect: React.FC<AsyncSelectProps> = ({
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
}) => {
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
  } = useAsyncSelect({
    endpoint,
    perPage,
    track,
  });

  const emitOnChange = (key: OptionKey | null) => {
    const option = getOption(key as string);

    if (!option) {
      return console.error("AsyncSelect item not founded");
    }

    const autocompleteRefProp = autocompleteRef?.current ?? {};

    const e = {
      target: {
        ...autocompleteRefProp,
        name,
        value: String(key),
      },
    } as ChangeEvent<HTMLInputElement>;

    onChange?.({ e, option });
  };

  const handleSelectionChange = (key: OptionKey | null) => {
    setSelected(key);
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
};
