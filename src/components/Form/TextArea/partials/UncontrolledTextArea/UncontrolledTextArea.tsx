import { ChangeEvent } from "react";
import { ControllerRenderProps, FieldValues } from "react-hook-form";
import {
  Textarea as NextTextarea,
  TextAreaProps as NextTextAreaProps,
} from "@nextui-org/react";
import classnames from "classnames";

export interface UncontrolledTextAreaProps extends NextTextAreaProps {
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  startAdornment?: JSX.Element | string;
  endAdornment?: JSX.Element | string;
  maxLength?: number;
  onChange?: (
    e: ChangeEvent<HTMLInputElement>,
    field?: ControllerRenderProps<FieldValues, string>
  ) => void;
}

export function UncontrolledTextArea({
  classNames,
  ...props
}: UncontrolledTextAreaProps) {
  return (
    <NextTextarea
      {...props}
      fullWidth
      size="sm"
      classNames={{
        ...classNames,
        inputWrapper: classnames(
          "bg-white border-1 border-[#DEDEDE!important]",
          classNames?.inputWrapper
        ),
      }}
    />
  );
}
