import { z } from "zod";
import { ResearchLineForm } from "./snowflakes";
// import { isValidDate, toIsoString } from "utils";

const schema = z.object({
  title: z.string().min(1, "Campo obrigatório"),
  description: z.string().optional(),
});

export const ResearchLineCreatePage = () => {
  return <ResearchLineForm schema={schema} />;
};
