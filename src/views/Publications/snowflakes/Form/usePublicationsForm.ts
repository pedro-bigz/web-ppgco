import { ZodSchema } from "zod";
import _trimEnd from "lodash/trimEnd";

import { useDynamicForm } from "components";
import { useGetPublication } from "views/Publications/api";
import { parseDate } from "@internationalized/date";
import { useEffect, useRef, useState } from "react";
import { useFieldArray } from "react-hook-form";

export interface PublicationFormProps {
  publicationId?: string;
  schema: ZodSchema;
}

export function usePublicationsForm({
  publicationId,
  schema,
}: PublicationFormProps) {
  const isEditPage = Boolean(publicationId);

  const projectRef = useRef<Record<string, any>>({});
  const [projects, setProjects] = useState<Record<string, any>>({});

  const { endpoint, data, setValue, ...formProps } = useDynamicForm({
    schema,
    registerId: publicationId,
    useGetItem: useGetPublication,
    action: "/publications",
    method: !publicationId ? "post" : "patch",
    onInitForm: (publication) => {
      return publication?.user?.birth_date
        ? {
            ...publication,
            ...publication.user,
            birth_date_picker: parseDate(publication.user?.birth_date),
          }
        : {};
    },
  });

  const { control } = formProps;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "coauthors",
    shouldUnregister: true,
  });

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

  useEffect(() => {
    if (projectRef.current === projects) return;
    projectRef.current = projects;

    console.log({ project_ids: Object.keys(projects) });
    setValue("project_ids", Object.keys(projects));
  }, [projects]);

  return {
    publication: data,
    coautors: fields,
    isEditPage,
    projects,
    append,
    remove,
    setValue,
    addProject,
    removeProject,
    onSelectProject,
    ...formProps,
  };
}
