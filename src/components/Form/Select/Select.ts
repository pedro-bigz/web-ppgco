import {
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

export type { SelectProps, ControlledSelectProps, UncontrolledSelectProps };
export {
  // ControlledSelect as default,
  Select,
  // ControlledSelect,
  // UncontrolledSelect,
};

// export * from "./partials";
