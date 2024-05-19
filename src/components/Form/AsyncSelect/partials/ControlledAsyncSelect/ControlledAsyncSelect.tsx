import { useController, useFormContext } from "react-hook-form";
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

export const ControlledAsyncSelect = ({
  name,
  track,
  onChange,
  variant = "bordered",
  defaultValue = "",
  ...props
}: ControlledAsyncSelectProps) => {
  const selectName = name + "_" + track.key;
  const { control, setValue } = useFormContext();
  const { field, formState } = useController({
    name: selectName,
    control,
    defaultValue,
  });
  const error = formState.errors[name];

  const onSelectChange = ({ e, option }: OnChangeAttributes) => {
    console.log({ [selectName]: e.target.value, target: e.target });
    field.onChange(e.target.value);
    setValue(name, option);
    onChange?.({ e, option });
  };

  return (
    <>
      <TextField.Form isHidden name={name} />
      <AsyncSelect
        {...props}
        track={track}
        variant={variant}
        name={selectName}
        value={field.value}
        errorMessage={error?.message as string}
        onChange={onSelectChange}
      />
    </>
  );
};
