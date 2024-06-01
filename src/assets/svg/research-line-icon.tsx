import { SVGProps } from "react";
export const ResearchLineIcon = ({
  width = 20,
  height = 20,
  color = "#767676",
  ...props
}: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={width}
    height={height}
    color={color}
    fill="none"
    viewBox="0 0 20 20"
    {...props}
  >
    <g
      transform="translate(0.000000,20.000000) scale(0.100000,-0.100000)"
      fill="currentColor"
      stroke="none"
    >
      <path
        d="M34 167 c-3 -8 -4 -43 -2 -78 3 -62 4 -64 31 -67 28 -3 33 3 17 28
-5 9 -5 19 2 27 7 9 7 13 -1 13 -6 0 -11 4 -11 9 0 5 23 11 51 15 47 6 50 8
47 34 -3 26 -6 27 -66 30 -46 2 -64 -1 -68 -11z m84 -34 c-10 -2 -26 -2 -35 0
-10 3 -2 5 17 5 19 0 27 -2 18 -5z"
      />
      <path
        d="M116 84 c-19 -19 -21 -48 -3 -62 6 -5 28 -12 47 -14 35 -3 35 -3 32
32 -2 19 -9 41 -14 48 -14 17 -43 15 -62 -4z m44 -18 c0 -11 -19 -15 -25 -6
-3 5 1 10 9 10 9 0 16 -2 16 -4z m-3 -32 c-3 -3 -12 -4 -19 -1 -8 3 -5 6 6 6
11 1 17 -2 13 -5z"
      />
    </g>
  </svg>
);
