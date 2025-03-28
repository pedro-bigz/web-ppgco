import z from "zod";

export const resetPasswordFormSchema = z
  .object({
    password: z
      .string()
      .min(1, "O campo de senha é obrigatório")
      .max(200, "O campo de senha deve ter até 200 caracteres"),
    password_confirmation: z
      .string()
      .min(1, "O campo de confirmação de senha é obrigatório")
      .max(200, "O campo de confirmação de senha deve ter até 200 caracteres"),
  })
  .refine((form) => form.password === form.password_confirmation, {
    message: 'A confirmação de senha deve ser igual a senha',
  });

export type ResetPasswordSchemaType = typeof resetPasswordFormSchema;

export type ResetPasswordFormDto = z.infer<ResetPasswordSchemaType>;
export type ResetPasswordFormResponseDto = any;
