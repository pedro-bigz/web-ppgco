import { ZodSchema } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { resolveEndpoint } from "components";
import { useCustomForm } from "core";
import { useGetStudent } from "views/Students/api";
import { useMemo } from "react";
import _isEmpty from "lodash/isEmpty";

interface UseStudentsFormParams {
  studentId?: string;
  schema: ZodSchema;
}

export function useStudentsForm({ studentId, schema }: UseStudentsFormParams) {
  const endpoint = resolveEndpoint("/students", studentId);
  const method = !studentId ? "post" : "patch";

  const { data: student = {} } = useGetStudent(studentId) as {
    data: Record<string, any>;
  };

  const formDefaultValues = useMemo(() => {
    if (_isEmpty(student)) return;
    return {
      ...student,
      ...student.user,
      ...student.project,
      has_scholarship: Boolean(student.scholarship),
    };
  }, [student]);

  const formProps = useCustomForm(
    { endpoint, method },
    {
      resolver: zodResolver(schema),
      mode: "onSubmit",
      // reValidateMode: "onChange",
      // shouldUnregister: false,
    },
    {
      reInitValues: formDefaultValues,
    }
  );

  return { ...formProps, formDefaultValues, student };
}
