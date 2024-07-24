import styled from "styled-components";
import { EditorContent } from "@tiptap/react";

const HTMLDefaults = styled.div`
  ul {
    display: block;
    list-style-type: disc;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 40px;
    unicode-bidi: isolate;
  }

  ol {
    display: block;
    list-style-type: decimal;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 40px;
    unicode-bidi: isolate;
  }

  blockquote {
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 40px;
    margin-inline-end: 40px;
    unicode-bidi: isolate;
  }

  em {
    font-style: italic;
  }

  a {
    color: #006fee;
    text-underline-offset: 4px;
    text-decoration-line: underline;

    &:hover {
      opacity: 0.8;
    }
  }

  h1 {
    font-size: 2.5rem;
  }

  h2 {
    font-size: 2rem;
  }

  h3 {
    font-size: 1.75rem;
  }

  h4 {
    font-size: 1.5rem;
  }

  h5 {
    font-size: 1.25rem;
  }

  h6 {
    font-size: 1rem;
  }
`;

const EditorContainer = styled(HTMLDefaults)<{ $minWidth?: string }>`
  border-radius: 15px;
  background-color: hsl(
    var(--nextui-default-100) /
      var(--nextui-default-100-opacity, var(--tw-bg-opacity))
  );

  .is-active {
    background-color: #006fee;
    color: white;
  }

  & > div.control-group {
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    border: 1px solid #dedede;
    padding: 10px;
  }

  & > div.editor-content {
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
    border-left: 1px solid #dedede;
    border-right: 1px solid #dedede;
    border-bottom: 1px solid #dedede;
    padding: 0px 10px 10px 10px;

    & > div[contenteditable="true"] {
      outline: none;
      min-height: ${({ $minWidth }) => $minWidth ?? "100px"};

      & div[data-youtube-video],
      & div[data-youtube-video] iframe {
        max-width: 100%;
      }
    }
  }
`;

const EditorContentStyled = styled(EditorContent)<{ label?: string }>`
  &:before {
    content: "${({ label }) => label}";
    font-size: 12px;
    color: #52525b;
  }
`;

export { EditorContainer, EditorContentStyled };
