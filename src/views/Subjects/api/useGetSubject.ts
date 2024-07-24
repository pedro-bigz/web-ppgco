import { useApiQuery } from "core";

export function useGetSubject(subjectId?: string) {
  return useApiQuery({
    endpoint: "/subjects/" + subjectId,
    options: { enabled: Boolean(subjectId) },
    queryKey: ["subjects", String(subjectId)],
  });
}
