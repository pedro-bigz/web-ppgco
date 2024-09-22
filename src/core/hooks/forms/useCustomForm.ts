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
import _trim from "lodash/trim";
import { initFormFields } from "utils";
import { useApiMutate } from "core/hooks/api";
import { useLoadingContext } from "core/hooks/contexts";
import { queryClient } from "core";

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
  reInitValues?: any;
  onSubmitCallbacks?: OnSubmitCallbacksInterface;
  hasAutoToasts?: boolean;
  redirectTo?: string;
}

export type FormRequestMethods = "post" | "patch";

export type UseCustomFormReturn<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TTransformedValues extends FieldValues | undefined = undefined
> = UseFormReturn<TFieldValues, TContext, TTransformedValues> & SubmitHandler;

export function useCustomForm<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TTransformedValues extends FieldValues | undefined = undefined
>(
  request: { endpoint: string; method: FormRequestMethods },
  hookFormProps?: UseHookFormProps<TFieldValues, TContext>,
  options?: UseFormOptions
): UseCustomFormReturn<TFieldValues, TContext, TTransformedValues> {
  const navigate = useNavigate();
  const formProps = useHookForm(hookFormProps);

  const {
    redirectTo,
    reInitValues,
    onSubmitCallbacks,
    hasAutoToasts = true,
  } = options ?? {};
  const { handleSubmit, formState } = formProps;

  const { pathname } = useLocation();
  const { setIsLoading } = useLoadingContext();
  const { mutate } = useApiMutate(request);

  const getRedirectUrl = () => {
    const urlParts = _trim(pathname, "/").split("/");
    return "/" + urlParts[0];
  };

  const onSubmit = (data: FieldValues) => {
    setIsLoading(true);

    console.log({ data });

    onSubmitCallbacks?.beforeSubmit?.(data);
    mutate(data as any, {
      onSuccess(data: unknown, variables: unknown, context: unknown) {
        queryClient.removeQueries();

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

  const handleOnSubmit = handleSubmit(onSubmit);

  useEffect(() => {
    if (_isEmpty(formState.errors)) return;

    console.log({ errors: formState.errors });
    Object.values(formState.errors).map((error) => {
      if (error?.message) toast.error(error.message as string);
    });
  }, [formState.errors]);

  useEffect(() => {
    if (!reInitValues) return;
    initFormFields({
      data: reInitValues,
      setForm: formProps.reset,
    });
  }, [reInitValues]);

  useEffect(() => {
    if (_isEmpty(formState.errors) || !hasAutoToasts) {
      return;
    }
    _map(formState.errors, (error: Error) => {
      toast.error(error?.message);
    });
  }, [formState.errors, formState.errors.length]);

  return { ...formProps, onSubmit, handleOnSubmit };
}
