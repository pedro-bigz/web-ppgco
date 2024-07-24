import {
  faAlignCenter,
  faAlignJustify,
  faAlignLeft,
  faAlignRight,
  faBold,
  faCode,
  faCube,
  faFont,
  faImage,
  faItalic,
  faLink,
  faList,
  faListOl,
  faMinus,
  faParagraph,
  faQuoteLeft,
  faRotateLeft,
  faRotateRight,
  faSquareXmark,
  faStrikethrough,
  faSubscript,
  faSuperscript,
  faUnderline,
} from "@fortawesome/free-solid-svg-icons";
import { CanCommands, Editor } from "@tiptap/react";
import { Icon } from "components/Icon";
import { Langs, trans } from "./RichTextEditor.lang";
import { Kbd } from "components/Kbd";
import { HeadingIcon, TurnLeftIcon } from "assets";
import { useMemo } from "react";

export type Headings = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export type Tools = {
  action?: (...args: string[]) => boolean;
  icon?: JSX.Element;
  title: string;
  shortcut?: string | JSX.Element;
  className?: string;
  isActive?: boolean;
  isDisabled?: boolean;
  childrens?: Record<string, Tools>;
};

export interface UseToolsParams {
  editor: Editor;
  lang: Langs;
}

export interface UseToolsResponse {
  tools: Record<string, Tools>;
}

export function useTools({
  editor,
  lang = "pt",
}: UseToolsParams): UseToolsResponse {
  const getEditorFocus = (editor: Editor | CanCommands) => {
    return editor.chain().focus();
  };

  const resetLink = () => {
    return getEditorFocus(editor).extendMarkRange("link").unsetLink().run();
  };

  const tools = useMemo(
    () => ({
      undo: {
        action: () => getEditorFocus(editor).undo().run(),
        isDisabled: !getEditorFocus(editor.can()).undo().run(),
        icon: <Icon icon={faRotateLeft} />,
        title: trans.undo[lang],
        shortcut: <Kbd keys={["ctrl"]}>R</Kbd>,
      },
      redo: {
        action: () => getEditorFocus(editor).redo().run(),
        isDisabled: !getEditorFocus(editor.can()).redo().run(),
        icon: <Icon icon={faRotateRight} />,
        title: trans.redo[lang],
        shortcut: <Kbd keys={["ctrl"]}>Y</Kbd>,
      },
      bold: {
        action: () => getEditorFocus(editor).toggleBold().run(),
        isDisabled: !getEditorFocus(editor.can()).toggleBold().run(),
        isActive: editor.isActive("bold"),
        icon: <Icon icon={faBold} />,
        title: trans.bold[lang],
        shortcut: <Kbd keys={["ctrl"]}>B</Kbd>,
      },
      italic: {
        action: () => getEditorFocus(editor).toggleItalic().run(),
        isDisabled: !getEditorFocus(editor.can()).toggleItalic().run(),
        isActive: editor.isActive("italic"),
        icon: <Icon icon={faItalic} />,
        title: trans.italic[lang],
        shortcut: <Kbd keys={["ctrl"]}>I</Kbd>,
      },
      strike: {
        action: () => getEditorFocus(editor).toggleStrike().run(),
        isDisabled: !getEditorFocus(editor.can()).toggleStrike().run(),
        isActive: editor.isActive("strike"),
        icon: <Icon icon={faStrikethrough} />,
        title: trans.strike[lang],
        shortcut: <Kbd keys={["ctrl", "shift"]}>S</Kbd>,
      },
      underline: {
        action: () => getEditorFocus(editor).toggleUnderline().run(),
        isDisabled: !getEditorFocus(editor.can()).toggleUnderline().run(),
        isActive: editor.isActive("underline"),
        icon: <Icon icon={faUnderline} />,
        title: trans.underline[lang],
        shortcut: <Kbd keys={["ctrl"]}>U</Kbd>,
      },
      subscript: {
        action: () => getEditorFocus(editor).toggleSubscript().run(),
        isDisabled: !getEditorFocus(editor.can()).toggleSubscript().run(),
        isActive: editor.isActive("subscript"),
        icon: <Icon icon={faSubscript} />,
        title: trans.subscript[lang],
        shortcut: <Kbd keys={["ctrl"]}>,</Kbd>,
      },
      superscript: {
        action: () => getEditorFocus(editor).toggleSuperscript().run(),
        isDisabled: !getEditorFocus(editor.can()).toggleSuperscript().run(),
        isActive: editor.isActive("superscript"),
        icon: <Icon icon={faSuperscript} />,
        title: trans.superscript[lang],
        shortcut: <Kbd keys={["ctrl"]}>.</Kbd>,
      },
      code: {
        action: () => getEditorFocus(editor).toggleCode().run(),
        isDisabled: !getEditorFocus(editor.can()).toggleCode().run(),
        isActive: editor.isActive("code"),
        icon: <Icon icon={faCode} />,
        title: trans.code[lang],
        shortcut: <Kbd keys={["ctrl"]}>E</Kbd>,
      },
      bulletList: {
        action: () => getEditorFocus(editor).toggleBulletList().run(),
        isActive: editor.isActive("bulletList"),
        icon: <Icon icon={faList} />,
        title: trans.bulletList[lang],
        shortcut: <Kbd keys={["ctrl", "shift"]}>8</Kbd>,
      },
      orderedList: {
        action: () => getEditorFocus(editor).toggleOrderedList().run(),
        isActive: editor.isActive("orderedList"),
        icon: <Icon icon={faListOl} />,
        title: trans.orderedList[lang],
        shortcut: <Kbd keys={["ctrl", "shift"]}>7</Kbd>,
      },
      codeBlock: {
        action: () => getEditorFocus(editor).toggleCodeBlock().run(),
        isActive: editor.isActive("codeBlock"),
        icon: <Icon icon={faCube} />,
        title: trans.codeBlock[lang],
        shortcut: <Kbd keys={["ctrl", "option"]}>C</Kbd>,
      },
      blockquote: {
        action: () => getEditorFocus(editor).toggleBlockquote().run(),
        isActive: editor.isActive("blockquote"),
        icon: <Icon icon={faQuoteLeft} />,
        title: trans.blockquote[lang],
        shortcut: <Kbd keys={["ctrl", "shift"]}>B</Kbd>,
      },
      paragraph: {
        action: () => getEditorFocus(editor).setParagraph().run(),
        isActive: editor.isActive("paragraph"),
        icon: <Icon icon={faParagraph} />,
        title: trans.paragraph[lang],
        shortcut: <Kbd keys={["ctrl", "option"]}>0</Kbd>,
      },
      clearMarks: {
        action: () => getEditorFocus(editor).unsetAllMarks().run(),
        icon: <Icon icon={faSquareXmark} />,
        title: trans.clearMarks[lang],
        shortcut: "",
      },
      clearNodes: {
        action: () => getEditorFocus(editor).clearNodes().run(),
        icon: <Icon icon={faRotateLeft} />,
        title: trans.clearNodes[lang],
        shortcut: "",
      },
      horizontalRule: {
        action: () => getEditorFocus(editor).setHorizontalRule().run(),
        icon: <Icon icon={faMinus} />,
        title: trans.horizontalRule[lang],
      },
      hardBreak: {
        action: () => getEditorFocus(editor).setHardBreak().run(),
        icon: <Icon icon={TurnLeftIcon} iconProps={{ width: "18px" }} />,
        title: trans.hardBreak[lang],
        shortcut: <Kbd keys={["shift", "enter", "ctrl", "enter"]}></Kbd>,
      },
      color: {
        action: (color: string) => getEditorFocus(editor).setColor(color).run(),
        icon: <Icon icon={faFont} />,
        title: trans.color[lang],
      },
      highlight: {
        action: (color: string) =>
          getEditorFocus(editor).toggleHighlight({ color }).run(),
        icon: (
          <span className="bg-primary text-white px-1">
            <Icon icon={faFont} />
          </span>
        ),
        title: trans.highlight[lang],
      },
      youtube: {
        action: (src: string, width: string, height: string) =>
          editor.commands?.setYoutubeVideo({
            src,
            width: parseInt(width, 10),
            height: parseInt(height, 10),
          }),
        icon: <Icon icon={faLink} />,
        title: trans.link[lang],
      },
      image: {
        action: (src: string) => getEditorFocus(editor).setImage({ src }).run(),
        icon: <Icon icon={faImage} />,
        title: trans.image[lang],
      },
      link: {
        action: (href: string) => {
          if (href === "") return resetLink();

          return getEditorFocus(editor)
            .extendMarkRange("link")
            .setLink({ href, target: "_blank" })
            .run();
        },
        icon: <Icon icon={faLink} />,
        title: trans.link[lang],
      },
      left: {
        action: () => getEditorFocus(editor).setTextAlign("left").run(),
        isActive: editor.isActive({ textAlign: "left" }),
        icon: <Icon icon={faAlignLeft} />,
        title: trans.left[lang],
        shortcut: <Kbd keys={["ctrl", "shift"]}>L</Kbd>,
      },
      right: {
        action: () => getEditorFocus(editor).setTextAlign("right").run(),
        isActive: editor.isActive({ textAlign: "right" }),
        icon: <Icon icon={faAlignRight} />,
        title: trans.center[lang],
        shortcut: <Kbd keys={["ctrl", "shift"]}>R</Kbd>,
      },
      center: {
        action: () => getEditorFocus(editor).setTextAlign("center").run(),
        isActive: editor.isActive({ textAlign: "center" }),
        icon: <Icon icon={faAlignCenter} />,
        title: trans.right[lang],
        shortcut: <Kbd keys={["ctrl", "shift"]}>E</Kbd>,
      },
      justify: {
        action: () => getEditorFocus(editor).setTextAlign("justify").run(),
        isActive: editor.isActive({ textAlign: "justify" }),
        icon: <Icon icon={faAlignJustify} />,
        title: trans.justify[lang],
        shortcut: <Kbd keys={["ctrl", "shift"]}>J</Kbd>,
      },
      h1: {
        action: () => getEditorFocus(editor).toggleHeading({ level: 1 }).run(),
        isActive: editor.isActive("heading", { level: 1 }),
        className: "text-xl",
        title: trans.headings.childrens.h1[lang],
        shortcut: <Kbd keys={["ctrl", "option"]}>1</Kbd>,
      },
      h2: {
        action: () => getEditorFocus(editor).toggleHeading({ level: 2 }).run(),
        isActive: editor.isActive("heading", { level: 2 }),
        title: trans.headings.childrens.h2[lang],
        shortcut: <Kbd keys={["ctrl", "option"]}>2</Kbd>,
      },
      h3: {
        action: () => getEditorFocus(editor).toggleHeading({ level: 3 }).run(),
        isActive: editor.isActive("heading", { level: 3 }),
        title: trans.headings.childrens.h3[lang],
        shortcut: <Kbd keys={["ctrl", "option"]}>3</Kbd>,
      },
      h4: {
        action: () => getEditorFocus(editor).toggleHeading({ level: 4 }).run(),
        isActive: editor.isActive("heading", { level: 4 }),
        title: trans.headings.childrens.h4[lang],
        shortcut: <Kbd keys={["ctrl", "option"]}>4</Kbd>,
      },
      h5: {
        action: () => getEditorFocus(editor).toggleHeading({ level: 5 }).run(),
        isActive: editor.isActive("heading", { level: 5 }),
        title: trans.headings.childrens.h5[lang],
        shortcut: <Kbd keys={["ctrl", "option"]}>5</Kbd>,
      },
      h6: {
        action: () => getEditorFocus(editor).toggleHeading({ level: 6 }).run(),
        isActive: editor.isActive("heading", { level: 6 }),
        title: trans.headings.childrens.h6[lang],
        shortcut: <Kbd keys={["ctrl", "option"]}>6</Kbd>,
      },
      headings: {
        title: trans.headings[lang],
        icon: <Icon icon={HeadingIcon} iconProps={{ width: "15px" }} />,
        childrens: {
          h1: {
            action: () =>
              getEditorFocus(editor).toggleHeading({ level: 1 }).run(),
            isActive: editor.isActive("heading", { level: 1 }),
            className: "text-xl",
            title: trans.headings.childrens.h1[lang],
            shortcut: <Kbd keys={["ctrl", "option"]}>1</Kbd>,
          },
          h2: {
            action: () =>
              getEditorFocus(editor).toggleHeading({ level: 2 }).run(),
            isActive: editor.isActive("heading", { level: 2 }),
            title: trans.headings.childrens.h2[lang],
            shortcut: <Kbd keys={["ctrl", "option"]}>2</Kbd>,
          },
          h3: {
            action: () =>
              getEditorFocus(editor).toggleHeading({ level: 3 }).run(),
            isActive: editor.isActive("heading", { level: 3 }),
            title: trans.headings.childrens.h3[lang],
            shortcut: <Kbd keys={["ctrl", "option"]}>3</Kbd>,
          },
          h4: {
            action: () =>
              getEditorFocus(editor).toggleHeading({ level: 4 }).run(),
            isActive: editor.isActive("heading", { level: 4 }),
            title: trans.headings.childrens.h4[lang],
            shortcut: <Kbd keys={["ctrl", "option"]}>4</Kbd>,
          },
          h5: {
            action: () =>
              getEditorFocus(editor).toggleHeading({ level: 5 }).run(),
            isActive: editor.isActive("heading", { level: 5 }),
            title: trans.headings.childrens.h5[lang],
            shortcut: <Kbd keys={["ctrl", "option"]}>5</Kbd>,
          },
          h6: {
            action: () =>
              getEditorFocus(editor).toggleHeading({ level: 6 }).run(),
            isActive: editor.isActive("heading", { level: 6 }),
            title: trans.headings.childrens.h6[lang],
            shortcut: <Kbd keys={["ctrl", "option"]}>6</Kbd>,
          },
        },
      },
    }),
    [editor]
  );

  return { tools };
}

export const richTextHeadings = {
  h1: "text-[2.5rem] leading-[2.5rem]",
  h2: "text-[2rem] leading-[2rem]",
  h3: "text-[1.75rem] leading-[1.75rem]",
  h4: "text-[1.5rem] leading-[1.5rem]",
  h5: "text-[1.25rem] leading-[1.25rem]",
  h6: "text-[1rem] leading-[1rem]",
};
