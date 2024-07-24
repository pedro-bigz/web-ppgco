import { z } from "zod";
import { PublicationsForm } from "./snowflakes";
import { useID } from "core";

const schema = z.object({});

export function PublicationsUpdatePage() {
  return <PublicationsForm publicationId={useID()} schema={schema} />;
}
