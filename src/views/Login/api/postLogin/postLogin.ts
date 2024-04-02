import { useApiMutate } from "hooks/api";
import {
  LoginFormDto,
  LoginFormResponseDto,
  loginFormSchema,
} from "./postLogin.dto";

export function usePostLogin() {
  return useApiMutate<LoginFormDto, LoginFormResponseDto>({
    endpoint: "/auth/login",
    paramsSchema: loginFormSchema,
    message: {
      error: "Acesso não autorizado.",
    },
  });
}
