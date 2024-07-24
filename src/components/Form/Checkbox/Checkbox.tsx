import { useController, useFormContext } from "react-hook-form";
import {
  Checkbox as NextCheckbox,
  CheckboxProps as NextCheckboxProps,
} from "@nextui-org/react";

interface CheckboxProps extends NextCheckboxProps {
  name: string;
  label?: string;
}

export function Checkbox({
  name,
  label,
  onChange,
  defaultSelected,
  ...props
}: CheckboxProps) {
  const { control } = useFormContext();
  const { field } = useController({
    name,
    control,
    defaultValue: !!defaultSelected,
  });

  // useEffect(() => {}, []);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    field.onChange(Boolean((event.target as HTMLInputElement).checked));
    onChange?.(event);
  };

  return (
    <NextCheckbox
      {...props}
      aria-labelledby="controlled-radio-buttons-group"
      value={field.value}
      isSelected={field.value}
      onChange={handleOnChange}
      defaultSelected={defaultSelected}
    >
      {label}
    </NextCheckbox>
  );
}
