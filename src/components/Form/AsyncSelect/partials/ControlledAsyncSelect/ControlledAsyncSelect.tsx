import { useController, useFormContext } from "react-hook-form";
import _get from "lodash/get";
import {
  OnChangeAttributes,
  AsyncSelect,
  AsyncSelectOnChangeHandler,
  AsyncSelectProps,
} from "../AsyncSelect";
import { TextField } from "components/Form/TextField";

export interface ControlledAsyncSelectProps
  extends Omit<AsyncSelectProps, "errorMessage" | "onChange"> {
  onChange?: AsyncSelectOnChangeHandler;
}

export function ControlledAsyncSelect({
  name,
  track,
  onChange,
  defaultValue = "",
  ...props
}: ControlledAsyncSelectProps) {
  const selectName = name + "_" + track.key;

  const { control, setValue } = useFormContext();
  const { field, formState } = useController({
    name: selectName,
    control,
    defaultValue,
  });
  const error = _get(formState.errors, name);
  const selectError = _get(formState.errors, selectName);

  const onSelectChange = ({ e, options, keys }: OnChangeAttributes) => {
    field.onChange(e.target.value);
    setValue(name, options);
    onChange?.({ e, options, keys });
  };

  return (
    <>
      <TextField.Form isHidden name={name} />
      <AsyncSelect
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
