import { SVGProps } from "react";

export function PenIcon({
  width = 20,
  height = 20,
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 20 20"
      {...props}
    >
      <g clipPath="url(#prefix__clip0_2203_5314)">
        <path
          d="M14.59 1.059a3.086 3.086 0 114.351 4.355l-8.093 7.047-.403-.402-2.5-2.5-.406-.407 7.05-8.093zm-7.938 8.976l.407.406 2.5 2.5.406.407-.75 3.257c-.152.668-.66 1.2-1.32 1.383L.953 19.934l3.727-3.727A1.247 1.247 0 006.254 15c0-.691-.559-1.25-1.25-1.25a1.249 1.249 0 00-1.207 1.574l-3.73 3.723 1.945-6.938a1.868 1.868 0 011.383-1.32l3.257-.75v-.004z"
          fill="#767676"
        />
      </g>
      <defs>
        <clipPath id="prefix__clip0_2203_5314">
          <path fill="#fff" d="M0 0h20v20H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}
