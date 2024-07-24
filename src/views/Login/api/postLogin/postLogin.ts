import { useApiMutate } from "core/hooks/api";
import {
  LoginFormDto,
  LoginFormResponseDto,
  loginFormSchema,
} from "./postLogin.dto";

export function usePostLogin() {
  return useApiMutate<LoginFormDto, LoginFormResponseDto>({
    instance: "auth",
    endpoint: "/login",
    paramsSchema: loginFormSchema,
    message: {
      error: "Acesso não autorizado.",
    },
  });
}
