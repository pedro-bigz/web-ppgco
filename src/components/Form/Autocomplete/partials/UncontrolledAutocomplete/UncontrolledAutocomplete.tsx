import { Autocomplete, AutocompleteProps } from "../Autocomplete";

export interface UncontrolledAutocompleteProps extends AutocompleteProps {}

export function UncontrolledAutocomplete({
  variant = "bordered",
  ...props
}: UncontrolledAutocompleteProps) {
  return <Autocomplete {...props} variant={variant} />;
}
