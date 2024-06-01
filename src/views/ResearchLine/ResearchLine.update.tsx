import { z } from "zod";
import { ResearchLineForm } from "./snowflakes";
import { useID } from "hooks";
// import { isValidDate, toIsoString } from "utils";

const schema = z.object({
  title: z.string().min(1, "Campo obrigatório"),
  description: z.string().optional(),
});

export const ResearchLineUpdatePage = () => {
  return <ResearchLineForm researchLineId={useID()} schema={schema} />;
};
