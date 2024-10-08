import React, { ChangeEvent } from "react";
import {
  ControllerRenderProps,
  FieldValues,
  useController,
  useFormContext,
} from "react-hook-form";
import {
  Textarea as NextTextarea,
  TextAreaProps as NextTextAreaProps,
} from "@nextui-org/react";
import classnames from "classnames";

export interface ControlledTextAreaProps extends NextTextAreaProps {
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  startAdornment?: JSX.Element | string;
  endAdornment?: JSX.Element | string;
  maxLength?: number;
  onChange?: (
    e: ChangeEvent<HTMLInputElement>,
    field?: ControllerRenderProps<FieldValues, string>
  ) => void;
}

export function ControlledTextArea({
  name,
  label = "",
  classNames,
  placeholder,
  required,
  disabled,
  maxLength = 255,
  defaultValue = "",
  onChange,
  ...props
}: ControlledTextAreaProps) {
  const { control } = useFormContext();
  const { field, formState } = useController({
    name,
    control,
    defaultValue,
  });
  const error = formState.errors[name];

  const onTextareaChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e, field);
    field.onChange(e.target.value);
  };

  return (
    <NextTextarea
      {...props}
      name={name}
      label={label}
      placeholder={placeholder}
      value={field.value}
      fullWidth
      size="sm"
      onChange={onTextareaChange}
      isDisabled={disabled}
      isRequired={required}
      errorMessage={error?.message as string}
      maxLength={maxLength}
      classNames={{
        ...classNames,
        inputWrapper: classnames("border-small", classNames?.inputWrapper),
      }}
    />
  );
}
