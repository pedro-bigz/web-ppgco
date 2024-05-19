import { SVGProps } from "react";
export const AscSortIcon = ({
  width = 16,
  height = 16,
  ...props
}: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill="none"
    {...props}
  >
    <path
      fill="#6A6E71"
      fillRule="evenodd"
      d="M5.21 2.816a.748.748 0 0 0-.544-.233.758.758 0 0 0-.53.22l-2 2a.75.75 0 0 0 1.06 1.06l.72-.72v7.524a.75.75 0 0 0 1.5 0V5.144l.72.72a.75.75 0 1 0 1.06-1.061L5.209 2.816Z"
      clipRule="evenodd"
    />
    <path
      fill="#6A6E71"
      fillRule="evenodd"
      d="M12.081 3.333a.75.75 0 0 0-1.5 0v7.522l-.719-.719a.75.75 0 0 0-1.06 1.06l1.98 1.982a.748.748 0 0 0 1.08.019l2-2a.75.75 0 0 0-1.06-1.06l-.72.72V3.333Z"
      clipRule="evenodd"
      opacity={0.4}
    />
  </svg>
);
