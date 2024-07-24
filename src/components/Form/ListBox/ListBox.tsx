import {
  ControlledListBox,
  ControlledListBoxProps,
  UncontrolledListBox,
  UncontrolledListBoxProps,
} from "./partials";

interface ListBoxProps {
  Controlled: ControlledListBoxProps;
  Uncontrolled: UncontrolledListBoxProps;
}

const ListBox = {
  Form: ControlledListBox,
  Uncontrolled: UncontrolledListBox,
};

export type { ListBoxProps, ControlledListBoxProps, UncontrolledListBoxProps };
export { ControlledListBox as default, ListBox };
