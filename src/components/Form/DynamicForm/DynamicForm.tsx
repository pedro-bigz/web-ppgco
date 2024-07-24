import { ReactNode } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { UseQueryResult } from "@tanstack/react-query";
import _trimEnd from "lodash/trimEnd";
import {
  FormRequestMethods,
  useCustomForm,
  UseCustomFormReturn,
  UseFormOptions,
} from "core";
import { ZodSchema } from "zod";
import { CardForm } from "components/Form/Form";

type ChildrenFunction = (props: UseCustomFormReturn) => JSX.Element;

export interface DynamicFormProps
  extends Omit<UseFormOptions, "defaultValues"> {
  registerId?: string;
  action: string;
  method?: FormRequestMethods;
  schema: ZodSchema;
  children: ReactNode | ChildrenFunction;
  useGetItem: (registerId?: string) => UseQueryResult;
  onInitForm?: (data?: any) => Record<string, string | number | boolean>;
}

export function resolveEndpoint(endpoint: string, registerId = "") {
  return _trimEnd([endpoint, registerId].join("/"), "/");
}

export function useDynamicForm({
  registerId,
  action,
  method = "post",
  schema,
  useGetItem,
  onInitForm,
  ...formOptions
}: Omit<DynamicFormProps, "children">) {
  const endpoint = resolveEndpoint(action, registerId);

  const { data = {} } = useGetItem(registerId);
  const { onSubmit, handleOnSubmit, ...formProps } = useCustomForm(
    { endpoint, method },
    {
      resolver: zodResolver(schema),
      mode: "onSubmit",
      // reValidateMode: "onChange",
      // shouldUnregister: false,
    },
    {
      ...formOptions,
      reInitValues: onInitForm?.(data) ?? data,
    }
  );

  return {
    data,
    endpoint,
    onSubmit,
    handleOnSubmit,
    ...formProps,
  };
}

export function DynamicForm({
  registerId,
  action,
  method = "post",
  schema,
  children,
  useGetItem,
  onInitForm,
  ...formOptions
}: DynamicFormProps) {
  const { endpoint, data, onSubmit, handleOnSubmit, ...formProps } =
    useDynamicForm({
      registerId,
      action,
      method,
      schema,
      useGetItem,
      onInitForm,
      ...formOptions,
    });

  const ChildrenRenderer =
    typeof children !== "function" ? () => children : children;

  return (
    <CardForm {...formProps} onSubmit={handleOnSubmit}>
      {ChildrenRenderer({ onSubmit, handleOnSubmit, ...formProps })}
    </CardForm>
  );
}
