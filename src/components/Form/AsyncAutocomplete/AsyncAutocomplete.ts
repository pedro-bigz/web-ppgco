import {
  ControlledAsyncAutocomplete,
  ControlledAsyncAutocompleteProps,
  UncontrolledAsyncAutocomplete,
  UncontrolledAsyncAutocompleteProps,
} from "./partials";

interface AsyncAutocompleteProps {
  Controlled: ControlledAsyncAutocompleteProps;
  Uncontrolled: UncontrolledAsyncAutocompleteProps;
}

const AsyncAutocomplete = {
  Form: ControlledAsyncAutocomplete,
  Uncontrolled: UncontrolledAsyncAutocomplete,
};

export type {
  AsyncAutocompleteProps,
  ControlledAsyncAutocompleteProps,
  UncontrolledAsyncAutocompleteProps,
};
export {
  ControlledAsyncAutocomplete as default,
  AsyncAutocomplete,
  ControlledAsyncAutocomplete,
  UncontrolledAsyncAutocomplete,
};
