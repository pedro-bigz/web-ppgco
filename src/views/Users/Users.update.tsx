import { z } from "zod";
import { UsersForm } from "./snowflakes";
import { useID } from "core";
import { toIsoString } from "utils";

const schema = z.object({
  first_name: z.string().min(1, "Campo Obrigatório"),
  last_name: z.string().min(1, "Campo Obrigatório"),
  email: z.string().min(1, "Campo Obrigatório"),
  birth_date: z.string().transform(toIsoString),
  phone: z.string(),
  // roles:
});

export function UsersUpdatePage() {
  return <UsersForm userId={useID()} schema={schema} />;
}
