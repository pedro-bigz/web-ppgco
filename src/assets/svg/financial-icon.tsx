import { SVGProps } from "react";
export const FinancialIcon = ({
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
      <path d="M17.5 7.453 15.263 4.3c-.603-.849-1.728-1.053-2.563-.464L7.5 7.5" />
      <path
        d="M17.583 11.5h2.084c.46 0 .833.358.833.8v2.4c0 .442-.373.8-.833.8h-2.084c-1.15 0-2.083-.895-2.083-2v0c0-1.105.933-2 2.083-2v0Z"
        clipRule="evenodd"
      />
      <path d="M19.5 11.357V9.643c0-1.184-.995-2.143-2.222-2.143H5.722C4.495 7.5 3.5 8.46 3.5 9.643v7.714c0 1.184.995 2.143 2.222 2.143h11.556c1.227 0 2.222-.96 2.222-2.143v-1.714" />
    </g>
  </svg>
);
