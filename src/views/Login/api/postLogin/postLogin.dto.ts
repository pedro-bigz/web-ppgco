import z from "zod";

export const loginFormSchema = z.object({
  password: z.string().min(1, "O campo de senha é obrigatório").max(200),
  email: z
    .string()
    .max(100)
    .email("Insira um email válido")
    .transform((value) => value.toLowerCase()),
});

export const loginFormResponseSchema = z.object({
  auth: z.object({
    accessToken: z.string(),
    refreshToken: z.string(),
  }),
  user: z.object({
    id: z.number(),
    name: z.string(),
    email: z.string(),
    avatar: z.string().nullable(),
  }),
});

export type LoginSchemaType = typeof loginFormSchema;
export type LoginResponseSchemaType = typeof loginFormResponseSchema;

export type LoginFormDto = Omit<z.infer<LoginSchemaType>, "keepConnected">;
export type LoginFormResponseDto = z.infer<LoginResponseSchemaType>;
