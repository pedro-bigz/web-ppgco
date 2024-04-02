import { SVGProps } from "react";
export const RelatorioIcon = ({
  width = 24,
  height = 24,
  strokeWidth = 1.25,
  ...props
}: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7 21H17C18.6569 21 20 19.6569 20 18V8.37167C20 7.57602 19.6839 6.81296 19.1213 6.25035L16.7497 3.87868C16.187 3.31607 15.424 3 14.6283 3H7C5.34315 3 4 4.34315 4 6V18C4 19.6569 5.34315 21 7 21Z"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16 17H8"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16 13.5H8"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11 10H8"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M20 8.5H16.5C15.3954 8.5 14.5 7.60457 14.5 6.5V3"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
