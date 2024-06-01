import { useApiQuery } from "hooks";

export const useGetProfessor = (professorId?: string) => {
  return useApiQuery({
    endpoint: "/advisors/" + professorId,
    options: { enabled: Boolean(professorId) },
    queryKey: ["advisors", String(professorId)],
  });
};
