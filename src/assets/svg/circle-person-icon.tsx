import React from "react";

export const CirclePersonIcon = ({
  width = 32,
  height = 32,
  color = "#fff",
  backgroundColor = "#00803C",
}: React.SVGProps<SVGSVGElement> & { backgroundColor?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill="none"
    viewBox="0 0 32 32"
  >
    <rect width="32" height="32" fill={backgroundColor} rx="16"></rect>
    <path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M21.333 21.333v-.5A2.833 2.833 0 0018.5 18h-5a2.833 2.833 0 00-2.833 2.833v.5"
    ></path>
    <circle
      cx="16"
      cy="12.667"
      r="2.667"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    ></circle>
  </svg>
);
