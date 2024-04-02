import { useController, useFormContext } from "react-hook-form";
import {
  RadioGroup as NextRadioGroup,
  Radio,
  RadioGroupProps as NextRadioGroupProps,
} from "@nextui-org/react";
import { Container, ErrorMessage } from "./RadioGroup.styles";

interface RadioGroupOption {
  label: string;
  value: string;
}

interface RadioGroupProps extends NextRadioGroupProps {
  name: string;
  options: RadioGroupOption[];
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  options,
  ...props
}) => {
  const { control } = useFormContext();
  const {
    field,
    formState: { errors },
  } = useController({ name, control, defaultValue: props.defaultValue || "" });

  const handleFileType = (event: React.ChangeEvent<HTMLInputElement>) => {
    field.onChange((event.target as HTMLInputElement).value);
  };

  return (
    <Container>
      <NextRadioGroup
        {...props}
        aria-labelledby="controlled-radio-buttons-group"
        value={field.value}
        onChange={handleFileType}
      >
        {options.map(({ label, value }) => (
          <Radio key={value} value={value}>
            {label}
          </Radio>
        ))}
      </NextRadioGroup>
      <ErrorMessage>{errors[name]?.message as string}</ErrorMessage>
    </Container>
  );
};
