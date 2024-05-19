import { useApiQuery } from "hooks";

export const useGetSubject = (subjectId?: string) => {
  return useApiQuery({
    endpoint: "/subjects/" + subjectId,
    options: { enabled: Boolean(subjectId) },
    queryKey: ["subjects", String(subjectId)],
  });
};
