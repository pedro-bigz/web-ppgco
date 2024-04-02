import * as z from "zod";

import { useApiMutate } from "hooks/api";

const responseSchema = z.object({
  hasAccess: z.boolean(),
});

type TypeResponse = z.infer<typeof responseSchema>;

export function useCheckToken() {
  return useApiMutate<unknown, TypeResponse>({
    endpoint: "/auth/check-token",
    responseSchema,
  });
}
