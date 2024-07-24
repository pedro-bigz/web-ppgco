import { TextField } from "components/Form";
import { GenericIconDefinition, Icon } from "components/Icon";
import {
  Popover,
  PopoverTrigger,
  Button,
  PopoverContent,
} from "@nextui-org/react";
import _isEmpty from "lodash/isEmpty";
import { FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
import { handleEvent } from "utils";

interface DataInputPopoverProps {
  name: string;
  text?: string;
  label: string;
  value: string;
  width?: string;
  height?: string;
  details?: string;
  buttonLabel: string;
  icon?: GenericIconDefinition;
  iconProps?: FontAwesomeIconProps | React.SVGProps<SVGSVGElement>;
  onChange: (value: string) => void;
  onAction: React.MouseEventHandler<HTMLButtonElement>;
  onChangeWidth?: (value: string) => void;
  onChangeHeight?: (value: string) => void;
}

export function DataInputPopover({
  name,
  icon,
  text,
  label,
  value,
  width,
  height,
  details,
  iconProps,
  onChange,
  onAction,
  onChangeWidth,
  onChangeHeight,
  buttonLabel,
}: DataInputPopoverProps) {
  return (
    <Popover placement="bottom-start">
      <PopoverTrigger>
        <Button isIconOnly={_isEmpty(text)} className="bg-white" variant="flat">
          {icon && <Icon icon={icon} iconProps={iconProps} />}
          {text}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex flex-col gap-2 w-full px-1 py-2">
          <h3>Youtube vídeo</h3>
          <div className="flex flex-col">
            <TextField.Uncontrolled
              name={name}
              label={label}
              value={value}
              onChange={handleEvent(onChange)}
            />
            <small>{details}</small>
          </div>
          {onChangeWidth && onChangeHeight && (
            <div className="flex grid grid-cols-2 gap-2">
              <TextField.Uncontrolled
                name={name + "_width"}
                label="Largura"
                mask={Number}
                value={width}
                onChange={handleEvent(onChangeWidth)}
              />
              <TextField.Uncontrolled
                name={name + "_height"}
                label="Altura"
                mask={Number}
                value={height}
                onChange={handleEvent(onChangeHeight)}
              />
            </div>
          )}
          <div>
            <Button
              radius="sm"
              color="primary"
              className="w-full"
              onClick={onAction}
            >
              {buttonLabel}
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
