import { Button } from "@nextui-org/react";
import { ZodSchema } from "zod";
import _trimEnd from "lodash/trimEnd";

import {
  AsyncAutocomplete,
  CardForm,
  DatePicker,
  resolveEndpoint,
  TextField,
} from "components";
import { useGetProfessor } from "views/Professors/api";
import { useCustomForm } from "core";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { parseDate } from "@internationalized/date";

export interface ProfessorFormProps {
  professorId?: string;
  schema: ZodSchema;
}

export function ProfessorForm({ professorId, schema }: ProfessorFormProps) {
  const endpoint = resolveEndpoint("/advisors", professorId);
  const method = !professorId ? "post" : "patch";

  const { data = {} } = useGetProfessor(professorId);

  const professor = data as { user: Record<string, any> };
  const defaultValues = useMemo(() => {
    return professor?.user?.birth_date
      ? {
          ...professor,
          ...professor.user,
          birth_date_picker: parseDate(professor.user?.birth_date),
        }
      : {};
  }, [professor]);

  const { onSubmit, handleOnSubmit, ...formProps } = useCustomForm(
    { endpoint, method },
    {
      resolver: zodResolver(schema),
      mode: "onSubmit",
      // reValidateMode: "onChange",
      // shouldUnregister: false,
    },
    {
      hasAutoToasts: true,
      reInitValues: defaultValues,
    }
  );

  return (
    <CardForm {...formProps} onSubmit={handleOnSubmit}>
      <div className="flex flex-col gap-3">
        <h3 className="text-base font-bold font-montserrat">
          Formulário de {!professorId ? "cadastro" : "edição"} de Professores
        </h3>
        <div className="flex grid md:grid-cols-2 gap-3">
          <TextField.Form name="first_name" label="Nome" />
          <TextField.Form name="last_name" label="Sobrenome" />
        </div>
        <div className="flex flex-col gap-3">
          <TextField.Form name="email" label="E-mail" />
          <TextField.Form name="lattes" label="Lattes" />
        </div>
        <div className="flex flex-col gap-3">
          <AsyncAutocomplete.Form
            name="research_line"
            label="Linha de Pesquisa"
            endpoint="research-lines"
            track={{ label: "title", key: "id" }}
          />
        </div>
        <div className="flex grid md:grid-cols-2 gap-3">
          <DatePicker.Form name="birth_date" label="Data de Nascimento" />
          <TextField.Form
            mask={["(00) 0000-0000", "(00) 00000-0000"]}
            name="phone"
            label="Telefone"
          />
        </div>
        <div className="flex justify-end mt-5">
          <Button
            type="submit"
            className="px-10"
            radius="full"
            variant="solid"
            color="primary"
          >
            {!professorId ? "Cadastrar" : "Atualizar Registro"}
          </Button>
        </div>
      </div>
    </CardForm>
  );
}
