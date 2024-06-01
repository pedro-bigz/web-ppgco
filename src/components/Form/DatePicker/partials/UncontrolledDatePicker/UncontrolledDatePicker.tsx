import classnames from "classnames";
import { DatePicker, DatePickerProps } from "../DatePicker";

export interface UncontrolledDatePickerProps extends DatePickerProps {
  name: string;
  onChange?: (...e: any[]) => void;
}

export const UncontrolledDatePicker = ({
  defaultValue,
  onChange,
  size = "sm",
  ...props
}: UncontrolledDatePickerProps) => {
  const onInputChange = (...e: any[]) => {
    onChange?.(...e);
  };

  return (
    <DatePicker {...props} fullWidth size={size} onChange={onInputChange} />
  );
};
