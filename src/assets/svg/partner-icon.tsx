import { SVGProps } from "react";
export const PartnerIcon = ({
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
      <circle cx={12} cy={10.5} r={2.5} />
      <path d="M7.5 17a2.498 2.498 0 0 1 2.289-1.5h4.422c.993 0 1.892.59 2.289 1.5" />
      <path
        d="M16 21H8a5 5 0 0 1-5-5v-4.8a5 5 0 0 1 1.877-3.904l4-3.2a5 5 0 0 1 6.246 0l4 3.2A5 5 0 0 1 21 11.2V16a5 5 0 0 1-5 5Z"
        clipRule="evenodd"
      />
    </g>
  </svg>
);
