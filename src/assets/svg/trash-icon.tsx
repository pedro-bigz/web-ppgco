import { SVGProps } from "react";
export const TrashIcon = ({
  width = 16,
  height = 16,
  strokeWidth = 1.5,
  ...props
}: SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill="none"
    viewBox="0 0 16 16"
  >
    <g
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
    >
      <path
        d="M10.362 14.002H5.638a1.5 1.5 0 0 1-1.496-1.385l-.644-8.369h9.004l-.644 8.369a1.5 1.5 0 0 1-1.496 1.385v0Z"
        clipRule="evenodd"
      />
      <path d="M13.336 4.248H2.665" />
      <path
        d="M6.124 1.997h3.752a.75.75 0 0 1 .75.75v1.501H5.374v-1.5a.75.75 0 0 1 .75-.75Z"
        clipRule="evenodd"
      />
      <path d="M9.313 7.25V11M6.687 7.25V11" />
    </g>
  </svg>
);
