import {
  ControlledCheckbox,
  ControlledCheckboxProps,
  UncontrolledCheckbox,
  UncontrolledCheckboxProps,
} from "./partials";

interface CheckboxProps {
  Controlled: ControlledCheckboxProps;
  Uncontrolled: UncontrolledCheckboxProps;
}

const Checkbox = {
  Form: ControlledCheckbox,
  Uncontrolled: UncontrolledCheckbox,
};

export type {
  CheckboxProps,
  ControlledCheckboxProps,
  UncontrolledCheckboxProps,
};
export {
  ControlledCheckbox as default,
  Checkbox,
  ControlledCheckbox,
  UncontrolledCheckbox,
};

// export * from "./partials";
