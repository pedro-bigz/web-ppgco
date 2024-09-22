import { Button, Chip } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { ZodSchema } from "zod";
import _trimEnd from "lodash/trimEnd";
import _remove from "lodash/remove";

import {
  TextField,
  DatePicker,
  TextArea,
  Checkbox,
  CardForm,
  AsyncSelect,
  AsyncAutocomplete,
} from "components";
import { run } from "utils";
import { TrashIcon } from "assets";
import { useMilestoneForm } from "./useMilestoneForm";

export interface MilestoneFormProps {
  milestoneId?: string;
  schema: ZodSchema;
}

export function MilestoneForm({ milestoneId, schema }: MilestoneFormProps) {
  const {
    subject,
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
    handleOnSubmit,
    ...formProps
  } = useMilestoneForm({
    milestoneId,
    schema,
  });

  return (
    <CardForm {...formProps} onSubmit={handleOnSubmit}>
      <div className="flex flex-col gap-3">
        <h3 className="text-base font-bold font-montserrat mb-2">
          Formulário de {!isEditPage ? "cadastro" : "edição"} de Milestone
        </h3>
        {!isEditPage && (
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
        <div className="flex grid md:grid-cols-2 gap-3">
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
          <DatePicker.Form name="expected_date" label="Prazo" />
        </div>
        <div className="flex flex-col gap-3">
          <TextArea.Form name="description" label="Descrição" />
        </div>
        <div className="flex grid md:grid-cols-3 gap-3">
          <AsyncSelect.Form
            endpoint="milestone-situation"
            name="situation"
            label="Status"
            track={{ key: "id", label: "name" }}
          />
          <TextField.Form
            name="meeting_collegiate"
            label="Reunião do Colegiado"
          />
          <TextField.Form
            mask={Number}
            name="process_number_sei"
            label="Número do Processo SEI"
          />
        </div>
        <div className="flex flex-col gap-3">
          <Checkbox.Form name="need_document" label="Necessita documentação" />

          {hasDocuments && (
            <div className="flex flex-col gap-3">
              {documents.map((field, index) => (
                <div key={field.id}>
                  <div className="flex grid md:grid-cols-9 gap-3">
                    <div className="flex flex-col col-span-8 gap-3">
                      <AsyncAutocomplete.Form
                        endpoint="documents"
                        label="Nome do Documento"
                        name={`documents.${index}.doc`}
                        track={{ label: "name", key: "name" }}
                      />

                      <TextArea.Form
                        name={`documents.${index}.description`}
                        label="Descrição"
                      />
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
                  {/* {hasDivisor && <hr className="my-3" />} */}
                </div>
              ))}
            </div>
          )}
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
