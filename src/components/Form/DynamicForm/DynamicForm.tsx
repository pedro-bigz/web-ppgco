import { ReactNode } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { UseQueryResult } from "@tanstack/react-query";
import _trimEnd from "lodash/trimEnd";
import { FormRequestMethods, useCustomForm, UseFormOptions } from "hooks";
import { ZodSchema } from "zod";
import { CardForm } from "components/Form/Form";

export interface DynamicFormProps
  extends Omit<UseFormOptions, "defaultValues"> {
  registerId?: string;
  action: string;
  method?: FormRequestMethods;
  schema: ZodSchema;
  children: ReactNode;
  useGetItem: (registerId?: string) => UseQueryResult;
}

function resolveEndpoint(endpoint: string, registerId = "") {
  return _trimEnd([endpoint, registerId].join("/"), "/");
}

export function DynamicForm({
  registerId,
  action,
  method = "post",
  schema,
  children,
  useGetItem,
  ...formOptions
}: DynamicFormProps) {
  const endpoint = resolveEndpoint(action, registerId);

  const { data: subject = {} } = useGetItem(registerId);
  const { onSubmit, handleOnSubmit, ...formProps } = useCustomForm(
    endpoint,
    method,
    {
      resolver: zodResolver(schema),
      mode: "onSubmit",
      // reValidateMode: "onChange",
      // shouldUnregister: false,
    },
    {
      ...formOptions,
      defaultValues: subject,
    }
  );
  return (
    <CardForm {...formProps} onSubmit={handleOnSubmit}>
      {children}
    </CardForm>
  );
}
