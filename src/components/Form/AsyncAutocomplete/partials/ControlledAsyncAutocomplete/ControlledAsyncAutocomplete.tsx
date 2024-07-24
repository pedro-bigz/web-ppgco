import { useController, useFormContext } from "react-hook-form";
import _get from "lodash/get";
import { AutocompleteOnChangeAttributes } from "core";
import {
  AsyncAutocomplete,
  AsyncAutocompleteOnChangeHandler,
  AsyncAutocompleteProps,
} from "../AsyncAutocomplete";
import { TextField } from "components/Form/TextField";

export interface ControlledAsyncAutocompleteProps
  extends Omit<AsyncAutocompleteProps, "errorMessage" | "onChange"> {
  onChange?: AsyncAutocompleteOnChangeHandler;
}

export function ControlledAsyncAutocomplete({
  name,
  track,
  onChange,
  defaultValue = "",
  ...props
}: ControlledAsyncAutocompleteProps) {
  const selectName = name + "_" + track.key;

  const { control, setValue } = useFormContext();
  const { field, formState } = useController({
    name: selectName,
    control,
    defaultValue,
  });
  const error = _get(formState.errors, name);
  const selectError = _get(formState.errors, selectName);

  const onSelectChange = ({
    e,
    option,
    key,
  }: AutocompleteOnChangeAttributes) => {
    field.onChange(e.target.value);
    setValue(name, option);
    onChange?.({ e, option, key });
  };

  console.log({
    name,
    error: error?.message,
    selectError: selectError?.message,
  });

  return (
    <>
      <TextField.Form isHidden name={name} />
      <AsyncAutocomplete
        {...props}
        track={track}
        name={selectName}
        value={field.value}
        errorMessage={(error?.message ?? selectError?.message) as string}
        onChange={onSelectChange}
      />
    </>
  );
}
