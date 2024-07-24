import {
  ControlledAsyncSelect,
  ControlledAsyncSelectProps,
  UncontrolledAsyncSelect,
  UncontrolledAsyncSelectProps,
} from "./partials";

interface AsyncSelectProps {
  Controlled: ControlledAsyncSelectProps;
  Uncontrolled: UncontrolledAsyncSelectProps;
}

const AsyncSelect = {
  Form: ControlledAsyncSelect,
  Uncontrolled: UncontrolledAsyncSelect,
};

export type {
  AsyncSelectProps,
  ControlledAsyncSelectProps,
  UncontrolledAsyncSelectProps,
};
export {
  ControlledAsyncSelect as default,
  AsyncSelect,
  ControlledAsyncSelect,
  UncontrolledAsyncSelect,
};
