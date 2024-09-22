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
import { GenericFunction, run } from "utils";
import { useRoles } from "core/hooks/contexts/useRoles";
import { ROLES } from "services";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

export interface PublicationFormProps {
  publicationId?: string;
  schema: ZodSchema;
}

interface CoauthorsFieldsProps {
  coauthors: any[];
  addCoauthor: GenericFunction;
  rmvCoauthor: GenericFunction;
}

function CoauthorsFields({
  coauthors,
  addCoauthor,
  rmvCoauthor,
}: CoauthorsFieldsProps) {
  return (
    <div className="flex flex-col gap-3">
      {coauthors.map((_coauthor, index) => (
        <div key={index} className="flex grid grid-cols-10 gap-3">
          <TextField.Form
            label="Nome"
            name={`coauthors.${index}.first_name`}
            className="col-span-4"
          />
          <TextField.Form
            label="Sobrenome"
            name={`coauthors.${index}.last_name`}
            className="col-span-6"
          />
          <TextField.Form
            label="Lattes"
            name={`coauthors.${index}.lattes`}
            className="col-span-5"
          />
          <TextField.Form
            label="Afiliação"
            name={`coauthors.${index}.affiliation`}
            className="col-span-5"
          />
          {index === coauthors.length - 1 ? (
            <Button
              isIconOnly
              size="lg"
              color="primary"
              onClick={addCoauthor()}
            >
              <FontAwesomeIcon icon={faPlus} />
            </Button>
          ) : (
            <Button
              isIconOnly
              size="lg"
              color="danger"
              onClick={rmvCoauthor(index)}
            >
              <FontAwesomeIcon icon={faMinus} />
            </Button>
          )}
        </div>
      ))}
    </div>
  );
}

export function PublicationsForm({
  publicationId,
  schema,
}: PublicationFormProps) {
  const { hasRoles } = useRoles();
  const {
    coauthors,
    projects,
    isEditPage,
    addProject,
    addCoauthor,
    rmvCoauthor,
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
          Formulário de {!isEditPage ? "cadastro" : "edição"} de Publicações
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
              <AsyncAutocomplete.Uncontrolled
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
          <DatePicker.Form name="start_date" label="Data de Início" />
          <DatePicker.Form name="end_date" label="Data de Fim" />
        </div>
        <div className="flex flex-col gap-3">
          <h3>Coautores</h3>
          <div>
            <CoauthorsFields
              coauthors={coauthors}
              addCoauthor={addCoauthor}
              rmvCoauthor={rmvCoauthor}
            />
          </div>
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
