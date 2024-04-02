import { EyeFilledIcon } from "./eye-filled-icon";
import { EyeSlashFilledIcon } from "./eye-slash-filled-icon";
import { SVGProps } from "react";

export function ToggledEyeIcon({
  isVisible,
  ...props
}: SVGProps<SVGSVGElement> & { isVisible: boolean }) {
  const IconComponent = !isVisible ? EyeSlashFilledIcon : EyeFilledIcon;
  return <IconComponent {...props} />;
}
