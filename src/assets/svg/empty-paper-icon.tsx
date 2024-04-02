import { SVGProps } from "react";
export const EmptyPaperIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M5.032 1.25C3.554 1.25 2.5 2.565 2.5 4v8c0 1.435 1.054 2.75 2.532 2.75h5.939c1.477 0 2.531-1.315 2.531-2.75V5.581a2.88 2.88 0 0 0-.711-1.913l-1.409-1.581a2.439 2.439 0 0 0-1.82-.837H5.032Zm3.704 1.5H5.032C4.542 2.75 4 3.226 4 4v8c0 .774.541 1.25 1.032 1.25h5.939c.49 0 1.031-.476 1.031-1.25V6.417h-1.328c-1.15 0-1.938-1.017-1.938-2.084V2.75Zm3.107 2.167h-1.17c-.162 0-.437-.178-.437-.584V3.056l.026.029 1.409 1.58c.066.075.124.16.172.252Z"
      clipRule="evenodd"
    />
  </svg>
);
