import { useEffect } from "react";
import { useFieldArray } from "react-hook-form";

export function useCoadvisorArray({ control }: any) {
  const fieldArrayProps = useFieldArray({
    control,
    name: "coadvisors",
    shouldUnregister: true,
    rules: { required: true },
  });

  const isLast = (index: number) => {
    return index === fieldArrayProps.fields.length - 1;
  };

  const newDocument = () => {
    console.log("newDocument");
    fieldArrayProps.append({
      coadvisor: "",
    });
  };

  const onAppend = () => {
    console.log("onAppend");
    return () => {
      console.log("newDocument");
      newDocument();
    };
  };

  const onRemove = (index: number) => {
    return () => fieldArrayProps.remove(index);
  };

  useEffect(() => {
    newDocument();
  }, []);

  return { newDocument, isLast, onAppend, onRemove, ...fieldArrayProps };
}
