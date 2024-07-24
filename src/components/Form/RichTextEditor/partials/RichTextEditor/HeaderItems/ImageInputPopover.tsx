import { faImage } from "@fortawesome/free-solid-svg-icons";
import { Editor } from "@tiptap/react";
import { useState } from "react";
import { DataInputPopover } from "./DataInputPopover";
import { Tools } from "../RichTextEditor.tools";

interface ImageInputPopoverProps {
  tool: Tools;
}

export function ImageInputPopover({ tool }: ImageInputPopoverProps) {
  const [imageUrl, setImageUrl] = useState<string>("");

  const addImageVideo = () => {
    if (!imageUrl) return;
    tool?.action?.(imageUrl);
  };

  return (
    <DataInputPopover
      name="imageUrl"
      label="Link da Imagem"
      buttonLabel="Adicionar Imagem"
      value={imageUrl}
      onChange={setImageUrl}
      onAction={addImageVideo}
      icon={faImage}
      iconProps={{ width: "22px" }}
    />
  );
}
