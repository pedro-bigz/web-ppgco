import { useController, useFormContext } from "react-hook-form";
import { Checkbox, CheckboxProps } from "../Checkbox";

export interface ControlledCheckboxProps extends CheckboxProps {
  name: string;
  label?: string;
}

export function ControlledCheckbox({
  name,
  label,
  onChange,
  defaultSelected,
  ...props
}: ControlledCheckboxProps) {
  const { control } = useFormContext();
  const { field } = useController({
    name,
    control,
    defaultValue: !!defaultSelected,
  });

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    field.onChange(Boolean((event.target as HTMLInputElement).checked));
    onChange?.(event);
  };

  return (
    <Checkbox
      {...props}
      name={name}
      label={label}
      value={field.value}
      isSelected={field.value}
      onChange={handleOnChange}
      defaultSelected={defaultSelected}
    />
  );
}
