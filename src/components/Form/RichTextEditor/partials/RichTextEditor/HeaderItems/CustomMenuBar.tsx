import { ButtonGroup } from "@nextui-org/react";
import { useTools } from "../RichTextEditor.tools";
import { Editor } from "@tiptap/react";
import { HeaderButton } from "./HeaderButton";
import { ColorMenu } from "./ColorMenu";
import { YoutubeInputPopover } from "./YoutubeInputPopover";
import { ImageInputPopover } from "./ImageInputPopover";
import { LinkInputPopover } from "./LinkInputPopover";
import { HeaderDropdown, HeaderDropdownItemProps } from "./HeaderDropdown";
import _isEmpty from "lodash/isEmpty";

export type RichTextEditorCustomMenu = (string | HeaderDropdownItemProps)[][];

export interface CustomMenuBarProps {
  editor: Editor | null;
  menus: RichTextEditorCustomMenu;
  lang: "pt" | "en";
}

export interface ComponentInterface {
  (...args: any): JSX.Element;
}

export function CustomMenuBar({
  editor,
  menus,
  lang = "pt",
}: CustomMenuBarProps) {
  if (!editor) {
    return null;
  }

  const { tools } = useTools({ editor, lang });

  return (
    <div className="control-group">
      <div className="flex flex-col">
        <div className="flex flex-wrap gap-2">
          {menus.map((menu) => (
            <ButtonGroup>
              {menu.map((item) => {
                const Components: Record<string, ComponentInterface> = {
                  color: ColorMenu,
                  highlight: ColorMenu,
                  link: LinkInputPopover,
                  image: ImageInputPopover,
                  youtube: YoutubeInputPopover,
                };

                if (typeof item === "string") {
                  const Component = Components[item] ?? HeaderButton;
                  return <Component tool={tools[item]} />;
                }

                if (!item.childrens || _isEmpty(item.childrens)) {
                  const Component = Components[item.key] ?? HeaderButton;
                  return <Component tool={{ ...tools[item.key], ...item }} />;
                }

                return (
                  <HeaderDropdown editor={editor} item={item} lang={lang} />
                );
              })}
            </ButtonGroup>
          ))}
        </div>
      </div>
    </div>
  );
}
