import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@nextui-org/react";
import { TrashIcon } from "assets";
import { TextArea, TextField } from "components";
import { FieldArray } from "components/Form/FieldArray";
import { useEffect } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

interface ProjectFieldArrayProps {
  className: string;
}

export const ProjectFieldArray = ({ className }: ProjectFieldArrayProps) => {
  const { control, watch } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "project_ids",
    shouldUnregister: true,
    rules: { required: true },
  });

  const projectId = watch("project_id");

  const isLast = (index: number) => {
    return index === fields.length - 1;
  };

  const newDocument = () => {
    append("");
  };

  const onAppend = () => {
    return () => {
      newDocument();
    };
  };

  const onRemove = (index: number) => {
    return () => remove(index);
  };

  useEffect(newDocument, []);
  useEffect(() => {
    if (!projectId) return;
    append(projectId);
  }, [projectId]);

  return (
    <div className={className}>
      {fields.map((field, index) => (
        <div key={field.id}>
          <div className="flex grid md:grid-cols-9 gap-3">
            <div className="flex flex-col col-span-8 gap-3">
              <TextField.Form name={`documents.${index}`} isDisabled />
            </div>
            <div>
              {isLast(index) && (
                <div className="w-full">
                  <Button
                    size="lg"
                    isIconOnly
                    variant="solid"
                    color="primary"
                    className="border-small w-full"
                    onClick={onAppend()}
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </Button>
                </div>
              )}
              {!isLast(index) && (
                <div className="w-full">
                  <Button
                    size="lg"
                    isIconOnly
                    variant="solid"
                    color="danger"
                    className="border-small w-full"
                    onClick={onRemove(index)}
                  >
                    <TrashIcon width={21} height={21} />
                  </Button>
                </div>
              )}
            </div>
          </div>
          <hr className="my-3" />
        </div>
      ))}
    </div>
  );
};
