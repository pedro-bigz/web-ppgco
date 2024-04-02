import { SVGProps } from "react";
export const ManagementIcon = ({
  width = 24,
  height = 24,
  ...props
}: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill="none"
    color="#6A6E71"
    {...props}
  >
    <g
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    >
      <path
        d="m17.196 5 3.464 6a2.001 2.001 0 0 1 0 2l-3.464 6a2 2 0 0 1-1.732 1H8.536a1.999 1.999 0 0 1-1.732-1L3.34 13a2.001 2.001 0 0 1 0-2l3.464-6a2 2 0 0 1 1.732-1h6.929c.714 0 1.374.381 1.731 1Z"
        clipRule="evenodd"
      />
      <path d="M14.8 9.2a3.959 3.959 0 1 1-5.6 5.6 3.959 3.959 0 0 1 5.6-5.6" />
    </g>
  </svg>
);
