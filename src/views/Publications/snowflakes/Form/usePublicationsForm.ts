import { ZodSchema } from "zod";
import _trimEnd from "lodash/trimEnd";

import { resolveEndpoint } from "components";
import { useGetPublication } from "views/Publications/api";
import { useEffect, useMemo, useRef, useState } from "react";
import { useFieldArray } from "react-hook-form";
import { useCustomForm } from "core";
import { zodResolver } from "@hookform/resolvers/zod";

interface PublicationFormTypes {
  project_ids: string[];
  coauthors: { name: string }[];
}

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

  const endpoint = resolveEndpoint("/publications", publicationId);

  const { data: publication = {} } = useGetPublication(publicationId);

  const initialFormState = useMemo(() => {
    return {};
    // return publication?.user?.birth_date
    //   ? {
    //       ...publication,
    //       ...publication.user,
    //       birth_date_picker: parseDate(publication.user?.birth_date),
    //     }
    //   : {};
  }, [publication]);

  const { onSubmit, handleOnSubmit, ...formProps } = useCustomForm(
    { endpoint, method: !publicationId ? "post" : "patch" },
    {
      resolver: zodResolver(schema),
      mode: "onSubmit",
      defaultValues: {
        project_ids: [],
        coauthors: [{ name: "" }],
      } as PublicationFormTypes,
    },
    {
      reInitValues: initialFormState,
    }
  );

  const { control, setValue } = formProps;
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

  const addCoauthor = () => () => {
    console.log("add coauthor");
    append({ name: "" });
  };
  const rmvCoauthor = (index: number) => () => remove(index);

  const onSelectProject = ({ key, option }: any) => {
    console.log({ key, option });
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
    publication,
    coauthors: fields,
    isEditPage,
    projects,
    addCoauthor,
    rmvCoauthor,
    addProject,
    removeProject,
    handleOnSubmit,
    onSelectProject,
    ...formProps,
  };
}
