import { Button } from "@nextui-org/react";
import { ZodSchema } from "zod";
import _trimEnd from "lodash/trimEnd";

import {
  DynamicForm,
  AsyncSelect,
  TextField,
  DatePicker,
  Select,
  TextArea,
  Checkbox,
  resolveEndpoint,
  CardForm,
} from "components";
import { useGetMilestone } from "views/Milestones/api";
import { ChangeEvent, useEffect, useState } from "react";
import { DocumentForm } from "../DocumentForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCustomForm } from "hooks";
import { useFieldArray } from "react-hook-form";
import { UseQueryResult } from "@tanstack/react-query";

export interface SubjectsFormProps {
  milestoneId?: string;
  schema: ZodSchema;
}

const statusList = [
  { value: "concluido", label: "Concluído" },
  { value: "em_andamento", label: "Em Andamento" },
  { value: "documentacao_pendente", label: "Documentação Pendente" },
  { value: "aguardando_validacao", label: "Aguardando Validação" },
  { value: "nao_iniciado", label: "Não Iniciado" },
];

export const MilestoneForm = ({ milestoneId, schema }: SubjectsFormProps) => {
  const [hasDocuments, setHasDocuments] = useState<Boolean>(false);

  const onNeedDocument = (e: ChangeEvent<HTMLInputElement>) => {
    return setHasDocuments(Boolean(e.target.checked));
  };

  return (
    <DynamicForm
      hasAutoToasts
      action="/milestones"
      method={!milestoneId ? "post" : "patch"}
      schema={schema}
      registerId={milestoneId}
      useGetItem={useGetMilestone}
    >
      <div className="flex flex-col gap-3">
        <h3 className="text-base font-bold font-montserrat mb-2">
          Formulário de {!milestoneId ? "cadastro" : "edição"} de Milestone
        </h3>
        <div className="flex grid md:grid-cols-2 gap-3">
          <AsyncSelect.Form
            name="project"
            label="Projeto"
            endpoint="projects"
            track={{ label: "title", key: "id" }}
          />
          <DatePicker.Form name="expected_date" label="Prazo" />
        </div>
        <div className="flex grid md:grid-cols-3 gap-3">
          <TextField.Form
            name="meeting_collegiate"
            label="Reunião do Colegiado"
          />
          <TextField.Form
            mask={Number}
            name="process_number_sei"
            label="Número do Processo SEI"
          />
          <Select.Form name="situation" label="Status" options={statusList} />
        </div>
        <div className="flex flex-col gap-3">
          <Checkbox
            name="need_document"
            label="Possui documetação"
            onChange={onNeedDocument}
          />

          {hasDocuments && <DocumentForm className="my-5" />}
          <TextArea.Form name="description" label="Descrição" />
        </div>
        <div className="flex justify-end mt-5">
          <Button
            type="submit"
            className="px-10"
            radius="full"
            variant="solid"
            color="primary"
          >
            {!milestoneId ? "Cadastrar" : "Atualizar Registro"}
          </Button>
        </div>
      </div>
    </DynamicForm>
  );
};
