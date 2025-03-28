import { useApiMutate } from "core";

export function usePostForgotPassword() {
  return useApiMutate({
    endpoint: '/reset-password/forgot-password'
  });
}