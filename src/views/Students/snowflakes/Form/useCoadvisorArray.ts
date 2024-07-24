import { UseCustomFormReturn } from "core";
import _isEmpty from "lodash/isEmpty";
import { useEffect } from "react";
import { useFieldArray } from "react-hook-form";
import { initFormFields, setFormFields } from "utils";
import { useGetCoadvisors } from "views/Projects";

interface UseCoadvisorArrayParams extends UseCustomFormReturn {
  student: Record<string, any>;
  formDefaultValues: Record<string, any>;
}

export function useCoadvisorArray({
  reset,
  control,
  student,
  formDefaultValues,
}: UseCoadvisorArrayParams) {
  const fieldArrayProps = useFieldArray({
    control,
    name: "coadvisors",
    shouldUnregister: true,
    rules: { required: true },
  });

  const { data: coadvisors } = useGetCoadvisors(student?.project?.id);

  useEffect(() => {
    if (_isEmpty(coadvisors)) return;
    const castedCoadvisors = coadvisors as Record<string, any>[];
    const coadvisorsForm = castedCoadvisors.map(
      (coadvisor: Record<string, any>) => ({
        coadvisor,
        coadvisor_id: String(coadvisor.id),
      })
    );
    initFormFields({
      data: {
        ...formDefaultValues,
        coadvisors: coadvisorsForm,
      },
      setForm: reset,
    });
  }, [coadvisors]);

  const isLast = (index: number) => {
    return index === fieldArrayProps.fields.length - 1;
  };

  const newDocument = () => {
    fieldArrayProps.append({
      coadvisor: "",
    });
  };

  const onAppend = () => {
    return newDocument;
  };

  const onRemove = (index: number) => {
    return () => fieldArrayProps.remove(index);
  };

  useEffect(() => {
    newDocument();
  }, []);

  return {
    newDocument,
    isLast,
    onAppend,
    onRemove,
    coadvisors,
    ...fieldArrayProps,
  };
}
