import { SVGProps } from "react";

export const CloseIcon = ({
  width = "1.5em",
  height = "1.5em",
  color,
  ...props
}: SVGProps<SVGSVGElement>) => (
  <svg
    aria-hidden="true"
    focusable="false"
    height={height}
    width={width}
    color={color}
    role="presentation"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      d="M12 2a10 10 0 1010 10A10.016 10.016 0 0012 2zm3.36 12.3a.754.754 0 010 1.06.748.748 0 01-1.06 0l-2.3-2.3-2.3 2.3a.748.748 0 01-1.06 0 .754.754 0 010-1.06l2.3-2.3-2.3-2.3A.75.75 0 019.7 8.64l2.3 2.3 2.3-2.3a.75.75 0 011.06 1.06l-2.3 2.3z"
      fill="currentColor"
    ></path>
  </svg>
);
