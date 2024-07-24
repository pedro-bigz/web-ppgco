import { Select, SelectProps } from "../Select";

export interface UncontrolledSelectProps extends SelectProps {}

export function UncontrolledSelect({
  variant = "bordered",
  ...props
}: UncontrolledSelectProps) {
  return (
    <>
      <Select {...props} variant={variant} />
    </>
  );
}
