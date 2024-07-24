import { useApiQuery } from "core";

export interface UseGetStudentParams {
  studentId?: string;
}

export function useGetStudent(studentId?: string) {
  return useApiQuery({
    endpoint: "/students/" + studentId,
    options: { enabled: Boolean(studentId) },
    queryKey: ["students", String(studentId)],
  });
}
