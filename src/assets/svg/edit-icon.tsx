import { SVGProps } from "react";
import { JSX } from "react/jsx-runtime";

export const EditIcon = ({
  width = 12,
  height = 12,
  color = "#0085FF",
  strokeWidth = 1.5,
  ...props
}: SVGProps<SVGSVGElement> & JSX.IntrinsicAttributes) => (
  <svg
    fill="none"
    viewBox="0 0 12 12"
    width={width}
    height={height}
    color={color}
    {...props}
  >
    {/* <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"> */}
    <path
      d="M0 9.50035V12H2.49965L9.87196 4.62769L7.37231 2.12804L0 9.50035ZM12.805 2.69463C12.065 2.43466 12.065 2.01472 11.805 1.75476L10.2452 0.194973C9.98528 -0.064991 9.56534 -0.064991 9.30537 0.194973L8.08554 1.4148L10.5852 3.91446L11.805 2.69463Z"
      fill="currentColor"
    />
  </svg>
);
