import { useController, useFormContext } from "react-hook-form";
import { DatePicker, DatePickerProps } from "../DatePicker";

export interface ControlledDatePickerProps extends DatePickerProps {
  name: string;
  onChange?: (...e: any[]) => void;
  onFieldChange?: (...e: any[]) => void;
}

export const ControlledDatePicker = ({
  name,
  defaultValue,
  onChange,
  onFieldChange,
  size = "sm",
  variant = "bordered",
  ...props
}: ControlledDatePickerProps) => {
  const { control } = useFormContext();
  const { field, formState } = useController({
    name,
    control,
    defaultValue,
  });
  const error = formState.errors[name];

  const onInputChange = (...e: any[]) => {
    console.log({ e });
    onChange?.(...e);
    onFieldChange?.(field);
    field.onChange(...e);
  };

  return (
    <DatePicker
      {...props}
      fullWidth
      name={name}
      value={field.value}
      size={size}
      variant={variant}
      onChange={onInputChange}
      errorMessage={error?.message as string}
    />
  );
};
