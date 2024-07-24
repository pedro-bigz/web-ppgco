import { ReactNode } from "react";
import { Card, CardBody } from "@nextui-org/react";
import { FormProvider, UseFormReturn } from "react-hook-form";
import _trimEnd from "lodash/trimEnd";

interface FormProps extends UseFormReturn<any, any, any> {
  id?: string;
  name?: string;
  children: ReactNode;
  className?: string;
  onSubmit(data: unknown): void;
}

export function Form({
  id,
  name,
  children,
  className,
  onSubmit,
  ...props
}: FormProps) {
  return (
    <FormProvider {...props}>
      <form
        id={id}
        name={name}
        className={className}
        onSubmit={onSubmit}
        noValidate
      >
        {children}
      </form>
    </FormProvider>
  );
}

export function CardForm(props: FormProps) {
  return (
    <Card>
      <CardBody className="px-5 py-4">
        <Form {...props} />
      </CardBody>
    </Card>
  );
}
