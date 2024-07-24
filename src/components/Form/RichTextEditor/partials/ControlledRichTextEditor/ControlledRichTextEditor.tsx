import _get from "lodash/get";
import { useController, useFormContext } from "react-hook-form";
import { RichTextEditor, RichTextEditorProps } from "../RichTextEditor";

export interface ControlledRichTextEditorProps
  extends Omit<RichTextEditorProps, "label" | "value" | "onChange"> {
  name: string;
  label: string;
  defaultValue?: string;
}

export function ControlledRichTextEditor({
  name,
  label,
  defaultValue,
  ...props
}: ControlledRichTextEditorProps) {
  const { control } = useFormContext();
  const { field, formState } = useController({
    name,
    control,
    defaultValue,
  });
  const errors = _get(formState.errors, name);

  return (
    <div>
      <RichTextEditor
        {...props}
        label={label}
        value={field.value}
        onChange={field.onChange}
      />
      {errors && <small>{String(errors)}</small>}
    </div>
  );
}
