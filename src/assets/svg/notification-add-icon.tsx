import { SVGProps } from "react";

export const NotificationAddIcon = ({
  width = 80,
  height = 80,
  color,
  ...props
}: SVGProps<SVGSVGElement>) => (
  <svg
    width={width}
    height={height}
    color={color}
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M24 72H40C40 76.4 36.4 80 32 80C27.6 80 24 76.4 24 72ZM40 28C40 38.44 46.68 47.32 56 50.64V60H64V68H0V60H8V32C8 20.84 15.64 11.44 26 8.8V6C26 2.68 28.68 0 32 0C35.32 0 38 2.68 38 6V8.8C40.84 9.52 43.44 10.76 45.8 12.4C42.16 16.56 40 22.04 40 28ZM80 24H68V12H60V24H48V32H60V44H68V32H80V24Z"
      fill="currentColor"
    />
  </svg>
);
