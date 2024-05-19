import { useController, useFormContext } from "react-hook-form";
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

export const ControlledSelect = ({
  name,
  onChange,
  variant = "bordered",
  defaultValue = "",
  ...props
}: ControlledSelectProps) => {
  const { control, setValue } = useFormContext();
  const { field, formState } = useController({
    name: name + "_select",
    control,
    defaultValue,
  });
  const error = formState.errors[name];

  const onSelectChange = ({ e, option }: OnChangeAttributes) => {
    field.onChange(e.target.value);
    setValue(name, option);
    onChange?.({ e, option });
  };

  return (
    <>
      <Select
        {...props}
        variant={variant}
        name={name}
        value={field.value}
        errorMessage={error?.message as string}
        onChange={onSelectChange}
      />
    </>
  );
};
