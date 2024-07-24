import { z } from "zod";
import { SubjectsForm } from "./snowflakes";
import { useID } from "core";

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
  course_id: z.string().transform((num) => +num),
});

export function SubjectsUpdatePage() {
  return <SubjectsForm subjectId={useID()} schema={schema} />;
}
