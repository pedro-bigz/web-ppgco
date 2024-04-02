import { SVGProps } from "react";

export const FilterIcon = ({
  color = "#181D11",
  width = 16,
  height = 16,
  ...props
}: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    color={color}
    fill="none"
    viewBox="0 0 16 16"
    {...props}
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M2.57 3.37c.568-.56 1.49-.56 2.057 0a1.407 1.407 0 0 1 0 2.009c-.566.56-1.49.56-2.056 0a1.407 1.407 0 0 1 0-2.009ZM1.517 2.304a2.968 2.968 0 0 1 4.166 0c.383.379.64.836.769 1.32h7.414a.75.75 0 0 1 0 1.5H6.45a2.905 2.905 0 0 1-.77 1.321 2.968 2.968 0 0 1-4.165 0 2.907 2.907 0 0 1 0-4.141Zm11.912 8.314a1.468 1.468 0 0 0-2.056 0 1.406 1.406 0 0 0 0 2.008c.567.56 1.49.56 2.056 0a1.407 1.407 0 0 0 0-2.008Zm1.055-1.067a2.968 2.968 0 0 0-4.165 0c-.384.379-.64.836-.77 1.32H2.132a.75.75 0 0 0 0 1.5h7.417c.13.485.386.942.77 1.322a2.968 2.968 0 0 0 4.165 0 2.907 2.907 0 0 0 0-4.142Z"
      clipRule="evenodd"
    />
  </svg>
);
