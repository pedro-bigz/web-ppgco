import { z } from "zod";
import { SubjectsForm } from "./snowflakes";

const schema = z.object({
  code: z.string(),
  name: z.string(),
  workload: z
    .string()
    .min(1, "Este campo é obrigatório")
    .transform((num) => +num),
  credits: z
    .string()
    .min(1, "Este campo é obrigatório")
    .transform((num) => +num),
  // course: z.object({
  //   id: z.number(),
  // }),
  course_id: z.string().transform((num) => +num),
});

export const SubjectsCreatePage = () => {
  return <SubjectsForm schema={schema} />;
};
