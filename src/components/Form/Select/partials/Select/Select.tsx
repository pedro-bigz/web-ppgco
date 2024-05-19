import { ChangeEvent, useEffect, useRef, useState } from "react";
import {
  Select as NextSelect,
  SelectItem,
  SelectProps as NextSelectProps,
} from "@nextui-org/react";
import _get from "lodash/get";
import _isEqual from "lodash/isEqual";
import _mapKeys from "lodash/mapKeys";
import classnames from "classnames";
import { TextField } from "components/Form/TextField";

export type SelectOptionValue = any;
export type SelectOption = Record<string, SelectOptionValue>;
export type SelectOptions = SelectOption[];

export interface OnChangeAttributes {
  e: ChangeEvent<HTMLSelectElement>;
  option: SelectOption;
}

export interface Track {
  label: string;
  key: string;
}

export interface SelectOnChangeHandler {
  (props: OnChangeAttributes): void;
}

export interface SelectProps
  extends Omit<NextSelectProps, "children" | "onChange"> {
  name: string;
  label: string;
  track: Track;
  placeholder?: string;
  mask?: string;
  multiple?: boolean;
  required?: boolean;
  startAdornment?: JSX.Element | string;
  options: SelectOptions;
  disabled?: boolean;
  onChange: SelectOnChangeHandler;
  value?: any;
  defaultValue?: string;
  errorMessage?: string;
}

export const Select: React.FC<SelectProps> = ({
  name,
  size = "sm",
  track = {
    label: "label",
    key: "value",
  },
  required,
  startAdornment,
  options,
  onChange,
  disabled = false,
  value,
  classNames,
  variant = "bordered",
  ...props
}) => {
  const selectName = name + "_select";
  const [optionsMap, setOptionsMap] = useState<any>({});

  const optionsRef = useRef<SelectOptions>([]);

  useEffect(() => {
    if (_isEqual(optionsRef.current, options)) return;

    setOptionsMap(_mapKeys(options, (option) => _get(option, track.key)));

    optionsRef.current = options;
  }, [options]);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const option = optionsMap[e.target.value];

    if (!option) {
      return console.error("Select item not founded");
    }

    onChange?.({ e, option });
  };

  return (
    <>
      <TextField.Form isHidden name={name} />
      <NextSelect
        required={required}
        name={selectName}
        variant={variant}
        value={value}
        startContent={!startAdornment ? undefined : <>{startAdornment}</>}
        selectedKeys={value ? [String(value)] : undefined}
        onChange={handleChange}
        fullWidth
        size={size}
        isDisabled={disabled}
        classNames={{
          trigger: classnames("border-small", classNames?.trigger),
          ...classNames,
        }}
        {...props}
      >
        {options?.map((option) => {
          const itemKey = _get(option, track.key) as string;
          return (
            <SelectItem key={itemKey} value={itemKey}>
              {_get(option, track.label) as string}
            </SelectItem>
          );
        })}
      </NextSelect>
    </>
  );
};
