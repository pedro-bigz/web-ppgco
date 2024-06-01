import { z } from "zod";
import { ProfessorForm } from "./snowflakes";
import { useID } from "hooks";
import { toIsoString } from "utils";

const schema = z.object({
  first_name: z.string().min(1, "Este campo é obrigatório"),
  last_name: z.string().min(1, "Este campo é obrigatório"),
  lattes: z.string().min(1, "Este campo é obrigatório"),
  email: z.string().email("E-mail inválido"),
  fone: z.string().max(20).optional(),
  research_line_id: z
    .string()
    .min(1, "Este campo é obrigatório")
    .transform((num) => +num),
  birth_date: z.string().transform(toIsoString),
});

export const ProfessorsUpdatePage = () => {
  return <ProfessorForm professorId={useID()} schema={schema} />;
};
