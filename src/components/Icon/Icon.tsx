import { SVGProps } from "react";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";

export type SvgIconDefinition = (props: SVGProps<SVGSVGElement>) => JSX.Element;

export type GenericIconDefinition = IconDefinition | SvgIconDefinition;

export interface IconProps {
  icon: IconDefinition | SvgIconDefinition;
  iconProps?: FontAwesomeIconProps | SVGProps<SVGSVGElement>;
}

export function Icon({ icon, iconProps = {} }: IconProps) {
  if (typeof icon !== "function") {
    return (
      <FontAwesomeIcon {...(iconProps as FontAwesomeIconProps)} icon={icon} />
    );
  }

  const Element = icon;
  return <Element {...(iconProps as SVGProps<SVGSVGElement>)} />;
}
