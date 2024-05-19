import { SVGProps } from "react";

export function SubjectsIcon({
  width = 18,
  height = 18,
  color = "#767676",
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      color={color}
      fill="none"
      viewBox="0 0 18 18"
      {...props}
    >
      <path
        d="M3.75 0C1.68 0 0 1.68 0 3.75v12.5C0 18.32 1.68 20 3.75 20h12.5c.691 0 1.25-.559 1.25-1.25s-.559-1.25-1.25-1.25V15c.691 0 1.25-.559 1.25-1.25V1.25C17.5.559 16.941 0 16.25 0H3.75zm0 15h10v2.5h-10c-.691 0-1.25-.559-1.25-1.25S3.059 15 3.75 15zM5 5.625C5 5.281 5.281 5 5.625 5h7.5c.344 0 .625.281.625.625a.627.627 0 01-.625.625h-7.5A.627.627 0 015 5.625zM5.625 7.5h7.5c.344 0 .625.281.625.625a.627.627 0 01-.625.625h-7.5A.627.627 0 015 8.125c0-.344.281-.625.625-.625z"
        fill="currentColor"
      />
    </svg>
  );
}
