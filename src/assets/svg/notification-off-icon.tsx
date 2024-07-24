import { SVGProps } from "react";

export const NotificationOffIcon = ({
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
      d="M64 64.76L15.36 14.56L5.08 3.96L0 9.04L11.2 20.24V20.28C9.12 24.24 8 28.92 8 33.96V53.96L0 61.96V65.96H54.92L62.92 73.96L68 68.88L64 64.76ZM32 78C36.44 78 40 74.44 40 70H24C24 74.44 27.56 78 32 78ZM56 48.72V34C56 21.68 49.44 11.44 38 8.72V6C38 2.68 35.32 0 32 0C28.68 0 26 2.68 26 6V8.72C25.4 8.84 24.84 9.04 24.32 9.2C23.92 9.32 23.52 9.48 23.12 9.64H23.08C23.04 9.64 23.04 9.64 23 9.68C22.08 10.04 21.16 10.48 20.28 10.92C20.28 10.92 20.24 10.92 20.24 10.96L56 48.72Z"
      fill="currentColor"
    />
  </svg>
);
