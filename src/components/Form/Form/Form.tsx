import { ReactNode } from "react";
import { FormProvider, UseFormReturn } from "react-hook-form";

interface FormProps extends UseFormReturn {
  children: ReactNode;
  className?: string;
  onSubmit(data: unknown): void;
}

export function Form({ children, className, onSubmit, ...props }: FormProps) {
  return (
    <FormProvider {...props}>
      <form
        onSubmit={props.handleSubmit(onSubmit)}
        className={className}
        noValidate
      >
        {children}
      </form>
    </FormProvider>
  );
}
