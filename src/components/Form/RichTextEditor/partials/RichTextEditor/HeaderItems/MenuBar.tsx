import { ButtonGroup } from "@nextui-org/react";
import { useTools } from "../RichTextEditor.tools";
import { Editor } from "@tiptap/react";
import { HeaderButton } from "./HeaderButton";
import { ColorMenu } from "./ColorMenu";
import { YoutubeInputPopover } from "./YoutubeInputPopover";
import { ImageInputPopover } from "./ImageInputPopover";
import { LinkInputPopover } from "./LinkInputPopover";
import { HeadingsDropdown } from "./HeadingsDropdown";

interface MenuBarProps {
  editor: Editor | null;
  lang: "pt" | "en";
}

export function MenuBar({ editor, lang = "pt" }: MenuBarProps) {
  if (!editor) {
    return null;
  }

  const { tools } = useTools({ editor, lang });

  return (
    <div className="control-group">
      <div className="flex flex-col">
        <div className="flex flex-wrap gap-2">
          <ButtonGroup>
            <HeaderButton tool={tools.undo} />
            <HeaderButton tool={tools.redo} />
          </ButtonGroup>
          <ButtonGroup>
            <HeaderButton tool={tools.bold} />
            <HeaderButton tool={tools.italic} />
            <HeaderButton tool={tools.strike} />
            <HeaderButton tool={tools.underline} />
            <HeaderButton tool={tools.subscript} />
            <HeaderButton tool={tools.superscript} />
          </ButtonGroup>
          <ButtonGroup>
            <ColorMenu tool={tools.color} />
            <ColorMenu tool={tools.highlight} />
          </ButtonGroup>
          <ButtonGroup>
            <HeaderButton tool={tools.left} />
            <HeaderButton tool={tools.center} />
            <HeaderButton tool={tools.right} />
            <HeaderButton tool={tools.justify} />
          </ButtonGroup>
          <ButtonGroup>
            <LinkInputPopover tool={tools.link} />
            <ImageInputPopover tool={tools.image} />
            <YoutubeInputPopover tool={tools.youtube} />
          </ButtonGroup>
          <ButtonGroup>
            <HeaderButton tool={tools.paragraph} />
            <HeaderButton tool={tools.blockquote} />
            <HeadingsDropdown tool={tools.headings} />
          </ButtonGroup>
          <ButtonGroup>
            <HeaderButton tool={tools.bulletList} />
            <HeaderButton tool={tools.orderedList} />
          </ButtonGroup>
          <ButtonGroup>
            <HeaderButton tool={tools.code} />
            <HeaderButton tool={tools.codeBlock} />
            <HeaderButton tool={tools.horizontalRule} />
            <HeaderButton tool={tools.hardBreak} />
          </ButtonGroup>
        </div>
      </div>
    </div>
  );
}
