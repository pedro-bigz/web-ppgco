import { Checkbox, CheckboxProps } from "../Checkbox";

export interface UncontrolledCheckboxProps extends CheckboxProps {
  name: string;
  label?: string;
}

export function UncontrolledCheckbox(props: UncontrolledCheckboxProps) {
  return <Checkbox {...props} />;
}
