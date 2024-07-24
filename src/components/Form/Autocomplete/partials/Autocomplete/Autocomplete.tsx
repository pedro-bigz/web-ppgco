import { ChangeEvent, useRef } from "react";
import {
  AutocompleteItem,
  AutocompleteProps as NextAutocompleteProps,
  Selection,
} from "@nextui-org/react";
import _get from "lodash/get";
import _isEqual from "lodash/isEqual";
import _mapKeys from "lodash/mapKeys";
import {
  AutocompleteOnChangeAttributes,
  AutocompleteOption,
  Track,
  useMapOptions,
} from "core";
import { TextField } from "components/Form/TextField";
import { StyledAutocomplete } from "./Autocomplete.style";

export interface AutocompleteOnChangeHandler {
  (props: AutocompleteOnChangeAttributes): void;
}

export interface AutocompleteProps
  extends Omit<NextAutocompleteProps, "children" | "onChange"> {
  name: string;
  label: string;
  mask?: string;
  track?: Track;
  multiple?: boolean;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  defaultValue?: string;
  errorMessage?: string;
  options: AutocompleteOption[];
  startAdornment?: JSX.Element | string;
  onChange: AutocompleteOnChangeHandler;
  value?: any;
}

export function Autocomplete({
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
}: AutocompleteProps) {
  const selectName = name + "_" + track.key;
  const autocompleteRef = useRef<HTMLInputElement>(null);

  const { optionsMap } = useMapOptions({ options, track });

  const handleSelectionChange = (key: Selection) => {
    const option = optionsMap[key as string];

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

  return (
    <>
      <TextField.Form isHidden name={name} />
      <StyledAutocomplete
        required={required}
        name={selectName}
        value={value}
        isInvalid={Boolean(errorMessage)}
        errorMessage={errorMessage}
        startContent={!startAdornment ? undefined : <>{startAdornment}</>}
        selectedKey={value ? String(value) : undefined}
        onSelectionChange={handleSelectionChange}
        fullWidth
        size={size}
        isDisabled={disabled}
        {...props}
      >
        {options?.map((option) => {
          const itemKey = _get(option, track.key) as string;
          return (
            <AutocompleteItem key={itemKey} value={itemKey}>
              {_get(option, track.label) as string}
            </AutocompleteItem>
          );
        })}
      </StyledAutocomplete>
    </>
  );
}
