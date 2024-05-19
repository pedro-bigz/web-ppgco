import {
  Track,
  SelectOption,
  SelectOptions,
  ControlledSelect,
  ControlledSelectProps,
  UncontrolledSelect,
  UncontrolledSelectProps,
} from "./partials";

interface SelectProps {
  Controlled: ControlledSelectProps;
  Uncontrolled: UncontrolledSelectProps;
}

const Select = {
  Form: ControlledSelect,
  Uncontrolled: UncontrolledSelect,
};

export type {
  Track,
  SelectProps,
  SelectOption,
  SelectOptions,
  ControlledSelectProps,
  UncontrolledSelectProps,
};
export { ControlledSelect as default, Select };
