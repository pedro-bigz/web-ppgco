import { z } from "zod";
import { useID } from "core";
import { StudentsForm } from "./snowflakes";
import { toIsoString } from "utils";

const schema = z.object({
  registration: z.string().max(50).min(1, "Campo Obrigatório"),
  title: z.string().min(1, "Campo Obrigatório"),
  first_name: z.string().min(1, "Campo Obrigatório"),
  last_name: z.string().min(1, "Campo Obrigatório"),
  email: z.string().min(1, "Campo Obrigatório"),
  birth_date: z.string().transform(toIsoString),
  phone: z.string(),
  course_id: z
    .string()
    .min(1, "Campo Obrigatório")
    .transform((num) => +num),
  research_line_id: z
    .string()
    .min(1, "Campo Obrigatório")
    .transform((num) => +num),
  lattes: z.string().max(100),
  scholarship: z
    .string()
    .or(z.literal(""))
    .transform((date) => (date ? toIsoString(date) : undefined)),
  entry_date: z.string().transform(toIsoString),
  sucupira_date: z.string().transform(toIsoString),
  start_date: z.string().transform(toIsoString),
  end_date: z.string().transform(toIsoString),
  advisor_id: z
    .string()
    .min(1, "Campo Obrigatório")
    .transform((num) => +num),
  coadvisors: z
    .array(
      z
        .object({
          coadvisor_id: z.string().optional(),
        })
        .transform(({ coadvisor_id }) =>
          coadvisor_id ? +coadvisor_id : undefined
        )
    )
    .transform((arg) => arg.filter(Boolean)),
});

export function StudentsUpdatePage() {
  return <StudentsForm studentId={useID()} schema={schema} />;
}
