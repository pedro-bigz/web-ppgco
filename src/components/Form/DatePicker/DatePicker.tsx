import {
  ControlledDatePicker,
  ControlledDatePickerProps,
} from "./partials/ControlledDatePicker";
import {
  UncontrolledDatePicker,
  UncontrolledDatePickerProps,
} from "./partials/UncontrolledDatePicker";

interface DatePickerProps {
  Controlled: ControlledDatePickerProps;
  Uncontrolled: UncontrolledDatePickerProps;
}

const DatePicker = {
  Form: ControlledDatePicker,
  Uncontrolled: UncontrolledDatePicker,
};

export type {
  DatePickerProps,
  ControlledDatePickerProps,
  UncontrolledDatePickerProps,
};

export { ControlledDatePicker as default, DatePicker };
