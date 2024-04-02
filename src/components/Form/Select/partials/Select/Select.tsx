import {
  Select as NextSelect,
  SelectItem,
  SelectProps as NextSelectProps,
} from "@nextui-org/react";
import { ChangeEvent } from "react";
import classnames from "classnames";

export type SelectOption = Record<string | symbol, any>;
export type SelectOptions = SelectOption[];

export interface Track {
  by: string;
  key: string;
}

export interface SelectProps extends Omit<NextSelectProps, "children"> {
  name: string;
  label: string;
  track?: Track;
  placeholder?: string;
  mask?: string;
  multiple?: boolean;
  required?: boolean;
  startAdornment?: JSX.Element | string;
  options: SelectOptions;
  disabled?: boolean;
  onChange?: (e: ChangeEvent<HTMLSelectElement>, option?: any) => void;
  value?: any;
  defaultValue?: string;
  errorMessage?: string;
}

const validateOption = (option: unknown) => {
  return option && typeof option !== "string" && typeof option !== "number";
};

export const hasCustomization = (track?: Track) =>
  track && track.by !== "label" && track.key !== "value";

export const Select: React.FC<SelectProps> = ({
  name,
  label,
  size = "sm",
  track = {
    by: "label",
    key: "value",
  },
  placeholder,
  required,
  startAdornment,
  options,
  onChange,
  disabled = false,
  value,
  classNames,
  errorMessage,
  variant = "bordered",
  ...props
}) => {
  const findValueInOptions = (key: string) => {
    return options.find((option) => option[track.key] == key);
  };

  const handleChangeCustomized = (e: ChangeEvent<HTMLSelectElement>) => {
    const option = findValueInOptions(e.target.value);
    onChange?.(e, option);
  };

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange?.(e);
  };

  if (
    validateOption(options?.[0]?.[track.key]) ||
    validateOption(options?.[0]?.[track.by])
  ) {
    return null;
  }

  return (
    <NextSelect
      required={required}
      name={name}
      variant={variant}
      label={label}
      placeholder={placeholder}
      value={value}
      startContent={!startAdornment ? undefined : <div>{startAdornment}</div>}
      selectedKeys={value ? [String(value)] : undefined}
      onChange={hasCustomization(track) ? handleChangeCustomized : handleChange}
      fullWidth
      size={size}
      isDisabled={disabled}
      errorMessage={errorMessage}
      classNames={{
        trigger: classnames("border-small", classNames?.trigger),
        ...classNames,
      }}
      {...props}
    >
      {options?.map((option) => (
        <SelectItem
          key={option[track.key] as string}
          value={option[track.key] as string}
        >
          {option[track.by] as string}
        </SelectItem>
      ))}
    </NextSelect>
  );
};
