import { ChangeEventHandler } from "react";

interface HiddenInputProps {
  name: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  value: any;
}

export const HiddenInput: React.FC<HiddenInputProps> = ({
  name,
  onChange,
  value,
}) => {
  return <input type="hidden" name={name} onChange={onChange} value={value} />;
};
