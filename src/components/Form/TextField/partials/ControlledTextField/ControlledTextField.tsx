import { useEffect, useRef } from "react";
import { useController, useFormContext } from "react-hook-form";
import classnames from "classnames";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";

import { Input, InputProps } from "../Input";

export interface ControlledTextFieldProps
  extends Omit<InputProps, "onChange" | "onValueChange" | "value"> {
  name: string;
  forcedValue?: string;
  label?: string;
  placeholder?: string;
  mask?: string | any;
  maskConfig?: any;
  startAdornment?: JSX.Element | string;
  endAdornment?: JSX.Element | string;
  maxLength?: number;
  isHidden?: boolean;
  isPassword?: boolean;
  position?: "start" | "end";
  onChange?: (...e: any[]) => void;
}

export function ControlledTextField({
  name,
  isHidden = false,
  isPassword = false,
  classNames,
  placeholder,
  mask,
  maskConfig,
  maxLength = 255,
  size = "sm",
  label = "",
  defaultValue = "",
  forcedValue = "",
  position,
  onChange,
  ...props
}: ControlledTextFieldProps) {
  const { control } = useFormContext();
  const { field, formState } = useController({
    name,
    control,
    defaultValue,
  });
  const error = _get(formState.errors, name);

  useEffect(() => {
    if (_isEmpty(formState.errors)) return;
    console.log({ errors: formState.errors });
  }, [formState.errors]);

  const onInputChange = (...e: any[]) => {
    onChange?.(field, ...e);
    field.onChange(...e);
  };

  const forcedValueRef = useRef<string>();

  useEffect(() => {
    if (!forcedValue || forcedValueRef.current === forcedValue) {
      return;
    }
    field.onChange(forcedValue);
    forcedValueRef.current = forcedValue;
  }, [field, forcedValue]);

  return (
    <Input
      {...props}
      name={name}
      label={label}
      classNames={{
        inputWrapper: classnames("px-[16px]", classNames?.innerWrapper),
        ...classNames,
      }}
      placeholder={placeholder}
      value={field.value}
      fullWidth
      size={size}
      onChange={onInputChange}
      onValueChange={onInputChange}
      errorMessage={error?.message as string}
      maxLength={maxLength}
      isHidden={isHidden}
      isPassword={isPassword}
      mask={mask}
      maskConfig={maskConfig}
      position={position}
      isInvalid={Boolean(error?.message)}
    />
  );
}
