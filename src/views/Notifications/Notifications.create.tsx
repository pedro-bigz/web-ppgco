import { z } from "zod";
import { NotificationsForm } from "./snowflakes";

const schema = z.object({
  body: z.string().max(65535).optional(),
  title: z.string().max(255),
  notifieds: z
    .object({
      mode: z
        .object({
          value: z
            .literal("all")
            .or(z.literal("all_advisors"))
            .or(z.literal("all_students"))
            .or(z.literal("some_advisors"))
            .or(z.literal("some_students")),
        })
        .transform(({ value }) => value),
      values: z.string().array().optional(),
    })
    .refine(({ mode, values }) => {
      console.log({ mode, values });
      return mode.startsWith("all") || (mode.startsWith("some") && values);
    }),
});

export function NotificationsCreatePage() {
  return <NotificationsForm schema={schema} />;
}
