import {
  ControlledRichTextEditor,
  ControlledRichTextEditorProps,
} from "./partials/ControlledRichTextEditor";
import {
  UncontrolledRichTextEditor,
  UncontrolledRichTextEditorProps,
} from "./partials/UncontrolledRichTextEditor";

interface RichTextEditorProps {
  Controlled: ControlledRichTextEditorProps;
  Uncontrolled: UncontrolledRichTextEditorProps;
}

const RichTextEditor = {
  Form: ControlledRichTextEditor,
  Uncontrolled: UncontrolledRichTextEditor,
};

export type {
  RichTextEditorProps,
  ControlledRichTextEditorProps,
  UncontrolledRichTextEditorProps,
};

export {
  ControlledRichTextEditor as default,
  RichTextEditor,
  ControlledRichTextEditor,
  UncontrolledRichTextEditor,
};
