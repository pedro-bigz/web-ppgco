import { useController, useFormContext } from "react-hook-form";
import { DatePicker, DatePickerProps } from "../DatePicker";
import { TextField } from "components/Form/TextField";
import { useEffect, useState } from "react";
import { DateValue } from "@nextui-org/react";

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
  ...props
}: ControlledDatePickerProps) => {
  const pickerName = name + "_picker";

  const { control, setValue } = useFormContext();
  const { field, formState } = useController({
    name: pickerName,
    control,
    defaultValue,
  });
  const error = formState.errors[name];
  const pickerError = formState.errors[pickerName];

  const onInputChange = (e: DateValue) => {
    onChange?.(e);
    onFieldChange?.(field);
    setValue(name, e.toString());
    field.onChange(e);
  };

  return (
    <>
      <TextField.Form isHidden name={name} />
      <DatePicker
        {...props}
        fullWidth
        name={pickerName}
        defaultValue={field.value}
        value={field.value}
        size={size}
        onChange={onInputChange}
        errorMessage={(error?.message ?? pickerError?.message) as string}
      />
    </>
  );
};
