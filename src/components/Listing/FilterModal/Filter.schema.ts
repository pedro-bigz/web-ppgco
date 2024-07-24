import { z } from "zod";

export const schema = z.object({
  filters: z
    .object({
      column: z.object(
        { key: z.string() },
        { message: "O nome do campo é obrigatório" }
      ),
      operator: z.object(
        { key: z.string() },
        { message: "O operador é obrigatório" }
      ),
      content: z.string().min(1, "O conteúdo é obrigatório").array(),
    })
    .transform((filter) => ({
      column: filter.column.key,
      operator: filter.operator.key,
      content: filter.content,
    }))
    .array(),
});
