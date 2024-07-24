import { z } from "zod";
import { PublicationsForm } from "./snowflakes";

const schema = z.object({});

export function PublicationsCreatePage() {
  return <PublicationsForm schema={schema} />;
}
