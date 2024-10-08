import { Button } from "@nextui-org/react";
import { ZodSchema } from "zod";
import _trimEnd from "lodash/trimEnd";

import { AsyncAutocomplete, DynamicForm, TextField } from "components";
import { useGetSubject } from "views/Subjects/api";

export interface SubjectsFormProps {
  subjectId?: string;
  schema: ZodSchema;
}

export function SubjectsForm({ subjectId, schema }: SubjectsFormProps) {
  return (
    <DynamicForm
      hasAutoToasts
      action="/subjects"
      method={!subjectId ? "post" : "patch"}
      schema={schema}
      registerId={subjectId}
      useGetItem={useGetSubject}
    >
      <div className="flex flex-col gap-3">
        <h3 className="text-base font-bold font-montserrat mb-2">
          Formulário de {!subjectId ? "cadastro" : "edição"} de Disciplinas
        </h3>
        <div className="flex grid md:grid-cols-4 gap-3">
          <TextField.Form name="code" label="Código" />
          <TextField.Form name="name" label="Nome" className="md:col-span-3" />
        </div>
        <div className="flex grid md:grid-cols-3 gap-3">
          <AsyncAutocomplete.Form
            name="course"
            label="Curso"
            endpoint="courses"
            track={{ label: "name", key: "id" }}
          />
          <TextField.Form mask={Number} name="workload" label="Carga Horária" />
          <TextField.Form mask={Number} name="credits" label="Créditos" />
        </div>
        <div className="flex justify-end mt-5">
          <Button
            type="submit"
            className="px-10"
            radius="full"
            variant="solid"
            color="primary"
          >
            {!subjectId ? "Cadastrar" : "Atualizar Registro"}
          </Button>
        </div>
      </div>
    </DynamicForm>
  );
}
