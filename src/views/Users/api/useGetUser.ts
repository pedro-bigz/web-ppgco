import { useApiQuery } from "core";

export function useGetUser(userId?: string) {
  return useApiQuery({
    endpoint: "/users/" + userId,
    options: { enabled: Boolean(userId) },
    queryKey: ["users", String(userId)],
  });
}
