import { SVGProps } from "react";

export function HoodIcon({
  width = 25,
  height = 20,
  color = "#767676",
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      fill="none"
      viewBox="0 0 25 20"
      width={width}
      height={height}
      color={color}
      {...props}
    >
      <g clipPath="url(#prefix__clip0_2203_5309)">
        <path
          d="M12.5 3.5a2.21 2.21 0 00-.74.128L2.993 6.794a.753.753 0 000 1.412l1.81.653A5.144 5.144 0 004 11.622v.878c0 .887-.338 1.803-.697 2.525A8.285 8.285 0 012.6 16.2a.503.503 0 00.278.788l2 .5a.498.498 0 00.61-.388 8.057 8.057 0 00-.066-3.397A6.911 6.911 0 005 12.391v-.77c0-.943.319-1.834.872-2.546a3.816 3.816 0 011.537-1.116l4.907-1.928a.5.5 0 01.365.928L7.775 8.887a2.869 2.869 0 00-1.006.675l4.987 1.8a2.21 2.21 0 001.482 0l8.768-3.156a.753.753 0 000-1.413l-8.765-3.165A2.21 2.21 0 0012.5 3.5zm-6 11.75c0 1.103 2.687 2.25 6 2.25s6-1.147 6-2.25l-.478-4.544-4.444 1.607a3.183 3.183 0 01-2.156 0l-4.444-1.607L6.5 15.25z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="prefix__clip0_2203_5309">
          <path fill="#fff" transform="translate(2.5 2.5)" d="M0 0h20v16H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}
