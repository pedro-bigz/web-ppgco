import { z } from "zod";
import { useID } from "hooks";
import { StudentsForm } from "./snowflakes";

const schema = z.object({});

export const StudentsUpdatePage = () => {
  return <StudentsForm studentId={useID()} schema={schema} />;
};
