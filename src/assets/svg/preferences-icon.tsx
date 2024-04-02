import { SVGProps } from "react";
export const PreferencesIcon = ({
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
        d="M13.75 14h1.5c.414 0 .75.373.75.833v3.334c0 .46-.336.833-.75.833h-1.5c-.414 0-.75-.373-.75-.833v-3.334c0-.46.336-.833.75-.833Z"
        clipRule="evenodd"
      />
      <path d="M20 16.5h-4M13 16.5H4" />
      <path
        d="M10.25 10h-1.5C8.336 10 8 9.627 8 9.167V5.833c0-.46.336-.833.75-.833h1.5c.414 0 .75.373.75.833v3.334c0 .46-.336.833-.75.833Z"
        clipRule="evenodd"
      />
      <path d="M4 7.5h4M11 7.5h9" />
    </g>
  </svg>
);
