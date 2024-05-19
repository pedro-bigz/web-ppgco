import { useEffect } from "react";
import {
  FieldValues,
  UseFormReturn,
  useForm as useHookForm,
  UseFormProps as UseHookFormProps,
} from "react-hook-form";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import _map from "lodash/map";
import _isEmpty from "lodash/isEmpty";
import { initFormFields } from "utils";
import { useApiMutate } from "hooks/api";
import { useLoadingContext } from "hooks/contexts";
import _trim from "lodash/trim";

export interface SubmitHandler {
  onSubmit: (data: FieldValues) => any;
  handleOnSubmit: (
    e?: React.BaseSyntheticEvent<object, any, any> | undefined
  ) => Promise<void>;
}

export interface OnSubmitCallbacksInterface {
  beforeSubmit?: (data: FieldValues) => void;
  onSuccess?: (
    data: unknown,
    variables: unknown,
    context: unknown
  ) => string | never | void;
  onError?: (
    error: Error,
    variables: unknown,
    context: unknown
  ) => string | never | void;
  onSettled?: (
    data: unknown,
    error: Error | null,
    variables: unknown,
    context: unknown
  ) => string | never | void;
}

export interface UseFormOptions {
  defaultValues?: any;
  onSubmitCallbacks?: OnSubmitCallbacksInterface;
  hasAutoToasts?: boolean;
  redirectTo?: string;
}

export type FormRequestMethods = "post" | "patch";

export function useCustomForm<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TTransformedValues extends FieldValues | undefined = undefined
>(
  endpoint: string,
  method: FormRequestMethods,
  hookFormProps?: UseHookFormProps<TFieldValues, TContext>,
  options?: UseFormOptions
): UseFormReturn<TFieldValues, TContext, TTransformedValues> & SubmitHandler {
  const navigate = useNavigate();
  const formProps = useHookForm(hookFormProps);

  const {
    redirectTo,
    defaultValues,
    onSubmitCallbacks,
    hasAutoToasts = true,
  } = options ?? {};

  const { pathname } = useLocation();
  const { setIsLoading } = useLoadingContext();
  const { mutate } = useApiMutate({
    endpoint,
    method,
  });

  const getRedirectUrl = () => {
    const urlParts = _trim(pathname, "/").split("/");
    return "/" + urlParts[0];
  };

  const onSubmit = (data: FieldValues) => {
    setIsLoading(true);

    onSubmitCallbacks?.beforeSubmit?.(data);
    mutate(data, {
      onSuccess(data: unknown, variables: unknown, context: unknown) {
        const message = onSubmitCallbacks?.onSuccess
          ? onSubmitCallbacks?.onSuccess(data, variables, context)
          : "Registrado com sucesso";

        if (typeof message !== "string") return;

        toast.success(message);
        navigate(redirectTo ?? getRedirectUrl());
      },
      onError(error: Error, variables: unknown, context: unknown) {
        const message = onSubmitCallbacks?.onError
          ? onSubmitCallbacks?.onError(error, variables, context)
          : "Falha ao cadastrar";

        if (typeof message !== "string") return;

        toast.error(message);
      },
      onSettled(
        data: unknown,
        error: Error | null,
        variables: unknown,
        context: unknown
      ) {
        setIsLoading(false);
        onSubmitCallbacks?.onSettled?.(data, error, variables, context);
      },
    });
  };

  const handleOnSubmit = formProps.handleSubmit(onSubmit);

  useEffect(() => {
    if (!defaultValues) return;
    initFormFields({
      data: defaultValues,
      setForm: formProps.reset,
    });
  }, [defaultValues]);

  useEffect(() => {
    if (_isEmpty(formProps.formState.errors) || !hasAutoToasts) {
      return;
    }
    _map(formProps.formState.errors, (error: Error) => {
      toast.error(error?.message);
    });
  }, [formProps.formState.errors, formProps.formState.errors.length]);

  return { ...formProps, onSubmit, handleOnSubmit };
}
