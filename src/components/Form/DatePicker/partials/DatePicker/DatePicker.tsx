import {
  DatePicker as NextDatePicker,
  DatePickerProps as NextDatePickerProps,
} from "@nextui-org/react";
import { DateValue } from "@internationalized/date";
import { I18nProvider } from "@react-aria/i18n";
import classnames from "classnames";

export interface DatePickerProps extends NextDatePickerProps {
  name: string;
}

export const DatePicker = ({
  classNames,
  errorMessage,
  onChange,
  ...props
}: DatePickerProps) => {
  // const formatter = useDateFormatter({ dateStyle: "full" });

  const handleChange = (date: DateValue) => {
    // console.log(formatter.format(date.toDate("America/Sao_Paulo")));
    onChange?.(date);
  };

  return (
    <I18nProvider locale="pt-BR">
      <NextDatePicker
        classNames={{
          calendarContent: "capitalize",
          inputWrapper: classnames(
            "border-small border-danger px-[16px]",
            classNames?.inputWrapper
          ),
          ...classNames,
        }}
        isInvalid={Boolean(errorMessage)}
        errorMessage={errorMessage}
        showMonthAndYearPickers
        fullWidth
        onChange={handleChange}
        {...props}
      />
    </I18nProvider>
  );
};
