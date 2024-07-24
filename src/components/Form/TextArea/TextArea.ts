import {
  ControlledTextArea,
  ControlledTextAreaProps,
  UncontrolledTextArea,
  UncontrolledTextAreaProps,
} from "./partials";

interface TextAreaProps {
  Controlled: ControlledTextAreaProps;
  Uncontrolled: UncontrolledTextAreaProps;
}

const TextArea = {
  Form: ControlledTextArea,
  Uncontrolled: UncontrolledTextArea,
};

export type {
  TextAreaProps,
  ControlledTextAreaProps,
  UncontrolledTextAreaProps,
};
export {
  ControlledTextArea as default,
  TextArea,
  ControlledTextArea,
  UncontrolledTextArea,
};
