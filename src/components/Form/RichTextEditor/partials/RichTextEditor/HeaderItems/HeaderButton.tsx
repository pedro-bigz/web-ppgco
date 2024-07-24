import classnames from "classnames";
import { Button, Tooltip } from "@nextui-org/react";
import { Tools } from "../RichTextEditor.tools";
import { HeaderButtonTooltip } from "./HeaderButtonTooltip";

export interface HeaderButtonProps {
  tool: Tools;
}

export function HeaderButton({ tool }: HeaderButtonProps) {
  return (
    <Tooltip
      size="sm"
      placement="bottom-start"
      content={
        <HeaderButtonTooltip text={tool.title} shortcut={tool.shortcut} />
      }
    >
      <Button
        size="sm"
        variant="flat"
        className={classnames("bg-white min-w-12", {
          "is-active": tool?.isActive,
        })}
        onClick={() => tool.action?.()}
      >
        {tool.icon}
      </Button>
    </Tooltip>
  );
}
