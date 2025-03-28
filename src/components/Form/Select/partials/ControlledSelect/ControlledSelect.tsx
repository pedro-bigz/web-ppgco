import { useController, useFormContext } from "react-hook-form";
import _get from "lodash/get";
import {
  OnChangeAttributes,
  Select,
  SelectOnChangeHandler,
  SelectProps,
} from "../Select";

export interface ControlledSelectProps
  extends Omit<SelectProps, "errorMessage" | "onChange"> {
  onChange?: SelectOnChangeHandler;
}

export function ControlledSelect({
  name,
  track = {
    label: "label",
    key: "value",
  },
  onChange,
  defaultValue = "",
  ...props
}: ControlledSelectProps) {
  const selectName = name + "_" + track.key;

  const { control, setValue } = useFormContext();
  const { field, formState } = useController({
    name: selectName,
    control,
    defaultValue,
  });
  const error = _get(formState.errors, name);
  const selectError = _get(formState.errors, selectName);

  const onSelectChange = ({ e, option }: OnChangeAttributes) => {
    field.onChange(e.target.value);
    setValue(name, option);
    onChange?.({ e, option });
  };

  return (
    <>
      <Select
        {...props}
        name={name}
        track={track}
        value={field.value}
        errorMessage={(error?.message ?? selectError?.message) as string}
        onChange={onSelectChange}
      />
    </>
  );
}
