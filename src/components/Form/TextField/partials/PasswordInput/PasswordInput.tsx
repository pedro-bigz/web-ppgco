import { useState, Dispatch, SetStateAction } from "react";
import { ToggledEyeIcon } from "assets";
import { Input, InputProps } from "@nextui-org/react";

export interface PasswordInputProps extends InputProps {
  required?: boolean;
  disabled?: boolean;
  startAdornment?: JSX.Element | string;
  endAdornment?: JSX.Element | string;
  position?: "start" | "end";
}

interface ToggleVisibilityButtonProps {
  isVisible: boolean;
  setVisibility: Dispatch<SetStateAction<boolean>>;
}

export function ToggleVisibilityButton({
  isVisible,
  setVisibility,
}: ToggleVisibilityButtonProps) {
  const toggleVisibility = () => setVisibility(!isVisible);
  return (
    <button
      type="button"
      className="focus:outline-none"
      onClick={toggleVisibility}
    >
      <ToggledEyeIcon
        className="text-2xl text-default-400 pointer-events-none"
        isVisible={isVisible}
      />
    </button>
  );
}

export function PasswordInput({
  size = "sm",
  position = "end",
  required,
  disabled,
  ...props
}: PasswordInputProps) {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  return (
    <Input
      size={size}
      isDisabled={disabled}
      isRequired={required}
      startContent={
        position === "start" && (
          <ToggleVisibilityButton
            isVisible={isVisible}
            setVisibility={setIsVisible}
          />
        )
      }
      endContent={
        position === "end" && (
          <ToggleVisibilityButton
            isVisible={isVisible}
            setVisibility={setIsVisible}
          />
        )
      }
      type={isVisible ? "text" : "password"}
      {...props}
    />
  );
}
