import { z } from "zod";
import { StudentsForm } from "./snowflakes";

const schema = z.object({});

export const StudentsCreatePage = () => {
  return <StudentsForm schema={schema} />;
};
