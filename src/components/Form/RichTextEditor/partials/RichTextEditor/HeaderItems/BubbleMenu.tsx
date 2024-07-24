import { ButtonGroup } from "@nextui-org/react";
import { BubbleMenu as TipTapBubbleMenu, Editor } from "@tiptap/react";
import { useTools } from "../RichTextEditor.tools";
import { Langs } from "../RichTextEditor.lang";
import { HeaderButton } from "./HeaderButton";

export interface BubbleMenuProps {
  editor: Editor | null;
  lang: Langs;
}

export function BubbleMenu({ editor, lang = "pt" }: BubbleMenuProps) {
  if (!editor) return null;

  const { tools } = useTools({ editor, lang });

  return (
    <TipTapBubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
      <ButtonGroup>
        <HeaderButton tool={tools.bold} />
        <HeaderButton tool={tools.italic} />
        <HeaderButton tool={tools.strike} />
        <HeaderButton tool={tools.underline} />
      </ButtonGroup>
    </TipTapBubbleMenu>
  );
}
