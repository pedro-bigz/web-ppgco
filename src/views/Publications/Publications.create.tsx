import { z } from "zod";
import { PublicationsForm } from "./snowflakes";

const toNumber = (val: string | boolean) => +val;

const schema = z.object({
  project_ids: z.string().transform(toNumber).array(),
  title: z.string(),
  vehicle_name: z.string(),
  start_date: z.string(),
  end_date: z.string(),
  coauthors: z
    .object({
      first_name: z.string().max(255),
      last_name: z.string().max(255),
      lattes: z.string().max(255),
      affiliation: z.string().max(255),
    })
    .array(),
});

export function PublicationsCreatePage() {
  return <PublicationsForm schema={schema} />;
}
