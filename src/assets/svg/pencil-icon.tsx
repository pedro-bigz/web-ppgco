import { SVGProps } from "react";

export const PencilIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m6.293 12.707 6.414-6.414a1 1 0 0 0 0-1.414L11.12 3.293a1 1 0 0 0-1.414 0L3.293 9.707a.998.998 0 0 0-.293.707V13h2.586a.998.998 0 0 0 .707-.293Z"
      clipRule="evenodd"
    />
  </svg>
);
