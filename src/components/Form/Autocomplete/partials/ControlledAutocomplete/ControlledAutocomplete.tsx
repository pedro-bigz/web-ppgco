import { useController, useFormContext } from "react-hook-form";
import _get from "lodash/get";
import {
  Autocomplete,
  AutocompleteOnChangeHandler,
  AutocompleteProps,
} from "../Autocomplete";
import { AutocompleteOnChangeAttributes } from "core";

export interface ControlledAutocompleteProps
  extends Omit<AutocompleteProps, "errorMessage" | "onChange"> {
  onChange?: AutocompleteOnChangeHandler;
}

export function ControlledAutocomplete({
  name,
  track = {
    label: "label",
    key: "value",
  },
  onChange,
  defaultValue = "",
  ...props
}: ControlledAutocompleteProps) {
  const selectName = name + "_" + track.key;

  const { control, setValue } = useFormContext();
  const { field, formState } = useController({
    name: selectName,
    control,
    defaultValue,
  });
  const error = _get(formState.errors, name);
  const selectError = _get(formState.errors, selectName);

  const onAutocompleteChange = ({
    e,
    option,
    key,
  }: AutocompleteOnChangeAttributes) => {
    field.onChange(e.target.value);
    setValue(name, option);
    onChange?.({ e, option, key });
  };

  return (
    <>
      <Autocomplete
        {...props}
        name={name}
        track={track}
        value={field.value}
        errorMessage={(error?.message ?? selectError?.message) as string}
        onChange={onAutocompleteChange}
      />
    </>
  );
}
