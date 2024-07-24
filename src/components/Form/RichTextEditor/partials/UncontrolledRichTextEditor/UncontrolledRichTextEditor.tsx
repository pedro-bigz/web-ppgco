import _get from "lodash/get";
import { RichTextEditor, RichTextEditorProps } from "../RichTextEditor";

export interface UncontrolledRichTextEditorProps extends RichTextEditorProps {
  name: string;
  errorMessage: string;
}

export function UncontrolledRichTextEditor({
  name,
  errorMessage,
  ...props
}: UncontrolledRichTextEditorProps) {
  return (
    <div>
      <RichTextEditor {...props} />
      {errorMessage && <small>{errorMessage}</small>}
    </div>
  );
}
