import { useRef, useState } from "react";
import { HexColorPicker } from "react-colorful";
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tooltip,
} from "@nextui-org/react";
import { useOutSideClick } from "core";
import { Tools } from "../RichTextEditor.tools";

export interface ColorMenuProps {
  tool: Tools;
}

export function ColorMenu({ tool }: ColorMenuProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [color, setColor] = useState<string>("");

  useOutSideClick({ elementRef, onClickOutside: () => setIsOpen(false) });

  return (
    <Popover ref={elementRef} isOpen={isOpen} placement="bottom-end">
      <PopoverTrigger>
        <Button
          size="sm"
          variant="flat"
          className="bg-white min-w-12"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Tooltip placement="bottom" content={tool.title}>
            <span>{tool.icon}</span>
          </Tooltip>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] min-w-[200px!important] shadow-none p-0">
        <HexColorPicker
          color={color}
          onChange={(color: string) => {
            tool?.action?.(color);
            setColor(color);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
