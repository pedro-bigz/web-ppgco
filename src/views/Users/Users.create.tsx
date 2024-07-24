import { z } from "zod";
import { UsersForm } from "./snowflakes";
import { toIsoString } from "utils";

const schema = z.object({
  first_name: z.string().min(1, "Campo Obrigatório"),
  last_name: z.string().min(1, "Campo Obrigatório"),
  email: z.string().min(1, "Campo Obrigatório"),
  birth_date: z.string().transform(toIsoString),
  password: z.string(),
  phone: z.string(),
  roles: z
    .object({ id: z.number(), name: z.string() })
    .transform(({ name }) => [name]),
});

export function UsersCreatePage() {
  return <UsersForm schema={schema} />;
}
