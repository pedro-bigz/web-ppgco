import { useApiQuery } from "core";

export function useGetProfessor(professorId?: string) {
  return useApiQuery({
    endpoint: "/advisors/" + professorId,
    options: { enabled: Boolean(professorId) },
    queryKey: ["advisors", String(professorId)],
  });
}
