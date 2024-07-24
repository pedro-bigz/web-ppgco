import {
  ControlledAutocomplete,
  ControlledAutocompleteProps,
  UncontrolledAutocomplete,
  UncontrolledAutocompleteProps,
  AutocompleteOption,
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
  AutocompleteOption,
  AutocompleteOnChangeHandler,
};
export {
  ControlledAutocomplete as default,
  Autocomplete,
  ControlledAutocomplete,
  UncontrolledAutocomplete,
};

// export * from "./partials";
