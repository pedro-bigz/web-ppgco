import { ListBox, ListBoxProps } from "../ListBox";

export type UncontrolledListBoxProps = ListBoxProps;

export function UncontrolledListBox({
  name,
  ...props
}: UncontrolledListBoxProps) {
  return <ListBox {...props} name={name} />;
}
