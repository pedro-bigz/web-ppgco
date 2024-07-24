import { SVGProps } from "react";

export const NotificationActiveIcon = ({
  width = 96,
  height = 96,
  color,
  ...props
}: SVGProps<SVGSVGElement>) => (
  <svg
    width={width}
    height={height}
    color={color}
    viewBox="0 0 96 96"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clip-path="url(#clip0_2331_3043)">
      <path
        d="M30.32 16.32L24.6 10.6C15 17.92 8.68 29.2 8.12 42H16.12C16.72 31.4 22.16 22.12 30.32 16.32ZM79.88 42H87.88C87.28 29.2 80.96 17.92 71.4 10.6L65.72 16.32C73.8 22.12 79.28 31.4 79.88 42ZM72 44C72 31.72 65.44 21.44 54 18.72V16C54 12.68 51.32 10 48 10C44.68 10 42 12.68 42 16V18.72C30.52 21.44 24 31.68 24 44V64L16 72V76H80V72L72 64V44ZM48 88C48.56 88 49.08 87.96 49.6 87.84C52.2 87.28 54.32 85.52 55.36 83.12C55.76 82.16 55.96 81.12 55.96 80H39.96C40 84.4 43.56 88 48 88Z"
        fill="currentColor"
      />
    </g>
    <defs>
      <clipPath id="clip0_2331_3043">
        <rect width="96" height="96" fill="white" />
      </clipPath>
    </defs>
  </svg>
);
