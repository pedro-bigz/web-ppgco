import {
  Checkbox as NextCheckbox,
  CheckboxProps as NextCheckboxProps,
} from "@nextui-org/react";

export interface CheckboxProps extends NextCheckboxProps {
  name: string;
  label?: string;
}

export function Checkbox({ label, ...props }: CheckboxProps) {
  return (
    <NextCheckbox {...props} aria-labelledby={label}>
      {label}
    </NextCheckbox>
  );
}
