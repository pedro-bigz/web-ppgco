import { useDynamicForm } from "components";
import { useEffect, useRef, useState } from "react";
import { useFieldArray } from "react-hook-form";
import { useGetMilestone } from "views/Milestones/api";
import { ZodSchema } from "zod";

export interface UseMilestoneFormParams {
  milestoneId?: string;
  schema: ZodSchema;
}

export function useMilestoneForm({
  milestoneId,
  schema,
}: UseMilestoneFormParams) {
  const isEditPage = Boolean(milestoneId);
  const { data, endpoint, ...formProps } = useDynamicForm({
    hasAutoToasts: true,
    action: "/milestones",
    method: !isEditPage ? "post" : "patch",
    schema,
    registerId: milestoneId,
    useGetItem: useGetMilestone,
  });

  const projectRef = useRef<Record<string, any>>({});

  const { control, watch, setValue } = formProps;
  const {
    fields: documents,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "documents",
    shouldUnregister: true,
  });

  const [hasDocuments, situation] = watch(["need_document", "situation"]);
  const [projects, setProjects] = useState<Record<string, any>>({});

  const newDocument = () => {
    append({
      doc_name: "",
      description: "",
    });
  };

  const onAppend = () => {
    return () => newDocument();
  };

  const onRemove = (index: number) => {
    return () => remove(index);
  };

  const addProject = (key: string | number, option: any) => {
    return setProjects((state) => ({ ...state, [key]: option }));
  };

  const removeProject = (key: string | number) => {
    return setProjects(({ [key]: _, ...state }) => ({ ...state }));
  };

  const onSelectProject = ({ key, option }: any) => {
    if (!key) return;
    return !projects.hasOwnProperty(key)
      ? addProject(key, option)
      : removeProject(key);
  };

  const isLast = (index: number) => {
    return index === documents.length - 1;
  };

  useEffect(() => {
    if (!hasDocuments || documents.length) return;
    newDocument();
  }, [hasDocuments]);

  useEffect(() => {
    if (documents.length) return;
    newDocument();
  }, []);

  useEffect(() => {
    if (projectRef.current === projects) return;
    projectRef.current = projects;

    console.log({ project_ids: Object.keys(projects) });
    setValue("project_ids", Object.keys(projects));
  }, [projects]);

  return {
    subject: data,
    endpoint,
    projects,
    documents,
    isEditPage,
    hasDocuments,
    isLast,
    onAppend,
    onRemove,
    addProject,
    removeProject,
    onSelectProject,
    ...formProps,
  };
}
