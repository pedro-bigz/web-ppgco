import { MouseEventHandler, ReactNode } from "react";
import { UseFieldArrayReturn } from "react-hook-form";
import _trimEnd from "lodash/trimEnd";
import classnames from "classnames";
import { Button } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { TrashIcon } from "assets";

interface FieldArrayProps extends UseFieldArrayReturn {
  className?: string;
  classNames?: Partial<
    Record<"row" | "col" | "inputsContainer" | "buttonContainer", string>
  >;
  hasDivisor?: boolean;
  newDocument: () => void;
  AddButton?: (props: ActionButtonProps) => JSX.Element;
  RemoveButton?: (props: ActionButtonProps) => JSX.Element;
  children: (
    field: Record<"id", string>,
    index: number,
    fields: Record<"id", string>[]
  ) => ReactNode | JSX.Element;
}

interface ActionButtonComponent {
  (props: ActionButtonProps): JSX.Element;
}

interface ActionButtonRenderProps {
  CustomButton: ActionButtonComponent | undefined;
  DefaultButton: ActionButtonComponent;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

interface ActionButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export function FieldArray({
  className,
  classNames,
  fields,
  hasDivisor = false,
  remove,
  newDocument,
  AddButton,
  RemoveButton,
  children: ChildrenComponent,
}: FieldArrayProps) {
  const isLast = (index: number) => {
    return index === fields.length - 1;
  };

  const onAppend = () => {
    console.log("onAppend");
    return () => {
      console.log("newDocument");
      newDocument();
    };
  };

  const onRemove = (index: number) => {
    return () => remove(index);
  };

  const DefaultAddButton = ({ onClick }: ActionButtonProps) => (
    <div className="w-full">
      <Button
        size="lg"
        isIconOnly
        variant="solid"
        color="primary"
        className="border-small w-full"
        onPress={console.log}
        onClick={onClick}
      >
        <FontAwesomeIcon icon={faPlus} />
      </Button>
    </div>
  );

  const DefaultRemoveButton = ({ onClick }: ActionButtonProps) => (
    <div className="w-full">
      <Button
        size="lg"
        isIconOnly
        variant="solid"
        color="danger"
        className="border-small w-full"
        onClick={onClick}
      >
        <TrashIcon width={21} height={21} />
      </Button>
    </div>
  );

  const ActionButtonRender = ({
    CustomButton,
    DefaultButton,
    onClick,
  }: ActionButtonRenderProps) => {
    if (CustomButton === undefined) {
      return <DefaultButton onClick={onClick} />;
    }

    return <CustomButton onClick={onClick} />;
  };

  return (
    <div className={className}>
      {fields.map((field, index, fields) => (
        <div key={field.id}>
          <div
            className={classnames(
              classNames?.row ?? "flex grid md:grid-cols-9 gap-3"
            )}
          >
            <div
              className={classnames(
                classNames?.inputsContainer ?? "flex flex-col col-span-8 gap-3"
              )}
            >
              {ChildrenComponent(field, index, fields)}
            </div>
            <div className={classNames?.buttonContainer}>
              {isLast(index) && (
                <ActionButtonRender
                  CustomButton={AddButton}
                  DefaultButton={DefaultAddButton}
                  onClick={onAppend()}
                />
              )}
              {!isLast(index) && (
                <ActionButtonRender
                  CustomButton={RemoveButton}
                  DefaultButton={DefaultRemoveButton}
                  onClick={onRemove(index)}
                />
              )}
            </div>
          </div>
          {hasDivisor && <hr className="my-3" />}
        </div>
      ))}
    </div>
  );
}
