import { useApiMutate } from "core/hooks/api";
import {
  ResetPasswordFormDto,
  ResetPasswordFormResponseDto,
  resetPasswordFormSchema,
} from "./postResetPassword.dto";

interface UsePostResetPasswordParams {
  token: string
};

export function usePostResetPassword({ token }: UsePostResetPasswordParams) {
  return useApiMutate<ResetPasswordFormDto, ResetPasswordFormResponseDto>({
    endpoint: `/reset-password/${token}`,
    paramsSchema: resetPasswordFormSchema,
    message: {
      error: "Acesso não autorizado.",
    },
  });
}
