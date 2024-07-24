import { z } from "zod";
import { ResearchLineForm } from "./snowflakes";
import { useID } from "core";
// import { isValidDate, toIsoString } from "utils";

const schema = z.object({
  title: z.string().min(1, "Campo obrigatório"),
  description: z.string().optional(),
});

export function ResearchLineUpdatePage() {
  return <ResearchLineForm researchLineId={useID()} schema={schema} />;
}
