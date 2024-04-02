import {
  Input as NextInput,
  InputProps as NextInputProps,
} from "@nextui-org/react";
import classnames from "classnames";

import { HiddenInput, PasswordInput, MaskedInput } from "../index";

export interface InputProps extends NextInputProps {
  name: string;
  value: any;
  label?: string;
  errorMessage?: string;
  placeholder?: string;
  mask?: string | any;
  maskConfig?: any;
  required?: boolean;
  disabled?: boolean;
  startAdornment?: JSX.Element | string;
  endAdornment?: JSX.Element | string;
  maxLength?: number;
  isHidden?: boolean;
  isPassword?: boolean;
  position?: "start" | "end";
  onChange: (...event: any[]) => void;
  onValueChange: (...event: any[]) => void;
}

export const Input: React.FC<InputProps> = ({
  name,
  value,
  errorMessage,
  isHidden = false,
  isPassword = false,
  placeholder,
  mask,
  maskConfig,
  required,
  disabled,
  maxLength = 255,
  size = "sm",
  label = "",
  position,
  classNames,
  onChange,
  onValueChange,
  variant,
  ...props
}) => {
  if (isHidden) {
    return <HiddenInput name={name} value={value} onChange={onChange} />;
  }

  if (isPassword) {
    return (
      <PasswordInput
        {...props}
        name={name}
        label={label}
        placeholder={placeholder}
        value={value}
        size={size}
        onChange={onChange}
        isDisabled={disabled}
        isRequired={required}
        errorMessage={errorMessage}
        maxLength={maxLength}
        position={position}
        variant={variant}
        classNames={{
          ...classNames,
          inputWrapper: classnames(
            "border-small border-[#DEDEDE!important]",
            classNames?.inputWrapper
          ),
        }}
      />
    );
  }

  if (mask) {
    return (
      <MaskedInput
        {...props}
        name={name}
        label={label}
        placeholder={placeholder}
        value={value}
        size={size}
        isDisabled={disabled}
        isRequired={required}
        errorMessage={errorMessage}
        maxLength={maxLength}
        mask={mask}
        maskConfig={maskConfig}
        variant={variant}
        onValueChange={onValueChange}
        classNames={{
          ...classNames,
          inputWrapper: classnames("border-small", classNames?.inputWrapper),
        }}
      />
    );
  }

  return (
    <NextInput
      variant={variant}
      name={name}
      label={label}
      placeholder={placeholder}
      value={value}
      size={size}
      classNames={{
        ...classNames,
        inputWrapper: classnames("border-small", classNames?.inputWrapper),
      }}
      onChange={onChange}
      isDisabled={disabled}
      isRequired={required}
      errorMessage={errorMessage}
      maxLength={maxLength}
      {...props}
    />
  );
};
