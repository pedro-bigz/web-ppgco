import { Button } from "@nextui-org/react";
import { DynamicForm, TextArea, TextField } from "components";
import { useGetResearchLine } from "views/ResearchLine/api";
import { ZodSchema } from "zod";

export interface ResearchLineFormProps {
  researchLineId?: string;
  schema: ZodSchema;
}

export function ResearchLineForm({
  researchLineId,
  schema,
}: ResearchLineFormProps) {
  return (
    <DynamicForm
      hasAutoToasts
      action="/research-lines"
      method={!researchLineId ? "post" : "patch"}
      schema={schema}
      registerId={researchLineId}
      useGetItem={useGetResearchLine}
    >
      <div className="flex flex-col gap-3">
        <h3 className="text-base font-bold font-montserrat mb-2">
          Formulário de {!researchLineId ? "cadastro" : "edição"} de Linhas de
          Pesquisa
        </h3>
        <div className="flex flex-col gap-3">
          <TextField.Form name="title" label="Título" />
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
            {!researchLineId ? "Cadastrar" : "Atualizar Registro"}
          </Button>
        </div>
      </div>
    </DynamicForm>
  );
}
