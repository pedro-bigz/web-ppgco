import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardBody } from "@nextui-org/react";
import _isEmpty from "lodash/isEmpty";
import { useApiQuery, useID } from "core";
import {
  Course,
  DefaultMilestoneForm,
  DefaultMilestoneList,
} from "./snowflakes";
import { validCourseIds } from "./DefaultMilestones.mock";

const schema = z
  .object({
    data: z.array(
      z
        .object({
          duration: z.string().transform((num) => +num),
          process_number_sei: z.string(),
          description: z.string(),
          meeting_collegiate: z.string().optional(),
          need_document: z.string().or(z.boolean()).transform(Boolean),
          situation_id: z.string().transform((num) => +num),
          documents: z
            .object({
              doc_name: z.string(),
              description: z.string().optional(),
            })
            .array(),
        })
        .refine(
          (item) =>
            !item.need_document ||
            !item.documents.some(({ doc_name }) => _isEmpty(doc_name)),
          (item) => {
            const index = item.need_document
              ? item.documents.findIndex(({ doc_name }) => _isEmpty(doc_name))
              : -1;

            if (index < 0) return {};

            return {
              message: "O nome do documento é obrigatório",
              path: [`documents.${index}.doc_name`],
            };
          }
        )
        .transform(({ documents, ...item }) => {
          return item.need_document ? { documents, ...item } : item;
        })
    ),
  })
  .transform(({ data }) => data);

export function DefaultMilestoneUpdatePage() {
  const navigate = useNavigate();
  const courseId = +useID(0);
  const canAccess = courseId && validCourseIds.includes(courseId);

  const { data: course, isLoading } = useApiQuery<Course>({
    endpoint: "courses/" + courseId,
    queryKey: ["courses/" + courseId],
    options: { enabled: Boolean(courseId) },
  });

  const { data: defaultValues, isLoading: isLoadingValues } =
    useApiQuery<DefaultMilestoneList>({
      endpoint: "default-milestones/" + courseId,
      queryKey: ["default-milestones/" + courseId],
      options: { enabled: Boolean(courseId) },
    });

  const goTo = (url: string) => () => navigate(url);

  if (!canAccess) {
    return (
      <Card className="w-full space-y-5 p-4" radius="lg">
        <CardBody>
          <div className="flex flex-col gap-4 font-montserrat">
            <h3 className="text-xl font-extrabold font-montserrat">
              Curso Não encontrado.
            </h3>
            <Button
              variant="bordered"
              className="w-auto"
              onClick={goTo("/marcos-temporais-padrao")}
            >
              Voltar a listagem de Marcos Temporais Padrão
            </Button>
          </div>
        </CardBody>
      </Card>
    );
  }

  return (
    <DefaultMilestoneForm
      schema={schema}
      course={course}
      defaultValues={defaultValues}
      isLoading={isLoading || isLoadingValues || !course?.id}
    />
  );
}
