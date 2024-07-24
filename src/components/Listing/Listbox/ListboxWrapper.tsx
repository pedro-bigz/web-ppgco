import classNames from "classnames";
import { HTMLAttributes } from "react";

interface ListboxWrapperProps extends HTMLAttributes<HTMLDivElement> {
  children: JSX.Element;
}

export function ListboxWrapper({
  children,
  className,
  ...otherProps
}: ListboxWrapperProps) {
  return (
    <div
      {...otherProps}
      className={classNames("flex flex-col items-center w-full", className)}
    >
      {children}
    </div>
  );
}
