import { SVGProps } from "react";
export const ConfigIcon = ({
  width = 22,
  height = 22,
  color,
  ...props
}: SVGProps<SVGSVGElement>) => (
  <svg
    version="1.0"
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    color={color}
    viewBox="0 0 96 96"
    preserveAspectRatio="xMidYMid meet"
    {...props}
  >
    <g
      transform="translate(0.000000,96.000000) scale(0.100000,-0.100000)"
      fill="currentColor"
      stroke="none"
    >
      <path
        d="M387 873 c-3 -4 -8 -27 -12 -50 -6 -37 -12 -45 -53 -68 -44 -25 -47
-25 -91 -10 -53 18 -49 21 -108 -84 l-36 -64 36 -29 c35 -28 37 -33 37 -88 0
-55 -2 -60 -37 -88 l-36 -29 36 -64 c59 -105 55 -102 108 -84 44 15 48 15 83
-6 20 -12 39 -20 41 -18 2 3 5 43 6 90 1 67 -2 91 -16 112 -41 63 -28 155 30
206 88 77 228 36 257 -75 l12 -44 78 0 78 0 0 29 c0 21 10 37 37 59 l36 29
-36 64 c-59 105 -55 102 -108 84 -44 -15 -47 -15 -90 9 -38 22 -45 31 -55 73
l-10 48 -91 3 c-50 1 -93 -1 -96 -5z"
      />
      <path
        d="M465 375 c-25 -24 -25 -27 -25 -200 l0 -175 260 0 260 0 0 175 c0
241 19 225 -260 225 -211 0 -211 0 -235 -25z m303 -182 l-72 -73 -68 0 -68 0
0 40 0 40 53 0 c51 0 54 2 112 60 l59 60 28 -27 28 -27 -72 -73z"
      />
    </g>
  </svg>
);
