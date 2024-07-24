import { Editor } from "@tiptap/react";
import { useState } from "react";
import { DataInputPopover } from "./DataInputPopover";
import { YoutubeIcon } from "assets";
import { Tools } from "../RichTextEditor.tools";

interface YoutubeInputPopoverProps {
  tool: Tools;
}

export function YoutubeInputPopover({ tool }: YoutubeInputPopoverProps) {
  const [youtubeUrl, setYoutubeUrl] = useState<string>("");
  const [width, setWidth] = useState<string>("889");
  const [height, setHeight] = useState<string>("500");

  const addYoutubeVideo = () => {
    if (!youtubeUrl) return;
    tool?.action?.(youtubeUrl, width, height);
  };

  return (
    <DataInputPopover
      name="youtubeUrl"
      label="Link da Youtube"
      buttonLabel="Adicionar vídeo"
      value={youtubeUrl}
      onChange={setYoutubeUrl}
      onAction={addYoutubeVideo}
      icon={YoutubeIcon}
      iconProps={{ width: "20px", color: "red" }}
      width={width}
      height={height}
      onChangeWidth={setWidth}
      onChangeHeight={setHeight}
    />
  );
}
