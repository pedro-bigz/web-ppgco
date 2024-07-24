import { SVGProps } from "react";

export const AddUserIcon = ({
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
    <g
      transform="translate(0.000000,96.000000) scale(0.100000,-0.100000)"
      fill="currentColor"
      stroke="none"
    >
      <path
        d="M415 826 c-101 -44 -125 -178 -46 -257 65 -65 157 -65 222 0 124 124
-15 327 -176 257z"
      />
      <path
        d="M640 467 c-49 -16 -133 -102 -148 -153 -28 -94 -8 -169 63 -239 70
-71 145 -91 239 -63 55 16 138 99 154 154 28 94 8 169 -63 239 -70 71 -152 91
-245 62z m120 -147 l0 -40 40 0 40 0 0 -40 0 -40 -40 0 -40 0 0 -40 0 -40 -40
0 -40 0 0 40 0 40 -40 0 -40 0 0 40 0 40 40 0 40 0 0 40 0 40 40 0 40 0 0 -40z"
      />
      <path
        d="M360 384 c-100 -21 -166 -52 -205 -95 -32 -36 -35 -44 -35 -104 l0
-65 151 0 c137 0 151 2 145 17 -4 9 -9 42 -13 73 -5 51 7 114 33 178 7 14 7
14 -76 -4z"
      />
    </g>
  </svg>
);
