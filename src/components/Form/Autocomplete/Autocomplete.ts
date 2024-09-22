import {
  ControlledAutocomplete,
  ControlledAutocompleteProps,
  UncontrolledAutocomplete,
  UncontrolledAutocompleteProps,
  AutocompleteOnChangeHandler,
} from "./partials";

interface AutocompleteProps {
  Controlled: ControlledAutocompleteProps;
  Uncontrolled: UncontrolledAutocompleteProps;
}

const Autocomplete = {
  Form: ControlledAutocomplete,
  Uncontrolled: UncontrolledAutocomplete,
};

export type {
  AutocompleteProps,
  ControlledAutocompleteProps,
  UncontrolledAutocompleteProps,
  AutocompleteOnChangeHandler,
};
export {
  ControlledAutocomplete as default,
  Autocomplete,
  ControlledAutocomplete,
  UncontrolledAutocomplete,
};

// export * from "./partials";
