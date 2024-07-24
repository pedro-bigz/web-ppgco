import { faLink } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { DataInputPopover } from "./DataInputPopover";
import { Tools } from "../RichTextEditor.tools";

interface LinkInputPopoverProps {
  tool: Tools;
}

export function LinkInputPopover({ tool }: LinkInputPopoverProps) {
  const [url, setUrl] = useState<string>("");

  const toggleLink = () => {
    tool.action?.(url);
  };

  return (
    <DataInputPopover
      name="url"
      label="Link"
      details="Para remover, basta deletar o hiperlink e clicar em Adicionar Hiperlink"
      buttonLabel="Adicionar Hiperlink"
      value={url}
      onChange={setUrl}
      onAction={toggleLink}
      icon={faLink}
      iconProps={{ width: "22px" }}
    />
  );
}
