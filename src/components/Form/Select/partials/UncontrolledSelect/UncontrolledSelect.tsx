import { ChangeEvent } from "react";
import { TextField } from "components/Form/TextField";
import {
  Track,
  Select,
  SelectProps,
  SelectOption,
  hasCustomization,
} from "../Select";

export interface UncontrolledSelectProps extends Omit<SelectProps, "track"> {
  track?: Track;
}

export const UncontrolledSelect: React.FC<UncontrolledSelectProps> = ({
  name,
  track,
  onChange,
  variant = "bordered",
  ...props
}) => {
  const isCustomized = hasCustomization(track);
  const selectName = isCustomized ? name + "_select" : name;

  const onSelectChange = (
    e: ChangeEvent<HTMLSelectElement>,
    option?: SelectOption
  ) => {
    onChange?.(e, option);
  };

  return (
    <>
      {isCustomized && <TextField.Form isHidden name={name} />}
      <Select
        {...props}
        track={track}
        variant={variant}
        name={selectName}
        onChange={onSelectChange}
      />
    </>
  );
};
