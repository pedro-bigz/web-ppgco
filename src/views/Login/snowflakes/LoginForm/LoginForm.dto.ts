import z from "zod";

export const loginFormSchema = z.object({
  senha: z.string().min(1, "O campo de senha é obrigatório").max(200),
  email: z
    .string()
    .max(100)
    .email("O campo de email é obrigatório")
    .transform((value) => value.toLowerCase()),
  keepConnected: z.boolean(),
});

export type LoginFormDto = {
  email: string;
  senha: string;
};
