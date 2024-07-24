import { Button } from "@nextui-org/react";
import { ZodSchema } from "zod";
import _trimEnd from "lodash/trimEnd";

import {
  AsyncSelect,
  DatePicker,
  DynamicForm,
  Select,
  TextField,
} from "components";
import { useGetUser } from "views/Users/api";
import { ROLES } from "services";

export interface UsersFormProps {
  userId?: string;
  schema: ZodSchema;
}

export function UsersForm({ userId, schema }: UsersFormProps) {
  return (
    <DynamicForm
      hasAutoToasts
      action="/users"
      method={!userId ? "post" : "patch"}
      schema={schema}
      registerId={userId}
      useGetItem={useGetUser}
    >
      <div className="flex flex-col gap-3">
        <h3 className="text-base font-bold font-montserrat mb-2">
          Formulário de {!userId ? "cadastro" : "edição"} de Usuários
        </h3>
        <div className="flex grid md:grid-cols-2 gap-3">
          <TextField.Form name="first_name" label="Nome" />
          <TextField.Form name="last_name" label="Sobrenome" />
        </div>
        <div className="flex flex-col gap-3">
          <TextField.Form name="email" label="E-mail" />
          <TextField.Form
            isHidden
            name="password"
            defaultValue="generate_default"
          />
        </div>
        <div className="flex grid md:grid-cols-3 gap-3">
          <DatePicker.Form name="birth_date" label="Data de Nascimento" />
          <TextField.Form
            name="phone"
            label="Telefone"
            mask={["(00) 0000-0000", "(00) 00000-0000"]}
          />
          <Select.Form
            multiple
            name="roles"
            label="Papeis e Cargos"
            options={[
              { id: 1, name: ROLES.Coordinator },
              { id: 4, name: ROLES.Secretary },
            ]}
            track={{ label: "name", key: "id" }}
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
            {!userId ? "Cadastrar" : "Atualizar Registro"}
          </Button>
        </div>
      </div>
    </DynamicForm>
  );
}
