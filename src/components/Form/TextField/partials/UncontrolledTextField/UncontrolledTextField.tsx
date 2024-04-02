import { Input, InputProps } from "../Input";

export interface UncontrolledTextFieldProps
  extends Omit<InputProps, "onChange" | "onValueChange"> {
  name: string;
  innerRef?: any;
  label?: string;
  placeholder?: string;
  mask?: any;
  maskConfig?: any;
  required?: boolean;
  disabled?: boolean;
  maxLength?: number;
  isHidden?: boolean;
  isPassword?: boolean;
  position?: "start" | "end";
  onChange?: (...e: any[]) => void;
}

export const UncontrolledTextField: React.FC<UncontrolledTextFieldProps> = ({
  name,
  value,
  innerRef,
  label = "",
  placeholder,
  mask,
  size = "sm",
  maskConfig,
  required,
  disabled,
  maxLength = 255,
  isHidden = false,
  isPassword = false,
  position,
  onChange,
  variant = "bordered",
  ...props
}) => {
  const onInputChange = (...e: any[]) => {
    onChange?.(...e);
  };

  return (
    <Input
      {...props}
      variant={variant}
      name={name}
      label={label}
      placeholder={placeholder}
      value={value}
      fullWidth
      ref={innerRef}
      size={size}
      onValueChange={onInputChange}
      onChange={onInputChange}
      isDisabled={disabled}
      isRequired={required}
      maxLength={maxLength}
      isHidden={isHidden}
      isPassword={isPassword}
      mask={mask}
      maskConfig={maskConfig}
      position={position}
    />
  );
};
