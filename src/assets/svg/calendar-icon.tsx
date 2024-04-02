import { SVGProps } from "react";

export function CalendarIcon({
  width = 18,
  height = 18,
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg width={18} height={20} fill="none" {...props}>
      <g clipPath="url(#prefix__clip0_2203_5318)">
        <path
          d="M5 0c.691 0 1.25.559 1.25 1.25V2.5h5V1.25c0-.691.559-1.25 1.25-1.25s1.25.559 1.25 1.25V2.5h1.875c1.035 0 1.875.84 1.875 1.875V6.25H0V4.375C0 3.34.84 2.5 1.875 2.5H3.75V1.25C3.75.559 4.309 0 5 0zM0 7.5h17.5v10.625c0 1.035-.84 1.875-1.875 1.875H1.875A1.875 1.875 0 010 18.125V7.5zM3.125 10a.627.627 0 00-.625.625v3.75c0 .344.281.625.625.625h3.75a.627.627 0 00.625-.625v-3.75A.627.627 0 006.875 10h-3.75z"
          fill="#767676"
        />
      </g>
      <defs>
        <clipPath id="prefix__clip0_2203_5318">
          <path fill="#fff" d="M0 0h17.5v20H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}
