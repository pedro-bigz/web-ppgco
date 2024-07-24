import { SVGProps } from "react";
export const TrashBIcon = ({
  width = 11,
  height = 15,
  color = "#F4003B",
  strokeWidth = 1.5,
  ...props
}: SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    color={color}
    fill="none"
    viewBox="0 0 11 15"
  >
    <path
      d="M0.755332 13.2054C0.755332 13.5677 0.874701 13.9151 1.08718 14.1713C1.29966 14.4275 1.58784 14.5714 1.88833 14.5714H8.68631C8.9868 14.5714 9.27499 14.4275 9.48746 14.1713C9.69994 13.9151 9.81931 13.5677 9.81931 13.2054V3.64286H0.755332V13.2054ZM7.17565 5.91965C7.17565 5.79888 7.21544 5.68306 7.28627 5.59766C7.35709 5.51227 7.45315 5.46429 7.55332 5.46429C7.65348 5.46429 7.74954 5.51227 7.82037 5.59766C7.89119 5.68306 7.93098 5.79888 7.93098 5.91965V12.2946C7.93098 12.4154 7.89119 12.5312 7.82037 12.6166C7.74954 12.702 7.65348 12.75 7.55332 12.75C7.45315 12.75 7.35709 12.702 7.28627 12.6166C7.21544 12.5312 7.17565 12.4154 7.17565 12.2946V5.91965ZM4.90966 5.91965C4.90966 5.79888 4.94945 5.68306 5.02027 5.59766C5.0911 5.51227 5.18716 5.46429 5.28732 5.46429C5.38749 5.46429 5.48355 5.51227 5.55437 5.59766C5.6252 5.68306 5.66499 5.79888 5.66499 5.91965V12.2946C5.66499 12.4154 5.6252 12.5312 5.55437 12.6166C5.48355 12.702 5.38749 12.75 5.28732 12.75C5.18716 12.75 5.0911 12.702 5.02027 12.6166C4.94945 12.5312 4.90966 12.4154 4.90966 12.2946V5.91965ZM2.64366 5.91965C2.64366 5.79888 2.68345 5.68306 2.75428 5.59766C2.8251 5.51227 2.92116 5.46429 3.02133 5.46429C3.12149 5.46429 3.21755 5.51227 3.28838 5.59766C3.3592 5.68306 3.39899 5.79888 3.39899 5.91965V12.2946C3.39899 12.4154 3.3592 12.5312 3.28838 12.6166C3.21755 12.702 3.12149 12.75 3.02133 12.75C2.92116 12.75 2.8251 12.702 2.75428 12.6166C2.68345 12.5312 2.64366 12.4154 2.64366 12.2946V5.91965ZM10.197 0.910719H7.36448L7.14261 0.378521C7.0956 0.264742 7.0232 0.169034 6.93355 0.102164C6.84389 0.0352935 6.74054 -8.61753e-05 6.63512 4.98978e-06H3.93717C3.83198 -0.000482542 3.72881 0.0347653 3.63947 0.10171C3.55013 0.168655 3.47824 0.264589 3.43204 0.378521L3.21016 0.910719H0.377666C0.277503 0.910719 0.181442 0.958694 0.110616 1.04409C0.0397897 1.12949 0 1.24531 0 1.36608L0 2.27679C0 2.39756 0.0397897 2.51338 0.110616 2.59878C0.181442 2.68417 0.277503 2.73215 0.377666 2.73215H10.197C10.2971 2.73215 10.3932 2.68417 10.464 2.59878C10.5349 2.51338 10.5746 2.39756 10.5746 2.27679V1.36608C10.5746 1.24531 10.5349 1.12949 10.464 1.04409C10.3932 0.958694 10.2971 0.910719 10.197 0.910719Z"
      fill="currentColor"
    />
  </svg>
);