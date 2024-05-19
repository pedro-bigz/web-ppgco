import {
  DatePicker as NextDatePicker,
  DatePickerProps as NextDatePickerProps,
} from "@nextui-org/react";
import classnames from "classnames";

export interface DatePickerProps extends NextDatePickerProps {
  name: string;
}

export const DatePicker = ({ classNames, ...props }: DatePickerProps) => {
  return (
    <NextDatePicker
      {...props}
      classNames={{
        timeInput: classnames(
          "border-extrasmall px-[16px]",
          classNames?.timeInput
        ),
        ...classNames,
      }}
      fullWidth
    />
  );
};
