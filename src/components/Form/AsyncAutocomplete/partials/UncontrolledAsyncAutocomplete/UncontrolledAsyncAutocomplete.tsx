import {
  AsyncAutocomplete,
  AsyncAutocompleteProps,
} from "../AsyncAutocomplete";

export interface UncontrolledAsyncAutocompleteProps
  extends AsyncAutocompleteProps {}

export function UncontrolledAsyncAutocomplete({
  name,
  ...props
}: UncontrolledAsyncAutocompleteProps) {
  return <AsyncAutocomplete {...props} name={name} />;
}
