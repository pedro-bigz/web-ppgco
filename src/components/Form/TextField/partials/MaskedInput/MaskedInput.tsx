import { useIMask } from "react-imask";
import {
  Input as NextInput,
  InputProps as NextInputProps,
} from "@nextui-org/react";
import { useEffect, useRef } from "react";

export interface MaskedInputProps extends NextInputProps {
  name: string;
  value: any;
  label?: string;
  errorMessage?: string;
  placeholder?: string;
  mask?: string | any;
  maskConfig?: any;
  required?: boolean;
  disabled?: boolean;
  startAdornment?: JSX.Element | string;
  endAdornment?: JSX.Element | string;
  maxLength?: number;
  onValueChange: (...event: any[]) => void;
}

export function MaskedInput({
  name,
  value,
  errorMessage,
  placeholder,
  mask,
  maskConfig,
  required,
  disabled,
  maxLength = 255,
  size = "sm",
  label = "",
  onValueChange,
  ...props
}: MaskedInputProps) {
  const { ref, maskRef }: any = useIMask(
    {
      mask,
      blocks: {
        currency: {
          mask: Number,
          scale: 2,
          thousandsSeparator: "",
          padFractionalZeros: true,
          normalizeZeros: true,
          radix: ",",
          // mapToRadix: ["."],
          // lazy: true,
          min: 0,
          max: props.max,
        },
        decimal: {
          mask: Number,
          scale: 3,
          thousandsSeparator: ".",
          padFractionalZeros: true,
          normalizeZeros: true,
          radix: ",",
          mapToRadix: ["."],
          min: props.min,
          max: props.max,
        },
      },
      ...maskConfig,
    },
    {
      onAccept: onValueChange,
    }
  );

  const updateValue = () => {
    maskRef.current.updateValue();
  };

  const hasInitRef = useRef(false);
  useEffect(() => {
    if (!maskRef.current || hasInitRef.current || !value) {
      return;
    }

    maskRef.current.value = value;
    maskRef.current.updateValue();

    hasInitRef.current = true;
  }, [maskRef, value]);

  return (
    <NextInput
      {...props}
      name={name}
      label={label}
      placeholder={placeholder}
      value={value}
      ref={ref}
      size={size}
      onLoad={updateValue}
      onBlur={updateValue}
      isDisabled={disabled}
      isRequired={required}
      errorMessage={errorMessage}
      maxLength={maxLength}
    />
  );
}
