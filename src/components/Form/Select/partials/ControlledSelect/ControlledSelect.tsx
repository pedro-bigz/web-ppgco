import { useController, useFormContext } from "react-hook-form";
import { ChangeEvent } from "react";
import {
  Select,
  SelectOption,
  hasCustomization,
  SelectProps,
  Track,
} from "../Select";
import { TextField } from "components/Form/TextField";

export interface ControlledSelectProps
  extends Omit<SelectProps, "errorMessage" | "track"> {
  track?: Track;
}

export const ControlledSelect: React.FC<ControlledSelectProps> = ({
  name,
  track,
  onChange,
  variant = "bordered",
  defaultValue = "",
  ...props
}) => {
  const isCustomized = hasCustomization(track);
  const selectName = isCustomized ? name + "_select" : name;

  const { control, setValue } = useFormContext();
  const { field, formState } = useController({
    name: selectName,
    control,
    defaultValue,
  });
  const error = formState.errors[name];

  const onSelectChange = (
    e: ChangeEvent<HTMLSelectElement>,
    option?: SelectOption
  ) => {
    if (option) {
      setValue(name, option);
    }

    field.onChange(e.target.value);
    onChange?.(e, option);
  };

  return (
    <>
      {isCustomized && <TextField.Form isHidden name={name} />}
      <Select
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
