import * as z from "zod";

import { useApiMutate } from "hooks/api";

const paramsSchema = z.object({
  email: z.string(),
  senha: z.string(),
});

const responseSchema = z.object({
  auth: z.object({
    accessToken: z.string(),
    refreshToken: z.string(),
  }),
  user: z.object({
    codigo: z.number(),
    name: z.string(),
    email: z.string(),
    avatar: z.string().nullable(),
  }),
});

type TypeParams = z.infer<typeof paramsSchema>;
type TypeResponse = z.infer<typeof responseSchema>;

export function usePostLogin() {
  return useApiMutate<TypeParams, TypeResponse>({
    endpoint: "/auth/login",
    // responseSchema,
    paramsSchema,
    message: {
      error: "Acesso não autorizado.",
    },
  });
}
