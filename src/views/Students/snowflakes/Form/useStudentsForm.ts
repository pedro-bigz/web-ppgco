import { ZodSchema } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { resolveEndpoint } from "components";
import { useCustomForm } from "hooks";
import { useGetStudent } from "views/Students/api";

interface UseStudentsFormParams {
  studentId?: string;
  schema: ZodSchema;
}

export function useStudentsForm({ studentId, schema }: UseStudentsFormParams) {
  const endpoint = resolveEndpoint("/students", studentId);
  const method = !studentId ? "post" : "patch";

  const { data: student = {} } = useGetStudent(studentId);
  const formProps = useCustomForm(
    endpoint,
    method,
    {
      resolver: zodResolver(schema),
      mode: "onSubmit",
      // reValidateMode: "onChange",
      // shouldUnregister: false,
    },
    {
      defaultValues: student,
    }
  );

  return { ...formProps, student };
}
