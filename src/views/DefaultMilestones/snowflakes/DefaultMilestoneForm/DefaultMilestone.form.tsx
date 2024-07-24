import { Key } from "react";
import { UseFormReturn } from "react-hook-form";
import { Button, Skeleton, Tab, Tabs } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleMinus,
  faCirclePlus,
  faPlus,
  faSave,
} from "@fortawesome/free-solid-svg-icons";
import { ZodSchema } from "zod";
import _trimEnd from "lodash/trimEnd";
import _remove from "lodash/remove";

import {
  Icon,
  CardForm,
  Checkbox,
  TextArea,
  TextField,
  AsyncAutocomplete,
  AsyncSelect,
} from "components";
import { CloseIcon, TrashIcon } from "assets";
import {
  Course,
  DefaultMilestoneList,
  useDefaultMilestoneForm,
} from "./useDefaultMilestoneForm";
import { useMilestoneDocument } from "./useMilestoneDocument";

export interface DefaultMilestoneFormProps {
  course?: Course;
  isLoading: boolean;
  schema: ZodSchema;
  defaultValues?: DefaultMilestoneList;
}

interface FormContentProps extends UseFormReturn {
  field: Record<"id", string>;
  formId: number;
  isLast: (index: number) => boolean;
}

export function DefaultMilestoneForm({
  course,
  schema,
  isLoading,
  defaultValues,
}: DefaultMilestoneFormProps) {
  const {
    endpoint,
    fields,
    tabNames,
    currentTab,
    canDeleteField,
    isLast,
    addMilestone,
    removeMilestone,
    setCurrentTab,
    handleOnSubmit,
    handleAddMilestone,
    handleRemoveMilestone,
    ...formProps
  } = useDefaultMilestoneForm({ course, schema, defaultValues });

  return (
    <CardForm {...formProps} onSubmit={handleOnSubmit}>
      {isLoading ? (
        <SkeletonPage />
      ) : (
        <div className="flex flex-col gap-3">
          <h3 className="text-base font-bold font-montserrat mb-2 text-gray-700">
            Formulário de atualização de Milestones Padrão do{" "}
            <span className="text-xl font-extrabold font-montserrat text-gray-900">
              {course?.name ?? ""}
            </span>
          </h3>
          <Tabs
            aria-label="Tabs colors"
            radius="full"
            selectedKey={currentTab}
            onSelectionChange={setCurrentTab}
            destroyInactiveTabPanel={false}
          >
            {fields.map((field: any, index) => (
              <Tab
                key={index}
                title={
                  <div className="flex items-center gap-2">
                    <span>{tabNames[index] || "Novo Marco"}</span>
                    {canDeleteField && currentTab == index && (
                      <span>
                        <CloseIcon onClick={handleRemoveMilestone(index)} />
                      </span>
                    )}
                  </div>
                }
              >
                <div className="flex flex-col gap-3">
                  <FormContent
                    field={field}
                    formId={index}
                    isLast={isLast}
                    {...formProps}
                  />
                  <div className="flex justify-end">
                    {canDeleteField && (
                      <Button
                        type="button"
                        className="px-10 w-auto"
                        radius="full"
                        variant="solid"
                        color="danger"
                        onClick={handleRemoveMilestone(index)}
                      >
                        <Icon
                          icon={faCircleMinus}
                          iconProps={{ className: "text-xl" }}
                        />
                        Deletar Marco
                      </Button>
                    )}
                  </div>
                </div>
              </Tab>
            ))}
          </Tabs>
          <div className="flex justify-end mt-5 gap-3">
            <Button
              type="button"
              className="px-10"
              radius="full"
              variant="solid"
              color="secondary"
              onClick={handleAddMilestone()}
            >
              <Icon icon={faCirclePlus} iconProps={{ className: "text-xl" }} />
              Adicionar Marco
            </Button>
            <Button
              type="submit"
              className="px-10"
              radius="full"
              variant="solid"
              color="primary"
            >
              <Icon icon={faSave} iconProps={{ className: "text-xl" }} />
              Atualizar Registro
            </Button>
          </div>
        </div>
      )}
    </CardForm>
  );
}

function SkeletonPage() {
  return (
    <div className="flex flex-col gap-3">
      <Skeleton className="w-2/4 rounded-lg mb-2">
        <div className="h-[48px] rounded-lg bg-default-300"></div>
      </Skeleton>
      <Skeleton className="rounded-lg">
        <div className="h-[48px] rounded-lg bg-default-300"></div>
      </Skeleton>
      <Skeleton className="rounded-lg">
        <div className="h-[98px] rounded-lg bg-default-300"></div>
      </Skeleton>
      <div className="flex grid md:grid-cols-3 gap-3">
        <Skeleton className="rounded-lg">
          <div className="h-[48px] rounded-lg bg-default-200"></div>
        </Skeleton>
        <Skeleton className="rounded-lg">
          <div className="h-[48px] rounded-lg bg-default-200"></div>
        </Skeleton>
        <Skeleton className="rounded-lg">
          <div className="h-[48px] rounded-lg bg-default-300"></div>
        </Skeleton>
        <Skeleton className="w-4/5 rounded-lg">
          <div className="h-6 w-4/5 rounded-lg bg-default-300"></div>
        </Skeleton>
      </div>
      <div className="flex justify-end">
        <Skeleton className="w-1/5 rounded-full">
          <div className="h-[48px] rounded-full bg-default-300"></div>
        </Skeleton>
      </div>
    </div>
  );
}

function FormContent({
  field,
  formId,
  isLast,
  ...formProps
}: FormContentProps) {
  console.log("FormContent");
  const {
    documents,
    hasDocuments,
    isLastDocument,
    handleAddDocument,
    handleRemoveDocument,
  } = useMilestoneDocument({ formId, ...formProps });

  return (
    <>
      <div className="flex flex-col gap-3">
        <TextField.Form name={`data.${formId}.description`} label="Descrição" />
      </div>
      <div className="flex flex-col gap-3">
        <TextField.Form
          mask={Number}
          name={`data.${formId}.duration`}
          label="Prazo para completar o marco em meses"
        />
      </div>
      <div className="flex grid md:grid-cols-3 gap-3">
        <AsyncSelect.Form
          endpoint="milestone-situation"
          name={`data.${formId}.situation`}
          label="Status"
          track={{ key: "id", label: "name" }}
        />
        <TextField.Form
          name={`data.${formId}.meeting_collegiate`}
          label="Reunião do Colegiado"
        />
        <TextField.Form
          mask={Number}
          name={`data.${formId}.process_number_sei`}
          label="Número do Processo SEI"
        />
      </div>
      <div className="flex flex-col gap-3">
        <Checkbox
          name={`data.${formId}.need_document`}
          label="Necessita de documentação"
        />

        {hasDocuments && (
          <div className="flex flex-col gap-3">
            {documents.map(
              (field: { id: Key | null | undefined }, index: any) => (
                <div key={field.id}>
                  <div className="flex flex-col md:grid md:grid-cols-9 gap-3">
                    <div className="flex flex-col col-span-8 gap-3">
                      <AsyncAutocomplete.Form
                        endpoint="documents"
                        label="Nome do Documento"
                        name={`data.${formId}.documents.${index}.doc`}
                        track={{ label: "name", key: "name" }}
                      />

                      <TextArea.Form
                        name={`data.${formId}.documents.${index}.description`}
                        label="Descrição"
                      />
                    </div>
                    <div className="flex flex-row md:flex-col justify-end md:justify-start gap-2">
                      {isLastDocument(index) && (
                        <div className="md:w-full">
                          <Button
                            size="lg"
                            isIconOnly
                            variant="solid"
                            color="primary"
                            className="border-small w-full"
                            onClick={handleAddDocument()}
                          >
                            <FontAwesomeIcon icon={faPlus} />
                          </Button>
                        </div>
                      )}
                      {!isLastDocument(index) && (
                        <div className="md:w-full">
                          <Button
                            size="lg"
                            isIconOnly
                            variant="solid"
                            color="danger"
                            className="border-small w-full"
                            onClick={handleRemoveDocument(index)}
                          >
                            <TrashIcon width={21} height={21} />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                  {/* {hasDivisor && <hr className="my-3" />} */}
                </div>
              )
            )}
          </div>
        )}
      </div>
    </>
  );
}
