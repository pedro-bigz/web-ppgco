import { ZodSchema } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import _trimEnd from "lodash/trimEnd";
import { Form } from "components";
import { useCustomForm } from "hooks";
import { useGetStudent } from "views/Students/api";

export interface StudentsFormProps {
  studentId?: string;
  schema: ZodSchema;
}

function resolveEndpoint(studentId = "") {
  return _trimEnd(["/students", studentId].join("/"), "/");
}

export const StudentsForm = ({ studentId, schema }: StudentsFormProps) => {
  const endpoint = resolveEndpoint(studentId);

  const { data: student = {} } = useGetStudent({ studentId });
  const { onSubmit, handleOnSubmit, ...formProps } = useCustomForm(
    endpoint,
    {
      resolver: zodResolver(schema),
      mode: "onSubmit",
      reValidateMode: "onChange",
      shouldUnregister: false,
    },
    {
      defaultValues: student,
    }
  );

  return (
    <Form {...formProps} onSubmit={handleOnSubmit}>
      <div></div>
    </Form>
  );
};
