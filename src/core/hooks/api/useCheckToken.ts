import * as z from "zod";

import { useApiMutate } from "core/hooks/api";

const responseSchema = z.object({
  hasAccess: z.boolean(),
});

type TypeResponse = z.infer<typeof responseSchema>;

export function useCheckToken() {
  return useApiMutate<unknown, TypeResponse>({
    instance: "main",
    endpoint: "/auth/check-token",
    responseSchema,
  });
}
