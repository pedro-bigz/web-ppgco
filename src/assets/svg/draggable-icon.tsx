import { SVGProps } from "react";
export const DraggableIcon = ({
  width = 8,
  height = 14,
  ...props
}: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill="none"
    {...props}
  >
    <g fill="#C3C3C3" fillRule="evenodd" clipRule="evenodd">
      <path d="M1.5 3.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm0 5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3ZM0 12a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0ZM6.5 3.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm0 5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3ZM5 12a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0Z" />
    </g>
  </svg>
);
