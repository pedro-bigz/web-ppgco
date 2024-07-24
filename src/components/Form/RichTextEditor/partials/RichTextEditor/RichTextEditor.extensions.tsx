import Color from "@tiptap/extension-color";
import Heading from "@tiptap/extension-heading";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Dropcursor from "@tiptap/extension-dropcursor";
import Image from "@tiptap/extension-image";
import BulletList from "@tiptap/extension-bullet-list";
import Youtube from "@tiptap/extension-youtube";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";

export const tipTapExtensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
  }),
  BulletList.configure({
    keepMarks: true,
    keepAttributes: true,
  }),
  Highlight.configure({ multicolor: true }),
  Document,
  Paragraph,
  Text,
  Heading,
  Subscript,
  Superscript,
  Dropcursor,
  Image,
  Youtube.configure({
    allowFullscreen: true,
  }),
  Underline,
  TextStyle,
  Link.configure({
    openOnClick: false,
    autolink: true,
    linkOnPaste: false,
    defaultProtocol: "https",
  } as any),
];
