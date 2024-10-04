import classnames from "classnames";

export interface FieldsetProps {
  legend: string | JSX.Element;
  children: React.ReactNode;
  classNames?: {
    fieldset?: string;
    legend?: string;
    container?: string;
  };
}

export function Fieldset({ legend, children, classNames }: FieldsetProps) {
  return (
    <fieldset
      className={classnames(
        "border-l-0 border-r-0 border-b-0 border-t-1",
        classNames?.fieldset
      )}
    >
      <legend className={classnames("pl-2 pr-5 py-5", classNames?.legend)}>
        {legend}
      </legend>
      <div className={classnames("", classNames?.container)}>{children}</div>
    </fieldset>
  );
}
