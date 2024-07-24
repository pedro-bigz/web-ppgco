import { useEffect, useMemo, useState } from "react";
import { ZodSchema } from "zod";
import { useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import _isEmpty from "lodash/isEmpty";
import _isEqual from "lodash/isEqual";
import _omit from "lodash/omit";
import { resolveEndpoint } from "components";
import { useCustomForm } from "core";
import { formatFormFields } from "utils/forms/formatFormFields";

export interface Course {
  id: number;
  name: string;
}

export interface DefaultMilestoneInterface {
  duration: number;
  description: string;
  situation_id: number;
  meeting_collegiate: string;
  process_number_sei: string;
  need_document: boolean;
  documents?: MilestoneDocumentInterface[];
}

export type DefaultMilestoneList = DefaultMilestoneInterface[];

export interface UseMilestoneFormParams {
  course?: Course;
  schema: ZodSchema;
  defaultValues?: DefaultMilestoneList;
}

interface MilestoneDocumentInterface {
  doc_name: string;
  description: string;
}

export function useDefaultMilestoneForm({
  course,
  schema,
  defaultValues,
}: UseMilestoneFormParams) {
  const [currentTab, setCurrentTab] = useState<string | number>("0");
  const endpoint = resolveEndpoint("/default-milestones", String(course?.id));

  const defaultFixedValues = useMemo(
    () =>
      defaultValues && !_isEmpty(defaultValues)
        ? { data: defaultValues.map((data) => formatFormFields({ data })) }
        : undefined,
    [defaultValues]
  );

  const defaultEmptyMilestones = useMemo(
    () => ({
      data: [
        {
          duration: "",
          description: "",
          situation: "",
          meeting_collegiate: "",
          process_number_sei: "",
          need_document: false,
        },
      ],
    }),
    [defaultValues]
  );

  const { handleOnSubmit, onSubmit, ...formProps } = useCustomForm(
    { endpoint, method: "patch" },
    {
      resolver: zodResolver(schema),
      mode: "onSubmit",
      shouldUnregister: false,
    },
    {
      reInitValues: (defaultFixedValues ?? defaultEmptyMilestones) as any,
    }
  );

  const { control, watch } = formProps;
  const {
    fields,
    append: addMilestone,
    remove: removeMilestone,
  } = useFieldArray({ control, name: "data" });

  // useEffect(() => {
  //   console.log({
  //     data: formatFormFields({
  //       data: defaultValues ?? DefaultEmptyMilestones,
  //     }) as any,
  //   });
  //   reset({
  //     data: formatFormFields({
  //       data: defaultValues ?? DefaultEmptyMilestones,
  //     }) as any,
  //   });
  // }, [defaultValues]);

  const tabNames = watch(
    Object.keys(fields).map((index) => `data.${index}.description`)
  );

  const numTabs = useMemo(() => {
    return tabNames.length;
  }, [tabNames.length]);

  const isLast = (index: number) => {
    return index === fields.length - 1;
  };

  const canDeleteField = fields.length > 1;

  const handleRemoveMilestone = (index: number) => {
    return () => {
      if (fields.length > 1) removeMilestone(index);
    };
  };

  const handleAddMilestone = () => {
    return () => {
      addMilestone({
        duration: "",
        description: "",
        situation: "",
        meeting_collegiate: "",
        process_number_sei: "",
        need_document: false,
      });
      setCurrentTab(String(numTabs));
    };
  };

  return {
    endpoint,
    fields,
    tabNames,
    canDeleteField,
    currentTab,
    setCurrentTab,
    isLast,
    addMilestone,
    removeMilestone,
    handleOnSubmit,
    handleAddMilestone,
    handleRemoveMilestone,
    ...formProps,
  };
}
