import classNames from "classnames";
import { HTMLAttributes } from "react";

interface ListboxWrapperProps extends HTMLAttributes<HTMLDivElement> {
  children: JSX.Element;
}

export const ListboxWrapper = ({
  children,
  className,
  ...otherProps
}: ListboxWrapperProps) => (
  <div
    {...otherProps}
    className={classNames("flex flex-col items-center w-full", className)}
  >
    {children}
  </div>
);
