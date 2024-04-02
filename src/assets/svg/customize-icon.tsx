import { SVGProps } from "react";
export const CustomizeIcon = ({
  width = 24,
  height = 24,
  ...props
}: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill="none"
    {...props}
  >
    <g
      stroke="#181D11"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    >
      <path d="M10.5 18.003H4.996a2 2 0 0 1-2-2.001V4.997a2 2 0 0 1 2-2h11.005a2 2 0 0 1 2 2V10.5M18.002 10.5H2.996M10.498 2.996v15.007" />
      <path
        d="m18.294 20.71 3.416-3.415a1 1 0 0 0 0-1.414l-1.587-1.587a1 1 0 0 0-1.415 0l-3.415 3.416a1 1 0 0 0-.293.707v2.587h2.587a1 1 0 0 0 .707-.293Z"
        clipRule="evenodd"
      />
    </g>
  </svg>
);
