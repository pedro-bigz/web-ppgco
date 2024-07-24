import { ZodSchema } from "zod";
import _trimEnd from "lodash/trimEnd";
import {
  AsyncAutocomplete,
  CardForm,
  Checkbox,
  DatePicker,
  TextField,
} from "components";
import { Button } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { TrashIcon } from "assets";
import { useCoadvisorArray } from "./useCoadvisorArray";
import { useStudentsForm } from "./useStudentsForm";
import { useEffect } from "react";
import { parseDate } from "@internationalized/date";

export interface StudentsFormProps {
  studentId?: string;
  schema: ZodSchema;
}

export function StudentsForm({ studentId, schema }: StudentsFormProps) {
  const { student, formDefaultValues, ...formProps } = useStudentsForm({
    studentId,
    schema,
  });

  const { newDocument, isLast, onRemove, fields } = useCoadvisorArray({
    student,
    formDefaultValues,
    ...formProps,
  });

  const { watch, setValue, handleOnSubmit } = formProps;
  const [entryDate, startDate] = watch(["entry_date", "start_date"]);

  useEffect(() => {
    if (!entryDate || startDate) return;
    setValue("start_date", entryDate);
    setValue("start_date_picker", parseDate(entryDate));
  }, [entryDate]);

  return (
    <CardForm {...formProps} onSubmit={handleOnSubmit}>
      <div className="flex flex-col gap-3">
        <h3 className="text-xl font-bold font-montserrat">
          Formulário de {!studentId ? "cadastro" : "edição"} de Estudante
        </h3>
        <h3 className="text-base font-bold font-montserrat mb-2">
          Dados do Estudante
        </h3>
        <div className="flex flex-col md:grid md:grid-cols-8 gap-3">
          <TextField.Form
            name="registration"
            label="Nº de Matrícula"
            className="col-span-2"
          />
          <TextField.Form
            name="first_name"
            label="Nome"
            className="col-span-3"
          />
          <TextField.Form
            name="last_name"
            label="Sobrenome"
            className="col-span-3"
          />
        </div>
        <div className="flex grid md:grid-cols-4 lg:grid-cols-3 gap-3">
          <TextField.Form
            name="email"
            label="E-mail"
            className="md:col-span-4 lg:col-span-1"
          />
          <DatePicker.Form
            name="birth_date"
            label="Data de Nascimento"
            className="md:col-span-2 lg:col-span-1"
          />
          <DatePicker.Form
            name="sucupira_date"
            label="Data de Atualização Sucupira"
            className="md:col-span-2 lg:col-span-1"
          />
        </div>
        <div className="flex grid md:grid-cols-5 gap-3">
          <Checkbox
            name="has_scholarship"
            label="Possui bolsa"
            className="col-span-1"
          />
          <DatePicker.Form
            name="scholarship"
            label="Data de ínicio da bolsa"
            className="col-span-2"
            isDisabled={!watch("has_scholarship")}
          />
          <DatePicker.Form
            name="entry_date"
            label="Data de ingresso"
            className="col-span-2"
          />
        </div>
        <div className="flex grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          <AsyncAutocomplete.Form
            name="course"
            label="Curso"
            endpoint="courses"
            track={{ label: "name", key: "id" }}
            className="md:col-span-2 lg:col-span-1"
          />
          <TextField.Form name="lattes" label="Lattes" />
          <TextField.Form
            name="phone"
            label="Celular"
            mask={["(00) 0000-0000", "(00) 00000-0000"]}
          />
        </div>

        <h3 className="text-base font-bold font-montserrat mt-10 mb-2">
          Dados do Projeto
        </h3>
        <div className="flex flex-col gap-3">
          <TextField.Form name="title" label="Título" defaultValue="ND" />
          <AsyncAutocomplete.Form
            name="research_line"
            label="Linha de Pesquisa"
            endpoint="research-lines"
            track={{ label: "title", key: "id" }}
          />
        </div>
        <div className="flex grid md:grid-cols-2 gap-3">
          <DatePicker.Form name="start_date" label="Data de ínicio" />
          <DatePicker.Form name="end_date" label="Data de fim" />
        </div>
        <div className="flex gap-3">
          <AsyncAutocomplete.Form
            name="advisor"
            label="Orientador"
            endpoint="advisors"
            track={{ label: "user.full_name", key: "id" }}
            disabledKeys={watch("coadvisors", [])
              .filter((field: any) => field.coadvisor_id)
              .map((field: any) => field.coadvisor_id)}
          />
        </div>

        <h3 className="text-base font-bold font-montserrat mt-10">
          Coorientadores
        </h3>
        <div className="flex flex-col gap-3">
          {fields.map((field, index, fields) => (
            <div key={field.id}>
              <div className={"flex grid md:grid-cols-9 gap-3"}>
                <div className={"flex flex-col col-span-8 gap-3"}>
                  <AsyncAutocomplete.Form
                    name={`coadvisors.${index}.coadvisor`}
                    label="Coorientador"
                    endpoint="advisors"
                    track={{ label: "user.full_name", key: "id" }}
                    disabledKeys={[
                      watch("advisor_id"),
                      ...fields
                        .filter((field: any) => field.coadvisor_id)
                        .map((field: any) => field.coadvisor_id),
                    ]}
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
                        onClick={newDocument}
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
            </div>
          ))}
        </div>
        <div className="flex justify-end mt-5">
          <Button
            type="submit"
            className="px-10"
            radius="full"
            variant="solid"
            color="primary"
          >
            {!studentId ? "Cadastrar" : "Atualizar Registro"}
          </Button>
        </div>
      </div>
    </CardForm>
  );
}
