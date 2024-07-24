import { ChangeEventHandler } from "react";

interface HiddenInputProps {
  name: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  value: any;
}

export function HiddenInput({ name, value, onChange }: HiddenInputProps) {
  return <input type="hidden" name={name} onChange={onChange} value={value} />;
}
