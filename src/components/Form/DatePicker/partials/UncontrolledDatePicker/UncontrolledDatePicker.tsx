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
  variant = "bordered",
  ...props
}: UncontrolledDatePickerProps) => {
  const onInputChange = (...e: any[]) => {
    console.log({ e });
    onChange?.(...e);
  };

  return (
    <DatePicker
      {...props}
      fullWidth
      size={size}
      variant={variant}
      onChange={onInputChange}
    />
  );
};
