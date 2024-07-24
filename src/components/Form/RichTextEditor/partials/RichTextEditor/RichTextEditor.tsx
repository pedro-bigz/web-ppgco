import { useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";

import {
  MenuBar,
  BubbleMenu,
  CustomMenuBar,
  RichTextEditorCustomMenu,
} from "./HeaderItems";
import { EditorContainer, EditorContentStyled } from "./RichTextEditor.style";
import { tipTapExtensions } from "./RichTextEditor.extensions";

export interface RichTextEditorProps {
  lang?: "pt" | "en";
  label?: string;
  value: string;
  isDisabled?: boolean;
  menus?: RichTextEditorCustomMenu;
  onChange: (value: string) => void;
}

export function RichTextEditor({
  lang = "pt",
  label,
  value,
  menus,
  isDisabled = false,
  onChange,
}: RichTextEditorProps) {
  const onUpdate = ({ editor }: any) => {
    onChange(editor.getHTML());
    console.log(editor.getHTML());
  };

  const editor = useEditor({
    extensions: tipTapExtensions,
    content: value,
    onUpdate,
  });

  useEffect(() => {
    if (editor) {
      editor.setEditable(!isDisabled);
    }
  }, [isDisabled, editor]);

  return (
    <EditorContainer>
      {menus ? (
        <CustomMenuBar menus={menus} lang={lang} editor={editor} />
      ) : (
        <MenuBar lang={lang} editor={editor} />
      )}
      <BubbleMenu lang={lang} editor={editor} />
      <EditorContentStyled
        label={label}
        editor={editor}
        className="editor-content"
      />
    </EditorContainer>
  );
}
