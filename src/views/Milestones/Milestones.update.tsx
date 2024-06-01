import { z } from "zod";
import { MilestoneForm } from "./snowflakes";
import { useID } from "hooks";
import { isValidDate, toIsoString } from "utils";

const schema = z.object({
  project_id: z
    .string()
    .min(1, "O projeto deve ser selecionado")
    .transform((num) => +num),
  expected_date: z
    .custom(isValidDate, "Campo obrigatório")
    .transform(toIsoString),
  process_number_sei: z
    .string({ required_error: "Projeto" })
    .min(1, "Campo obrigatório")
    .transform((num) => +num),
  description: z.string().optional(),
  meeting_collegiate: z.string().min(1, "Campo obrigatório"),
  need_document: z.boolean(),
  situation: z.string().min(1, "Status"),
});

export const MilestoneUpdatePage = () => {
  return <MilestoneForm milestoneId={useID()} schema={schema} />;
};
