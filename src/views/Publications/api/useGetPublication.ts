import { useApiQuery } from "core";

export function useGetPublication(publicationId?: string) {
  return useApiQuery({
    endpoint: "/publications/" + publicationId,
    options: { enabled: Boolean(publicationId) },
    queryKey: ["publications", String(publicationId)],
  });
}
