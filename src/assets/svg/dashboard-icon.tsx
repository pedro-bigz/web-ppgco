import { SVGProps } from "react";
export const DashboardIcon = ({
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
      <path d="M2 19h20M4.5 19v-5M9.5 19v-9M14.5 19V5M19.5 19v-7" />
    </g>
  </svg>
);
