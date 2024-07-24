import { useController, useFormContext } from "react-hook-form";
import {
  OnChangeAttributes,
  ListBox,
  ListBoxOnChangeHandler,
  ListBoxProps,
} from "../ListBox";
import { TextField } from "components/Form/TextField";

export interface ControlledListBoxProps
  extends Omit<ListBoxProps, "errorMessage" | "onChange"> {
  onChange?: ListBoxOnChangeHandler;
}

export function ControlledListBox({
  name,
  track,
  onChange,
  defaultValue = "",
  ...props
}: ControlledListBoxProps) {
  const selectName = name + "_" + track.key;

  const { control, setValue } = useFormContext();
  const { field, formState } = useController({
    name: selectName,
    control,
    defaultValue,
  });
  const error = formState.errors[name];
  const selectError = formState.errors[selectName];

  const onSelectChange = ({ e, options, keys }: OnChangeAttributes) => {
    console.log({ e, options });
    field.onChange(new Set(e.target.value.split(",")));
    setValue(name, options);
    onChange?.({ e, options, keys });
  };

  return (
    <>
      <TextField.Form isHidden name={name} />
      <ListBox
        {...props}
        track={track}
        name={selectName}
        value={field.value}
        errorMessage={(error?.message ?? selectError?.message) as string}
        onChange={onSelectChange}
      />
    </>
  );
}
