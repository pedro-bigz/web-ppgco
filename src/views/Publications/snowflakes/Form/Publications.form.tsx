import { Button, Chip } from "@nextui-org/react";
import { ZodSchema } from "zod";
import _trimEnd from "lodash/trimEnd";

import {
  AsyncAutocomplete,
  AsyncSelect,
  CardForm,
  DatePicker,
  TextField,
} from "components";
import { usePublicationsForm } from "./usePublicationsForm";
import { run } from "utils";
import { useRoles } from "core/hooks/contexts/useRoles";
import { ROLES } from "services";

export interface PublicationFormProps {
  publicationId?: string;
  schema: ZodSchema;
}

export function PublicationsForm({
  publicationId,
  schema,
}: PublicationFormProps) {
  const { hasRoles } = useRoles();
  const {
    projects,
    isEditPage,
    addProject,
    removeProject,
    handleOnSubmit,
    onSelectProject,
    ...formProps
  } = usePublicationsForm({
    publicationId,
    schema,
  });

  return (
    <CardForm {...formProps} onSubmit={handleOnSubmit}>
      <div className="flex flex-col gap-3">
        <h3 className="text-base font-bold font-montserrat">
          Formulário de {!isEditPage ? "cadastro" : "edição"} de Publicationes
        </h3>
        {!isEditPage && !hasRoles(ROLES.Student) && (
          <div className="flex flex-wrap gap-1">
            {Object.values(projects)
              .reverse()
              .map(({ id, title }) => (
                <Chip key={id} onClose={run(removeProject, id)}>
                  {title}
                </Chip>
              ))}
            <TextField.Form isHidden name="project_ids" />
          </div>
        )}
        {!hasRoles(ROLES.Student) && (
          <div className="flex flex-col gap-3">
            {!isEditPage ? (
              <AsyncSelect.Uncontrolled
                name="project"
                label="Projeto"
                endpoint="projects"
                value={" "}
                onChange={onSelectProject}
                track={{ label: "title", key: "id" }}
              />
            ) : (
              <AsyncAutocomplete.Form
                name="project"
                label="Projeto"
                endpoint="projects"
                track={{ label: "title", key: "id" }}
              />
            )}
          </div>
        )}
        <div className="flex flex-col gap-3">
          <TextField.Form name="title" label="Título" />
          <TextField.Form name="vehicle_name" label="Veículo de Publicação" />
        </div>
        <div className="flex grid md:grid-cols-2 gap-3">
          <DatePicker.Form name="start_date" label="E-mail" />
          <DatePicker.Form name="end_date" label="E-mail" />
        </div>
        <div className="flex justify-end mt-5">
          <Button
            type="submit"
            className="px-10"
            radius="full"
            variant="solid"
            color="primary"
          >
            {!isEditPage ? "Cadastrar" : "Atualizar Registro"}
          </Button>
        </div>
      </div>
    </CardForm>
  );
}
