import {
  ControlledTextField,
  ControlledTextFieldProps,
} from "./partials/ControlledTextField";
import {
  UncontrolledTextField,
  UncontrolledTextFieldProps,
} from "./partials/UncontrolledTextField";

interface TextFieldProps {
  Controlled: ControlledTextFieldProps;
  Uncontrolled: UncontrolledTextFieldProps;
}

const TextField = {
  Form: ControlledTextField,
  Uncontrolled: UncontrolledTextField,
};

export type {
  TextFieldProps,
  ControlledTextFieldProps,
  UncontrolledTextFieldProps,
};

export {
  ControlledTextField as default,
  TextField,
  ControlledTextField,
  UncontrolledTextField,
};
