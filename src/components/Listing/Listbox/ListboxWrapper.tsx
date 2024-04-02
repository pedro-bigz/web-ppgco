import classNames from "classnames";

interface ListboxWrapperProps {
  children: JSX.Element;
  className?: string;
}

export const ListboxWrapper = ({
  children,
  className,
}: ListboxWrapperProps) => (
  <div
    className={classNames(
      "flex flex-col items-center mx-[21px] my-[14px] w-full max-w-[260px] px-1 py-2",
      className
    )}
  >
    {children}
  </div>
);
