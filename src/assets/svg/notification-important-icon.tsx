import { SVGProps } from "react";

export const NotificationImportantIcon = ({
  width = 68,
  height = 78,
  color,
  ...props
}: SVGProps<SVGSVGElement>) => (
  <svg
    width={width}
    height={height}
    color={color}
    viewBox="0 0 68 78"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M56 54V34C56 21.72 49.44 11.44 38 8.72V6C38 2.68 35.32 0 32 0C28.68 0 26 2.68 26 6V8.72C14.52 11.44 8 21.68 8 34V54L0 62V66H64V62L56 54ZM36 54H28V46H36V54ZM36 38H28V22H36V38ZM32 78C36.4 78 40 74.4 40 70H24C24 74.4 27.56 78 32 78Z"
      fill="currentColor"
    />
  </svg>
);
