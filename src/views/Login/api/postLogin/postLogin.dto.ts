import z from "zod";
import { ApiProfileResponse } from "core";

export const loginFormSchema = z.object({
  password: z.string().min(1, "O campo de senha é obrigatório").max(200),
  email: z
    .string()
    .max(100)
    .email("Insira um email válido")
    .transform((value) => value.toLowerCase()),
});

export type LoginSchemaType = typeof loginFormSchema;

export type LoginFormDto = Omit<z.infer<LoginSchemaType>, "keepConnected">;
export type LoginFormResponseDto = {
  auth: {
    accessToken: string;
    refreshToken: string;
  };
  user: ApiProfileResponse;
};
