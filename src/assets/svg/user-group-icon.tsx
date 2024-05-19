import { SVGProps } from "react";

export function UserGroupIcon({
  width = 20,
  height = 16,
  color = "#767676",
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 20 16"
      color={color}
      {...props}
    >
      <g clipPath="url(#prefix__clip0_2203_5305)">
        <path
          d="M3 4a4 4 0 118 0 4 4 0 01-8 0zM0 15.072A5.57 5.57 0 015.572 9.5h2.856A5.57 5.57 0 0114 15.072a.928.928 0 01-.928.928H.928A.928.928 0 010 15.072zM19.04 16h-4.309A2 2 0 0015 15v-.25c0-1.897-.847-3.6-2.181-4.744.075-.003.147-.006.222-.006h1.918A5.04 5.04 0 0120 15.04a.96.96 0 01-.96.96zM13.5 8a3.493 3.493 0 01-2.478-1.028C11.637 6.14 12 5.112 12 4c0-.837-.206-1.628-.572-2.322A3.498 3.498 0 0117 4.5C17 6.434 15.434 8 13.5 8z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="prefix__clip0_2203_5305">
          <path fill="#fff" d="M0 0h20v16H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}
