import { SVGProps } from "react";
export const ColabIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M10 12.667v-.334A2.333 2.333 0 0 0 7.667 10H4.333A2.333 2.333 0 0 0 2 12.333v.334"
    />
    <circle
      cx={6}
      cy={5}
      r={2.333}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M14.667 12.667v-.334A2.333 2.333 0 0 0 12.333 10H12M10.666 2.667a2.333 2.333 0 1 1 0 4.666"
    />
  </svg>
);
