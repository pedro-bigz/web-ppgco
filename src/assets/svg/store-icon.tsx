import { SVGProps } from "react";
export const StoreIcon = ({
  width = 24,
  height = 24,
  ...props
}: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill="none"
    color="#6A6E71"
    {...props}
  >
    <g
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    >
      <path d="M14.5 8.5v.333c0 1.473-1.12 2.667-2.5 2.667v0c-1.38 0-2.5-1.194-2.5-2.667V8.5" />
      <path d="M14.833 8.5v.333c0 1.473 1.269 2.667 2.834 2.667h.234c1.435 0 2.599-1.095 2.599-2.446v0c0-.363-.105-.718-.303-1.029l-2.265-3.554c-.384-.602-1.076-.971-1.823-.971H7.891c-.747 0-1.438.369-1.823.971L3.803 8.025c-.198.31-.303.666-.303 1.029v0c0 1.35 1.164 2.446 2.599 2.446h.234c1.565 0 2.834-1.194 2.834-2.667V8.5M19.5 11.5v6.876c0 1.173-.96 2.124-2.143 2.124H6.643A2.133 2.133 0 0 1 4.5 18.376V11.5" />
    </g>
  </svg>
);
