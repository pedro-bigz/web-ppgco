import { AsyncSelect, AsyncSelectProps } from "../AsyncSelect";

export interface UncontrolledAsyncSelectProps extends AsyncSelectProps {}

export const UncontrolledAsyncSelect = ({
  name,
  variant = "bordered",
  ...props
}: UncontrolledAsyncSelectProps) => {
  return <AsyncSelect {...props} name={name} variant={variant} />;
};
