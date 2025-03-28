import { z } from "zod";

export const postForgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, 'Informe o e-mail antes de prosseguir')
    .max(255, 'O e-mail deve conter até 255 caracteres')
});

export type ForgotPasswordFormDto = z.infer<typeof postForgotPasswordSchema>;
