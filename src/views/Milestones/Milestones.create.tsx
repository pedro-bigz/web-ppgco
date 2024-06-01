import { z } from "zod";
import { MilestoneForm } from "./snowflakes";
import { isValidDate, toIsoString } from "utils";

const schema = z.object({
  project_ids: z.array(
    z
      .string()
      // .min(1, "O projeto deve ser selecionado")
      .transform((num) => +num)
  ),
  expected_date: z
    .custom(isValidDate, "Insira uma data válida")
    .transform(toIsoString),
  process_number_sei: z
    .string()
    // .min(1, "Campo obrigatório")
    .transform((num) => +num),
  description: z.string().optional(),
  meeting_collegiate: z.string(), //.min(1, "Campo obrigatório"),
  need_document: z.boolean(),
  situation: z.string(), //.min(1, "Campo obrigatório"),
  documents: z
    .array(
      z.object({
        doc_name: z.string().min(1, "Campo obrigatório"),
        description: z.string().optional(),
      })
    )
    .optional(),
});

export const MilestoneCreatePage = () => {
  return <MilestoneForm schema={schema} />;
};
